// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { GiSun } from "react-icons/gi";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { BsStars, BsChatDots } from "react-icons/bs";
import { IoClose, IoChatbubblesOutline } from "react-icons/io5";

import PromotionModal from "./PromotionModal";
import "./Navbar.css";

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
  const [showPromoModal, setShowPromoModal] = useState(false);
  const userMenuRef = useRef(null);

  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMobileMenu = () => setIsMenuOpen(false);
  const openPromoModal = () => setShowPromoModal(true);
  const closePromoModal = () => setShowPromoModal(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const navItems = [
    { to: "/", icon: <FaHome />, text: "Home" },
    { to: "/horoscope", icon: <BsStars />, text: "Horoscope" },
    { to: "/pooja", icon: <BsStars />, text: "Pooja" },
    { to: "/astro-connect", icon: <BsChatDots />, text: "Connect with Astrologer" },
    { to: "/contact-us", icon: <BsChatDots />, text: "Contact Now" },
    { to: "/shop", icon: <FaShoppingCart />, text: "Shop" },
  ];

  const sideMenuVariants = {
    closed: { x: "100%" },
    open: { x: "0%", transition: { type: "spring", stiffness: 120 } },
  };

  const listItemVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo */}
        <div className="navbar-logo">
          <GiSun />
          <NavLink to="/" onClick={isMenuOpen ? closeMobileMenu : undefined}>
            KalpJyotish
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <ul className="navbar-links desktop-links">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to}>
                <span>{item.text}</span>
              </NavLink>
            </li>
          ))}

          {/* ✅ Show only in Desktop */}
          <li className="promo-desktop">
            <button
              className="promo-button"
              onClick={openPromoModal}
              title="Promotional Offers"
            >
              <IoChatbubblesOutline size={22} />
            </button>
          </li>
        </ul>

        {/* ✅ Mobile: show promo icon before hamburger */}
        <div className="mobile-icons">
          <button
            className="promo-button promo-mobile"
            onClick={openPromoModal}
            title="Promotional Offers"
          >
            <IoChatbubblesOutline size={22} />
          </button>

          <button className="hamburger-button" onClick={toggleMobileMenu}>
            <svg width="23" height="23" viewBox="0 0 23 23">
              <Path
                variants={{
                  closed: { d: "M 2 2.5 L 20 2.5" },
                  open: { d: "M 3 16.5 L 17 2.5" },
                }}
                animate={isMenuOpen ? "open" : "closed"}
              />
              <Path
                d="M 2 9.423 L 20 9.423"
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                transition={{ duration: 0.1 }}
                animate={isMenuOpen ? "open" : "closed"}
              />
              <Path
                variants={{
                  closed: { d: "M 2 16.346 L 20 16.346" },
                  open: { d: "M 3 2.5 L 17 16.346" },
                }}
                animate={isMenuOpen ? "open" : "closed"}
              />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU --- */}
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
              <div className="mobile-menu-header">
                <h3>Menu</h3>
                <button onClick={closeMobileMenu}>
                  <IoClose size={28} />
                </button>
              </div>
              <ul>
                {navItems.map((item) => (
                  <motion.li key={item.to} variants={listItemVariants}>
                    <NavLink to={item.to} onClick={closeMobileMenu}>
                      {item.icon}
                      <span>{item.text}</span>
                    </NavLink>
                  </motion.li>
                ))}
                <motion.li variants={listItemVariants}>
                  {/* <button
                    onClick={() => {
                      closeMobileMenu();
                      openPromoModal();
                    }}
                  > */}
                    {/* <IoChatbubblesOutline /> */}
                    {/* <span>Promotions</span> */}
                  {/* </button> */}
                </motion.li>
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ✅ Promotion Modal */}
      <AnimatePresence>
        {showPromoModal && <PromotionModal onClose={closePromoModal} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
