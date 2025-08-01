// src/components/ConsultationTopics.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { consultationTopicsData } from '../data/consultationData';
import './ConsultationTopics.css'; // We will replace the CSS as well

const ConsultationTopics = () => {
    // State to track the index of the hovered item
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="consultation-section-v2">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="consultation-main-title-v2">Consult The Right Astrologer For You</h2>
                
                <ul 
                    className="consultation-list"
                    onMouseLeave={() => setHoveredIndex(null)} // Reset when mouse leaves the container
                >
                    {consultationTopicsData.map((item, index) => (
                        <li
                            key={index}
                            className="consultation-item"
                            onMouseEnter={() => setHoveredIndex(index)}
                        >
                            <Link to={item.link} className="consultation-link">
                                <div className="consultation-icon-v2">{item.icon}</div>
                                <span className="consultation-title-v2">{item.title}</span>
                            </Link>
                            
                            {/* The magic underline */}
                            {hoveredIndex === index && (
                                <motion.div
                                    className="active-underline"
                                    layoutId="underline" // This ID allows Framer Motion to animate it between items
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </section>
    );
};

export default ConsultationTopics;