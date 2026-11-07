import { useState } from 'react';
import axios from 'axios';
import { FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website_hp: '' // Honeypot field (hidden from legitimate users)
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [serverMessage, setServerMessage] = useState('');

  // Client-side validation
  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your name (at least 2 characters).';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter a message of at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setServerMessage('');

    try {
      const response = await axios.post('/api/contact', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        setStatus('success');
        setServerMessage(response.data.message || 'Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', message: '', website_hp: '' });
      } else {
        setStatus('error');
        setServerMessage(response.data.error || 'Unable to submit message. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      const errorMsg =
        err.response?.data?.error ||
        'Server endpoint unavailable or rate limit reached. Please feel free to email directly at kolabhavaniprasad@gmail.com.';
      setServerMessage(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="contact-form-card glass-card">
      {/* Honeypot field hidden from users for spam protection */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="website_hp">Leave this field blank</label>
        <input
          type="text"
          id="website_hp"
          name="website_hp"
          tabIndex="-1"
          autoComplete="off"
          value={formData.website_hp}
          onChange={handleChange}
        />
      </div>

      <div className="form-fields-wrapper">
        {/* Name Field with Floating Label & Focus Glow */}
        <div className={`floating-field-group ${formData.name ? 'has-value' : ''} ${errors.name ? 'is-invalid' : ''}`}>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="floating-input"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
          />
          <label htmlFor="name" className="floating-label">
            Your Name <span className="req-star">*</span>
          </label>
          <div className="field-focus-line" />
          {errors.name && <span className="field-error-text">{errors.name}</span>}
        </div>

        {/* Email Field with Floating Label & Focus Glow */}
        <div className={`floating-field-group ${formData.email ? 'has-value' : ''} ${errors.email ? 'is-invalid' : ''}`}>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="floating-input"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <label htmlFor="email" className="floating-label">
            Email Address <span className="req-star">*</span>
          </label>
          <div className="field-focus-line" />
          {errors.email && <span className="field-error-text">{errors.email}</span>}
        </div>

        {/* Message Field with Floating Label & Focus Glow */}
        <div className={`floating-field-group ${formData.message ? 'has-value' : ''} ${errors.message ? 'is-invalid' : ''}`}>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="floating-textarea"
            value={formData.message}
            onChange={handleChange}
          />
          <label htmlFor="message" className="floating-label">
            Your Message <span className="req-star">*</span>
          </label>
          <div className="field-focus-line" />
          {errors.message && <span className="field-error-text">{errors.message}</span>}
        </div>

        {/* Submit Button with Loading State */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="submit-form-btn"
        >
          {status === 'loading' ? (
            <>
              <FiLoader className="btn-spinner" />
              <span>Transmitting...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <FiSend className="btn-send-icon" />
            </>
          )}
        </button>
      </div>

      {/* Toast / Alert Status Feedback */}
      {status === 'success' && (
        <div className="contact-toast toast-success" role="alert">
          <FiCheckCircle className="toast-icon" />
          <span>{serverMessage}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="contact-toast toast-error" role="alert">
          <FiAlertCircle className="toast-icon" />
          <span>{serverMessage}</span>
        </div>
      )}
    </form>
  );
}
