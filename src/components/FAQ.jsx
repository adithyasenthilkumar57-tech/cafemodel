'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, viewportOptions } from './ScrollAnimations';
import { Plus, Minus, Search } from 'lucide-react';

const faqs = [
  { q: 'Do I need a reservation to visit?', a: 'Walk-ins are always welcome! However, we strongly recommend reserving a table for Friday–Sunday evenings, special events, and our private dining room. You can book instantly through our reservation form above.' },
  { q: 'Do you offer vegan and dairy-free options?', a: 'Absolutely. We offer oat milk, almond milk, soy milk, and coconut milk as alternatives for all espresso drinks. Our kitchen clearly labels vegan-friendly food items on the menu.' },
  { q: 'What are your opening hours?', a: 'Downtown: Mon–Fri 7AM–10PM, Sat–Sun 8AM–11PM.\nMidtown: Mon–Fri 6AM–9PM, Saturday 8AM–8PM, Sunday closed.\nHoliday hours are posted on our Instagram.' },
  { q: 'Do you have WiFi?', a: 'Yes — we provide complimentary high-speed 1Gbps WiFi across all seating areas. Ask your barista for the password. We also have power outlets at our co-working tables.' },
  { q: 'Can I host a private event or corporate meeting?', a: 'Yes! Our private dining room seats up to 30 guests and can be configured for presentations, workshops, dinners, or celebrations. Contact us via the form below or call directly to discuss packages.' },
  { q: 'Do you offer gift cards?', a: 'We offer both physical and digital gift cards in any denomination from $10–$500. They never expire and can be used at both locations. Available in-store or via WhatsApp.' },
  { q: 'Are you pet-friendly?', a: 'Our sunny outdoor terrace warmly welcomes well-behaved dogs. We provide complimentary water bowls and treats upon request. Indoor dining remains pet-free per local health regulations.' },
  { q: 'Do you roast your own coffee?', a: 'Yes — our beans are sourced directly from farms in Ethiopia, Colombia, and Guatemala. Small batches are roasted fresh weekly at our partner roastery. We sell whole beans in-store.' },
  { q: 'Do you offer coffee subscriptions?', a: 'Our coffee subscription ships fresh-roasted beans to your door every 2 weeks. Choose from Single Origin, Espresso Blend, or our Seasonal Curated box. Free shipping on all plans.' },
  { q: 'Can I bring my own laptop and work here?', a: 'Of course. Velvet Bean is designed to be a premium workspace. We have long community tables, private corners, and ample power points. Busy peak hours (12–2PM) may have shorter stay requests.' },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = faqs.filter(f =>
    f.q.toLowerCase().includes(search.toLowerCase()) ||
    f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="faq" style={{
      background: 'var(--color-dark)',
      padding: 'var(--section-py) 0',
    }}>
      <div className="container-normal">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--color-caramel)' }}>
            FAQ
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 700,
            color: '#FFF8F0',
            marginBottom: '1rem',
          }}>
            Frequently Asked Questions
          </h2>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 440, margin: '1.5rem auto 0' }}>
            <Search size={16} style={{
              position: 'absolute', left: 14, top: '50%',
              transform: 'translateY(-50%)', color: '#6b7280',
            }} />
            <input
              className="input-premium"
              placeholder="Search questions…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem', color: '#FFF8F0' }}
            />
          </div>
        </motion.div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', color: 'rgba(245,237,224,0.4)', padding: '2rem' }}>
              No results found for "{search}"
            </div>
          )}
          {filtered.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              style={{
                borderRadius: '1rem',
                background: open === i ? 'rgba(212,163,115,0.08)' : 'rgba(255,248,240,0.04)',
                border: open === i ? '1px solid rgba(212,163,115,0.25)' : '1px solid rgba(255,248,240,0.06)',
                overflow: 'hidden',
                transition: 'all 0.3s',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '1.25rem 1.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: open === i ? '#D4A373' : '#FFF8F0',
                  transition: 'color 0.3s',
                }}>
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: open === i ? 'rgba(212,163,115,0.2)' : 'rgba(255,248,240,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: open === i ? '#D4A373' : 'rgba(245,237,224,0.4)',
                    transition: 'all 0.3s',
                  }}
                >
                  <Plus size={16} />
                </motion.div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '0 1.5rem 1.25rem',
                      fontSize: '0.92rem',
                      color: 'rgba(245,237,224,0.65)',
                      lineHeight: 1.8,
                      whiteSpace: 'pre-line',
                    }}>
                      {item.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
