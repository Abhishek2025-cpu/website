// src/pages/AstrologerList.jsx

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./AstrologerList.css"; // The CSS file will also be updated

// ====================================================================
// --- 1. Static Payment Gateway Modal Component ---
// ====================================================================
const PaymentGatewayModal = ({ onClose, amount }) => {
  const [paymentState, setPaymentState] = useState('idle'); // 'idle', 'processing', 'success'

  // Simulates making a payment
  const handlePayment = () => {
    setPaymentState('processing');
    setTimeout(() => {
      setPaymentState('success');
      // Close the modal automatically after success
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <motion.div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="modal-close-btn">✖</button>
        <AnimatePresence mode="wait">
          {paymentState === 'idle' && (
            <motion.div key="idle" exit={{ opacity: 0, scale: 0.9 }}>
              <h2 className="modal-title">Secure Payment</h2>
              <p className="payment-amount-display">You are paying: <strong>₹{amount}</strong></p>
              <div className="payment-gateway-form">
                <div className="input-mock"><span className="input-placeholder">Card Number</span></div>
                <div className="input-mock-group">
                  <div className="input-mock"><span className="input-placeholder">MM / YY</span></div>
                  <div className="input-mock"><span className="input-placeholder">CVV</span></div>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="connect-button" onClick={handlePayment}>
                Pay Now
              </motion.button>
            </motion.div>
          )}

          {paymentState === 'processing' && (
            <motion.div key="processing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="payment-status-container">
              <div className="spinner"></div>
              <p>Processing Payment...</p>
            </motion.div>
          )}

          {paymentState === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="payment-status-container">
              <div className="success-animation"><div className="checkmark"></div></div>
              <p>Payment Successful!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// ====================================================================
// --- 2. Add Money Modal Component (Updated) ---
// ====================================================================
const AddMoneyModal = ({ onClose, onProceed }) => {
  const [amount, setAmount] = useState(500);
  const [error, setError] = useState("");
  const handleAmountChange = (e) => { setAmount(e.target.value === "" ? "" : Number(e.target.value)); };
  const handleSetPresetAmount = (presetAmount) => { setAmount(presetAmount); };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount < 50) { setError("Minimum amount to add is ₹50."); return; }
    setError("");
    // Calls the onProceed function passed from the parent, with the chosen amount
    onProceed(amount);
  };

  return (
    <motion.div className="modal-overlay" onClick={onClose}>
      <motion.div className="modal-content" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn">✖</button>
        <h2 className="modal-title">Add Money to Wallet</h2>
        <form onSubmit={handleSubmit}>
          <div className="payment-modal-body">
            <label htmlFor="amount-input">Enter Amount</label>
            <div className="amount-input-wrapper">
              <span>₹</span>
              <input id="amount-input" type="number" value={amount} onChange={handleAmountChange} placeholder="e.g., 500" min="50" />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="preset-amounts">
              <button type="button" onClick={() => handleSetPresetAmount(100)}>₹100</button>
              <button type="button" onClick={() => handleSetPresetAmount(500)}>₹500</button>
              <button type="button" onClick={() => handleSetPresetAmount(1000)}>₹1000</button>
            </div>
          </div>
          <button type="submit" className="connect-button" disabled={amount < 50}>Proceed to Pay</button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ====================================================================
// --- 3. Main AstrologerList Component (Manages Modals) ---
// ====================================================================
const AstrologerList = () => {
  const [astrologers, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAstro, setSelectedAstro] = useState(null);
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const [isGatewayModalOpen, setIsGatewayModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);

  useEffect(() => {
    fetch("https://kalpjyotish.com/api/api/astrologer/all")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = (data.data || []).filter((astro) => astro.isApproved !== false && (astro.user_profile || astro.profilePhoto));
        setAstrologers(filteredData);
        setLoading(false);
      })
      .catch((err) => { console.error("Error fetching astrologers:", err); setLoading(false); });
  }, []);

  const handleSelectAstro = (astro) => { setSelectedAstro(astro._id === selectedAstro?._id ? null : astro); };

  // This function handles the transition from the "Add Money" modal to the "Gateway" modal
  const handleProceedToGateway = (amount) => {
    setPaymentAmount(amount);
    setIsAddMoneyModalOpen(false); // Close the first modal
    setIsGatewayModalOpen(true);  // Open the second modal
  };

  if (loading) { return <div className="loading-text">Finding the best astrologers for you...</div>; }

  const bubbleVariants = { hidden: { opacity: 0, scale: 0.5 }, visible: (i) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, type: "spring", stiffness: 120 }, }), };
  const cardDetailVariants = { hidden: { opacity: 0, y: 50, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }, exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } }, };

  return (
    <>
      <div className="astrologer-list-container">
        <div className="bubbles-container">
          {astrologers.map((astro, i) => (
            <motion.div key={astro._id} variants={bubbleVariants} initial="hidden" animate="visible" custom={i} whileHover={{ y: -5 }} onClick={() => handleSelectAstro(astro)} className="bubble-wrapper">
              <img src={astro.user_profile || astro.profilePhoto || "https://i.imgur.com/G4G987O.png"} alt={astro.name} className={`bubble-image ${selectedAstro?._id === astro._id ? "selected" : ""}`} />
              <p className="bubble-name">{astro.name}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedAstro && (
            <motion.div key={selectedAstro._id} variants={cardDetailVariants} initial="hidden" animate="visible" exit="exit" className="detail-card">
              <button onClick={() => setSelectedAstro(null)} className="detail-card-close-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="detail-card-header">
                <img src={selectedAstro.user_profile || selectedAstro.profilePhoto || "https://i.imgur.com/G4G987O.png"} alt={selectedAstro.name} className="detail-card-image" />
                <div className="detail-card-header-info">
                  <h2 className="detail-card-name">{selectedAstro.name}</h2>
                  <span className={`status-badge ${selectedAstro.status === "live" ? "live" : "offline"}`}>{selectedAstro.status === 'live' ? '● Live' : 'Offline'}</span>
                  <p className="detail-card-skills"><strong>Specialties:</strong> {selectedAstro.all_skills?.slice(0, 3).join(", ") || "Expert Astrologer"}</p>
                </div>
              </div>
              <div className="detail-card-body">
                <p><strong>Experience:</strong> {selectedAstro.experience || "Not specified"}</p>
                <p><strong>Languages:</strong> {selectedAstro.language?.join(", ") || "Not specified"}</p>
                {selectedAstro.charge_per_minute && (<p className="detail-card-price">₹{selectedAstro.charge_per_minute} / minute</p>)}
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="connect-button" onClick={() => setIsAddMoneyModalOpen(true)}>
                Connect Now
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isAddMoneyModalOpen && <AddMoneyModal onClose={() => setIsAddMoneyModalOpen(false)} onProceed={handleProceedToGateway} />}
        {isGatewayModalOpen && <PaymentGatewayModal onClose={() => setIsGatewayModalOpen(false)} amount={paymentAmount} />}
      </AnimatePresence>
    </>
  );
};

export default AstrologerList;
