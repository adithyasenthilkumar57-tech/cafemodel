'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, ChefHat, Package, Truck, Star, Coffee, Sparkles, X } from 'lucide-react';

const STATUSES = [
  { icon: CheckCircle, label: 'Order Received', desc: 'Received & sent to Master Roaster.', color: '#C49A6C' },
  { icon: ChefHat,     label: 'Master Roasting & Crafting', desc: 'Espresso extraction & artisan pastry prep.', color: '#E5B879' },
  { icon: Package,     label: 'Luxury Packaging', desc: 'Sealed with warmth in eco-reserve packaging.', color: '#60a5fa' },
  { icon: Truck,       label: 'Out for Express Delivery', desc: 'Curated delivery courier en route to your address.', color: '#22c55e' },
  { icon: Star,        label: 'Delivered with Excellence', desc: 'Enjoy your Velvet Bean Grand Reserve moment!', color: '#C49A6C' },
];

export default function OrderTracking({ orderNumber }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [seconds, setSeconds] = useState(1500); // 25 min countdown

  useEffect(() => {
    if (currentStep >= STATUSES.length - 1) return;
    const timer = setTimeout(() => setCurrentStep(s => s + 1), 4500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 250,
      background: 'rgba(15, 15, 16, 0.95)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      overflowY: 'auto',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: '#1A1A1A',
          border: '1px solid rgba(196, 154, 108, 0.3)',
          borderRadius: '1.75rem',
          maxWidth: 780,
          width: '100%',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.85)',
          color: '#FFFFFF',
          position: 'relative',
        }}
      >
        <button
          onClick={() => window.location.reload()}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: 'none',
            color: '#A39C93',
            cursor: 'pointer',
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#C49A6C',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}>
            <Sparkles size={14} />
            <span>LIVE ORDER TRACKING</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
            Order #{orderNumber || '84920'}
          </h2>
          <div style={{ color: '#E5B879', fontSize: '1.1rem', fontWeight: 600 }}>
            Estimated Arrival: {mins}m {secs < 10 ? `0${secs}` : secs}s
          </div>
        </div>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {STATUSES.map((st, i) => {
            const Icon = st.icon;
            const isActive = i === currentStep;
            const isDone = i < currentStep;

            return (
              <div key={st.label} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: isDone || isActive ? st.color : '#0F0F10',
                  border: '1px solid',
                  borderColor: isDone || isActive ? st.color : 'rgba(196, 154, 108, 0.2)',
                  color: isDone || isActive ? '#0F0F10' : '#A39C93',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: isActive ? `0 0 20px ${st.color}` : 'none',
                }}>
                  <Icon size={20} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: isDone || isActive ? '#FFFFFF' : '#A39C93',
                  }}>
                    {st.label}
                  </div>
                  <div style={{ color: '#A39C93', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                    {st.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => window.location.reload()}
          style={{
            width: '100%',
            padding: '0.9rem',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
            color: '#0F0F10',
            fontWeight: 700,
            fontSize: '0.9rem',
            border: 'none',
            cursor: 'pointer',
            marginTop: '2.5rem',
          }}
        >
          Return to Home Page
        </button>
      </motion.div>
    </div>
  );
}
