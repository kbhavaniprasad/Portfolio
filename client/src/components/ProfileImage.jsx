import { useState } from 'react';
import { FiUser } from 'react-icons/fi';

/**
 * ProfileImage Component
 * Perfect circular photo with rotating glowing gradient ring and crisp frame.
 * Renders instantly and statically with no fade-in, opacity transitions,
 * or scroll-reveal animations.
 */
export default function ProfileImage({ src, alt }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="profile-image-wrapper">
      <div className="profile-tilt-card">
        {/* Outer Glowing Light Blue Gradient Ring */}
        <div className="rotating-gradient-ring" aria-hidden="true" />
        <div className="rotating-gradient-blur" aria-hidden="true" />

        {/* Circular Frame Containing Photo */}
        <div className="profile-circle-frame">
          {!imgError ? (
            <img
              src={src}
              alt={alt}
              className="profile-photo-img"
              onError={() => setImgError(true)}
              loading="eager"
            />
          ) : (
            <div className="profile-fallback-circle">
              <FiUser size={64} className="fallback-icon" />
              <span>BK</span>
            </div>
          )}

          <div className="profile-sheen" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
