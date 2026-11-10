import { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

/**
 * BackToTop Component
 * Floating "Back to Top" arrow button that appears after scrolling ~300px.
 * Fixed at bottom-right with smooth scroll, hover effect, and accessibility.
 */
export default function BackToTop({ scrollToSection }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    // Use the existing scrollToSection function for smooth scrolling to hero
    if (scrollToSection) {
      scrollToSection('hero');
    } else {
      // Fallback smooth scroll
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`back-to-top-float ${isVisible ? 'visible' : ''}`}
      data-visible={isVisible}
      aria-label="Back to top"
      title="Back to top"
    >
      <FiArrowUp size={20} aria-hidden="true" />
    </button>
  );
}