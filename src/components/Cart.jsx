'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Coffee } from 'lucide-react';
import { useCart } from './CartContext';
import { useState } from 'react';

export default function Cart() {
  const onCheckout = () => {
    if (typeof window !== 'undefined' && window.__showCheckout) {
      window.__showCheckout();
    }
  };
  const { items, removeItem, updateQty, subtotal, tax, deliveryFee, total, totalItems, isOpen, setIsOpen } = useCart();
  const [removing, setRemoving] = useState(null);

  const handleRemove = (id) => {
    setRemoving(id);
    setTimeout(() => { removeItem(id); setRemoving(null); }, 300);
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
              position: 'fixed', inset: 0,
              background: 'rgba(12,6,3,0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 300,
            }}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            style={{
              position: 'fixed',
              top: 0, right: 0, bottom: 0,
              width: 'clamp(290px, 92vw, 420px)',
              maxWidth: '100vw',
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              zIndex: 301,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-24px 0 80px rgba(0,0,0,0.3)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem',
              background: 'linear-gradient(135deg,#2C1810,#4A2C2A)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(212,163,115,0.2)',
                  border: '1px solid rgba(212,163,115,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ShoppingBag size={18} color="#D4A373" />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', color: '#FFF8F0', fontSize: '1.1rem', fontWeight: 700 }}>
                    Your Order
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,248,240,0.55)' }}>
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{
                background: 'rgba(255,248,240,0.08)', border: '1px solid rgba(255,248,240,0.12)',
                borderRadius: '50%', width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'rgba(255,248,240,0.7)',
              }}>
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', background: 'var(--bg-main)' }}>
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      height: '100%', paddingTop: '4rem', gap: '1rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <Coffee size={52} strokeWidth={1} />
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-sub)' }}>
                      Your cart is empty
                    </div>
                    <p style={{ fontSize: '0.85rem', textAlign: 'center', maxWidth: 220, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                      Browse our menu and add your favourite items!
                    </p>
                    <button
                      className="btn-primary"
                      onClick={() => { setIsOpen(false); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }); }}
                      style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}
                    >
                      Browse Menu
                    </button>
                  </motion.div>
                ) : (
                  items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: removing === item.id ? 0 : 1, x: removing === item.id ? 40 : 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        display: 'flex', gap: '0.75rem',
                        padding: '0.85rem',
                        marginBottom: '0.75rem',
                        background: 'var(--bg-card)',
                        borderRadius: '1rem',
                        border: '1px solid var(--border-subtle)',
                        alignItems: 'center',
                      }}
                    >
                      <img src={item.img} alt={item.name} style={{
                        width: 60, height: 60, objectFit: 'cover',
                        borderRadius: '0.75rem', flexShrink: 0,
                      }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name}
                        </div>
                        <div style={{ color: '#D4A373', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'var(--font-display)' }}>
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                        <button onClick={() => item.qty === 1 ? handleRemove(item.id) : updateQty(item.id, item.qty - 1)}
                          style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: item.qty === 1 ? 'rgba(239,68,68,0.15)' : 'var(--bg-main)',
                            border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: item.qty === 1 ? '#ef4444' : 'var(--text-main)',
                          }}>
                          {item.qty === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                        </button>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', minWidth: 20, textAlign: 'center', color: 'var(--text-main)' }}>
                          {item.qty}
                        </span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}
                          style={{
                            width: 28, height: 28, borderRadius: '50%',
                            background: 'rgba(212,163,115,0.15)',
                            border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#D4A373',
                          }}>
                          <Plus size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{
                padding: '1.25rem 1.5rem',
                borderTop: '1px solid var(--border-subtle)',
                background: 'var(--bg-card)',
              }}>
                {[
                  ['Subtotal', `$${subtotal.toFixed(2)}`],
                  ['Delivery', `$${deliveryFee.toFixed(2)}`],
                  ['Tax (8.75%)', `$${tax.toFixed(2)}`],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>{label}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginTop: '0.75rem', paddingTop: '0.75rem',
                  borderTop: '2px solid var(--border-subtle)',
                }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-sans)' }}>Total</span>
                  <span style={{ fontWeight: 800, color: '#D4A373', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
                    ${total.toFixed(2)}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary ripple"
                  onClick={() => { setIsOpen(false); onCheckout?.(); }}
                  style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', fontSize: '0.95rem', padding: '0.9rem' }}
                >
                  Checkout <ArrowRight size={16} />
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
