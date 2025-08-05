// src/components/PoojaSection.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './PoojaSection.css'; // We will create this file next

// --- Main Section Component ---
const PoojaSection = () => {
  const [poojas, setPoojas] = useState({}); // State to hold poojas grouped by category
  const [categories, setCategories] = useState([]); // State for tab names
  const [activeTab, setActiveTab] = useState(''); // State for the currently selected tab
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoojas = async () => {
      try {
        // Updated API endpoint
        const response = await fetch('https://kalpyotish.onrender.com/api/all-poojas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const poojaData = data.data;

        setPoojas(poojaData); // Store the entire object { "Category": [...] }
        const foundCategories = Object.keys(poojaData);
        setCategories(foundCategories);
        // Set the first category as the active one by default
        if (foundCategories.length > 0) {
          setActiveTab(foundCategories[0]);
        }

      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch poojas:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPoojas();
  }, []); // Empty array ensures this runs only once on mount

  // Animation for the container to stagger children
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  // Animation for each card
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 15, stiffness: 100 } },
    exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.2 } }
  };


  if (error) {
    return <div className="pooja-section"><p className="error-message">Failed to load Pooja services. Please try again later.</p></div>;
  }

  return (
    <section className="pooja-section">
      <h2 className="pooja-main-title">Online Pooja Services</h2>
      <p className="pooja-subtitle">Book online Poojas with our expert Pandits and find spiritual solace.</p>

      {loading ? (
        <div className="loader-container"><div className="loader"></div></div>
      ) : (
        <>
          {/* --- Tab Navigation --- */}
          <div className="tabs-container">
            {categories.map(category => (
              <button
                key={category}
                className={`tab-button ${activeTab === category ? 'active' : ''}`}
                onClick={() => setActiveTab(category)}
              >
                {category}
                {activeTab === category && (
                  <motion.div className="active-tab-underline" layoutId="active-underline" />
                )}
              </button>
            ))}
          </div>

          {/* --- Pooja Grid --- */}
          <motion.div 
            className="pooja-grid"
            key={activeTab} // This makes the grid re-animate when the tab changes
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {poojas[activeTab]?.map(pooja => (
                <motion.div
                  key={pooja._id}
                  className="pooja-card"
                  variants={cardVariants}
                  exit="exit" // Use the exit variant defined above
                  whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.3)" }}
                >
                  <div className="pooja-image-container">
                    <img src={pooja.image} alt={pooja.name} className="pooja-image" />
                    <div className="pooja-image-overlay"></div>
                  </div>
                  <div className="pooja-content">
                    <h3 className="pooja-name">{pooja.name}</h3>
                    <p className="pooja-description">
                      {/* Splitting description by newline and taking the first line */}
                      {pooja.description.split('\n')[0]}
                    </p>
                    <Link to={`/pooja/${pooja._id}`} className="pooja-details-button">
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </section>
  );
};

export default PoojaSection;