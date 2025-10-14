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
// We no longer need to import Profile here as it's handled by the router
// import Profile from '../pages/Profile'; 

import './Navbar.css';

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 100%)"
    strokeLinecap="round"
    {...props}
  />
);

const Navbar = ({ onSignupClick }) => { 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);

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
       { to: "/contact-us", icon: <BsChatDots />, text: "Contact Now" },
    { to: "/shop", icon: <FaShoppingCart />, text: "Shop" },
  ];
  
  // You can define these variants if they are used, otherwise remove them
  const sideMenuVariants = {
    closed: { x: "100%" },
    open: { x: "0%", transition: { type: 'spring', stiffness: 120 } }
  };
  const listItemVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };
  
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
                  <li>
                    <a href="#" onClick={handleAuthClick}>
                      <FaUserPlus />
                      <span>Login / Signup</span>
                    </a>
                  </li>
                  <li>
                    {/* 
                      --- FIX ---
                      The link now points to a specific profile URL.
                      In a real app, the ID would be dynamic.
                    */}
                    <NavLink to="/profile/68503e24e727d4bbae22dcb0" onClick={() => setIsUserMenuOpen(false)}>
                      <FaUserCircle />
                      <span>Profile</span>
                    </NavLink>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>

        <button className="hamburger-button" onClick={toggleMobileMenu}>
          <svg width="23" height="23" viewBox="0 0 23 23">
            <Path variants={{ closed: { d: "M 2 2.5 L 20 2.5" }, open: { d: "M 3 16.5 L 17 2.5" } }} animate={isMenuOpen ? "open" : "closed"} />
            <Path d="M 2 9.423 L 20 9.423" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.1 }} animate={isMenuOpen ? "open" : "closed"} />
            <Path variants={{ closed: { d: "M 2 16.346 L 20 16.346" }, open: { d: "M 3 2.5 L 17 16.346" } }} animate={isMenuOpen ? "open" : "closed"} />
          </svg>
        </button>
      </motion.nav>

      {/* --- MOBILE MENU & BACKDROP --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div className="backdrop" onClick={closeMobileMenu} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside className="mobile-menu" variants={sideMenuVariants} initial="closed" animate="open" exit="closed">
              <div className="mobile-menu-header">
                <h3>Menu</h3>
                <button onClick={closeMobileMenu}><IoClose size={28} /></button>
              </div>
              <ul>
                {navItems.map((item) => (
                  <motion.li key={item.to} variants={listItemVariants}>
                    <NavLink to={item.to} onClick={closeMobileMenu}>
                      {item.icon}<span>{item.text}</span>
                    </NavLink>
                  </motion.li>
                ))}
                <motion.li variants={listItemVariants}>
                    <a href="#" onClick={handleAuthClick}>
                        <FaUserPlus />
                        <span>Login / Signup</span>
                    </a>
                </motion.li>
                <motion.li variants={listItemVariants}>
                  {/* --- FIX --- (Same change as the desktop version) */}
                  <NavLink to="/profile/68503e24e727d4bbae22dcb0" onClick={closeMobileMenu}>
                    <FaUserCircle />
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