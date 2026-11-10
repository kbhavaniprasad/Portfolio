import { motion } from 'framer-motion';
import { FiAward, FiBookOpen, FiMapPin, FiCheckCircle, FiFileText } from 'react-icons/fi';
import SharedCard from './SharedCard.jsx';
import CompactCard from './CompactCard.jsx';
import { portfolio } from '../data/portfolio.js';

export default function AboutSection() {
  return (
    <section id="about" className="content-section about-section">
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
            <span className="section-index">02</span>
            <span className="section-slash">/</span>
            <span className="section-tag-text">ABOUT US</span>
          </div>
          <h2 className="section-main-heading">
            Engineering Rigor Meets <i>Applied Intelligence.</i>
          </h2>
        </motion.div>

        {/* Bio & Education Grid */}
        <div className="about-content-grid">
          {/* Bio Narrative Card */}
          <motion.div
            className="about-narrative-card glass-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <h3 className="card-lead-title">
              Crafting scalable web systems, low-latency computer vision pipelines, and resilient full-stack applications.
            </h3>
            <p className="narrative-text">
              I am a Computer Science & Engineering graduate from Lakireddy Bali Reddy College of Engineering with an 8.37 CGPA. My focus spans end-to-end MERN web development, REST API design, and applied AI systems.
            </p>
            <p className="narrative-text">
              From building real-time sign language recognition using 21 hand landmarks to co-inventing an AI-based precision pesticide-spraying drone system trained on 50,000+ agricultural images, I merge mathematical principles with scalable software architectures.
            </p>

            <div className="location-pill">
              <FiMapPin className="pin-icon" />
              <span>Based in {portfolio.location}</span>
            </div>
          </motion.div>

          {/* Education Glass Cards */}
          <motion.div
            className="about-education-column"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <h3 className="column-title">
              <FiBookOpen className="title-icon" />
              <span>Education</span>
            </h3>

            <div className="education-cards-list">
              {portfolio.education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  className="education-glass-card glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: idx * 0.15, ease: 'easeInOut' }}
                >
                  <div className="edu-top-row">
                    <span className="edu-duration">{edu.duration}</span>
                    <span className="edu-score">{edu.score}</span>
                  </div>
                  <h4 className="edu-institution">{edu.institution}</h4>
                  <p className="edu-degree">{edu.degree}</p>
                  <p className="edu-location">{edu.location}</p>
                  {edu.bullets ? (
                    <ul className="shared-bullet-list" style={{ marginTop: '12px' }}>
                      {edu.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="shared-bullet-item">
                          <FiCheckCircle className="shared-check-icon" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="edu-highlights">{edu.highlights}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Honors & Awards and Patents Side by Side */}
        <motion.div
          className="about-honors-patents-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Honors & Awards Section */}
          <div className="about-subsection-block">
            <h3 className="column-title">
              <FiAward className="title-icon" />
              <span>Honors & Awards</span>
            </h3>

            <div className="compact-cards-grid">
              {portfolio.honors.map((honor, idx) => (
                <motion.div
                  key={honor.id}
                  className="compact-card-item"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeInOut' }}
                >
                  <CompactCard item={honor} index={idx} type="honor" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Patents Section */}
          <div className="about-subsection-block">
            <h3 className="column-title">
              <FiFileText className="title-icon" />
              <span>Patents</span>
            </h3>

            <div className="compact-cards-grid">
              {portfolio.patents.map((patent, idx) => (
                <motion.div
                  key={patent.id}
                  className="compact-card-item"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeInOut' }}
                >
                  <CompactCard item={patent} index={idx} type="patent" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          className="about-subsection-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <h3 className="column-title">
            <FiCheckCircle className="title-icon" />
            <span>Certifications</span>
          </h3>

          <div className="compact-cards-grid">
            {portfolio.certifications.map((cert, idx) => (
              <motion.div
                key={cert.id}
                className="compact-card-item"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: 'easeInOut' }}
              >
                <CompactCard item={cert} index={idx} type="certification" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}