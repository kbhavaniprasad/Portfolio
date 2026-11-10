import { FiArrowLeft } from 'react-icons/fi';

/**
 * SectionBackLink Component
 * Small "← Back" arrow at the top of a section that scrolls to the previous section (or Home).
 * Provides easy navigation back from deep sections like Internships.
 */
export default function SectionBackLink({
  targetSection = 'about', // Default to About section (previous to Experience)
  label = 'Back to previous section',
  className = ''
}) {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(targetSection);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={`#${targetSection}`}
      onClick={handleClick}
      className={`section-back-link ${className}`}
      aria-label={label}
      title={label}
    >
      <FiArrowLeft size={16} aria-hidden="true" />
      <span>Back</span>
    </a>
  );
}