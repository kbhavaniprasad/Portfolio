import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';
import { portfolio } from '../data/portfolio.js';

/**
 * QuestionnaireSection Component
 * Expandable accordion section answering common questions regarding skills,
 * project accomplishments, availability, and how to hire or collaborate.
 * Styled in light blue and white to harmonize with the design system.
 */
export default function QuestionnaireSection() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="questionnaire" className="content-section questionnaire-section">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="section-header-block text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag-row justify-center">
            <span className="section-index">07</span>
            <span className="section-slash">/</span>
            <span className="section-tag-text">QUESTIONNAIRE &amp; FAQS</span>
          </div>

          <h2 className="section-main-heading">
            Frequently Asked <i>Questions.</i>
          </h2>
          <p className="section-subtext mx-auto">
            Everything you need to know regarding my technical skills, engineering projects, internship experience, and how we can work together.
          </p>
        </motion.div>

        {/* Expandable Accordion List */}
        <div className="questionnaire-accordion-wrap">
          {portfolio.questionnaire.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={item.id}
                className={`accordion-item glass-card ${isOpen ? 'is-open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeInOut' }}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  className="accordion-trigger"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className="question-left-group">
                    <div className="question-icon-badge">
                      <FiHelpCircle size={18} />
                    </div>
                    <span className="question-title-text">{item.question}</span>
                  </div>

                  <div className={`accordion-chevron-box ${isOpen ? 'rotate' : ''}`}>
                    <FiChevronDown size={20} />
                  </div>
                </button>

                {/* Expandable Content Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="accordion-body-collapse"
                    >
                      <div className="accordion-body-inner">
                        <p className="answer-text">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
