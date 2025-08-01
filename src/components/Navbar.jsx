// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Main logo icon
import { GiSun } from 'react-icons/gi'; 

// Icons for navigation links
import { FaHome, FaPhoneAlt, FaShoppingCart } from 'react-icons/fa';
import { BsStars, BsChatDots } from 'react-icons/bs';

// CORRECTED: Imported FaZodiac from the 'fa6' (Font Awesome 6) library


import './Navbar.css';

const Navbar = () => {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="navbar-logo">
        <GiSun />
        <NavLink to="/">KalpJyotish</NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/">
            <FaHome />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/horoscope">
            <BsStars />
            <span>Daily Horoscope</span>
          </NavLink>
        </li>
          <li>
          <NavLink to="/zodiac-signs">
           
            <span>Zodiac Signs</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/chat">
            <BsChatDots />
            <span>Chat with Astrologer</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/talk">
            <FaPhoneAlt />
            <span>Talk with Astrologer</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop">
            <FaShoppingCart />
            <span>Shop</span>
          </NavLink>
        </li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;