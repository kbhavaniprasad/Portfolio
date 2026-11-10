import { useRef, useState } from 'react';
import { FiAward, FiFileText, FiCheckCircle, FiExternalLink, FiStar } from 'react-icons/fi';

/**
 * CompactCard Component
 * Small, clean card for Honors, Patents & Certifications sections.
 * Displays only: icon/badge, title, issuer/organization, and year.
 * Long descriptions are hidden behind a hover tooltip or "View" link.
 *
 * Features:
 * - Responsive grid sizing (handled by parent container)
 * - Subtle borders, soft shadows, rounded corners
 * - Gentle hover effect (slight lift and highlight)
 * - Tooltip on hover for full description
 * - "View" link for accessibility
 * - Matches existing color theme and dark/light mode
 */
export default function CompactCard({ item, index, type = 'honor' }) {
  const cardRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Determine icon based on type
  const getIcon = () => {
    switch (type) {
      case 'patent':
        return <FiFileText className="compact-card-icon" size={20} />;
      case 'certification':
        return <FiCheckCircle className="compact-card-icon" size={20} />;
      case 'honor':
      default:
        return <FiAward className="compact-card-icon" size={20} />;
    }
  };

  // Get badge text
  const badgeText = item.badge || (type === 'patent' ? 'Patent' : type === 'certification' ? 'Certified' : 'Award');

  // Get year/duration
  const year = item.duration || item.year || '';

  // Get organization/issuer
  const organization = item.organization || item.issuer || item.company || '';

  // Get title
  const title = item.title || item.role || '';

  // Get description for tooltip
  const description = item.description || '';

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseEnter = () => {
    // Only show tooltip on non-touch devices
    if (!window.matchMedia('(pointer: coarse)').matches) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Only apply subtle 3D tilt on mouse/fine pointer devices
  const handlePointerMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale(1.015)`;
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      className="compact-card-root"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="compact-card-inner glass-card">
        {/* Animated Light Sweep Beam on Hover */}
        <div className="light-sweep-beam" aria-hidden="true" />

        {/* Dynamic Glow Spotlight Following Cursor */}
        <div className="card-spotlight-glow" aria-hidden="true" />

        {/* Icon & Badge Row */}
        <div className="compact-card-header">
          <div className="compact-card-icon-wrapper">
            {getIcon()}
          </div>
          <span className="compact-card-badge">{badgeText}</span>
        </div>

        {/* Title */}
        <h3 className="compact-card-title">{title}</h3>

        {/* Organization & Year */}
        <div className="compact-card-meta">
          {organization && <span className="compact-card-org">{organization}</span>}
          {organization && year && <span className="compact-card-sep" aria-hidden="true">•</span>}
          {year && <span className="compact-card-year">{year}</span>}
        </div>

        {/* View Link / Tooltip Trigger */}
        {description && (
          <div className="compact-card-footer">
            <a
              href="#"
              className="compact-card-view-link"
              aria-label={`View details for ${title}`}
              onClick={(e) => e.preventDefault()}
            >
              <span>View</span>
              <FiExternalLink size={12} aria-hidden="true" />
            </a>

            {/* Tooltip with full description */}
            {showTooltip && !window.matchMedia('(pointer: coarse)').matches && (
              <div
                className="compact-card-tooltip"
                style={{
                  left: `${tooltipPos.x}px`,
                  top: `${tooltipPos.y + 20}px`
                }}
                role="tooltip"
              >
                <p>{description}</p>
                <div className="tooltip-arrow" aria-hidden="true" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}