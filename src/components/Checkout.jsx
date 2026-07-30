'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { CreditCard, MapPin, Clock, CheckCircle, Coffee, ShieldCheck, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';

const STEPS = ['Delivery Info', 'Payment Gateway', 'Invoice Confirmation'];

export default function Checkout({ onDone }) {
  const [step, setStep] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery'); // 'delivery' | 'pickup'
  const [orderNum] = useState(() => Math.floor(Math.random() * 90000) + 10000);
  const { items, subtotal, tax, deliveryFee, total, clearCart } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const finalTotal = deliveryMethod === 'pickup' ? Math.max(0, total - deliveryFee) : total;

  const onDetailsNext = () => setStep(1);
  const onPaymentNext = () => setStep(2);
  const onPlaceOrder = () => {
    clearCart();
    setStep(3);
    setTimeout(() => onDone?.(orderNum), 400);
  };

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
          maxWidth: 880,
          width: '100%',
          padding: 'clamp(1.5rem, 4vw, 3rem)',
          boxShadow: '0 25px 80px rgba(0,0,0,0.85)',
          color: '#FFFFFF',
        }}
      >
        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          {STEPS.map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: i <= step ? 'linear-gradient(135deg, #C49A6C, #E5B879)' : '#0F0F10',
                border: '1px solid',
                borderColor: i <= step ? '#C49A6C' : 'rgba(196, 154, 108, 0.2)',
                color: i <= step ? '#0F0F10' : '#A39C93',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: i <= step ? '#F4E7D3' : '#A39C93',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }} className="hidden sm:inline">
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div style={{ width: 40, height: 1, background: 'rgba(196, 154, 108, 0.2)' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          
          {/* Left Form Area */}
          <div>
            {step === 0 && (
              <form onSubmit={handleSubmit(onDetailsNext)}>
                
                {/* Method Switcher */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      border: '1px solid',
                      borderColor: deliveryMethod === 'delivery' ? '#C49A6C' : 'rgba(196, 154, 108, 0.2)',
                      background: deliveryMethod === 'delivery' ? 'rgba(196, 154, 108, 0.15)' : '#0F0F10',
                      color: deliveryMethod === 'delivery' ? '#E5B879' : '#A39C93',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Truck size={16} />
                    <span>Courier Delivery</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      border: '1px solid',
                      borderColor: deliveryMethod === 'pickup' ? '#C49A6C' : 'rgba(196, 154, 108, 0.2)',
                      background: deliveryMethod === 'pickup' ? 'rgba(196, 154, 108, 0.15)' : '#0F0F10',
                      color: deliveryMethod === 'pickup' ? '#E5B879' : '#A39C93',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <Coffee size={16} />
                    <span>Café Express Pickup</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>First Name *</label>
                    <input
                      {...register('firstName', { required: true })}
                      placeholder="Jane"
                      style={{ width: '100%', padding: '0.75rem', background: '#0F0F10', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '0.75rem', color: '#FFFFFF', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Last Name *</label>
                    <input
                      {...register('lastName', { required: true })}
                      placeholder="Smith"
                      style={{ width: '100%', padding: '0.75rem', background: '#0F0F10', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '0.75rem', color: '#FFFFFF', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Email *</label>
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    placeholder="jane@example.com"
                    style={{ width: '100%', padding: '0.75rem', background: '#0F0F10', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '0.75rem', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                {deliveryMethod === 'delivery' && (
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Delivery Address *</label>
                    <input
                      {...register('address', { required: true })}
                      placeholder="742 Fifth Avenue, Suite 12B"
                      style={{ width: '100%', padding: '0.75rem', background: '#0F0F10', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '0.75rem', color: '#FFFFFF', outline: 'none' }}
                    />
                  </div>
                )}

                <button
                  type="submit"
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
                    marginTop: '1rem',
                  }}
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 1 && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '1rem' }}>
                  Select Payment Gateway
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  {['Credit / Debit Card (Stripe Ready)', 'Apple Pay / Google Pay', 'Cash on Delivery'].map((pay, i) => (
                    <label
                      key={pay}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.85rem',
                        background: '#0F0F10',
                        border: i === 0 ? '1px solid #C49A6C' : '1px solid rgba(196, 154, 108, 0.2)',
                        borderRadius: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      <input type="radio" name="payment" defaultChecked={i === 0} />
                      <CreditCard size={18} color="#C49A6C" />
                      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{pay}</span>
                    </label>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setStep(0)}
                    style={{
                      flex: 1,
                      padding: '0.9rem',
                      borderRadius: '50px',
                      background: 'rgba(255,255,255,0.08)',
                      color: '#F4E7D3',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={onPaymentNext}
                    style={{
                      flex: 2,
                      padding: '0.9rem',
                      borderRadius: '50px',
                      background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
                      color: '#0F0F10',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '1rem' }}>
                  Confirm Your Order
                </h4>
                <p style={{ color: '#A39C93', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Order #{orderNum} will be sent directly to our master roasters and kitchen staff upon confirmation.
                </p>

                <button
                  onClick={onPlaceOrder}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
                    color: '#0F0F10',
                    fontWeight: 700,
                    fontSize: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 25px rgba(196, 154, 108, 0.4)',
                  }}
                >
                  Place Order — ${finalTotal.toFixed(2)}
                </button>
              </div>
            )}
          </div>

          {/* Right Order Summary */}
          <div style={{
            background: '#0F0F10',
            padding: '1.5rem',
            borderRadius: '1.25rem',
            border: '1px solid rgba(196, 154, 108, 0.2)',
          }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#C49A6C', marginBottom: '1rem' }}>
              Order Summary
            </h4>

            <div style={{ maxHeight: 220, overflowY: 'auto', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {items.map((it) => (
                <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span>{it.name} (x{it.qty})</span>
                  <span style={{ color: '#C49A6C', fontWeight: 600 }}>${(it.price * it.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(196,154,108,0.2)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: '#A39C93' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {deliveryMethod === 'delivery' && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Delivery</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', color: '#FFFFFF', marginTop: '0.5rem', borderTop: '1px dashed rgba(196,154,108,0.2)', paddingTop: '0.5rem' }}>
                <span>Total</span>
                <span style={{ color: '#C49A6C' }}>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
