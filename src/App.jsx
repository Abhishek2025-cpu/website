// src/App.jsx
import  { useState, useEffect } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Swiper styles GLOBALLY
import 'swiper/css'; // Core Swiper
import 'swiper/css/navigation'; // For navigation arrows
import 'swiper/css/pagination'; // For pagination dots AND progress bar
import 'swiper/css/effect-fade'; // For the hero slider's fade effect
import 'swiper/css/autoplay'; // Though often handled by JS, good to have


import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import { AnimatePresence } from 'framer-motion';
import PromotionModal from './components/PromotionModal';
import DailyHoroscope from './components/DailyHoroscope';



function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check if the modal has already been shown in this session
    const hasSeenModal = sessionStorage.getItem('promoModalSeen');

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        // Mark as seen for this session
        sessionStorage.setItem('promoModalSeen', 'true');
      }, 15000); // 15 seconds

      // Cleanup the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const closeModal = () => setIsModalOpen(false);
  return (
    <Router>
         <AnimatePresence>
        {isModalOpen && <PromotionModal onClose={closeModal} />}
      </AnimatePresence>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/horoscope" element={<DailyHoroscope />} />

          {/* ... other routes */}
        </Routes>
      </main>

    </Router>
  );
}

export default App;