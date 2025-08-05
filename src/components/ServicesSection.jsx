// src/components/ServicesSection.jsx
// FINAL VERSION: Two separate containers with a unified style.

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { premiumServicesData, complimentaryServicesData } from '../data/servicesData';
import './ServicesSection.css'; // Imports the new unified styles

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const ServicesSection = () => {
  return (
    <section className="services-section">

      {/* --- Container 1: Our Services (Premium) --- */}
      <motion.div
        className="service-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="service-container-title">Our Services</h2>
        <div className="services-grid premium-grid">
          {premiumServicesData.map((service, index) => (
            <Link to={service.link} className="service-item" key={`premium-${index}`}>
              <div className="icon-wrapper">
                <div className="service-icon">{service.icon}</div>
              </div>
              <span className="service-title">{service.title}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* --- Container 2: Complimentary Services --- */}
      <motion.div
        className="service-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="service-container-title">Complimentary Astrology Services</h2>
        <div className="services-grid complimentary-grid">
          {complimentaryServicesData.map((service, index) => (
            <Link to={service.link} className="service-item" key={`complimentary-${index}`}>
              <div className="icon-wrapper">
                <div className="service-icon">{service.icon}</div>
              </div>
              <span className="service-title">{service.title}</span>
            </Link>
          ))}
        </div>
      </motion.div>
      
    </section>
  );
};

export default ServicesSection;