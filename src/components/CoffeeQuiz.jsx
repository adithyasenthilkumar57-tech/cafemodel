'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, viewportOptions } from './ScrollAnimations';
import { Coffee, ArrowRight, RotateCcw, Star } from 'lucide-react';

const QUESTIONS = [
  {
    q: 'When do you usually have your coffee?',
    options: [
      { label: 'Early morning — I need to wake up', tags: ['strong', 'espresso'] },
      { label: 'Mid-morning, after a good breakfast', tags: ['balanced', 'latte'] },
      { label: 'Afternoon pick-me-up', tags: ['cold', 'smooth'] },
      { label: 'Evening — I just love the taste', tags: ['decaf', 'flavoured'] },
    ],
  },
  {
    q: 'How do you like your coffee strength?',
    options: [
      { label: '💪 Strong — the darker, the better', tags: ['strong', 'espresso', 'cold'] },
      { label: '☕ Medium — balanced and smooth', tags: ['balanced', 'latte', 'smooth'] },
      { label: '🌸 Mild — delicate and nuanced', tags: ['flavoured', 'decaf'] },
      { label: '🌊 I actually prefer a cold coffee', tags: ['cold', 'smooth'] },
    ],
  },
  {
    q: 'What flavours do you love?',
    options: [
      { label: '🍫 Chocolate and caramel', tags: ['strong', 'latte', 'espresso'] },
      { label: '🌸 Floral and fruity', tags: ['flavoured', 'balanced'] },
      { label: '🥛 Creamy and sweet', tags: ['latte', 'smooth', 'decaf'] },
      { label: '🌿 Clean and earthy', tags: ['cold', 'espresso'] },
    ],
  },
  {
    q: 'Do you prefer hot or cold?',
    options: [
      { label: '🔥 Always hot', tags: ['espresso', 'latte', 'flavoured'] },
      { label: '❄️ Ice cold please', tags: ['cold', 'smooth'] },
      { label: '🌡️ Depends on the season', tags: ['balanced', 'latte'] },
      { label: '🧊 Iced but with cream', tags: ['smooth', 'latte', 'cold'] },
    ],
  },
  {
    q: 'What\'s the most important to you?',
    options: [
      { label: '⚡ The caffeine kick', tags: ['strong', 'espresso', 'cold'] },
      { label: '🎨 The flavour complexity', tags: ['flavoured', 'balanced'] },
      { label: '💆 The comfort and ritual', tags: ['latte', 'smooth', 'decaf'] },
      { label: '✨ Something unique and special', tags: ['flavoured', 'cold'] },
    ],
  },
];

const RESULTS = {
  espresso: {
    drink: 'Affogato',
    desc: 'You\'re a purist with a flair for drama. Our Affogato — a double ristretto shot drowning a scoop of vanilla gelato — matches your bold, decisive character perfectly.',
    img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=85',
    price: '$6.00',
    badge: 'Chef Special',
    accent: '#D4A373',
  },
  latte: {
    drink: 'Signature Latte',
    desc: 'You\'re warm, social, and appreciate the finer things. Our Signature Latte — double espresso, velvety steamed milk, house caramel drizzle — is the ultimate crowd-pleaser.',
    img: 'https://images.unsplash.com/photo-1561882468-9110d70d3069?w=600&q=85',
    price: '$6.50',
    badge: 'Best Seller',
    accent: '#c17f40',
  },
  cold: {
    drink: 'Nitro Cold Brew',
    desc: 'You think differently. Our Nitro Cold Brew — slow-steeped 24 hours, nitrogen-infused — is as bold and unconventional as you are. No milk. No sugar. Pure cascade.',
    img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=85',
    price: '$7.00',
    badge: 'Limited Edition',
    accent: '#8b5cf6',
  },
  flavoured: {
    drink: 'Rose Cardamom Latte',
    desc: 'You\'re creative, romantic, and love things that surprise you. Our Rose Cardamom Latte — house-pressed rose petals, cracked cardamom, oat milk — is the most uniquely you drink on our menu.',
    img: 'https://images.unsplash.com/photo-1542992015-4a0b729b1385?w=600&q=85',
    price: '$7.50',
    badge: 'New Arrival',
    accent: '#ec4899',
  },
  smooth: {
    drink: 'Cold Brew Tonic',
    desc: 'You\'re refreshing, modern, and effortlessly cool. Our Cold Brew Tonic — cold brew over sparkling tonic water — is bright, clean, and quietly impressive.',
    img: 'https://images.unsplash.com/photo-1572490122747-3e9be5fe6a1e?w=600&q=85',
    price: '$6.25',
    badge: 'New Arrival',
    accent: '#60a5fa',
  },
  balanced: {
    drink: 'Cortado',
    desc: 'You\'re measured, thoughtful, and never excessive. Our Cortado — equal parts espresso and warm milk — is precision in a glass. A real barista\'s drink.',
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=85',
    price: '$4.75',
    badge: 'Chef Special',
    accent: '#D4A373',
  },
  decaf: {
    drink: 'Matcha Ceremonial Latte',
    desc: 'You value quality, wellness, and intention. Our Grade A ceremonial matcha with oat milk and honey delivers the ritual without the jitters. Earthy, smooth, and deeply satisfying.',
    img: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&q=85',
    price: '$6.00',
    badge: 'Best Seller',
    accent: '#4ade80',
  },
};

export default function CoffeeQuiz() {
  const [step, setStep] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleStart = () => setStep(0);

  const handleSelect = (option) => {
    setSelected(option.label);
    setTimeout(() => {
      const newAnswers = [...answers, ...option.tags];
      setAnswers(newAnswers);
      setSelected(null);

      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
      } else {
        // Calculate result
        const tally = {};
        newAnswers.forEach(tag => { tally[tag] = (tally[tag] || 0) + 1; });
        const top = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
        setResult(RESULTS[top] || RESULTS.latte);
        setStep(QUESTIONS.length);
      }
    }, 350);
  };

  const handleReset = () => {
    setStep(-1);
    setAnswers([]);
    setResult(null);
    setSelected(null);
  };

  const progress = step === -1 ? 0 : step >= QUESTIONS.length ? 100 : (step / QUESTIONS.length) * 100;

  return (
    <section id="coffee-quiz" style={{
      background: 'var(--bg-main)',
      color: 'var(--text-main)',
      padding: 'var(--section-py) 0',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background-color 0.3s',
    }}>
      {/* Decorative background */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(212,163,115,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="container-normal" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--color-caramel)' }}>
            Personalised Recommendation
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
            Find Your Perfect Coffee
          </h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Answer 5 quick questions and we'll match you with your ideal Velvet Bean drink.
          </p>
        </motion.div>

        {/* Progress bar */}
        {step >= 0 && step < QUESTIONS.length && (
          <div style={{ maxWidth: 640, margin: '0 auto 2.5rem', height: 4, background: 'var(--border-subtle)', borderRadius: 2, overflow: 'hidden' }}>
            <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }}
              style={{ height: '100%', background: 'linear-gradient(90deg,#D4A373,#c17f40)', borderRadius: 2 }} />
          </div>
        )}

        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            {/* Intro */}
            {step === -1 && (
              <motion.div key="intro"
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
                style={{
                  textAlign: 'center',
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2rem', padding: '3.5rem 2.5rem',
                  boxShadow: 'var(--shadow-card)',
                }}>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
                  ☕
                </motion.div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
                  Which Velvet Bean Drink Are You?
                </h3>
                <p style={{ color: 'var(--text-sub)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  5 questions. 30 seconds. 7 possible results. Let us find your perfect match from our menu.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  {['Nitro Cold Brew', 'Rose Cardamom Latte', 'Affogato', 'Cortado', '+ 3 more'].map(tag => (
                    <span key={tag} style={{ padding: '0.25rem 0.75rem', borderRadius: '50px', background: 'rgba(212,163,115,0.12)', border: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="btn-primary ripple" onClick={handleStart}
                  style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
                  Start the Quiz <ArrowRight size={16} />
                </motion.button>
              </motion.div>
            )}

            {/* Questions */}
            {step >= 0 && step < QUESTIONS.length && (
              <motion.div key={`q-${step}`}
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}>
                <div style={{
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(24px)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2rem',
                  padding: 'clamp(2rem, 5vw, 3rem)',
                  boxShadow: 'var(--shadow-card)',
                }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    Question {step + 1} of {QUESTIONS.length}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '2rem', lineHeight: 1.3 }}>
                    {QUESTIONS[step].q}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {QUESTIONS[step].options.map((opt) => (
                      <motion.button key={opt.label}
                        whileHover={{ x: 6 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(opt)}
                        style={{
                          padding: '1rem 1.25rem',
                          borderRadius: '1rem',
                          border: '1.5px solid',
                          borderColor: selected === opt.label ? '#D4A373' : 'var(--border-subtle)',
                          background: selected === opt.label ? 'rgba(212,163,115,0.15)' : 'var(--bg-main)',
                          color: selected === opt.label ? '#D4A373' : 'var(--text-main)',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.92rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontWeight: selected === opt.label ? 600 : 400,
                          transition: 'all 0.2s',
                        }}>
                        {opt.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Result */}
            {step >= QUESTIONS.length && result && (
              <motion.div key="result"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 280, damping: 25 }}>
                <div style={{
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(24px)',
                  border: `1px solid ${result.accent}40`,
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  boxShadow: `0 0 60px ${result.accent}15`,
                }}>
                  <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
                    <img src={result.img} alt={result.drink}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                    <div style={{ position: 'absolute', top: 16, left: 16, padding: '0.25rem 0.75rem', borderRadius: '50px', background: `${result.accent}25`, border: `1px solid ${result.accent}50`, color: result.accent, fontSize: '0.72rem', fontWeight: 700 }}>
                      {result.badge}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      style={{ position: 'absolute', bottom: 20, left: 24 }}>
                      <div style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: result.accent, fontWeight: 600, marginBottom: '0.3rem' }}>
                        Your Perfect Match
                      </div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FFF8F0', fontWeight: 700 }}>
                        {result.drink}
                      </div>
                    </motion.div>
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={result.accent} color={result.accent} />)}
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>Staff favourite</span>
                    </div>
                    <p style={{ color: 'var(--text-sub)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                      {result.desc}
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button className="btn-primary ripple"
                        onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
                        style={{ flex: 1, justifyContent: 'center', fontSize: '0.9rem' }}>
                        <Coffee size={15} /> Order Now · {result.price}
                      </button>
                      <button onClick={handleReset} className="btn-outline"
                        style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-main)', padding: '0.7rem 1.2rem' }}>
                        <RotateCcw size={15} /> Retake
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
