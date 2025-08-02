// src/components/ConsultationTopics.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { consultationTopicsData } from '../data/consultationData';
import './ConsultationTopics.css'; // We will use the new responsive CSS

const ConsultationTopics = () => {
  // NOTE: The state for the animated underline has been removed.
  // This is because the underline effect is designed for a single row and
  // does not translate well to a multi-row grid layout on mobile.
  // We will use a simpler, more robust card-based hover effect in the CSS.

  return (
    <section className="consultation-section-v2">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="consultation-main-title-v2">Consult The Right Astrologer For You</h2>
        
        {/* The list structure is the same, but the hover logic is removed */}
        <ul className="consultation-list">
          {consultationTopicsData.map((item, index) => (
            <li key={index} className="consultation-item">
              <Link to={item.link} className="consultation-link">
                <div className="consultation-icon-v2">{item.icon}</div>
                <span className="consultation-title-v2">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default ConsultationTopics;