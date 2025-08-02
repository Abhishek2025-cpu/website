// src/components/ServicesSection.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { premiumServicesData, complimentaryServicesData } from '../data/servicesData';
import './ServicesSection.css';

// Animation for the whole container to stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// Animation for each card item
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

// A single complimentary service card with 3D tilt effect
const ServiceCard = ({ icon, title, description, link }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // This effect is primarily for desktop users with a mouse.
  const handleMouseMove = (e) => {
    // A simple check to avoid this effect on touch-based devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({ x: -y / 20, y: x / 20 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="complimentary-card-wrapper"
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1)`,
        transition: 'transform 0.1s linear'
      }}
    >
      <Link to={link} className="complimentary-card">
          <div className="card-icon-wrapper">
            {icon}
          </div>
          <h4 className="card-title">{title}</h4> {/* Changed to h4 for semantics */}
          <p className="card-description">{description}</p>
      </Link>
    </motion.div>
  );
};


const ServicesSection = () => {
  return (
    <section className="services-section">
      {/* NEW: Main heading for the entire section */}
      <h2 className="services-main-title">Our Services</h2>

      {/* Top Premium Services */}
      <motion.div
        className="premium-services-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {premiumServicesData.map((service, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link to={service.link} className="premium-card">
              <div className="premium-icon">{service.icon}</div>
              <span className="premium-title">{service.title}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Complimentary Services */}
      <div className="complimentary-services-container">
        {/* UPDATED: Changed to h3 for better semantic hierarchy */}
        <h3 className="section-subtitle">Complimentary Astrology Services</h3>
        <motion.div
          className="complimentary-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {complimentaryServicesData.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;