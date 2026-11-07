import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiDownload, FiHome } from 'react-icons/fi';
import { portfolio } from '../data/portfolio.js';

// Section Order Matching the Exact Requirement
const NAV_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'experience', label: 'Internships' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact Us' },
  //{ id: 'questionnaire', label: 'Questionnaire' }
];

export default function Navbar({ activeSection, scrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled-glass' : ''}`}>
      <div className="navbar-container">
        {/* Brand Monogram Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="navbar-brand"
          aria-label="Bhavani Prasad Kola Portfolio Home"
        >
          <div className="brand-logo-frame">
            <span className="brand-monogram">{portfolio.initials}</span>
          </div>
          <div className="brand-name-wrap">
            <span className="brand-name">{portfolio.shortName}</span>
            <span className="brand-sub">PORTFOLIO</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Primary Navigation">
          <ul className="nav-links-list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="nav-item">
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className={`nav-button ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.id === 'hero' && (
                      <FiHome className="nav-home-icon" size={15} aria-hidden="true" />
                    )}
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.div
                        className="nav-active-indicator"
                        layoutId="activeNavIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions (Resume & Mobile Toggle) */}
        <div className="navbar-actions">
          <a
            href={portfolio.links.resume}
            download="Bhavani_Prasad_Kola_Resume.pdf"
            className="resume-pill-btn"
            title="Download Official Resume PDF"
            aria-label="Download Official Resume PDF"
          >
            <FiDownload className="btn-icon" />
            <span>Resume</span>
          </a>

          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="mobile-nav-content" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(link.id)}
                >
                  <span className="mobile-nav-link-inner">
                    {link.id === 'hero' && (
                      <FiHome className="mobile-nav-home-icon" size={18} aria-hidden="true" />
                    )}
                    <span>{link.label}</span>
                  </span>
                </button>
              ))}
              <div className="mobile-resume-wrap">
                <a
                  href={portfolio.links.resume}
                  download="Bhavani_Prasad_Kola_Resume.pdf"
                  className="mobile-resume-btn"
                >
                  <FiDownload size={16} />
                  <span>Download Resume PDF</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
