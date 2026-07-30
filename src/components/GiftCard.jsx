'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from './ScrollAnimations';
import { Gift, Coffee, Heart, Star, Check, X, CreditCard } from 'lucide-react';

const AMOUNTS = [25, 50, 100, 150, 200];

const CARD_DESIGNS = [
  {
    id: 1,
    name: 'Classic Espresso',
    bg: 'linear-gradient(135deg,#2C1810 0%,#4A2C2A 50%,#1a0e08 100%)',
    accent: '#D4A373',
    pattern: '☕',
  },
  {
    id: 2,
    name: 'Midnight Rose',
    bg: 'linear-gradient(135deg,#1a0a1e 0%,#3d1a45 50%,#0f0614 100%)',
    accent: '#ec4899',
    pattern: '🌹',
  },
  {
    id: 3,
    name: 'Golden Harvest',
    bg: 'linear-gradient(135deg,#1a1200 0%,#3d2e00 50%,#0a0800 100%)',
    accent: '#eab308',
    pattern: '✨',
  },
];

function GiftCardPreview({ design, amount, recipientName, message, senderName }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        aspectRatio: '16/9',
        borderRadius: '1.25rem',
        background: design.bg,
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 20px 60px ${design.accent}30, 0 4px 20px rgba(0,0,0,0.3)`,
        border: `1px solid ${design.accent}25`,
      }}
    >
      {/* Pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '8rem', opacity: 0.05, userSelect: 'none',
      }}>
        {design.pattern}
      </div>

      {/* Corner glow */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${design.accent}20 0%, transparent 70%)` }} />

      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${design.accent}25`, border: `1px solid ${design.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Coffee size={14} color={design.accent} />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', color: '#FFF8F0', fontSize: '1rem', fontWeight: 600 }}>Velvet Bean</span>
          </div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,248,240,0.4)' }}>Gift Card</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: design.accent, lineHeight: 1 }}>
            ${amount || '—'}
          </div>
          <div style={{ fontSize: '0.6rem', color: 'rgba(255,248,240,0.4)', marginTop: '0.15rem' }}>USD VALUE</div>
        </div>
      </div>

      {/* Middle */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '1.5rem' }}>
        {recipientName ? (
          <div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,248,240,0.35)', marginBottom: '0.2rem' }}>For</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#FFF8F0', fontStyle: 'italic' }}>{recipientName}</div>
          </div>
        ) : (
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'rgba(255,248,240,0.3)', fontStyle: 'italic' }}>Recipient Name</div>
        )}
        {message && (
          <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: 'rgba(255,248,240,0.5)', fontStyle: 'italic', maxWidth: '60%', lineHeight: 1.4 }}>
            "{message}"
          </div>
        )}
      </div>

      {/* Bottom */}
      <div style={{ position: 'absolute', bottom: '1.25rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 1 }}>
        <div>
          <div style={{ fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,248,240,0.3)', marginBottom: '0.15rem' }}>From</div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(255,248,240,0.6)' }}>{senderName || 'Your Name'}</div>
        </div>
        <div style={{ fontSize: '0.55rem', letterSpacing: '0.08em', color: 'rgba(255,248,240,0.2)', textAlign: 'right' }}>
          <div>No expiry · Redeemable at</div>
          <div style={{ color: design.accent, opacity: 0.7 }}>all Velvet Bean locations</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GiftCard() {
  const [selectedDesign, setSelectedDesign] = useState(CARD_DESIGNS[0]);
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const finalAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;

  const handlePurchase = (e) => {
    e.preventDefault();
    setPurchased(true);
  };

  return (
    <section id="gift-cards" style={{ background: 'var(--bg-main)', color: 'var(--text-main)', padding: 'var(--section-py) 0', position: 'relative', overflow: 'hidden', transition: 'background-color 0.3s' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 70% 50%, rgba(212,163,115,0.07) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--color-caramel)' }}>
            Give the Gift of Coffee
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
            Velvet Bean Gift Cards
          </h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            The perfect gift for every occasion. Share the love, one cup at a time.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {purchased ? (
            <motion.div key="success"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 280 }}
                style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg,#D4A373,#c17f40)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 0 40px rgba(212,163,115,0.4)' }}>
                <Check size={48} color="#2C1810" />
              </motion.div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>Gift Card Sent! 🎉</h3>
              <p style={{ color: 'var(--text-sub)', maxWidth: 400, margin: '0 auto 2rem', lineHeight: 1.7 }}>
                Your ${finalAmount} gift card has been sent to {recipientEmail || 'the recipient'}. They'll love it!
              </p>
              <div style={{ maxWidth: 480, margin: '0 auto 2rem' }}>
                <GiftCardPreview design={selectedDesign} amount={finalAmount} recipientName={recipientName} message={message} senderName={senderName} />
              </div>
              <button onClick={() => setPurchased(false)} className="btn-outline" style={{ color: 'var(--text-main)', borderColor: 'var(--border-subtle)' }}>
                Send Another Gift
              </button>
            </motion.div>
          ) : (
            <motion.div key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
              {/* Left: Form */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}>
                <form onSubmit={handlePurchase}>
                  {/* Design selection */}
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      Card Design
                    </label>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      {CARD_DESIGNS.map(design => (
                        <button key={design.id} type="button" onClick={() => setSelectedDesign(design)}
                          style={{
                            flex: 1, aspectRatio: '16/9', borderRadius: '0.75rem',
                            background: design.bg, cursor: 'pointer',
                            border: selectedDesign.id === design.id ? `2px solid ${design.accent}` : '2px solid transparent',
                            boxShadow: selectedDesign.id === design.id ? `0 0 20px ${design.accent}40` : 'none',
                            transition: 'all 0.2s', overflow: 'hidden', position: 'relative',
                          }}>
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.2rem' }}>
                            <span style={{ fontSize: '1.4rem' }}>{design.pattern}</span>
                            <span style={{ fontSize: '0.6rem', color: design.accent, fontWeight: 600, letterSpacing: '0.06em' }}>{design.name}</span>
                          </div>
                          {selectedDesign.id === design.id && (
                            <div style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, borderRadius: '50%', background: design.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Check size={9} color="#fff" strokeWidth={3} />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount */}
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      Amount
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                      {AMOUNTS.map(amt => (
                        <button key={amt} type="button" onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                          style={{
                            padding: '0.5rem 1.1rem', borderRadius: '0.6rem', border: '1.5px solid',
                            borderColor: selectedAmount === amt && !customAmount ? '#D4A373' : 'var(--border-subtle)',
                            background: selectedAmount === amt && !customAmount ? 'rgba(212,163,115,0.15)' : 'var(--bg-card)',
                            color: selectedAmount === amt && !customAmount ? '#D4A373' : 'var(--text-sub)',
                            fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
                            transition: 'all 0.2s',
                          }}>
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number" placeholder="Custom amount (e.g. 75)"
                      value={customAmount}
                      onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      className="input-premium"
                    />
                  </div>

                  {/* Recipient */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      Recipient's Name *
                    </label>
                    <input required value={recipientName} onChange={e => setRecipientName(e.target.value)}
                      placeholder="Jane Smith" className="input-premium" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      Recipient's Email *
                    </label>
                    <input required type="email" value={recipientEmail} onChange={e => setRecipientEmail(e.target.value)}
                      placeholder="jane@example.com" className="input-premium" />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      Your Name
                    </label>
                    <input value={senderName} onChange={e => setSenderName(e.target.value)}
                      placeholder="Your name" className="input-premium" />
                  </div>
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                      Personal Message
                    </label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows={2}
                      placeholder="Enjoy a special treat on me! ☕" className="input-premium" style={{ resize: 'vertical' }} />
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button type="button" onClick={() => setShowPreview(true)}
                      className="btn-outline"
                      style={{ flex: 1, justifyContent: 'center', color: 'var(--text-main)', borderColor: 'var(--border-subtle)' }}>
                      Preview Card
                    </button>
                    <button type="submit" className="btn-primary ripple"
                      style={{ flex: 2, justifyContent: 'center', fontSize: '0.95rem', padding: '0.9rem', color: '#000000', fontWeight: 800 }}>
                      <Gift size={16} /> Send Gift · ${finalAmount || '—'}
                    </button>
                  </div>
                </form>
              </motion.div>

              {/* Right: Live preview */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
                style={{ position: 'sticky', top: '6rem' }}>
                <div style={{ marginBottom: '1rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Live Preview
                </div>
                <GiftCardPreview design={selectedDesign} amount={finalAmount} recipientName={recipientName} message={message} senderName={senderName} />
                <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', boxShadow: 'var(--shadow-soft)' }}>
                  {[['Value', `$${finalAmount || '—'}`], ['Design', selectedDesign.name], ['Delivery', 'Instant email'], ['Expiry', 'Never expires'], ['Redeemable at', 'All Velvet Bean locations']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{k}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full preview modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowPreview(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }}
              onClick={e => e.stopPropagation()}
              style={{ width: '100%', maxWidth: 600, position: 'relative' }}>
              <button onClick={() => setShowPreview(false)}
                style={{ position: 'absolute', top: -40, right: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <X size={16} />
              </button>
              <GiftCardPreview design={selectedDesign} amount={finalAmount} recipientName={recipientName} message={message} senderName={senderName} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 860px) {
          #gift-cards > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
