'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, viewportOptions } from './ScrollAnimations';
import { useCart } from './CartContext';
import { CreditCard, MapPin, Clock, CheckCircle, Coffee, ChevronRight, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

const STEPS = ['Details', 'Payment', 'Confirm'];

function StepIndicator({ step }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '2.5rem' }}>
      {STEPS.map((label, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
            <motion.div
              animate={{
                background: i <= step ? 'linear-gradient(135deg,#D4A373,#c17f40)' : 'rgba(212,163,115,0.15)',
                color: i <= step ? '#2C1810' : '#9ca3af',
                scale: i === step ? 1.15 : 1,
              }}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.85rem',
                border: i <= step ? 'none' : '1.5px solid rgba(212,163,115,0.3)',
              }}
            >
              {i < step ? '✓' : i + 1}
            </motion.div>
            <span style={{
              fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: i <= step ? 'var(--color-caramel)' : '#9ca3af',
            }}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{
              width: 60, height: 2, margin: '0 0.5rem', marginBottom: '1.2rem',
              background: i < step ? 'var(--color-caramel)' : 'rgba(212,163,115,0.2)',
              borderRadius: 1,
              transition: 'background 0.4s',
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '0.8rem 1.1rem',
  background: 'var(--bg-main)',
  border: '1.5px solid var(--border-subtle)',
  borderRadius: '0.75rem', color: 'var(--text-main)',
  fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
  outline: 'none', transition: 'border-color 0.2s',
};
const labelStyle = {
  display: 'block', fontSize: '0.75rem', fontWeight: 600,
  letterSpacing: '0.1em', textTransform: 'uppercase',
  color: 'var(--text-muted)', marginBottom: '0.4rem',
};

export default function Checkout({ onDone }) {
  const [step, setStep] = useState(0);
  const [orderNum] = useState(() => Math.floor(Math.random() * 90000) + 10000);
  const { items, subtotal, tax, deliveryFee, total, clearCart } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onDetailsNext = () => setStep(1);
  const onPaymentNext = () => setStep(2);
  const onPlaceOrder = () => {
    clearCart();
    setStep(3);
    setTimeout(() => onDone?.(orderNum), 200);
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.25 } },
  };

  return (
    <section id="checkout" style={{
      background: 'var(--bg-main)',
      color: 'var(--text-main)',
      padding: 'var(--section-py) 0',
      minHeight: '80vh',
      position: 'relative',
      transition: 'background-color 0.3s',
    }}>
      <div className="container-normal" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--color-caramel)' }}>
            Secure Checkout
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, color: 'var(--text-main)' }}>
            Complete Your Order
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>
          {/* Main form */}
          <div style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(24px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '2rem',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: 'var(--shadow-card)',
          }}>
            <StepIndicator step={step} />

            <AnimatePresence mode="wait">
              {/* Step 0: Details */}
              {step === 0 && (
                <motion.form key="details" variants={itemVariants} initial="hidden" animate="visible" exit="exit"
                  onSubmit={handleSubmit(onDetailsNext)}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '1.5rem' }}>
                    Delivery Details
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>First Name *</label>
                      <input {...register('firstName', { required: true })}
                        style={{ ...inputStyle, borderColor: errors.firstName ? '#ef4444' : 'var(--border-subtle)' }}
                        placeholder="Jane" />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name *</label>
                      <input {...register('lastName', { required: true })}
                        style={{ ...inputStyle, borderColor: errors.lastName ? '#ef4444' : 'var(--border-subtle)' }}
                        placeholder="Smith" />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Email *</label>
                    <input {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
                      type="email" style={{ ...inputStyle, borderColor: errors.email ? '#ef4444' : 'var(--border-subtle)' }}
                      placeholder="jane@example.com" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}><MapPin size={11} style={{ display: 'inline', marginRight: 4 }} />Delivery Address *</label>
                    <input {...register('address', { required: true })}
                      style={{ ...inputStyle, borderColor: errors.address ? '#ef4444' : 'var(--border-subtle)' }}
                      placeholder="123 Main Street, Apt 4B" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={labelStyle}><Clock size={11} style={{ display: 'inline', marginRight: 4 }} />Delivery Time</label>
                      <select {...register('deliveryTime')}
                        style={{ ...inputStyle, background: 'var(--bg-main)' }}>
                        {['ASAP (~30 min)', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '6:00 PM', '6:30 PM', '7:00 PM'].map(t => (
                          <option key={t} value={t} style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input {...register('phone')}
                        style={inputStyle} placeholder="+1 (555) 000-0000" />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Delivery Notes</label>
                    <textarea {...register('notes')} rows={2}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      placeholder="Leave at door, ring doorbell, allergy info…" />
                  </div>
                  <button type="submit" className="btn-primary ripple"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '0.95rem' }}>
                    Continue to Payment <ChevronRight size={16} />
                  </button>
                </motion.form>
              )}

              {/* Step 1: Payment */}
              {step === 1 && (
                <motion.form key="payment" variants={itemVariants} initial="hidden" animate="visible" exit="exit"
                  onSubmit={handleSubmit(onPaymentNext)}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '1.5rem' }}>
                    Payment Information
                  </h3>
                  <div style={{
                    padding: '1rem 1.25rem',
                    background: 'rgba(74,164,87,0.08)',
                    border: '1px solid rgba(74,164,87,0.25)',
                    borderRadius: '0.75rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    marginBottom: '1.5rem',
                  }}>
                    <AlertCircle size={18} color="#4ade80" />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-sub)' }}>
                      Demo mode — no real payment is processed. Use any card number.
                    </span>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}><CreditCard size={11} style={{ display: 'inline', marginRight: 4 }} />Card Number</label>
                    <input {...register('card', { required: true })}
                      style={inputStyle} placeholder="4242 4242 4242 4242" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={labelStyle}>Expiry</label>
                      <input {...register('expiry', { required: true })}
                        style={inputStyle} placeholder="MM / YY" />
                    </div>
                    <div>
                      <label style={labelStyle}>CVC</label>
                      <input {...register('cvc', { required: true })}
                        style={inputStyle} placeholder="•••" />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Name on Card</label>
                    <input {...register('cardName', { required: true })}
                      style={inputStyle} placeholder="Jane Smith" />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="button" onClick={() => setStep(0)}
                      className="btn-outline" style={{ flex: 1, justifyContent: 'center', color: 'var(--text-main)', borderColor: 'var(--border-subtle)', padding: '0.9rem' }}>
                      Back
                    </button>
                    <button type="submit" className="btn-primary ripple"
                      style={{ flex: 2, justifyContent: 'center', padding: '0.9rem', fontSize: '0.95rem' }}>
                      Review Order <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.form>
              )}

              {/* Step 2: Confirm */}
              {step === 2 && (
                <motion.div key="confirm" variants={itemVariants} initial="hidden" animate="visible" exit="exit">
                  <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '1.5rem' }}>
                    Confirm Order
                  </h3>
                  <div style={{ marginBottom: '1.5rem' }}>
                    {items.map(item => (
                      <div key={item.id} style={{
                        display: 'flex', gap: '0.75rem', alignItems: 'center',
                        padding: '0.75rem 0',
                        borderBottom: '1px solid var(--border-subtle)',
                      }}>
                        <img src={item.img} alt={item.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: '0.5rem' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>×{item.qty}</div>
                        </div>
                        <div style={{ color: '#D4A373', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="button" onClick={() => setStep(1)}
                      className="btn-outline" style={{ flex: 1, justifyContent: 'center', color: 'var(--text-main)', borderColor: 'var(--border-subtle)', padding: '0.9rem' }}>
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      type="button" onClick={onPlaceOrder}
                      className="btn-primary ripple"
                      style={{ flex: 2, justifyContent: 'center', padding: '0.9rem', fontSize: '0.95rem' }}>
                      Place Order · ${total.toFixed(2)}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary sidebar */}
          <div style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '1.5rem',
            padding: '1.5rem',
            position: 'sticky',
            top: '6rem',
            boxShadow: 'var(--shadow-soft)',
          }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-main)', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
              Order Summary
            </h4>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>{item.name} ×{item.qty}</span>
                <span style={{ fontSize: '0.85rem', color: '#D4A373', fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '1rem', paddingTop: '1rem' }}>
              {[
                ['Subtotal', `$${subtotal.toFixed(2)}`],
                ['Delivery', `$${deliveryFee.toFixed(2)}`],
                ['Tax', `$${tax.toFixed(2)}`],
              ].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{l}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-sub)' }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>Total</span>
                <span style={{ fontWeight: 800, color: '#D4A373', fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>${total.toFixed(2)}</span>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(212,163,115,0.08)', borderRadius: '0.75rem', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#D4A373', fontSize: '0.8rem', fontWeight: 600 }}>
                <Coffee size={14} /> Est. delivery: 25–40 min
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #checkout > div > div:last-child { grid-template-columns: 1fr !important; }
          #checkout > div > div:last-child > div:last-child { position: static !important; }
        }
      `}</style>
    </section>
  );
}
