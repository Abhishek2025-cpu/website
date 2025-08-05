// src/data/insightsData.jsx
// Using react-icons for all icons for consistent styling.

import React from 'react';
// Icons for the "Our Services" section
import { FaOm } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
// Icons for both services and zodiac signs
import { 
    GiPalm, GiAries, GiTaurus, GiGemini, GiCancer, 
    GiLeo, GiVirgo, GiLibra, GiScorpio, 
    GiSagittarius, GiCapricorn, GiAquarius, GiPisces 
} from 'react-icons/gi';

// "Our Services" data remains the same
export const appointmentData = [
  { title: ['Reiki', 'Healer'], icon: <GiPalm />, link: '/reiki' },
  { title: ['Popular', 'Astrologers'], icon: <IoSparkles />, link: '/astrologers' },
  { title: ['Learn', 'Tarot'], icon: <FaOm />, link: '/tarot' },
  { title: ['Rudrabhishek', 'Pooja'], icon: <FaOm />, link: '/pooja' },
  { title: ['Palm', 'Reader'], icon: <GiPalm />, link: '/palm-reader' },
];

// MODIFIED: Zodiac data now uses react-icon components.
export const zodiacSignsData = [
  { name: 'Aries',       icon: <GiAries />,       link: '/horoscope/aries' },
  { name: 'Taurus',      icon: <GiTaurus />,      link: '/horoscope/taurus' },
  { name: 'Gemini',      icon: <GiGemini />,      link: '/horoscope/gemini' },
  { name: 'Cancer',      icon: <GiCancer />,      link: '/horoscope/cancer' },
  { name: 'Leo',         icon: <GiLeo />,         link: '/horoscope/leo' },
  { name: 'Virgo',       icon: <GiVirgo />,       link: '/horoscope/virgo' },
  { name: 'Libra',       icon: <GiLibra />,       link: '/horoscope/libra' },
  { name: 'Scorpio',     icon: <GiScorpio />,     link: '/horoscope/scorpio' },
  { name: 'Sagittarius', icon: <GiSagittarius />, link: '/horoscope/sagittarius' },
  { name: 'Capricorn',   icon: <GiCapricorn />,   link: '/horoscope/capricorn' },
  { name: 'Aquarius',    icon: <GiAquarius />,    link: '/horoscope/aquarius' },
  { name: 'Pisces',      icon: <GiPisces />,      link: '/horoscope/pisces' },
];