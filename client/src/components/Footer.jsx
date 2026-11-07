import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { portfolio } from '../data/portfolio.js';

export default function Footer({ scrollToSection }) {
  return (
    <footer className="portfolio-footer">
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-brand-title">{portfolio.name}</span>
          <span className="footer-sep">&bull;</span>
          <span className="footer-brand-role">{portfolio.role}</span>
        </div>

        <div className="footer-center">
          <div className="footer-social-icons">
            <a
              href={portfolio.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="footer-icon-link"
            >
              <FiGithub size={18} />
            </a>
            <a
              href={portfolio.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="footer-icon-link"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={portfolio.links.email}
              aria-label="Send direct email"
              className="footer-icon-link"
            >
              <FiMail size={18} />
            </a>
          </div>
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Bhavani Prasad Kola. Built with MERN, Three.js &amp; Tailwind.
          </p>
        </div>

        <div className="footer-right">
          <button
            onClick={() => scrollToSection('hero')}
            className="back-to-top-button"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <FiArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
