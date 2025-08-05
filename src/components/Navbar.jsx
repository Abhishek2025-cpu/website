// src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { GiSun } from 'react-icons/gi';
import { FaHome, FaPhoneAlt, FaShoppingCart } from 'react-icons/fa';
import { BsStars, BsChatDots } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5'; // NEW: Dedicated close icon

import './Navbar.css';

// --- Simplified SVG Path for Hamburger ---
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 100%)"
    strokeLinecap="round"
    {...props}
  />
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { to: "/", icon: <FaHome />, text: "Home" },
    { to: "/horoscope", icon: <BsStars />, text: "Horoscope" },
    { to: "/zodiac-signs", icon: <BsStars />, text: "Zodiac Signs" },
    { to: "/chat", icon: <BsChatDots />, text: "Chat with Astrologer" },
    { to: "/talk", icon: <FaPhoneAlt />, text: "Talk with Astrologer" },
    { to: "/shop", icon: <FaShoppingCart />, text: "Shop" },
  ];

  const sideMenuVariants = {
    closed: { x: "100%", transition: { type: 'spring', stiffness: 400, damping: 40 } },
    open: { x: "0%", transition: { type: 'spring', stiffness: 300, damping: 30, staggerChildren: 0.07, delayChildren: 0.2 } },
  };

  const listItemVariants = {
    closed: { y: 50, opacity: 0 },
    open: { y: 0, opacity: 1 },
  };
  
  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="navbar-logo">
          <GiSun />
          <NavLink to="/" onClick={isOpen ? closeMenu : undefined}>KalpJyotish</NavLink>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <ul className="navbar-links desktop-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to}><span>{item.text}</span></NavLink>
            </li>
          ))}
        </ul>

        {/* --- MOBILE HAMBURGER BUTTON (SIMPLIFIED) --- */}
        <button className="hamburger-button" onClick={toggleMenu}>
          {/* This SVG no longer animates into a cross */}
          <svg width="23" height="18" viewBox="0 0 23 18">
            <Path d="M 2 2.5 L 20 2.5" />
            <Path d="M 2 9.423 L 20 9.423" />
            <Path d="M 2 16.346 L 20 16.346" />
          </svg>
        </button>
      </motion.nav>

      {/* --- MOBILE MENU & BACKDROP --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="backdrop"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.aside
              className="mobile-menu"
              variants={sideMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* NEW: HEADER INSIDE THE SIDEBAR */}
              <div className="mobile-menu-header">
                <div className="mobile-menu-logo">
                  <GiSun />
                  <span>KalpJyotish</span>
                </div>
                <button className="sidebar-close-btn" onClick={closeMenu}>
                  <IoClose />
                </button>
              </div>

              {/* Navigation links now come after the header */}
              <ul>
                {navItems.map((item) => (
                  <motion.li key={item.to} variants={listItemVariants}>
                    <NavLink to={item.to} onClick={closeMenu}>
                      {item.icon}
                      <span>{item.text}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;