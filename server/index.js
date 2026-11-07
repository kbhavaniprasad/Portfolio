import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));

const messageSchema = new mongoose.Schema({ name: String, email: String, message: String, createdAt: { type: Date, default: Date.now } });
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
if (process.env.MONGODB_URI) mongoose.connect(process.env.MONGODB_URI).catch(err => console.error('MongoDB connection failed:', err.message));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body ?? {};
  if (typeof name !== 'string' || name.trim().length < 2 || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email) || typeof message !== 'string' || message.trim().length < 12) return res.status(400).json({ error: 'Invalid contact submission.' });
  try {
    if (process.env.MONGODB_URI && mongoose.connection.readyState === 1) await Message.create({ name: name.trim(), email: email.trim(), message: message.trim() });
    if (!process.env.SMTP_HOST || !process.env.CONTACT_TO_EMAIL) throw new Error('Email service is not configured.');
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined });
    await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to: process.env.CONTACT_TO_EMAIL, replyTo: email, subject: `Portfolio contact — ${name}`, text: `From: ${name} <${email}>\n\n${message}` });
    res.status(201).json({ ok: true });
  } catch (error) { console.error('Contact submission failed:', error.message); res.status(503).json({ error: 'Message could not be delivered.' }); }
});
app.listen(process.env.PORT || 5000, () => console.log(`API listening on ${process.env.PORT || 5000}`));
