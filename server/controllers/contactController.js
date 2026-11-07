import { validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

/**
 * @desc    Submit contact message, save to MongoDB & send email notification
 * @route   POST /api/contact
 * @access  Public
 */
export const handleContactSubmit = async (req, res, next) => {
  try {
    // 1. Honeypot check (field named "website_hp" or "botField" hidden from real humans)
    if (req.body.website_hp || req.body._gotcha) {
      // Silently ignore bot submissions with fake success to prevent automated retry
      return res.status(200).json({
        success: true,
        message: 'Your message has been received successfully.'
      });
    }

    // 2. Validate input results from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg,
        errors: errors.array()
      });
    }

    const { name, email, message } = req.body;

    // 3. Save contact message to MongoDB Atlas if connected
    let savedContact = null;
    try {
      savedContact = await Contact.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim()
      });
    } catch (dbErr) {
      console.warn('⚠️ MongoDB save failed or skipped:', dbErr.message);
    }

    // 4. Send email notification via Nodemailer if credentials configured
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || emailUser || 'kolabhavaniprasad@gmail.com';

    let emailSent = false;

    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass
          }
        });

        const mailOptions = {
          from: `"Portfolio Contact Form" <${emailUser}>`,
          to: notificationEmail,
          replyTo: email,
          subject: `✨ New Portfolio Inquiry from ${name}`,
          text: `You received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nDate: ${new Date().toLocaleString()}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0A0F1F; color: #E6EDF7; border-radius: 12px; border: 1px solid rgba(99, 102, 241, 0.3);">
              <h2 style="color: #6366F1; margin-top: 0; font-size: 22px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 12px;">
                🚀 New Portfolio Message
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #94A3B8; width: 100px;"><strong>Sender:</strong></td>
                  <td style="padding: 8px 0; color: #E6EDF7; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94A3B8;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #22D3EE; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94A3B8;"><strong>Received:</strong></td>
                  <td style="padding: 8px 0; color: #94A3B8;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <div style="background: rgba(255, 255, 255, 0.05); padding: 16px; border-radius: 8px; border-left: 3px solid #6366F1;">
                <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #E6EDF7;">${message}</p>
              </div>
              <p style="margin-top: 24px; font-size: 12px; color: #64748B; text-align: center;">
                Sent from Bhavani Prasad Kola's Interactive Portfolio
              </p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (mailErr) {
        console.error('⚠️ Nodemailer dispatch failed:', mailErr.message);
      }
    } else {
      console.warn('⚠️ EMAIL_USER or EMAIL_PASS not configured. Skipping email dispatch.');
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received successfully.',
      data: {
        id: savedContact ? savedContact._id : undefined,
        name,
        email,
        emailSent
      }
    });
  } catch (error) {
    next(error);
  }
};
