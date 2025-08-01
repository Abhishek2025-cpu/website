// src/components/NakshatrasSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// We are still using the data file with icons
import { nakshatrasData } from '../data/nakshatrasFlippingData.jsx';
import './NakshatrasSection.css'; // We will replace the CSS again

// Animation variants
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
    },
  },
};

const NakshatrasSection = () => {
  return (
    <motion.section
      className="nakshatras-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1 }}
    >
      <h2 className="nakshatras-title">Nakshatras</h2>
      <p className="nakshatras-subtitle">
        Vedic Astrology is based upon Nakshatras. Our ancient sages have written a detailed treatise on them!
      </p>

      <motion.div
        className="nakshatras-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {nakshatrasData.map((nakshatra, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.08, zIndex: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={nakshatra.link} className="nakshatra-pill">
              <span className="nakshatra-pill-icon">{nakshatra.icon}</span>
              <span className="nakshatra-pill-name">{nakshatra.name}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default NakshatrasSection;