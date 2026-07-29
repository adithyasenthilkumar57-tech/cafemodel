'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play, Calendar, BookOpen, ShoppingBag } from 'lucide-react';

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=90',
    headline: 'Crafted With\nPassion.',
    sub: 'Served With Perfection.',
  },
  {
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=90',
    headline: 'Every Sip,\nA Story.',
    sub: 'Handcrafted coffee that speaks to the soul.',
  },
  {
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=90',
    headline: 'Where Moments\nBecome Memories.',
    sub: 'Artisan desserts. Unforgettable atmosphere.',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const timerRef = useRef(null);

  // Auto-slide
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handle = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  const scrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={heroRef} style={{
      position: 'relative',
      height: '100vh',
      minHeight: 680,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Background Images */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? 1.06 : 1,
          }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px) scale(1.06)`,
            transition: 'transform 0.1s linear',
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(160deg, rgba(12,6,3,0.65) 0%, rgba(44,24,16,0.75) 50%, rgba(12,6,3,0.85) 100%)',
        zIndex: 1,
      }} />

      {/* Noise texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'rgba(212,163,115,0.5)',
          left: `${15 + i * 14}%`,
          bottom: '20%',
          zIndex: 3,
          animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
        }} />
      ))}

      {/* Steam lines */}
      <div style={{ position: 'absolute', right: '8%', bottom: '25%', zIndex: 3 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 2,
            height: 40,
            background: 'linear-gradient(to top, rgba(212,163,115,0.4), transparent)',
            borderRadius: 2,
            margin: '0 6px',
            display: 'inline-block',
            animation: `steam ${2 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }} />
        ))}
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 4,
        textAlign: 'center',
        padding: '0 1.5rem',
        maxWidth: 900,
      }}>
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="section-label"
          style={{ justifyContent: 'center', color: 'var(--color-caramel)', marginBottom: '1.5rem' }}
        >
          Est. 2018 · Artisan Coffee House
        </motion.div>

        {/* Headline */}
        <motion.h1
          key={current}
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 7.5vw, 6.5rem)',
            fontWeight: 800,
            color: '#FFF8F0',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
            whiteSpace: 'pre-line',
          }}
        >
          {slides[current].headline.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.02, duration: 0.5 }}
              style={{ display: char === '\n' ? 'block' : 'inline' }}
            >
              {char === '\n' ? null : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Accent word */}
        <motion.div
          key={`caramel-${current}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.6rem, 4.5vw, 4rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            background: 'linear-gradient(135deg,#D4A373,#e8c99a,#D4A373)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1.25rem',
          }}
        >
          {slides[current].sub}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)',
            color: 'rgba(255,248,240,0.7)',
            marginBottom: '2rem',
            maxWidth: 560,
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.7,
          }}
        >
          Experience handcrafted coffee, artisan desserts, and unforgettable moments in the heart of the city.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            className="btn-primary ripple"
            onClick={() => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Calendar size={16} /> Reserve Table
          </button>
          <button
            className="btn-outline"
            onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <BookOpen size={16} /> Explore Menu
          </button>
          <button
            className="btn-outline"
            onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ borderColor: 'rgba(212,163,115,0.3)' }}
          >
            <ShoppingBag size={16} /> Order Online
          </button>
        </motion.div>

        {/* Slide dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2.5rem' }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? 32 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? '#D4A373' : 'rgba(255,248,240,0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s',
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollDown}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          zIndex: 4,
          color: 'rgba(255,248,240,0.6)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Discover More
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>

      {/* Side stats */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          zIndex: 4,
        }}
        className="hidden-mobile"
      >
        {[
          { value: '15K+', label: 'Happy Customers' },
          { value: '200+', label: 'Menu Items' },
          { value: '4.9★', label: 'Google Rating' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#D4A373',
            }}>{stat.value}</div>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,248,240,0.5)',
            }}>{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
