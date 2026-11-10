import { useState, useRef, useEffect } from 'react';
import { FiUser } from 'react-icons/fi';

/**
 * ProfileImage Component
 * Circular photo with 3D tilt effect, rotating gradient ring, and depth effects.
 *
 * Features:
 * - 3D perspective tilt following mouse (on non-touch devices)
 * - Dynamic shadow that shifts with tilt to enhance depth
 * - Soft glare/shine that follows cursor
 * - Subtle idle floating animation when not hovering
 * - Gentle entrance animation on page load (fade + scale + rotation)
 * - Auto-tilt/float on touch devices
 * - Respects prefers-reduced-motion
 * - Lightweight CSS transforms only (60fps optimized)
 */
export default function ProfileImage({ src, alt }) {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameRef = useRef(null);
  const floatTimeRef = useRef(0);
  const prefersReducedMotion = useRef(false);

  // Check for reduced motion preference
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Entrance animation
  useEffect(() => {
    if (prefersReducedMotion.current) {
      setHasEntered(true);
      return;
    }

    // Trigger entrance animation after a brief delay
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Idle floating animation
  useEffect(() => {
    if (prefersReducedMotion.current) return;

    const animate = () => {
      if (!isHovering && cardRef.current && !window.matchMedia('(pointer: coarse)').matches) {
        floatTimeRef.current += 0.01;
        const floatX = Math.sin(floatTimeRef.current * 0.7) * 1.5;
        const floatY = Math.cos(floatTimeRef.current * 0.5) * 1.5;
        cardRef.current.style.transform = `perspective(1000px) rotateX(${floatY.toFixed(2)}deg) rotateY(${floatX.toFixed(2)}deg)`;

        // Update shadow position to match float
        const shadowX = floatX * 2;
        const shadowY = floatY * 2;
        cardRef.current.style.boxShadow = `
          ${shadowX}px ${shadowY}px 30px rgba(2, 132, 199, 0.15),
          ${shadowX * 0.5}px ${shadowY * 0.5}px 10px rgba(0, 0, 0, 0.08)
        `;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovering]);

  // Handle mouse move for 3D tilt
  const handleMouseMove = (e) => {
    if (prefersReducedMotion.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (max ~10 degrees for more depth feel)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateY, y: rotateX });

    // Apply 3D transform with dynamic shadow
    const shadowX = rotateY * 2.5;
    const shadowY = rotateX * 2.5;
    const shadowBlur = 20 + Math.abs(rotateX) + Math.abs(rotateY);
    const shadowSpread = 2 + Math.abs(rotateX) * 0.1 + Math.abs(rotateY) * 0.1;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale(1.03)`;
    card.style.boxShadow = `
      ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(2, 132, 199, 0.25),
      ${shadowX * 0.4}px ${shadowY * 0.4}px ${shadowBlur * 0.5}px rgba(0, 0, 0, 0.1)
    `;

    // Update glare position
    card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseEnter = () => {
    if (prefersReducedMotion.current) return;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion.current) return;
    setIsHovering(false);
    const card = cardRef.current;
    if (!card) return;

    // Smooth reset with transition
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    card.style.boxShadow = '0 8px 30px rgba(2, 132, 199, 0.2), 0 2px 10px rgba(0, 0, 0, 0.05)';

    // Remove transition after reset
    setTimeout(() => {
      if (card) {
        card.style.transition = '';
      }
    }, 600);
  };

  // Touch devices: gentle auto-tilt
  useEffect(() => {
    if (prefersReducedMotion.current) return;
    if (!window.matchMedia('(pointer: coarse)').matches) return;

    let autoTiltTime = 0;
    const animateAutoTilt = () => {
      if (cardRef.current) {
        autoTiltTime += 0.008;
        const tiltX = Math.sin(autoTiltTime * 0.6) * 3;
        const tiltY = Math.cos(autoTiltTime * 0.4) * 3;

        // Also animate shadow for touch devices
        const shadowX = tiltX * 2;
        const shadowY = tiltY * 2;
        const shadowBlur = 15 + Math.abs(tiltX) + Math.abs(tiltY);

        cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltY.toFixed(2)}deg) rotateY(${tiltX.toFixed(2)}deg)`;
        cardRef.current.style.boxShadow = `
          ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(2, 132, 199, 0.2),
          ${shadowX * 0.4}px ${shadowY * 0.4}px ${shadowBlur * 0.5}px rgba(0, 0, 0, 0.08)
        `;
      }
      animationFrameRef.current = requestAnimationFrame(animateAutoTilt);
    };

    animationFrameRef.current = requestAnimationFrame(animateAutoTilt);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Device orientation support for mobile (optional enhancement)
  useEffect(() => {
    if (prefersReducedMotion.current) return;
    if (!window.matchMedia('(pointer: coarse)').matches) return;
    if (!window.DeviceOrientationEvent) return;

    const handleOrientation = (e) => {
      if (!cardRef.current) return;

      // e.gamma: left/right tilt (-90 to 90)
      // e.beta: front/back tilt (-180 to 180)
      const tiltX = e.gamma * 0.1; // left/right
      const tiltY = e.beta * 0.1;  // front/back

      // Clamp values
      const clampedX = Math.max(-8, Math.min(8, tiltX));
      const clampedY = Math.max(-8, Math.min(8, tiltY));

      const shadowX = clampedX * 2;
      const shadowY = clampedY * 2;
      const shadowBlur = 15 + Math.abs(clampedX) + Math.abs(clampedY);

      cardRef.current.style.transform = `perspective(1000px) rotateX(${(-clampedY).toFixed(2)}deg) rotateY(${clampedX.toFixed(2)}deg)`;
      cardRef.current.style.boxShadow = `
        ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(2, 132, 199, 0.2),
        ${shadowX * 0.4}px ${shadowY * 0.4}px ${shadowBlur * 0.5}px rgba(0, 0, 0, 0.08)
      `;
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  // Entrance animation class
  const entranceClass = hasEntered ? 'profile-entrance-done' : 'profile-entrance';

  return (
    <div className="profile-image-wrapper">
      <div
        ref={cardRef}
        className={`profile-tilt-card ${entranceClass}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="img"
        aria-label={alt}
      >
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
              onLoad={() => setIsLoaded(true)}
              loading="eager"
              // Performance hints
              fetchPriority="high"
              decoding="async"
            />
          ) : (
            <div className="profile-fallback-circle">
              <FiUser size={64} className="fallback-icon" />
              <span>BK</span>
            </div>
          )}

          {/* Glare/Sheen Effect - follows mouse on hover */}
          <div
            className="profile-glare"
            aria-hidden="true"
            style={{
              left: 'var(--glare-x, 50%)',
              top: 'var(--glare-y, 50%)'
            }}
          />
          <div className="profile-sheen" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}