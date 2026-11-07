import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight, FiChevronDown } from 'react-icons/fi';
import TypingName from './TypingName.jsx';
import ProfileImage from './ProfileImage.jsx';
import { portfolio } from '../data/portfolio.js';

/**
 * Magnetic Button Helper
 * Attracts slightly towards the mouse pointer on hover for a tactile, futuristic feel.
 */
function MagneticButton({ children, className = '', onClick, href, download }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.transform = 'translate3d(0, 0, 0)';
  };

  const commonProps = {
    ref: btnRef,
    className: `magnetic-btn ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave
  };

  if (href) {
    return (
      <a {...commonProps} href={href} download={download}>
        {children}
      </a>
    );
  }

  return (
    <button {...commonProps} onClick={onClick}>
      {children}
    </button>
  );
}

export default function Hero({ scrollToSection }) {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        {/* Left Column: Greeting, Typing Typography, Bio, CTAs, Stats */}
        <div className="hero-left-column">
          <motion.div
            className="hero-badge-pill"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="live-status-dot" />
            <span className="badge-text">Open for Full-Stack &amp; AI Engineering Roles</span>
          </motion.div>

          <div className="hero-greeting-block">
            <span className="eyebrow-lead">WELCOME TO MY DIGITAL SPACE</span>
            <TypingName name={portfolio.name} roles={portfolio.roles} />
          </div>

          <motion.p
            className="hero-bio-paragraph"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {portfolio.bio}
          </motion.p>

          {/* Magnetic CTA Buttons */}
          <motion.div
            className="hero-actions-group"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <MagneticButton
              className="hero-btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              <span>View Projects</span>
              <FiArrowRight className="btn-arrow-icon" />
            </MagneticButton>

            <MagneticButton
              className="hero-btn-secondary"
              href={portfolio.links.resume}
              download="Bhavani_Prasad_Kola_Resume.pdf"
            >
              <FiDownload className="btn-download-icon" />
              <span>Download Resume</span>
            </MagneticButton>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            className="hero-stats-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            {portfolio.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="hero-stat-item"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 + idx * 0.1, ease: 'easeInOut' }}
              >
                <span className="stat-number">{stat.value}</span>
                <span className="stat-heading">{stat.label}</span>
                <span className="stat-sub">{stat.detail}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Circular Profile Photo (Appears instantly and statically) */}
        <div className="hero-right-column">
          <ProfileImage src={portfolio.photo} alt={portfolio.name} />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="scroll-indicator-container">
        <button
          onClick={() => scrollToSection('about')}
          className="scroll-indicator-btn"
          aria-label="Scroll to About section"
        >
          <span className="scroll-label">EXPLORE</span>
          <FiChevronDown className="scroll-bounce-arrow" />
        </button>
      </div>
    </section>
  );
}
