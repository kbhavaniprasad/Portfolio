import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ExperienceCard from './ExperienceCard.jsx';
import { portfolio } from '../data/portfolio.js';

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const isHoveringRef = useRef(false);
  const timerRef = useRef(null);
  const totalInternships = portfolio.internships.length;
  const AUTO_SLIDE_INTERVAL = 4500; // 4.5 seconds

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalInternships);
    resetTimer();
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalInternships) % totalInternships);
    resetTimer();
  };

  const startTimer = () => {
    if (isHoveringRef.current) return;
    if (timerRef.current) return;
    timerRef.current = setInterval(() => {
      handleNext();
    }, AUTO_SLIDE_INTERVAL);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    if (!isHoveringRef.current) {
      startTimer();
    }
  };

  // Start auto-transition on mount, cleanup on unmount
  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, []);

  // Slide animation variants (same spring-based slide pattern as ProjectsSection)
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

  const currentInternship = portfolio.internships[activeIndex];

  return (
    <section id="experience" className="content-section experience-section">
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
            <span className="section-index">03</span>
            <span className="section-slash">/</span>
            <span className="section-tag-text">INTERNSHIPS</span>
          </div>
          <h2 className="section-main-heading">
            Applied Industry <i>Experience.</i>
          </h2>
          <p className="section-subtext">
            Three impactful internships spanning production MERN web applications, end-to-end machine learning engineering workflows, and enterprise Salesforce cloud automations.
          </p>
        </motion.div>

        {/* Internship Carousel with Auto-Advance */}
        <div
          className="internship-slider-wrapper"
          onMouseEnter={() => { isHoveringRef.current = true; stopTimer(); }}
          onMouseLeave={() => { isHoveringRef.current = false; startTimer(); }}
        >
          {/* Left / Previous Arrow Beside Card */}
          <button
            onClick={handlePrev}
            className="slider-side-arrow prev-arrow"
            aria-label="Previous Internship"
            title="Previous Internship"
          >
            <FiChevronLeft size={26} />
          </button>

          {/* Single Focused Card Viewport (No Overlap) */}
          <div className="internship-card-viewport">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentInternship.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="single-internship-slide"
              >
                <ExperienceCard item={currentInternship} index={activeIndex} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right / Next Arrow Beside Card */}
          <button
            onClick={handleNext}
            className="slider-side-arrow next-arrow"
            aria-label="Next Internship"
            title="Next Internship"
          >
            <FiChevronRight size={26} />
          </button>
        </div>

        {/* Pagination Indicator Dots */}
        <div className="gallery-pips-row">
          {portfolio.internships.map((internship, idx) => (
            <button
              key={internship.id}
              className={`gallery-pip-btn ${activeIndex === idx ? 'pip-active' : ''}`}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
                resetTimer();
              }}
              aria-label={`Jump to internship ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
