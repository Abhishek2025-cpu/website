// src/components/NakshatrasSection.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { nakshatrasData } from '../data/nakshatrasFlippingData.jsx';
import './NakshatrasSection.css';

// Animation variants remain the same as they are excellent
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const NakshatrasSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  // Define the number of items to show initially based on screen size
  const initialItemCount = isDesktop ? 10 : 6;

  // Effect to update the view when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine the list of items to display
  const displayedItems = isExpanded
    ? nakshatrasData
    : nakshatrasData.slice(0, initialItemCount);

  // Check if the "View All/More" button should be visible
  const shouldShowButton = nakshatrasData.length > initialItemCount;

  return (
    <motion.section
      className="nakshatras-section"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="nakshatras-title">Nakshatras</h2>
      <p className="nakshatras-subtitle">
        Vedic Astrology is based upon Nakshatras. Our ancient sages have written a detailed treatise on them!
      </p>

      {/* The `layout` prop animates the grid's size change smoothly */}
      <motion.div layout className="nakshatras-grid">
        <AnimatePresence>
          {displayedItems.map((nakshatra) => (
            <motion.div
              key={nakshatra.name} // Use a unique key like name
              className="nakshatra-item-wrapper"
              variants={itemVariants}
              exit="exit"
              layout // Animate position changes
              whileHover={{ scale: 1.08, zIndex: 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={nakshatra.link} className="nakshatra-pill">
                <span className="nakshatra-pill-icon">{nakshatra.icon}</span>
                <span className="nakshatra-pill-name">{nakshatra.name}</span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* The button is now rendered based on logic, not hidden by CSS */}
      {shouldShowButton && (
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="view-more-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExpanded ? 'View Less' : (isDesktop ? 'View All' : 'View More')}
        </motion.button>
      )}
    </motion.section>
  );
};

export default NakshatrasSection;