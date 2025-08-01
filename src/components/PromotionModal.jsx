// src/components/PromotionModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoChatbubblesOutline, IoCallOutline, IoVideocamOutline, IoClose } from 'react-icons/io5';
import './PromotionModal.css';

// Animation variants for the backdrop and the modal
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-50vh", opacity: 0, scale: 0.8 },
  visible: { y: "0", opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 15 } },
  exit: { y: "100vh", opacity: 0, scale: 0.8 }
};

const PromotionModal = ({ onClose }) => {
  const options = [
    { icon: <IoChatbubblesOutline />, title: "Live Chat", link: "/chat" },
    { icon: <IoCallOutline />, title: "Voice Call", link: "/talk" },
    { icon: <IoVideocamOutline />, title: "Video Call", link: "/video-call" },
  ];

  return (
    <motion.div
      className="modal-backdrop"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose} // Close modal if backdrop is clicked
    >
      <motion.div
        className="modal-content"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button className="modal-close-btn" onClick={onClose}><IoClose /></button>
        <h2 className="modal-title">Connect With Your Guide</h2>
        <p className="modal-subtitle">Choose your preferred way to get instant answers and clarity from our expert astrologers.</p>
        
        <div className="modal-options">
          {options.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Link to={option.link} className="modal-option-card" onClick={onClose}>
                <div className="modal-option-icon">{option.icon}</div>
                <h3 className="modal-option-title">{option.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <p className="modal-footer-text">Your first 5 minutes are on us!</p>
      </motion.div>
    </motion.div>
  );
};

export default PromotionModal;