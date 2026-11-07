import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SkillBar from './SkillBar.jsx';
import { portfolio } from '../data/portfolio.js';

export default function SkillsSection() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="content-section skills-section">
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
            <span className="section-index">05</span>
            <span className="section-slash">/</span>
            <span className="section-tag-text">SKILLS</span>
          </div>
          <h2 className="section-main-heading">
            Technical Skills &amp; <i>Proficiencies.</i>
          </h2>
          <p className="section-subtext">
            Hover over any technical skill to preview fluid proficiency metrics. On mobile devices, bars populate automatically on viewport intersection.
          </p>
        </motion.div>

        {/* Categories Grid (Frontend, Backend, Database, Tools) */}
        <div className="skills-domains-grid">
          {Object.entries(portfolio.skills).map(([category, skillList], categoryIdx) => (
            <motion.div
              key={category}
              className="skill-category-card glass-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: categoryIdx * 0.12, ease: 'easeInOut' }}
            >
              <div className="category-header-wrap">
                <div className="category-pip" />
                <h3 className="category-title">{category}</h3>
                <span className="category-count">{skillList.length} Technologies</span>
              </div>

              <div className="category-skills-stack">
                {skillList.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    isTouchDevice={isTouchDevice}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
