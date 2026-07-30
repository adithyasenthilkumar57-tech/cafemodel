'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ArrowRight, RotateCcw, Sparkles, Check } from 'lucide-react';
import { useCart } from './CartContext';

const QUESTIONS = [
  {
    q: 'What time of day is your ideal coffee moment?',
    options: [
      { label: 'Sunrise — I need an intense, awakening elixir', tag: 'espresso' },
      { label: 'Mid-morning — A smooth, balanced velvety cup', tag: 'latte' },
      { label: 'Afternoon — Refreshing, chilled, nitrogen cascade', tag: 'cold' },
      { label: 'Evening — Fragrant, spiced, or dessert paired', tag: 'flavoured' },
    ],
  },
  {
    q: 'How do you prefer your flavor profile?',
    options: [
      { label: '🍫 Rich dark chocolate & roasted hazelnut notes', tag: 'espresso' },
      { label: '🌸 Delicate floral jasmine & wild berry aromas', tag: 'flavoured' },
      { label: '🥛 Silky creamy vanilla bean & oat milk balance', tag: 'latte' },
      { label: '🌿 Clean citrus zest & effervescent sparkling finish', tag: 'cold' },
    ],
  },
  {
    q: 'What is your preferred temperature?',
    options: [
      { label: '🔥 Steaming hot with micro-foam art', tag: 'latte' },
      { label: '🧊 Iced with slow-drip nitrogen cascade', tag: 'cold' },
      { label: '☕ Short, intense, concentrated shot', tag: 'espresso' },
      { label: '✨ Artisanal infusion with organic spices', tag: 'flavoured' },
    ],
  },
];

const RESULTS = {
  espresso: {
    drink: 'Cortado Reserva',
    desc: 'You appreciate precision and pure intensity. Our Cortado Reserva features equal parts single-origin Antioquia espresso and texturized warm milk.',
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=85',
    price: 5.50,
  },
  latte: {
    drink: 'Velvet Gold Latte',
    desc: 'You love rich texture and elegance. Our Velvet Gold Latte infuses 24K gold dust leaf, Madagascar vanilla bean, and steamed oat milk over double espresso.',
    img: 'https://images.unsplash.com/photo-1561882468-9110d70d3069?w=600&q=85',
    price: 7.50,
  },
  cold: {
    drink: 'Kyoto Drip Nitro Cold Brew',
    desc: 'Unconventional and refreshing. Our 18-hour cold brew infused with nitrogen delivers a cascading velvet foam without dairy.',
    img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=85',
    price: 8.00,
  },
  flavoured: {
    drink: 'Smoked Vanilla Bourbon Latte',
    desc: 'Romantic and sophisticated. Oak-barrel aged bourbon vanilla, smoked cinnamon, and steamed oat milk paired with single-origin beans.',
    img: 'https://images.unsplash.com/photo-1477456137234-940ef8dda580?w=600&q=85',
    price: 8.50,
  },
};

export default function CoffeeQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ espresso: 0, latte: 0, cold: 0, flavoured: 0 });
  const [result, setResult] = useState(null);
  const { addItem, setIsOpen: openCart } = useCart();

  const handleSelect = (tag) => {
    const nextScores = { ...scores, [tag]: scores[tag] + 1 };
    setScores(nextScores);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      let topTag = 'latte';
      let maxScore = -1;
      for (const [key, val] of Object.entries(nextScores)) {
        if (val > maxScore) {
          maxScore = val;
          topTag = key;
        }
      }
      setResult(RESULTS[topTag]);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({ espresso: 0, latte: 0, cold: 0, flavoured: 0 });
    setResult(null);
  };

  return (
    <section id="coffee-quiz" style={{ background: '#0F0F10', padding: 'var(--section-py) 0', color: '#FFFFFF' }}>
      <div className="container-normal" style={{ maxWidth: 880, margin: '0 auto', padding: '0 1.5rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#C49A6C',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            <Sparkles size={14} />
            <span>AI FLAVOR MATCHMAKER</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            marginBottom: '0.75rem',
          }}>
            Find Your Signature Roast Match
          </h2>
          <p style={{ color: '#A39C93', fontSize: '0.95rem' }}>
            Answer 3 quick sensory questions and let our AI Sommelier calculate your ideal roast & pastry pairing.
          </p>
        </div>

        {/* Quiz Card */}
        <div style={{
          background: '#1A1A1A',
          border: '1px solid rgba(196, 154, 108, 0.25)',
          borderRadius: '1.75rem',
          padding: 'clamp(2rem, 5vw, 3rem)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        }}>
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', color: '#C49A6C', fontSize: '0.85rem', fontWeight: 600 }}>
                  <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Complete</span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '2rem' }}>
                  {QUESTIONS[currentStep].q}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {QUESTIONS[currentStep].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(opt.tag)}
                      style={{
                        padding: '1.1rem 1.4rem',
                        borderRadius: '1rem',
                        background: '#0F0F10',
                        border: '1px solid rgba(196, 154, 108, 0.2)',
                        color: '#F4E7D3',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                      }}
                      className="hover:border-[#C49A6C]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 1.2rem',
                  borderRadius: '50px',
                  background: 'rgba(196, 154, 108, 0.15)',
                  border: '1px solid #C49A6C',
                  color: '#E5B879',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                }}>
                  <Sparkles size={14} />
                  <span>Your Perfect AI Match</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', alignItems: 'center', textAlign: 'left' }}>
                  <img
                    src={result.img}
                    alt={result.drink}
                    style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: '1.25rem', border: '1px solid rgba(196, 154, 108, 0.3)' }}
                  />

                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                      {result.drink}
                    </h3>
                    <div style={{ color: '#C49A6C', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>
                      ${result.price.toFixed(2)}
                    </div>
                    <p style={{ color: '#A39C93', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {result.desc}
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => {
                          addItem({ id: 99, name: result.drink, price: result.price, img: result.img });
                          openCart();
                        }}
                        style={{
                          padding: '0.85rem 1.8rem',
                          borderRadius: '50px',
                          background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
                          color: '#0F0F10',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Add Match to Order
                      </button>

                      <button
                        onClick={resetQuiz}
                        style={{
                          padding: '0.85rem 1.5rem',
                          borderRadius: '50px',
                          background: 'rgba(255,255,255,0.08)',
                          color: '#F4E7D3',
                          border: '1px solid rgba(196, 154, 108, 0.25)',
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                        }}
                      >
                        <RotateCcw size={16} />
                        <span>Retake Quiz</span>
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
