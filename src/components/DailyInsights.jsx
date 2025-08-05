// src/components/DailyInsights.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { appointmentData, zodiacSignsData } from '../data/insightsData';
import './DailyInsights.css'; // Imports the updated styles

const DailyInsights = () => {
  return (
    <div className="daily-insights-section">
      {/* Section 1: Our Services (Unchanged) */}
      <motion.section
        className="appointment-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-main-title">Our Services</h2>
        <div className="appointment-list">
          {appointmentData.map((item, index) => (
            <Link to={item.link} className="service-item" key={index}>
              <div className="icon-wrapper">
                <div className="service-icon">{item.icon}</div>
              </div>
              <div className="title-wrapper">
                <span>{item.title[0]}</span>
                <span>{item.title[1]}</span>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Section 2: Today's Astrology Prediction (Updated) */}
      <motion.section
        className="prediction-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="section-main-title">Today's Astrology Prediction</h2>
        <div className="zodiac-grid">
          {zodiacSignsData.map((sign) => (
            <Link to={sign.link} className="zodiac-item" key={sign.name}>
              {/* MODIFIED: The icon-wrapper is back to enable the hover effect! */}
              <div className="icon-wrapper">
                <div className="zodiac-icon">{sign.icon}</div>
              </div>
              <span className="zodiac-name">{sign.name}</span>
            </Link>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default DailyInsights;