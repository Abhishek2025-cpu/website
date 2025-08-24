// src/data/servicesData.js

import React from 'react';
// Importing a variety of icons
import { 
  FaPrayingHands, 
  FaOm, 
  FaGift, 
  FaStar, 
  FaBriefcase, 
  FaGraduationCap, 
  FaHeartbeat, 
  FaPlaneDeparture, 
 FaUserFriends,
  FaHandHoldingUsd 
} from 'react-icons/fa';
import { GiCrystalBall, GiLoveMystery } from 'react-icons/gi';

// Data for the top bar
export const premiumServicesData = [
  { title: 'Live Pooja', icon: <FaPrayingHands />, link: '/pooja' },
  { title: 'Astrologers', icon:<FaOm />, link: '/reports' },
  { title: 'Kundali', icon: <FaStar />, link: '/remedies' },
  { title: 'Astrology Shop', icon: <FaGift />, link: '/shop' },
];

// Data for the main grid. The description will be ignored by the new JSX.


export const complimentaryServicesData = [
  { 
    title: 'Finance', 
    icon: <FaHandHoldingUsd />, 
    description: 'Your daily, weekly, and yearly horoscope predictions.', 
    link: '/horoscope' 
  },
  { 
    title: 'Love', 
    icon: <GiLoveMystery />, 
    description: 'Check your love compatibility with your partner.', 
    link: '/compatibility' 
  },
  { 
    title: 'Marriage', 
     icon: <FaUserFriends />,
    description: 'Get your free Kundli with predictions.', 
    link: '/kundli' 
  },
  { 
    title: 'Health', 
    icon: <FaHeartbeat />, 
    description: 'Today\'s Panchang and auspicious timings.', 
    link: '/panchang' 
  },
  { 
    title: 'Abroad', 
    icon: <FaPlaneDeparture />, 
    description: 'Your travel and foreign settlement predictions.', 
    link: '/horoscope' 
  },
  { 
    title: 'Career', 
    icon: <FaBriefcase />, 
    description: 'Find the right career path and growth opportunities.', 
    link: '/compatibility' 
  },
  { 
    title: 'Education', 
    icon: <FaGraduationCap />, 
    description: 'Get academic guidance with astrological insights.', 
    link: '/kundli' 
  },
  { 
    title: 'Job & Business', 
    icon: <FaStar />, 
    description: 'Career and business-related astrological predictions.', 
    link: '/panchang' 
  },
];
