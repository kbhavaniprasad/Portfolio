import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiExternalLink } from 'react-icons/fi';
import ContactForm from './ContactForm.jsx';
import { portfolio } from '../data/portfolio.js';

export default function ContactSection() {
  return (
    <section id="contact" className="content-section contact-section">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="section-header-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag-row">
            <span className="section-index">06</span>
            <span className="section-slash">/</span>
            <span className="section-tag-text">CONTACT US</span>
          </div>
          <h2 className="section-main-heading">
            Initiate Contact &amp; <i>Collaboration.</i>
          </h2>
          <p className="section-subtext">
            Available for full-time software engineering roles, MERN stack positions, and AI/ML initiatives. Send a direct message or connect across official channels.
          </p>
        </motion.div>

        {/* Contact Layout Grid */}
        <div className="contact-layout-grid">
          {/* Direct Channels Card */}
          <motion.div
            className="contact-info-card glass-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <h3 className="channels-heading">Direct Channels</h3>
            <p className="channels-subtext">
              Feel free to reach out directly via email, phone, or professional networks.
            </p>

            <div className="social-links-stack">
              <a
                href={portfolio.links.email}
                className="social-channel-pill"
                aria-label="Send direct email"
              >
                <div className="channel-icon-box">
                  <FiMail size={18} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">Email</span>
                  <span className="channel-val">{portfolio.email}</span>
                </div>
              </a>

              <a
                href={`tel:${portfolio.phone}`}
                className="social-channel-pill"
                aria-label="Call direct phone"
              >
                <div className="channel-icon-box">
                  <FiPhone size={18} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">Phone</span>
                  <span className="channel-val">{portfolio.phone}</span>
                </div>
              </a>

              <a
                href={portfolio.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-channel-pill"
                aria-label="View LinkedIn Profile"
              >
                <div className="channel-icon-box">
                  <FiLinkedin size={18} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">LinkedIn</span>
                  <span className="channel-val">linkedin.com/in/kola-bhavani-prasad</span>
                </div>
                <FiExternalLink className="ext-icon" />
              </a>

              <a
                href={portfolio.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-channel-pill"
                aria-label="View GitHub Profile"
              >
                <div className="channel-icon-box">
                  <FiGithub size={18} />
                </div>
                <div className="channel-text">
                  <span className="channel-label">GitHub</span>
                  <span className="channel-val">github.com/bhavani-prasad</span>
                </div>
                <FiExternalLink className="ext-icon" />
              </a>
            </div>

            <div className="location-footer-note">
              <FiMapPin className="pin-icon" />
              <span>{portfolio.location} &bull; IST (UTC+5:30)</span>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            className="contact-form-column"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeInOut' }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
