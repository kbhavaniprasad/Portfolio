import SharedCard from './SharedCard.jsx';

/**
 * ProjectCard Component
 * Wraps the unified SharedCard component with image preview enabled,
 * ensuring Projects shares the exact same card design, borders, shadows,
 * and hover behavior as Internships, Honors, Patents, and Certifications.
 */
export default function ProjectCard({ project, index }) {
  return (
    <SharedCard
      item={project}
      index={index}
      showImage={true}
      className="project-unified-card"
    />
  );
}
