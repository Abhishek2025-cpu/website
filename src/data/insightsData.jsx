// src/data/insightsData.jsx
import React from 'react';
import { GiPalm, GiGalaxy, GiAries, GiTaurus, GiGemini, GiCancer, GiLeo, GiVirgo, GiLibra, GiScorpio, GiSagittarius, GiCapricorn, GiAquarius, GiPisces } from 'react-icons/gi';
import { FaOm } from 'react-icons/fa6'; // Using a different 'om' icon

export const appointmentData = [
  { icon: <GiPalm />, title: "Reiki Healer", link: "/reiki" },
  { icon: <GiGalaxy />, title: "Popular Astrologers", link: "/talk" },
  { icon: <FaOm />, title: "Learn Tarot", link: "/tarot" },
  { icon: <FaOm />, title: "Rudra Abhishek Pooja", link: "/pooja" },
  { icon: <GiPalm />, title: "Palm Reader", link: "/palm-reading" },
];

export const zodiacSignsData = [
  { icon: <GiAries />, name: "Aries", link: "/horoscope/aries" },
  { icon: <GiTaurus />, name: "Taurus", link: "/horoscope/taurus" },
  { icon: <GiGemini />, name: "Gemini", link: "/horoscope/gemini" },
  { icon: <GiCancer />, name: "Cancer", link: "/horoscope/cancer" },
  { icon: <GiLeo />, name: "Leo", link: "/horoscope/leo" },
  { icon: <GiVirgo />, name: "Virgo", link: "/horoscope/virgo" },
  { icon: <GiLibra />, name: "Libra", link: "/horoscope/libra" },
  { icon: <GiScorpio />, name: "Scorpio", link: "/horoscope/scorpio" },
  { icon: <GiSagittarius />, name: "Sagittarius", link: "/horoscope/sagittarius" },
  { icon: <GiCapricorn />, name: "Capricorn", link: "/horoscope/capricorn" },
  { icon: <GiAquarius />, name: "Aquarius", link: "/horoscope/aquarius" },
  { icon: <GiPisces />, name: "Pisces", link: "/horoscope/pisces" },
];