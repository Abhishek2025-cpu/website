// src/components/Navbar.jsx

import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
import { GiSun } from 'react-icons/gi';
import { FaHome, FaShoppingCart, FaUserCircle, FaUserPlus } from 'react-icons/fa';
import { BsStars, BsChatDots } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';

import './Navbar.css';

// ... (Path component remains the same)
const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 100%)"
    strokeLinecap="round"
    {...props}
  />
);


// UPDATED: Accept onSignupClick as a prop
const Navbar = ({ onSignupClick }) => { 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);

  // ... (useEffect hooks remain the same)
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [userMenuRef]);

  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMobileMenu = () => setIsMenuOpen(false);

  const navItems = [
    { to: "/", icon: <FaHome />, text: "Home" },
    { to: "/horoscope", icon: <BsStars />, text: "Horoscope" },
    { to: "/pooja", icon: <BsStars />, text: "Pooja" },
    { to: "/astro-connect", icon: <BsChatDots />, text: "Connect with Astrologer" },
    { to: "/shop", icon: <FaShoppingCart />, text: "Shop" },
  ];

  const sideMenuVariants = { /* ... remains the same ... */ };
  const listItemVariants = { /* ... remains the same ... */ };
  
  // Helper function to handle the click
  const handleAuthClick = (e) => {
    e.preventDefault();
    setIsUserMenuOpen(false);
    closeMobileMenu();
    onSignupClick();
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
          <NavLink to="/" onClick={isMenuOpen ? closeMobileMenu : undefined}>KalpJyotish</NavLink>
        </div>

        {/* --- DESKTOP NAVIGATION --- */}
        <ul className="navbar-links desktop-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to}><span>{item.text}</span></NavLink>
            </li>
          ))}
          <li ref={userMenuRef} className="user-menu">
            <button className="user-menu-trigger" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <FaUserCircle />
            </button>
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.ul
                  className="user-dropdown"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* UPDATED: Changed to trigger the modal */}
                  <li>
                    <a href="#" onClick={handleAuthClick}>
                      <FaUserPlus />
                      <span>Login / Signup</span>
                    </a>
                  </li>
                  <li>
                    <NavLink to="/profile">
                      <FaUserPlus />
                      <span>Profile</span>
                    </NavLink>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        <button className="hamburger-button" onClick={toggleMobileMenu}>
          {/* ... svg remains the same ... */}
        </button>
      </motion.nav>

      {/* --- MOBILE MENU & BACKDROP --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="backdrop"
              onClick={closeMobileMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="mobile-menu"
              variants={sideMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="mobile-menu-header">{/* ... */}</div>
              <ul>
                {navItems.map((item) => (
                  <motion.li key={item.to} variants={listItemVariants}>
                    <NavLink to={item.to} onClick={closeMobileMenu}>
                      {item.icon}<span>{item.text}</span>
                    </NavLink>
                  </motion.li>
                ))}
                {/* UPDATED: Changed to trigger the modal */}
                <motion.li variants={listItemVariants}>
                    <a href="#" onClick={handleAuthClick}>
                        <FaUserPlus />
                        <span>Login / Signup</span>
                    </a>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  <NavLink to="/profile" onClick={closeMobileMenu}>
                    <MdLogout />
                    <span>Profile</span>
                  </NavLink>
                </motion.li>
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;