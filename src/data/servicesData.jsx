// src/data/servicesData.js

import React from 'react';
// Importing a variety of icons
import { FaPrayingHands, FaChartLine, FaGift, FaStar } from 'react-icons/fa';
import { GiCrystalBall, GiLoveMystery } from 'react-icons/gi';

// Data for the top bar
export const premiumServicesData = [
  { title: 'Live Pooja', icon: <FaPrayingHands />, link: '/pooja' },
  { title: 'Astro Reports', icon: <FaChartLine />, link: '/reports' },
  { title: 'Remedies', icon: <FaStar />, link: '/remedies' },
  { title: 'Astrology Shop', icon: <FaGift />, link: '/shop' },
];

// Data for the main grid. The description will be ignored by the new JSX.
export const complimentaryServicesData = [
  { title: 'Horoscope', icon: <GiCrystalBall />, description: 'Your daily, weekly, and yearly horoscope predictions.', link: '/horoscope' },
  { title: 'Love Compatibility', icon: <GiLoveMystery />, description: 'Check your love compatibility with your partner.', link: '/compatibility' },
  { title: 'Kundli', icon: <FaStar />, description: 'Get your free Kundli with predictions.', link: '/kundli' },
  { title: 'Panchang', icon: <FaPrayingHands />, description: 'Today\'s Panchang and auspicious timings.', link: '/panchang' },
  // Add more complimentary services here...
];