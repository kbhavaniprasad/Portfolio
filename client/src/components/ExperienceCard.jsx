import SharedCard from './SharedCard.jsx';

/**
 * ExperienceCard Component
 * Wraps the unified SharedCard component to maintain backward compatibility
 * while ensuring identical design and hover behavior across all sections.
 */
export default function ExperienceCard({ item, index }) {
  return <SharedCard item={item} index={index} className="internship-card" />;
}
