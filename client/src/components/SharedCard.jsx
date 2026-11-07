import { useRef } from 'react';
import { FiCalendar, FiMapPin, FiCheckCircle, FiGithub, FiExternalLink } from 'react-icons/fi';

/**
 * SharedCard Component
 * Unified, reusable card component matching the exact design and hover behavior
 * of the Internships card.
 *
 * Reused across:
 * - Internships
 * - Honors & Awards
 * - Patents
 * - Certifications
 * - Projects
 *
 * Features:
 * - 3D perspective tilt & smooth lift/scale on hover (0.3s ease)
 * - Dynamic spotlight glow tracking the mouse pointer
 * - Angled light sweep beam passing across the card
 * - Clean glassmorphism styling, crisp borders, and soft shadows
 * - Action-driven bullet points with checkmark icons
 * - Interactive tech stack chips that highlight to primary blue
 * - Full responsiveness on touch devices (pointer: coarse safe fallback)
 * - Light and dark theme contrast compliance
 */
export default function SharedCard({
  item,
  index,
  showImage = false,
  actionButtons = null,
  className = ''
}) {
  const cardRef = useRef(null);

  const handlePointerMove = (e) => {
    // Only apply subtle 3D tilt on mouse/fine pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.02)`;
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
  };

  const title = item.role || item.title;
  const organization = item.company || item.organization || item.issuer;

  return (
    <div
      ref={cardRef}
      className={`shared-card-root ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="shared-card-inner glass-card">
        {/* Animated Light Sweep Beam on Hover */}
        <div className="light-sweep-beam" aria-hidden="true" />

        {/* Dynamic Glow Spotlight Following Cursor */}
        <div className="card-spotlight-glow" aria-hidden="true" />

        {/* Card Header Meta */}
        <div className="card-top-meta">
          <div className="badge-and-num">
            {typeof index === 'number' && (
              <span className="card-index-pill">0{index + 1}</span>
            )}
            {item.badge && (
              <span className="shared-card-badge">{item.badge}</span>
            )}
          </div>
          {item.duration && (
            <div className="duration-pill">
              <FiCalendar className="meta-icon" />
              <span>{item.duration}</span>
            </div>
          )}
        </div>

        {/* Optional Image Preview (for Projects) */}
        {showImage && item.image && (
          <div className="card-image-preview-frame">
            <img
              src={item.image}
              alt={title}
              className="card-preview-img"
              loading="lazy"
            />
            <div className="preview-overlay-gradient" />
          </div>
        )}

        {/* Card Details Body */}
        <div className="card-body-details">
          <h3 className="card-role-title">{title}</h3>

          {(organization || item.location) && (
            <div className="company-location-row">
              {organization && <span className="company-name">{organization}</span>}
              {organization && item.location && <span className="bullet-sep">&bull;</span>}
              {item.location && (
                <span className="location-name">
                  <FiMapPin className="pin-inline" /> {item.location}
                </span>
              )}
            </div>
          )}

          {item.description && (
            <p className="card-description-text">{item.description}</p>
          )}

          {/* Action-driven, recruiter-friendly bullets */}
          {item.bullets && item.bullets.length > 0 && (
            <ul className="shared-bullet-list">
              {item.bullets.map((bullet, i) => (
                <li key={i} className="shared-bullet-item">
                  <FiCheckCircle className="shared-check-icon" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Technologies Applied Chips */}
        {item.techStack && item.techStack.length > 0 && (
          <div className="card-tech-footer">
            <span className="tech-label">Technologies Applied:</span>
            <div className="tech-chips-row">
              {item.techStack.map((tech) => (
                <span key={tech} className="tech-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Optional Action Buttons (GitHub, Live Demonstration) */}
        {(actionButtons || item.github || item.live) && (
          <div className="card-actions-footer">
            {actionButtons ? (
              actionButtons
            ) : (
              <div className="project-action-buttons">
                {item.github && (
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-btn proj-github-btn"
                    aria-label={`View GitHub repository for ${title}`}
                  >
                    <FiGithub className="btn-icon" />
                    <span>GitHub Repository</span>
                  </a>
                )}
                {item.live && (
                  <a
                    href={item.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-btn proj-live-btn"
                    aria-label={`View live demonstration of ${title}`}
                  >
                    <span>Live Demonstration</span>
                    <FiExternalLink className="btn-icon" />
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
