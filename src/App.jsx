import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

// Import Components and Pages
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DailyHoroscope from './components/DailyHoroscope';
import AstroShopSection from './components/AstroShopSection';
import PoojaSection from './components/PoojaSection';
import ZodiacSigns from './components/ZodiacExplorer';
import PromotionModal from './components/PromotionModal';
 import SignupModal from './components/SignupModal';
import { AnimatePresence } from 'framer-motion';
import AstroConnect from './pages/AstroConnect';

function App() {
  // STATE MANAGEMENT FIX: Use separate state for each modal
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // --- Handlers for Signup Modal ---
  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  // --- Handlers for Promotion Modal ---
  const closePromoModal = () => setIsPromoModalOpen(false);

  // useEffect for showing the Promotion Modal after a delay
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('promoModalSeen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsPromoModalOpen(true); // Use the correct state setter
        sessionStorage.setItem('promoModalSeen', 'true');
      }, 15000); // 15 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Router>
      {/* --- MODALS --- */}
      {/* Modals are placed here so they can overlay everything */}
      <AnimatePresence>
        {isPromoModalOpen && <PromotionModal onClose={closePromoModal} />}
      </AnimatePresence>
      
      {/* The Signup Modal is controlled by its own state */}
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />

      {/* --- GLOBAL UI (Navbar) --- */}
      {/* The Navbar is outside <Routes> so it appears on every page. */}
      {/* We pass the correct handler function to it. */}
      <Navbar onSignupClick={openSignupModal} />

      {/* --- PAGE CONTENT --- */}
      <main>
        {/* The <Routes> block now ONLY contains <Route> components */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/horoscope" element={<DailyHoroscope />} />
          <Route path="/shop" element={<AstroShopSection />} />
          <Route path="/pooja" element={<PoojaSection />} />
          <Route path="/zodiac-signs" element={<ZodiacSigns />} />
            <Route path="/astro-connect" element={<AstroConnect />} />
          {/* Add other routes here */}
        </Routes>
      </main>
    </Router>
  );
}

 export default App;
