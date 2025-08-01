// src/components/DailyInsights.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { appointmentData, zodiacSignsData } from '../data/insightsData';
import './DailyInsights.css';

// Shared animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

const DailyInsights = () => {
  return (
    <div className="daily-insights-section">
      {/* Section 1: Schedule Appointment */}
      <motion.section
        className="appointment-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="section-header">
          <h2 className="section-main-title">Schedule Appointment</h2>
          <Link to="/appointments" className="view-all-btn">View All</Link>
        </div>
        <motion.div
          className="appointment-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {appointmentData.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link to={item.link} className="appointment-card">
                <div className="appointment-icon">{item.icon}</div>
                <h3 className="appointment-title">{item.title}</h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Section 2: Today's Astrology Prediction */}
      <motion.section
        className="prediction-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h2 className="section-main-title">Today's Astrology Prediction</h2>
        <motion.div
          className="zodiac-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {zodiacSignsData.map((sign) => (
            <motion.div key={sign.name} variants={itemVariants}>
              <Link to={sign.link} className="zodiac-item">
                <div className="zodiac-icon">{sign.icon}</div>
                <span className="zodiac-name">{sign.name}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
};

export default DailyInsights;