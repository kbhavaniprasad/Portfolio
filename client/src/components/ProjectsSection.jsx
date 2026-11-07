import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ProjectCard from './ProjectCard.jsx';
import { portfolio } from '../data/portfolio.js';

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const totalProjects = portfolio.projects.length;
  const touchStartX = useRef(null);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalProjects);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNext(); // Swiped left -> show next
      } else {
        handlePrev(); // Swiped right -> show prev
      }
    }
    touchStartX.current = null;
  };

  // Slide Animation Variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    })
  };

  const currentProject = portfolio.projects[activeIndex];

  return (
    <section id="projects" className="content-section projects-section">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="section-header-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag-row">
            <span className="section-index">04</span>
            <span className="section-slash">/</span>
            <span className="section-tag-text">ENGINEERED PROTOTYPES</span>
          </div>

          <div className="header-flex-split">
            <div>
              <h2 className="section-main-heading">
                Featured Engineering <i>Projects.</i>
              </h2>
              <p className="section-subtext">
                Explore production systems spanning edge deep learning, full-stack credential security, real-time voice AI, and agricultural robotics. Each project is showcased one at a time with no overlap.
              </p>
            </div>

            {/* Top Indicator & Nav Status */}
            <div className="gallery-counter">
              <span className="active-num">0{activeIndex + 1}</span>
              <span className="divider">/</span>
              <span className="total-num">0{totalProjects}</span>
            </div>
          </div>
        </motion.div>

        {/* Project Slider Stage with Side Navigation Arrows */}
        <div
          className="project-slider-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left / Previous Arrow Beside Card */}
          <button
            onClick={handlePrev}
            className="slider-side-arrow prev-arrow"
            aria-label="Previous Project"
            title="Previous Project"
          >
            <FiChevronLeft size={26} />
          </button>

          {/* Single Focused Card Viewport (No Overlap) */}
          <div className="project-card-viewport">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentProject.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="single-project-slide"
              >
                <ProjectCard project={currentProject} index={activeIndex} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right / Next Arrow Beside Card */}
          <button
            onClick={handleNext}
            className="slider-side-arrow next-arrow"
            aria-label="Next Project"
            title="Next Project"
          >
            <FiChevronRight size={26} />
          </button>
        </div>

        {/* Mobile Navigation Controls Row (underneath for easy thumb reach) */}
        <div className="slider-mobile-controls">
          <button
            onClick={handlePrev}
            className="slider-nav-pill-btn"
            aria-label="Previous Project"
          >
            <FiChevronLeft size={18} />
            <span>Previous</span>
          </button>

          {/* Indicator Pips */}
          <div className="gallery-pips-row">
            {portfolio.projects.map((p, pIdx) => (
              <button
                key={p.id}
                className={`gallery-pip-btn ${activeIndex === pIdx ? 'pip-active' : ''}`}
                onClick={() => {
                  setDirection(pIdx > activeIndex ? 1 : -1);
                  setActiveIndex(pIdx);
                }}
                aria-label={`Jump to project ${pIdx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="slider-nav-pill-btn"
            aria-label="Next Project"
          >
            <span>Next</span>
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
