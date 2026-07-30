'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Key, Sparkles, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [isLampOn, setIsLampOn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPulling, setIsPulling] = useState(false);

  const toggleLamp = () => {
    setIsPulling(true);
    setTimeout(() => setIsPulling(false), 400);
    setIsLampOn(prev => !prev);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123@') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: isLampOn ? '#0F0F10' : '#070708',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflow: 'hidden',
        transition: 'background 0.6s ease',
      }}
    >
      {/* Ambient Radial Glow when Lamp is ON */}
      {isLampOn && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(320px, 90vw, 700px)',
            height: '600px',
            background: 'radial-gradient(ellipse at top, rgba(229, 184, 121, 0.28) 0%, rgba(196, 154, 108, 0.12) 40%, transparent 75%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Main Lamp & Form Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 440,
          width: '100%',
        }}
      >
        {/* SVG Lamp Component */}
        <div
          onClick={toggleLamp}
          style={{
            cursor: 'pointer',
            position: 'relative',
            width: 220,
            height: 240,
            display: 'flex',
            justifyContent: 'center',
            userSelect: 'none',
          }}
          title="Click or pull cord to turn lamp ON/OFF"
        >
          <svg
            viewBox="0 0 200 280"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            {/* Lamp Shade Glow Filter */}
            <defs>
              <filter id="lampGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Inner Shade Light Beam Projection */}
            <ellipse
              cx="100"
              cy="110"
              rx="60"
              ry="25"
              fill={isLampOn ? '#F4E7D3' : '#1A1A1A'}
              style={{ transition: 'fill 0.5s ease' }}
            />

            {/* Lamp Base Pole */}
            <rect
              x="94"
              y="100"
              width="12"
              height="150"
              rx="6"
              fill={isLampOn ? '#C49A6C' : '#2A2A2D'}
              style={{ transition: 'fill 0.5s ease' }}
            />

            {/* Lamp Base Foot */}
            <rect
              x="60"
              y="245"
              width="80"
              height="12"
              rx="6"
              fill={isLampOn ? '#C49A6C' : '#2A2A2D'}
              style={{ transition: 'fill 0.5s ease' }}
            />

            {/* Pull Cord Line & Bead */}
            <g style={{ cursor: 'pointer' }}>
              <motion.line
                x1="135"
                y1="105"
                x2="135"
                y2={isPulling ? 195 : 175}
                stroke={isLampOn ? '#E5B879' : '#55555A'}
                strokeWidth="2.5"
                strokeDasharray="4 2"
                animate={{ y2: isPulling ? 195 : 175 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              />

              <motion.circle
                cx="135"
                cy={isPulling ? 203 : 183}
                r="7"
                fill={isLampOn ? '#E5B879' : '#77777D'}
                animate={{ cy: isPulling ? 203 : 183 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                filter={isLampOn ? 'url(#lampGlow)' : 'none'}
              />

              {/* Clickable Hit Target */}
              <circle cx="135" cy="185" r="28" fill="transparent" />
            </g>

            {/* Lamp Shade Main Dome */}
            <path
              d="M30 110 C 30 45, 170 45, 170 110 C 170 120, 30 120, 30 110 Z"
              fill={isLampOn ? '#C49A6C' : '#1A1A1E'}
              stroke={isLampOn ? '#E5B879' : '#333338'}
              strokeWidth="2"
              style={{
                transition: 'all 0.5s ease',
                filter: isLampOn ? 'drop-shadow(0 0 25px rgba(229,184,121,0.7))' : 'none',
              }}
            />
          </svg>

          {/* Pull Cord Hint Pill */}
          <div
            style={{
              position: 'absolute',
              top: 15,
              right: -30,
              background: isLampOn ? 'rgba(196, 154, 108, 0.2)' : 'rgba(255,255,255,0.08)',
              border: '1px solid',
              borderColor: isLampOn ? '#C49A6C' : 'rgba(255,255,255,0.15)',
              padding: '0.25rem 0.65rem',
              borderRadius: '50px',
              color: isLampOn ? '#E5B879' : '#A39C93',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              pointerEvents: 'none',
            }}
          >
            {isLampOn ? 'Pull to Turn OFF' : 'Pull Cord to Turn ON'}
          </div>
        </div>

        {/* Login Form Card */}
        <motion.div
          animate={{
            opacity: isLampOn ? 1 : 0.45,
            y: isLampOn ? 0 : 5,
            scale: isLampOn ? 1 : 0.98,
          }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            background: isLampOn ? '#1A1A1A' : '#121214',
            border: '1px solid',
            borderColor: isLampOn ? 'rgba(196, 154, 108, 0.4)' : 'rgba(255,255,255,0.08)',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: isLampOn ? '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(196,154,108,0.2)' : '0 10px 30px rgba(0,0,0,0.5)',
            marginTop: '-1rem',
            transition: 'all 0.5s ease',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: isLampOn ? 'linear-gradient(135deg, #C49A6C, #E5B879)' : '#252528',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.75rem',
                color: isLampOn ? '#0F0F10' : '#A39C93',
                boxShadow: isLampOn ? '0 0 20px rgba(196,154,108,0.5)' : 'none',
                transition: 'all 0.5s ease',
              }}
            >
              <ShieldCheck size={22} />
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.25rem' }}>
              Admin Verification
            </h2>
            <p style={{ color: '#A39C93', fontSize: '0.82rem' }}>
              {isLampOn ? 'Lamp illuminated. Enter password to access.' : 'Pull lamp cord above to illuminate panel.'}
            </p>
          </div>

          {error && (
            <div
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1.25rem',
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Username Input */}
            <div>
              <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                Username
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: isLampOn ? '#C49A6C' : '#666' }} />
                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!isLampOn}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 2.6rem',
                    background: '#0F0F10',
                    border: '1px solid',
                    borderColor: isLampOn ? 'rgba(196, 154, 108, 0.3)' : 'rgba(255,255,255,0.08)',
                    borderRadius: '0.75rem',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                    opacity: isLampOn ? 1 : 0.6,
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Key size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: isLampOn ? '#C49A6C' : '#666' }} />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!isLampOn}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 2.6rem',
                    background: '#0F0F10',
                    border: '1px solid',
                    borderColor: isLampOn ? 'rgba(196, 154, 108, 0.3)' : 'rgba(255,255,255,0.08)',
                    borderRadius: '0.75rem',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                    opacity: isLampOn ? 1 : 0.6,
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isLampOn}
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '50px',
                background: isLampOn ? 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)' : '#333338',
                color: isLampOn ? '#0F0F10' : '#888',
                fontWeight: 800,
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: isLampOn ? 'pointer' : 'not-allowed',
                boxShadow: isLampOn ? '0 6px 20px rgba(196, 154, 108, 0.4)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
                transition: 'all 0.4s ease',
              }}
            >
              <span>Sign In to Admin Panel</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
