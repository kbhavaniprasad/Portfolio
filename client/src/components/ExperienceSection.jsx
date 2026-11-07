import { motion } from 'framer-motion';
import ExperienceCard from './ExperienceCard.jsx';
import { portfolio } from '../data/portfolio.js';

export default function ExperienceSection() {
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

        {/* Responsive Flexbox Container with Equal-Height Staggered Cards */}
        <div className="internships-flex-container">
          {portfolio.internships.map((internship, idx) => (
            <motion.div
              key={internship.id}
              className="internship-flex-item"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: 'easeInOut' }}
            >
              <ExperienceCard item={internship} index={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
