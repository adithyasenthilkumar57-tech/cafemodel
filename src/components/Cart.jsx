'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Coffee, Tag, Sparkles } from 'lucide-react';
import { useCart } from './CartContext';
import { useState } from 'react';

export default function Cart() {
  const { items, removeItem, updateQty, subtotal, tax, deliveryFee, total, totalItems, isOpen, setIsOpen } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState('');
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'VELVET10') {
      setDiscount(0.10);
      setPromoApplied('10% VIP Discount Applied!');
      setPromoError('');
    } else if (code === 'LUXURY20') {
      setDiscount(0.20);
      setPromoApplied('20% Grand Reserve Discount Applied!');
      setPromoError('');
    } else if (code === 'COFFEEVIP') {
      setDiscount(0.15);
      setPromoApplied('15% Coffee Sommelier Discount Applied!');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try VELVET10');
      setPromoApplied('');
    }
  };

  const discountAmount = subtotal * discount;
  const finalTotal = Math.max(0, total - discountAmount);

  const onCheckout = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined' && window.__showCheckout) {
      window.__showCheckout();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 300,
            }}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'clamp(320px, 92vw, 440px)',
              maxWidth: '100vw',
              background: '#1A1A1A',
              color: '#FFFFFF',
              zIndex: 301,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.8)',
              borderLeft: '1px solid rgba(196, 154, 108, 0.25)',
            }}
          >
            {/* Drawer Header */}
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #2B1E16 0%, #0F0F10 100%)',
              borderBottom: '1px solid rgba(196, 154, 108, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(196,154,108,0.4)',
                }}>
                  <ShoppingBag size={20} color="#0F0F10" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', color: '#FFFFFF', fontSize: '1.2rem', fontWeight: 700 }}>
                    Your Luxury Cart
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#C49A6C', fontWeight: 500 }}>
                    {totalItems} {totalItems === 1 ? 'artisan item' : 'artisan items'}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(196, 154, 108, 0.25)',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#FFFFFF',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', background: '#0F0F10' }}>
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      paddingTop: '3rem',
                      gap: '1rem',
                      color: '#A39C93',
                    }}
                  >
                    <Coffee size={56} strokeWidth={1} color="#C49A6C" />
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#FFFFFF' }}>
                      Your order is empty
                    </div>
                    <p style={{ fontSize: '0.85rem', textAlign: 'center', maxWidth: 240, lineHeight: 1.6 }}>
                      Explore our handcrafted coffee, single-origin brews, and artisan bakery delicacies.
                    </p>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      style={{
                        padding: '0.75rem 1.75rem',
                        borderRadius: '50px',
                        background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
                        color: '#0F0F10',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Browse Culinary Menu
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      style={{
                        display: 'flex',
                        gap: '0.85rem',
                        padding: '0.85rem',
                        marginBottom: '0.85rem',
                        background: '#1A1A1A',
                        borderRadius: '1rem',
                        border: '1px solid rgba(196, 154, 108, 0.15)',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{
                          width: 64,
                          height: 64,
                          objectFit: 'cover',
                          borderRadius: '0.75rem',
                          flexShrink: 0,
                        }}
                      />

                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '0.2rem' }}>
                          {item.name}
                        </div>
                        <div style={{ color: '#C49A6C', fontSize: '0.85rem', fontWeight: 700 }}>
                          ${item.price.toFixed(2)}
                        </div>

                        {/* Qty Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
                          <button
                            onClick={() => updateQty(item.id, item.qty - 1)}
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              background: '#0F0F10',
                              border: '1px solid rgba(196, 154, 108, 0.3)',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: 20, textAlign: 'center' }}>
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              background: '#0F0F10',
                              border: '1px solid rgba(196, 154, 108, 0.3)',
                              color: '#FFFFFF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#A39C93',
                          cursor: 'pointer',
                          padding: '0.4rem',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Drawer Footer & Checkout */}
            {items.length > 0 && (
              <div style={{
                padding: '1.25rem',
                background: '#1A1A1A',
                borderTop: '1px solid rgba(196, 154, 108, 0.2)',
              }}>
                {/* Promo Code Input */}
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Tag size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#C49A6C' }} />
                      <input
                        type="text"
                        placeholder="Promo Code (e.g. VELVET10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.55rem 0.75rem 0.55rem 2.2rem',
                          background: '#0F0F10',
                          border: '1px solid rgba(196, 154, 108, 0.25)',
                          borderRadius: '50px',
                          color: '#FFFFFF',
                          fontSize: '0.8rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                    <button
                      onClick={handleApplyPromo}
                      style={{
                        padding: '0.55rem 1.1rem',
                        borderRadius: '50px',
                        background: 'rgba(196, 154, 108, 0.2)',
                        border: '1px solid #C49A6C',
                        color: '#E5B879',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && <div style={{ color: '#22c55e', fontSize: '0.75rem', marginTop: '0.3rem', fontWeight: 500 }}>{promoApplied}</div>}
                  {promoError && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.3rem' }}>{promoError}</div>}
                </div>

                {/* Subtotal breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: '#A39C93', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal</span>
                    <span style={{ color: '#FFFFFF' }}>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#22c55e' }}>
                      <span>VIP Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Est. Tax & Service</span>
                    <span style={{ color: '#FFFFFF' }}>${tax.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', color: '#C49A6C', borderTop: '1px dashed rgba(196,154,108,0.2)', paddingTop: '0.5rem', marginTop: '0.2rem' }}>
                    <span>Total Amount</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={onCheckout}
                  style={{
                    width: '100%',
                    padding: '0.95rem',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
                    color: '#0F0F10',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 6px 20px rgba(196, 154, 108, 0.35)',
                  }}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
