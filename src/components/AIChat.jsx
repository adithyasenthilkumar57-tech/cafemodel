'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Coffee, Bot, User, ChevronRight } from 'lucide-react';

const SUGGESTIONS = [
  'Recommend a single-origin coffee',
  'What are your dietary & vegan options?',
  'How do I book a private table?',
  'Tell me about Chef Antoine Vance',
];

const BOT_RESPONSES = {
  default: "Welcome to Velvet Bean Grand Reserve! I am your AI Sommelier Assistant. How may I guide your culinary or coffee journey today? ☕",
  coffee: "I highly recommend our **Velvet Gold Latte** (24K gold dust leaf over Madagascar vanilla) or our **Kyoto Drip Nitro Cold Brew** (18-hour slow cold extraction). For purists, our **Yirgacheffe Single-Origin Cortado** offers delicate peach and jasmine floral notes. 🌟",
  vegan: "All espresso and tea beverages can be prepared with artisanal **Oat Milk, Almond Milk, or Coconut Milk**. For dining, our **Truffle Avocats Sourdough** and **Ceremonial Matcha** are 100% plant-based favorites. 🌱",
  booking: "You can book an intimate table directly through our online reservation form above, or contact our VIP Concierge for private dining suites at **+1 (212) 555-0198**. 📅",
  chef: "Executive Chef Antoine Vance trained in Paris and Kyoto. He combines classical French pastry methods with direct-trade micro-lot coffee roasting to deliver award-winning taste profiles. 👨‍🍳",
  hours: "We are open daily:\n• **Monday – Friday**: 7:00 AM – 10:00 PM\n• **Saturday – Sunday**: 8:00 AM – 11:00 PM\nLocated at 742 Fifth Avenue, New York. 📍",
};

function getResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes('coffee') || lower.includes('recommend') || lower.includes('drink') || lower.includes('taste')) return BOT_RESPONSES.coffee;
  if (lower.includes('vegan') || lower.includes('diet') || lower.includes('dairy') || lower.includes('oat')) return BOT_RESPONSES.vegan;
  if (lower.includes('book') || lower.includes('table') || lower.includes('reserv') || lower.includes('vip')) return BOT_RESPONSES.booking;
  if (lower.includes('chef') || lower.includes('antoine') || lower.includes('history') || lower.includes('story')) return BOT_RESPONSES.chef;
  if (lower.includes('hour') || lower.includes('time') || lower.includes('open') || lower.includes('location')) return BOT_RESPONSES.hours;
  return "That is a wonderful question! Our team of baristas and sommeliers are also available at +1 (212) 555-0198 to tailor your experience. Is there anything else I can assist with? ✨";
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
    }, 700);
  };

  return (
    <div id="ai-chat">
      {/* Trigger Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(196, 154, 108, 0.45)',
          zIndex: 180,
          color: '#0F0F10',
        }}
      >
        {open ? <X size={24} /> : <Sparkles size={24} />}
      </motion.button>

      {/* Chat Window Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '5.5rem',
              right: '2rem',
              width: 'clamp(300px, 90vw, 400px)',
              height: 540,
              background: '#1A1A1A',
              border: '1px solid rgba(196, 154, 108, 0.3)',
              borderRadius: '1.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.85)',
              zIndex: 181,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.2rem',
              background: 'linear-gradient(135deg, #2B1E16 0%, #0F0F10 100%)',
              borderBottom: '1px solid rgba(196, 154, 108, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0F0F10',
                }}>
                  <Bot size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700 }}>
                    AI Sommelier Concierge
                  </div>
                  <div style={{ color: '#C49A6C', fontSize: '0.72rem', fontWeight: 600 }}>
                    Always Active • Instant Recommendations
                  </div>
                </div>
              </div>

              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#A39C93', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: '#0F0F10', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{
                    maxWidth: '82%',
                    padding: '0.85rem 1.1rem',
                    borderRadius: '1.25rem',
                    background: m.from === 'user' ? 'linear-gradient(135deg, #C49A6C, #E5B879)' : '#1A1A1A',
                    color: m.from === 'user' ? '#0F0F10' : '#FFFFFF',
                    fontWeight: m.from === 'user' ? 600 : 400,
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    border: m.from === 'bot' ? '1px solid rgba(196, 154, 108, 0.2)' : 'none',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div style={{ color: '#C49A6C', fontSize: '0.8rem', fontStyle: 'italic' }}>
                  AI Sommelier is crafting a response...
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick Suggestions */}
            <div style={{ padding: '0.5rem 0.75rem', background: '#1A1A1A', display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
              {SUGGESTIONS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => send(s)}
                  style={{
                    padding: '0.35rem 0.75rem',
                    borderRadius: '50px',
                    background: '#0F0F10',
                    border: '1px solid rgba(196, 154, 108, 0.2)',
                    color: '#C49A6C',
                    fontSize: '0.72rem',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              style={{
                padding: '0.75rem',
                background: '#1A1A1A',
                borderTop: '1px solid rgba(196, 154, 108, 0.2)',
                display: 'flex',
                gap: '0.5rem',
              }}
            >
              <input
                type="text"
                placeholder="Ask about roast notes, pairings, seating..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  background: '#0F0F10',
                  border: '1px solid rgba(196, 154, 108, 0.2)',
                  borderRadius: '50px',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
                  border: 'none',
                  color: '#0F0F10',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
