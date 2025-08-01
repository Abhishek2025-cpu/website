// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import your OPTIMIZED images
import heroImage1 from '../assets/hero-1.png';
import heroImage2 from '../assets/hero-2.png';
import heroImage3 from '../assets/hero-3.png';

import './HomePage.css';
import { FiArrowRight } from 'react-icons/fi';
// New, corrected line
import ServicesSection from '../components/ServicesSection';
import DailyInsights from '../components/DailyInsights';
import ConsultationTopics from '../components/ConsultationTopics';
import NakshatrasSection from '../components/NakshatrasSection';
import Testimonials from '../components/Testimonials'; 
import BlogSection from '../components/BlogSection';
import Footer from '../components/Footer';

const slideContent = [
  {
    image: heroImage1,
    title: "Chart Your Destiny",
    subtitle: "Personalized birth charts and detailed astrological reports.",
    link: "/zodiac-signs"
  },
  {
    image: heroImage2,
    // title: "Consult with Experts",
    // subtitle: "Connect with renowned astrologers for one-on-one sessions.",
    link: "/talk"
  },
  {
    image: heroImage3,
    title: "Ancient Wisdom, Modern Insights",
    subtitle: "Explore Vedic astrology to illuminate your life's path.",
    link: "/horoscope"
  }
];

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        // Added for a smoother, more gradual fade between slides (1200ms = 1.2s)
        speed={1200}
        className="hero-swiper"
      >
        {slideContent.map((slide, index) => (
          <SwiperSlide key={index} className="hero-slide">
             {/* We apply the background image via CSS for better control */}
            <div 
              className="slide-background" 
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            <div className="slide-overlay"></div>
            <motion.div
              className="slide-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h1 className="slide-title">{slide.title}</h1>
              <p className="slide-subtitle">{slide.subtitle}</p>
              <Link to={slide.link} className="cta-button">
                <span>Explore Now</span>
                <FiArrowRight />
              </Link>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Example content below the Swiper to demonstrate visibility */}
       <ServicesSection />
        <DailyInsights />
         <ConsultationTopics /> 
          <NakshatrasSection />
            <Testimonials /> 
              <BlogSection />
        <Footer />
    </div>
  );
};

export default HomePage;