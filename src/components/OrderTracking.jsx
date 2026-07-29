'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewportOptions } from './ScrollAnimations';
import { CheckCircle, Clock, ChefHat, Package, Truck, Star, Coffee } from 'lucide-react';

const STATUSES = [
  { icon: CheckCircle, label: 'Order Received', desc: 'We got your order and are reviewing it.', color: '#4ade80' },
  { icon: ChefHat,     label: 'Preparing',      desc: 'Our baristas are crafting your order with love.', color: '#D4A373' },
  { icon: Package,     label: 'Ready',           desc: 'Your order is ready and being packed.', color: '#60a5fa' },
  { icon: Truck,       label: 'On the Way',      desc: 'Your order is on its way to you!', color: '#f472b6' },
  { icon: Star,        label: 'Delivered',       desc: 'Enjoy your Velvet Bean experience! ☕', color: '#a78bfa' },
];

export default function OrderTracking({ orderNumber }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [seconds, setSeconds] = useState(1800); // 30 min countdown

  // Auto-advance for demo
  useEffect(() => {
    if (currentStep >= STATUSES.length - 1) return;
    const timer = setTimeout(() => setCurrentStep(s => s + 1), 4000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // Countdown
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <section id="order-tracking" style={{
      background: 'var(--bg-main)',
      color: 'var(--text-main)',
      padding: 'var(--section-py) 0',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background-color 0.3s',
    }}>
      {/* Ambient blobs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,163,115,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container-normal">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--color-caramel)' }}>
            Live Status
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Track Your Order
          </h2>
          {orderNumber && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.2rem', background: 'rgba(212,163,115,0.12)', border: '1px solid var(--border-subtle)', borderRadius: '50px', color: '#D4A373', fontSize: '0.85rem', fontWeight: 600 }}>
              <Coffee size={14} /> Order #{orderNumber}
            </div>
          )}
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
          {/* Status timeline */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
            style={{
              background: 'var(--bg-card)',
              backdropFilter: 'blur(24px)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2rem',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-card)',
            }}>
            {STATUSES.map((status, i) => {
              const Icon = status.icon;
              const isActive = i === currentStep;
              const isDone = i < currentStep;

              return (
                <div key={status.label} style={{ display: 'flex', gap: '1.25rem', position: 'relative' }}>
                  {/* Connector line */}
                  {i < STATUSES.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      left: 24,
                      top: 52,
                      width: 2,
                      height: 'calc(100% - 12px)',
                      background: isDone ? status.color : 'var(--border-subtle)',
                      transition: 'background 0.6s',
                      borderRadius: 1,
                    }} />
                  )}

                  {/* Icon */}
                  <motion.div
                    animate={{
                      background: isActive || isDone ? status.color : 'var(--bg-main)',
                      scale: isActive ? [1, 1.1, 1] : 1,
                      boxShadow: isActive ? `0 0 20px ${status.color}50` : 'none',
                    }}
                    transition={{ scale: { duration: 0.8, repeat: isActive ? Infinity : 0 } }}
                    style={{
                      width: 50, height: 50, borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `2px solid ${isActive || isDone ? status.color : 'var(--border-subtle)'}`,
                    }}
                  >
                    <Icon size={22} color={isActive || isDone ? '#fff' : 'var(--text-muted)'} />
                  </motion.div>

                  {/* Text */}
                  <div style={{ paddingBottom: i < STATUSES.length - 1 ? '2rem' : 0, flex: 1 }}>
                    <div style={{
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: isActive ? 'var(--text-main)' : isDone ? 'var(--text-sub)' : 'var(--text-muted)',
                      marginBottom: '0.25rem',
                      fontFamily: 'var(--font-sans)',
                      transition: 'color 0.4s',
                    }}>
                      {status.label}
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{ marginLeft: '0.5rem', fontSize: '0.7rem', background: `${status.color}25`, color: status.color, padding: '0.15rem 0.55rem', borderRadius: '20px', fontWeight: 600 }}>
                          In Progress
                        </motion.span>
                      )}
                      {isDone && (
                        <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', background: 'rgba(74,222,128,0.15)', color: '#4ade80', padding: '0.15rem 0.55rem', borderRadius: '20px', fontWeight: 600 }}>
                          Done
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {status.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* ETA card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Countdown */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
              style={{
                background: 'linear-gradient(135deg,rgba(212,163,115,0.12),rgba(193,127,64,0.06))',
                border: '1px solid var(--border-subtle)',
                borderRadius: '1.5rem', padding: '2rem', textAlign: 'center',
                boxShadow: 'var(--shadow-soft)',
              }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Estimated Arrival
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', fontWeight: 700, lineHeight: 1, color: '#D4A373' }}>
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                minutes remaining
              </div>
            </motion.div>

            {/* Current status */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-soft)',
              }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Current Status
              </div>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                {(() => { const Icon = STATUSES[currentStep].icon; return <Icon size={20} color={STATUSES[currentStep].color} />; })()}
                <span style={{ color: STATUSES[currentStep].color, fontWeight: 600, fontSize: '0.95rem' }}>
                  {STATUSES[currentStep].label}
                </span>
              </motion.div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-sub)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                {STATUSES[currentStep].desc}
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-soft)',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-sub)' }}>Progress</span>
                <span style={{ fontSize: '0.8rem', color: '#D4A373', fontWeight: 600 }}>
                  {Math.round((currentStep / (STATUSES.length - 1)) * 100)}%
                </span>
              </div>
              <div style={{ height: 8, background: 'var(--border-subtle)', borderRadius: 4, overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: `${(currentStep / (STATUSES.length - 1)) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ height: '100%', background: 'linear-gradient(90deg,#D4A373,#c17f40)', borderRadius: 4 }}
                />
              </div>
            </motion.div>

            <button
              className="btn-outline"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ color: 'var(--text-main)', borderColor: 'var(--border-subtle)', fontSize: '0.85rem', justifyContent: 'center' }}
            >
              <Clock size={14} /> Contact Support
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #order-tracking > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
