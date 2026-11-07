import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PageLoader Component
 * Sleek futuristic preloader with pulsing energy ring and smooth dissolution.
 */
export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subtle minimum load time so the entrance is elegant and assets synchronize
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="page-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="loader-content">
            <div className="loader-ring-wrapper">
              <div className="loader-orbit-ring" />
              <div className="loader-core-badge">
                <span>BK</span>
              </div>
            </div>
            <p className="loader-text">INITIALIZING QUANTUM CANVAS</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
