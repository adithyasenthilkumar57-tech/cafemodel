'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Coffee, Bot } from 'lucide-react';

const SUGGESTIONS = [
  'What coffee do you recommend?',
  'What are your opening hours?',
  'Do you offer vegan options?',
  'How do I reserve a table?',
];

const BOT_RESPONSES = {
  default: "I'm Velvet Bean's AI assistant! I can help with menu recommendations, reservations, opening hours, or anything about our café. What can I help you with? ☕",
  recommend: "Our most-loved drinks are the **Nitro Cold Brew** (rich, velvety, nitrogen-infused), the **Signature Latte** (smooth caramel drizzle), and the **Rose Cardamom Latte** (floral & fragrant). For desserts, the **Burnt Basque Cheesecake** is an absolute must! 🍰",
  hours: "We're open:\n• **Downtown**: Mon–Fri 7AM–10PM, Sat–Sun 8AM–11PM\n• **Midtown**: Mon–Fri 6AM–9PM, Sat 8AM–8PM\n\nWe're busiest on weekend mornings — arrive early for the best seats! ⏰",
  vegan: "Yes! All our espresso drinks can be made with **oat milk, almond milk, soy, or coconut milk** at no extra charge. Our kitchen labels all vegan items on the menu. The Avocado Toast, Matcha Latte, and most dessert-free items are great choices! 🌱",
  reserve: "Reserving is easy! Scroll up to our **Reservation** section and fill in your preferred date, time, guest count, and any special requests. We'll confirm within 2 hours. For same-day bookings, call us at +1 (212) 555-0101. 📅",
  wifi: "Yes — we have blazing-fast **1Gbps WiFi** available at all seating areas. Ask your barista for the daily password. We also have power outlets at our co-working tables. Great for remote work! 💻",
  parking: "Our Downtown location has a dedicated parking lot behind the building (free for 2 hours with café receipt). The Midtown location is metro-accessible — the subway is 2 minutes away! 🚗",
  menu: "Our menu features **Coffee, Espresso, Cold Brew, Tea, Matcha, Desserts, Breakfast, and Seasonal Specials**. Highlights include the Nitro Cold Brew, Tiramisu Cake, and Chef's Seasonal Latte. Explore the full menu above! 🍽️",
  price: "Our drinks start at **$4.75** for an Espresso and go up to **$9** for specialty seasonal drinks. Food items range from **$5.50** (Croissant) to **$15** (full breakfast plates). We also offer loyalty rewards — earn 1 point per dollar! 💳",
};

function getResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes('recommend') || lower.includes('best') || lower.includes('popular') || lower.includes('try')) return BOT_RESPONSES.recommend;
  if (lower.includes('hour') || lower.includes('open') || lower.includes('close') || lower.includes('time')) return BOT_RESPONSES.hours;
  if (lower.includes('vegan') || lower.includes('dairy') || lower.includes('plant') || lower.includes('oat')) return BOT_RESPONSES.vegan;
  if (lower.includes('reserv') || lower.includes('book') || lower.includes('table') || lower.includes('seat')) return BOT_RESPONSES.reserve;
  if (lower.includes('wifi') || lower.includes('internet') || lower.includes('work')) return BOT_RESPONSES.wifi;
  if (lower.includes('park')) return BOT_RESPONSES.parking;
  if (lower.includes('menu') || lower.includes('food') || lower.includes('drink') || lower.includes('eat')) return BOT_RESPONSES.menu;
  if (lower.includes('price') || lower.includes('cost') || lower.includes('expensive') || lower.includes('cheap') || lower.includes('how much')) return BOT_RESPONSES.price;
  return "That's a great question! For detailed assistance, feel free to call us at **+1 (212) 555-0101** or send us a message via the Contact form below. Our team is happy to help! 😊";
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: BOT_RESPONSES.default, time: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text) => {
    if (!text.trim()) return;
    const userMsg = { from: 'user', text, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getResponse(text), time: new Date() }]);
    }, 900 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        animate={{ scale: open ? 0.9 : 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: 'clamp(1rem, 3vw, 2rem)',
          right: 'clamp(1rem, 3vw, 2rem)',
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg,#D4A373,#c17f40)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(212,163,115,0.5)',
          zIndex: 200,
          color: '#2C1810',
        }}
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={24} /></motion.span>
            : <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={24} /></motion.span>
          }
        </AnimatePresence>
      </motion.button>

      {/* Unread dot */}
      {!open && (
        <div style={{
          position: 'fixed',
          bottom: 'calc(clamp(1rem, 3vw, 2rem) + 2.5rem)',
          right: 'clamp(1rem, 3vw, 2rem)',
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: '#ef4444',
          border: '2px solid #fff',
          zIndex: 201,
        }} />
      )}

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: 'calc(clamp(1rem, 3vw, 2rem) + 4.2rem)',
              right: 'clamp(1rem, 3vw, 2rem)',
              width: 'clamp(280px, calc(100vw - 2rem), 380px)',
              height: 'clamp(380px, 72vh, 520px)',
              borderRadius: '1.5rem',
              background: 'var(--bg-card)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 199,
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'linear-gradient(135deg,#2C1810,#4A2C2A)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(212,163,115,0.2)',
                border: '1px solid rgba(212,163,115,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Coffee size={18} color="#D4A373" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: '#FFF8F0', fontWeight: 600 }}>Velvet AI</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', animation: 'pulse-glow 2s infinite' }} />
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,248,240,0.6)' }}>Always here to help</span>
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <Bot size={16} color="rgba(212,163,115,0.6)" />
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              background: 'var(--bg-main)',
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    justify: msg.from === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{
                    maxWidth: '82%',
                    padding: '0.65rem 1rem',
                    borderRadius: msg.from === 'user' ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
                    background: msg.from === 'user'
                      ? 'linear-gradient(135deg,#D4A373,#c17f40)'
                      : 'var(--bg-card)',
                    border: msg.from === 'user' ? 'none' : '1px solid var(--border-subtle)',
                    color: msg.from === 'user' ? '#2C1810' : 'var(--text-main)',
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                    boxShadow: 'var(--shadow-soft)',
                    fontWeight: msg.from === 'user' ? 500 : 400,
                    whiteSpace: 'pre-line',
                  }}>
                    {msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div style={{ display: 'flex', gap: 4, padding: '0.65rem 1rem', background: 'var(--bg-card)', borderRadius: '1rem 1rem 1rem 0.25rem', width: 70, boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-subtle)' }}>
                  {[0,1,2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      style={{ width: 8, height: 8, borderRadius: '50%', background: '#D4A373' }}
                    />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length < 3 && (
              <div style={{
                padding: '0.5rem 1rem',
                background: 'var(--bg-main)',
                display: 'flex',
                gap: '0.4rem',
                overflowX: 'auto',
                borderTop: '1px solid var(--border-subtle)',
              }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '20px',
                      background: 'rgba(212,163,115,0.12)',
                      border: '1px solid rgba(212,163,115,0.25)',
                      color: 'var(--color-caramel)',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); send(input); }}
              style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderTop: '1px solid var(--border-subtle)',
                background: 'var(--bg-card)',
              }}
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything…"
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '0.75rem',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-main)',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.87rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#D4A373'}
                onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!input.trim()}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '0.75rem',
                  background: input.trim() ? 'linear-gradient(135deg,#D4A373,#c17f40)' : 'var(--border-subtle)',
                  border: 'none',
                  cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: input.trim() ? '#2C1810' : 'var(--text-muted)',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                }}
              >
                <Send size={16} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
