'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddToCartAnimation({ isOpen, item, type = 'cart', onComplete }) {
  const [phase, setPhase] = useState('drop'); // 'drop' | 'roll' | 'check'

  useEffect(() => {
    if (!isOpen) return;

    setPhase('drop');

    const timer1 = setTimeout(() => setPhase('roll'), 600);
    const timer2 = setTimeout(() => setPhase('check'), 1200);
    const timer3 = setTimeout(() => {
      onComplete?.();
    }, 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 400,
          background: 'rgba(15, 15, 16, 0.85)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          style={{
            background: '#1A1A1A',
            border: '1px solid rgba(196, 154, 108, 0.4)',
            borderRadius: '2rem',
            padding: '2.5rem 3rem',
            boxShadow: '0 25px 80px rgba(0,0,0,0.85), 0 0 40px rgba(196,154,108,0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            maxWidth: 380,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {/* Animated Coffee Cup & Cart SVG Container */}
          <div style={{ position: 'relative', width: 140, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Coffee Cup Dropping Animation */}
            <motion.div
              initial={{ y: -60, opacity: 0, scale: 1.2 }}
              animate={{
                y: phase === 'drop' ? -20 : 10,
                opacity: phase === 'drop' ? 1 : 0,
                scale: phase === 'drop' ? 1 : 0.4,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 0,
                zIndex: 2,
              }}
            >
              {/* Perfect Coffee Cup SVG */}
              <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Steam Lines */}
                <path d="M10 6C10 4 11 3 11 2" stroke="#E5B879" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 6C16 4 17 3 17 2" stroke="#E5B879" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M22 6C22 4 23 3 23 2" stroke="#E5B879" strokeWidth="1.5" strokeLinecap="round" />
                {/* Cup Body */}
                <path d="M6 10H26V18C26 22.4183 22.4183 26 18 26H14C9.58172 26 6 22.4183 6 18V10Z" fill="url(#cupGrad)" stroke="#C49A6C" strokeWidth="2" />
                {/* Cup Handle */}
                <path d="M26 12H28C29.6569 12 31 13.3431 31 15V16C31 17.6569 29.6569 19 28 19H26" stroke="#C49A6C" strokeWidth="2" />
                {/* Cup Saucer Plate */}
                <path d="M4 28H28" stroke="#E5B879" strokeWidth="2" strokeLinecap="round" />
                <defs>
                  <linearGradient id="cupGrad" x1="6" y1="10" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C49A6C" />
                    <stop offset="1" stopColor="#E5B879" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Shopping Cart SVG */}
            <motion.div
              animate={{
                x: phase === 'roll' ? [0, 8, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
              style={{ position: 'absolute', bottom: 10 }}
            >
              <svg width="84" height="60" viewBox="0 0 36 26" fill="none">
                {/* Cart Frame */}
                <path d="M1 2.5H6L10 18.5H25.5L28.5 7.5L7.5 7.5" stroke="#C49A6C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Wheel 1 */}
                <motion.circle
                  cx="11.5"
                  cy="23"
                  r="2"
                  stroke="#E5B879"
                  strokeWidth="2.5"
                  animate={{ rotate: phase === 'roll' ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Wheel 2 */}
                <motion.circle
                  cx="24"
                  cy="23"
                  r="2"
                  stroke="#E5B879"
                  strokeWidth="2.5"
                  animate={{ rotate: phase === 'roll' ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                />

                {/* Animated Green Checkmark Tick */}
                {phase === 'check' && (
                  <motion.path
                    d="M13.5 13.5L16.5 16.5L22.5 9.5"
                    stroke="#22c55e"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </svg>
            </motion.div>
          </div>

          {/* Dynamic Status Text */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.3rem' }}>
              {phase === 'check'
                ? (type === 'reservation' ? 'Reservation Confirmed! ✓' : 'Added to Cart! ✓')
                : (type === 'reservation' ? 'Securing VIP Table...' : 'Adding Coffee Cup to Cart...')}
            </h4>
            <p style={{ color: '#C49A6C', fontSize: '0.82rem', fontWeight: 600 }}>
              {item ? item.name || item.title || 'Grand Reserve Selection' : 'Velvet Bean Reserve'}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
