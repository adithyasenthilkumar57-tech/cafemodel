'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Menu, X, Moon, Sun, Phone, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';
import { useTheme } from './ThemeContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { totalItems, setIsOpen: openCart } = useCart();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.75rem 2rem' : '1.4rem 2rem',
          background: scrolled
            ? 'var(--bg-navbar)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: scrolled ? 'var(--shadow-soft)' : 'none',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          <div style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#D4A373,#c17f40)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(212,163,115,0.4)',
          }}>
            <Coffee size={18} color="#2C1810" strokeWidth={2.5} />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 600,
            color: scrolled ? 'var(--text-main)' : '#FFF8F0',
            letterSpacing: '0.02em',
            transition: 'color 0.3s',
          }}>
            Velvet Bean
          </span>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          className="hidden-mobile">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="nav-link"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: activeSection === link.href.slice(1) ? 'var(--color-caramel)' : scrolled ? 'var(--text-main)' : 'rgba(255,248,240,0.9)',
                transition: 'color 0.3s',
                padding: '0.25rem 0',
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{
              background: scrolled ? 'var(--border-subtle)' : 'rgba(255,248,240,0.12)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-caramel)',
              transition: 'all 0.3s',
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart button */}
          <motion.button
            onClick={() => openCart(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            style={{
              position: 'relative',
              background: scrolled ? 'var(--border-subtle)' : 'rgba(255,248,240,0.12)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-caramel)',
            }}
          >
            <ShoppingBag size={18} />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.div
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{
                    position: 'absolute',
                    top: -4, right: -4,
                    width: 18, height: 18,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg,#D4A373,#c17f40)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.6rem', fontWeight: 800,
                    color: '#2C1810',
                    border: '1.5px solid var(--bg-main)',
                  }}
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <button
            onClick={() => scrollTo('#reservation')}
            className="btn-primary hidden-mobile"
            style={{ fontSize: '0.78rem', padding: '0.65rem 1.5rem' }}
          >
            Reserve Table
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile"
            style={{
              background: scrolled ? 'var(--border-subtle)' : 'rgba(255,248,240,0.12)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '0.5rem',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-caramel)',
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--bg-main)',
              backdropFilter: 'blur(24px)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.5rem',
                  fontWeight: 500,
                  color: 'var(--text-main)',
                  letterSpacing: '0.04em',
                  transition: 'color 0.3s',
                }}
                whileHover={{ color: 'var(--color-caramel)', scale: 1.05 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}
            >
              <a href="tel:+1234567890" className="btn-primary" style={{ fontSize: '0.85rem' }}>
                <Phone size={16} /> Call Now
              </a>
              <button
                onClick={() => scrollTo('#reservation')}
                className="btn-outline"
                style={{ fontSize: '0.85rem' }}
              >
                Reserve
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
