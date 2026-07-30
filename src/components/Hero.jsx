'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Calendar, ShoppingBag, Utensils, Play, Sparkles } from 'lucide-react';
import { useCart } from './CartContext';

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=90',
    tag: 'ULTRA LUXURY COFFEE & FINE DINING',
    headline: 'Crafted With\nPassion.',
    sub: 'Served With Perfection in New York.',
  },
  {
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=90',
    tag: 'SINGLE ORIGIN ARTISAN ROASTS',
    headline: 'Every Sip,\nA Masterpiece.',
    sub: 'Ethically sourced. Expertly roasted.',
  },
  {
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=90',
    tag: 'ELEGANT AMBIANCE & PRIVATE TABLES',
    headline: 'Where Moments\nBecome Memories.',
    sub: 'Artisan desserts & unforgettable atmosphere.',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const timerRef = useRef(null);
  const { setIsOpen: openCart } = useCart();

  // Slide Rotation
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timerRef.current);
  }, []);

  // Parallax Mouse Movement
  useEffect(() => {
    const handleMouse = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 25;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // HTML5 Particle Canvas (Floating Coffee Beans + Steam Dust)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Array Generation
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 1,
      speedY: -(Math.random() * 0.7 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      isBean: Math.random() > 0.6,
      angle: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += 0.01;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (p.isBean) {
          // Draw subtle golden bean silhouette
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = '#C49A6C';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2, p.radius * 1.2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw floating steam particle glow
          ctx.fillStyle = 'rgba(244, 231, 211, 0.8)';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#C49A6C';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 720,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0F0F10',
      }}
    >
      {/* Background Imagery Carousel */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? 1.05 : 1,
          }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px) scale(1.05)`,
            transition: 'transform 0.1s linear',
          }}
        />
      ))}

      {/* Luxury Dark Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, rgba(15,15,16,0.55) 0%, rgba(15,15,16,0.85) 60%, rgba(15,15,16,0.98) 100%)',
          zIndex: 1,
        }}
      />

      {/* Interactive HTML5 Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Hero Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: 960,
          marginTop: '2rem',
        }}
      >
        {/* Luxury Tag Badge */}
        <motion.div
          key={`tag-${current}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.2rem',
            background: 'rgba(26, 26, 26, 0.75)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(196, 154, 108, 0.35)',
            borderRadius: '50px',
            color: '#C49A6C',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '1.75rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <Sparkles size={14} />
          <span>{slides[current].tag}</span>
        </motion.div>

        {/* Staggered Animated Headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`headline-${current}`}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 7.5vw, 6.2rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
              whiteSpace: 'pre-line',
              textShadow: '0 10px 40px rgba(0,0,0,0.8)',
            }}
          >
            {slides[current].headline}
          </motion.h1>
        </AnimatePresence>

        {/* Sub-headline */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 3.2vw, 2.2rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#F4E7D3',
              marginBottom: '2.5rem',
            }}
          >
            {slides[current].sub}
          </motion.p>
        </AnimatePresence>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
          }}
        >
          {/* Book Table CTA */}
          <button
            onClick={() => scrollTo('#reservation')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '1rem 2.2rem',
              background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
              color: '#0F0F10',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 6px 25px rgba(196, 154, 108, 0.45)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <Calendar size={18} />
            <span>Book Table</span>
          </button>

          {/* Order Online CTA */}
          <button
            onClick={openCart}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '1rem 2.2rem',
              background: 'rgba(26, 26, 26, 0.85)',
              backdropFilter: 'blur(16px)',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '50px',
              border: '1px solid rgba(196, 154, 108, 0.4)',
              cursor: 'pointer',
              boxShadow: '0 6px 25px rgba(0,0,0,0.5)',
              transition: 'all 0.3s ease',
            }}
          >
            <ShoppingBag size={18} color="#C49A6C" />
            <span>Order Online</span>
          </button>

          {/* Explore Menu CTA */}
          <button
            onClick={() => scrollTo('#menu')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '1rem 2.2rem',
              background: 'transparent',
              color: '#F4E7D3',
              fontWeight: 500,
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: '50px',
              border: '1px solid rgba(244, 231, 211, 0.25)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <Utensils size={18} />
            <span>Explore Menu</span>
          </button>
        </motion.div>
      </div>

      {/* Slide Navigation Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              width: idx === current ? 32 : 10,
              height: 8,
              borderRadius: '10px',
              background: idx === current ? '#C49A6C' : 'rgba(255,255,255,0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={() => scrollTo('#about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '3rem',
          zIndex: 4,
          background: 'none',
          border: 'none',
          color: '#C49A6C',
          cursor: 'pointer',
          display: 'none',
        }}
        className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest"
      >
        <span>Scroll</span>
        <ArrowDown size={16} />
      </motion.button>
    </section>
  );
}
