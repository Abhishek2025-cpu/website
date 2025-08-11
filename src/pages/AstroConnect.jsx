import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

// --- ICONS ---
import { FaPhoneAlt, FaVideo, FaCommentDots } from 'react-icons/fa';
import { IoIosStar } from "react-icons/io";

// --- STYLES ---
import './AstroConnect.css';

const API_URL = 'https://kalpjyotish.com/api/api/astrologer/all';
const FALLBACK_IMAGE = 'https://i.imgur.com/G4G987O.png';

// --- Animation Variants ---
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const cardVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } } };

// ====================================================================
// --- Astrologer Card Sub-Component with Spotlight Effect ---
// ====================================================================
const AstrologerCard = ({ astrologer, mode }) => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: -100, y: -100 });
  };

  // Data Normalization
  const profileImg = astrologer.user_profile || astrologer.profilePhoto || FALLBACK_IMAGE;
  const skills = astrologer.all_skills || astrologer.skills || [];
  const experience = parseInt(astrologer.experience) || 0;
  const charge = astrologer.charge_per_minute || 0;
  const isLive = astrologer.status === 'live';
  
  const cardStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-color), var(--bg-card) 40%)`,
  };
  
  const modeDetails = {
    chat: { icon: <FaCommentDots />, text: 'Chat Now' },
    call: { icon: <FaPhoneAlt />, text: 'Call Now' },
    video: { icon: <FaVideo />, text: 'Video Call' },
  };

  return (
    <motion.div
      className="astrologer-card"
      variants={cardVariants}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-content">
        <div className="card-header">
          <img src={profileImg} alt={astrologer.name} className="profile-picture" onError={(e) => { e.target.src = FALLBACK_IMAGE; }} />
          <div className={`status-dot ${isLive ? 'live' : 'offline'}`} title={isLive ? 'Live' : 'Offline'}></div>
        </div>
        <div className="card-body">
          <h3 className="astrologer-name">{astrologer.name}</h3>
          <div className="astrologer-skills">{skills.slice(0, 3).map((skill) => <span key={skill} className="skill-tag">{skill}</span>)}</div>
          <div className="astrologer-meta">
            <span>Exp: {experience} years</span>
            <span><IoIosStar /> 4.9</span>
          </div>
          <div className="astrologer-charges">₹{charge}<span>/min</span></div>
        </div>
        <div className="card-footer">
          <button className={`action-button ${isLive ? 'enabled' : 'disabled'}`} disabled={!isLive}>
            {modeDetails[mode]?.icon}<span>{isLive ? modeDetails[mode]?.text : 'Offline'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ====================================================================
// --- Main AstroConnect Component ---
// ====================================================================
const AstroConnect = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [sortBy, setSortBy] = useState('status'); // 'status', 'exp', 'price_htl', 'price_lth'

  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        const approvedAstrologers = response.data.data.filter(astro => astro.isApproved !== false);
        setAstrologers(approvedAstrologers);
      } catch (err) {
        setError('Failed to fetch astrologers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAstrologers();
  }, []);

  const sortedAstrologers = useMemo(() => {
    const sortableArray = [...astrologers];
    switch (sortBy) {
      case 'exp':
        return sortableArray.sort((a, b) => (parseInt(b.experience) || 0) - (parseInt(a.experience) || 0));
      case 'price_htl':
        return sortableArray.sort((a, b) => (b.charge_per_minute || 0) - (a.charge_per_minute || 0));
      case 'price_lth':
        return sortableArray.sort((a, b) => (a.charge_per_minute || 0) - (b.charge_per_minute || 0));
      case 'status':
      default:
        return sortableArray.sort((a, b) => (b.status === 'live') - (a.status === 'live'));
    }
  }, [astrologers, sortBy]);

  const connectionOptions = [
    { mode: 'chat', text: 'Chat', icon: <FaCommentDots /> },
    { mode: 'call', text: 'Call', icon: <FaPhoneAlt /> },
    { mode: 'video', text: 'Video', icon: <FaVideo /> },
  ];
  
  const sortOptions = [
      { key: 'status', label: 'Availability' },
      { key: 'exp', label: 'Experience' },
      { key: 'price_htl', label: 'Price: High to Low' },
      { key: 'price_lth', label: 'Price: Low to High' },
  ]

  if (error) return <div className="astro-connect-container"><p className="error-message">{error}</p></div>;

  return (
    <div className="astro-connect-container">
      <motion.div className="connection-options" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        {connectionOptions.map((option) => (
          <motion.div key={option.mode} className={`option-card ${selectedMode === option.mode ? 'active' : ''}`} onClick={() => setSelectedMode(option.mode)} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
            {option.icon}<span>{option.text}</span>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedMode && (
          <motion.div className="controls-and-list" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div className="sort-controls">
                <span> Sort By:</span>
                {sortOptions.map(opt => (
                    <button key={opt.key} className={`sort-btn ${sortBy === opt.key ? 'active' : ''}`} onClick={() => setSortBy(opt.key)}>{opt.label}</button>
                ))}
            </div>

            <motion.div
              key={selectedMode} // IMPORTANT: This forces re-animation on mode change
              className="astrologer-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {loading ? ( <div className="loader" /> ) : (
                sortedAstrologers.map((astrologer) => (
                  <AstrologerCard key={astrologer._id} astrologer={astrologer} mode={selectedMode} />
                ))
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AstroConnect;