// src/App.jsx

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



function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* ... other routes */}
        </Routes>
      </main>

    </Router>
  );
}

export default App;