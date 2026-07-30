'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Menu as MenuIcon, X, ShoppingBag, Calendar, Sparkles, ChevronDown, ShieldCheck, Utensils, Gift, Compass, Award } from 'lucide-react';
import { useCart } from './CartContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Story', href: '#chef-story' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Events', href: '#events' },
  { label: 'Catering', href: '#catering' },
  { label: 'Contact', href: '#contact' },
];

const megaMenuSections = [
  {
    title: 'Signature Dining',
    icon: Utensils,
    items: [
      { name: 'Reserve Private Table', desc: 'VIP Dining & Sommelier Tasting', href: '#reservation' },
      { name: 'Artisan Menu 2026', desc: 'Handcrafted Espresso & Bakery', href: '#menu' },
      { name: 'Chef Craft & Sourcing', desc: 'Single-origin beans & technique', href: '#chef-story' },
    ]
  },
  {
    title: 'Special Experiences',
    icon: Gift,
    items: [
      { name: 'Gift Cards & VIP Pass', desc: 'Luxury coffee gifting', href: '#gift-cards' },
      { name: 'Loyalty & Rewards', desc: 'Earn points on every brew', href: '#loyalty' },
      { name: 'Corporate Catering', desc: 'Executive meetings & galas', href: '#catering' },
    ]
  },
  {
    title: 'Portals & AI',
    icon: Sparkles,
    items: [
      { name: 'AI Sommelier Assistant', desc: 'Instant flavor recommendations', href: '#ai-chat' },
      { name: 'Coffee Profile Quiz', desc: 'Find your perfect blend', href: '#coffee-quiz' },
    ]
  }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { totalItems, setIsOpen: openCart } = useCart();

  // Scroll direction & distance handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 40);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > 120 && currentScrollY > lastScrollY && !menuOpen && !megaOpen) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Active section calculation
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (const sec of sections.reverse()) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen, megaOpen]);

  const scrollTo = (href) => {
    setMegaOpen(false);
    setMenuOpen(false);
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.75rem clamp(1rem, 4vw, 3rem)' : '1.25rem clamp(1rem, 4vw, 3rem)',
          background: scrolled
            ? 'rgba(15, 15, 16, 0.88)'
            : 'linear-gradient(180deg, rgba(15,15,16,0.85) 0%, rgba(15,15,16,0) 100%)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(4px)',
          borderBottom: scrolled ? '1px solid rgba(196, 154, 108, 0.18)' : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none',
          transition: 'padding 0.3s ease, background 0.3s ease, border-color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <button
          onClick={() => scrollTo('#home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(196,154,108,0.4)',
            flexShrink: 0,
          }}>
            <Coffee size={20} color="#0F0F10" strokeWidth={2.5} />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.35rem, 3.5vw, 1.6rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              display: 'block',
              lineHeight: 1.1,
            }}>
              Velvet Bean
            </span>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              color: '#C49A6C',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'block',
            }}>
              Artisan Reserve
            </span>
          </div>
        </button>

        {/* Desktop Links & Mega Menu */}
        <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '2rem' }}>
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{
                  position: 'relative',
                  background: 'none',
                  border: 'none',
                  color: isActive ? '#C49A6C' : '#F4E7D3',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  padding: '0.4rem 0',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: 'linear-gradient(90deg, #C49A6C, #E5B879)',
                      borderRadius: 2,
                    }}
                  />
                )}
              </button>
            );
          })}

          {/* Mega Menu Toggle Button */}
          <div
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
            style={{ position: 'relative' }}
          >
            <button
              onClick={() => setMegaOpen(!megaOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(196, 154, 108, 0.12)',
                border: '1px solid rgba(196, 154, 108, 0.3)',
                borderRadius: '20px',
                padding: '0.4rem 0.9rem',
                color: '#F4E7D3',
                fontSize: '0.85rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <span>Explore</span>
              <ChevronDown size={14} style={{ transform: megaOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
            </button>

            {/* Mega Dropdown Panel */}
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: -100,
                    width: 720,
                    padding: '1.75rem',
                    marginTop: '0.75rem',
                    background: 'rgba(26, 26, 26, 0.96)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid rgba(196, 154, 108, 0.25)',
                    borderRadius: '1.25rem',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1.5rem',
                    zIndex: 110,
                  }}
                >
                  {megaMenuSections.map((sec, idx) => {
                    const IconComp = sec.icon;
                    return (
                      <div key={idx}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          color: '#C49A6C',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          marginBottom: '1rem',
                          borderBottom: '1px solid rgba(196, 154, 108, 0.15)',
                          paddingBottom: '0.5rem',
                        }}>
                          <IconComp size={16} />
                          <span>{sec.title}</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                          {sec.items.map((item, i) => (
                            <button
                              key={i}
                              onClick={() => scrollTo(item.href)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                textAlign: 'left',
                                cursor: 'pointer',
                                padding: '0.3rem 0.5rem',
                                borderRadius: '0.5rem',
                                transition: 'background 0.2s',
                              }}
                              className="hover:bg-white/5"
                            >
                              <div style={{ color: '#FFFFFF', fontSize: '0.88rem', fontWeight: 500 }}>
                                {item.name}
                              </div>
                              <div style={{ color: '#A39C93', fontSize: '0.75rem', marginTop: '0.1rem' }}>
                                {item.desc}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right CTA Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Cart Drawer Trigger */}
          <button
            onClick={openCart}
            style={{
              position: 'relative',
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: 'rgba(26, 26, 26, 0.8)',
              border: '1px solid rgba(196, 154, 108, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F4E7D3',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            title="Shopping Cart"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: -4,
                right: -4,
                background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
                color: '#0F0F10',
                fontSize: '0.7rem',
                fontWeight: 700,
                width: 20,
                height: 20,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(196,154,108,0.5)',
              }}>
                {totalItems}
              </span>
            )}
          </button>

          {/* Book Table Button */}
          <button
            onClick={() => scrollTo('#reservation')}
            className="hidden sm:inline-flex"
            style={{
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
              color: '#0F0F10',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(196, 154, 108, 0.35)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
          >
            <Calendar size={15} />
            <span>Book Table</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden"
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: 'rgba(26, 26, 26, 0.8)',
              border: '1px solid rgba(196, 154, 108, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F4E7D3',
              cursor: 'pointer',
            }}
          >
            {menuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'rgba(15, 15, 16, 0.98)',
              backdropFilter: 'blur(24px)',
              padding: '6rem 2rem 2rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ color: '#C49A6C', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>
                Navigation Menu
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.75rem',
                    cursor: 'pointer',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                onClick={() => scrollTo('#reservation')}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
                  color: '#0F0F10',
                  fontWeight: 700,
                  fontSize: '1rem',
                  borderRadius: '50px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <Calendar size={18} />
                <span>Book Table Online</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
