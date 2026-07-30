'use client';
import { motion } from 'framer-motion';
import { Coffee, MapPin, Phone, Mail, ArrowUp, Heart } from 'lucide-react';

// Social icon SVGs (lucide-react v0.x doesn't include all social icons)
const InstagramIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TwitterIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const YoutubeIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z"/>
  </svg>
);

const footerLinks = {
  'Explore': ['Home', 'About Us', 'Our Menu', 'Gallery', 'Events', 'Blog'],
  'Visit Us': ['Reservations', 'Locations', 'Private Dining', 'Takeaway', 'Delivery', 'Gift Cards'],
  'Company': ['Our Story', 'Careers', 'Press', 'Sustainability', 'Partners', 'Contact'],
};

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-card)',
      color: 'var(--text-main)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '4rem 0 0',
      transition: 'background-color 0.3s',
    }}>
      <div className="container-wide">
        {/* Main footer grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#D4A373,#c17f40)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Coffee size={20} color="#2C1810" strokeWidth={2.5} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 600,
                color: 'var(--text-main)',
              }}>Velvet Bean</span>
            </div>
            <p style={{
              color: 'var(--text-sub)',
              fontSize: '0.88rem',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
              maxWidth: 260,
            }}>
              Handcrafted coffee, artisan desserts, and unforgettable moments — since 2018.
            </p>

            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: InstagramIcon, color: '#e1306c', href: '#' },
                { icon: FacebookIcon, color: '#1877f2', href: '#' },
                { icon: TwitterIcon, color: '#1da1f2', href: '#' },
                { icon: YoutubeIcon, color: '#ff0000', href: '#' },
              ].map(({ icon: Icon, color, href }) => (
                <motion.a
                  key={color}
                  href={href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '10px',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-sub)',
                    transition: 'all 0.3s',
                  }}
                >
                  <Icon size={17} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-caramel)',
                marginBottom: '1.25rem',
              }}>{title}</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {links.map(link => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo('#' + link.toLowerCase().replace(/\s+/g, '-'))}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.88rem',
                        color: 'var(--text-muted)',
                        transition: 'color 0.2s',
                        padding: 0,
                        textAlign: 'left',
                      }}
                      onMouseEnter={e => e.target.style.color = '#D4A373'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Newsletter */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-caramel)',
              marginBottom: '1.25rem',
            }}>Newsletter</h4>
            <p style={{ color: 'var(--text-sub)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Weekly drops: new menu items, exclusive events, and first-access offers.
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="input-premium"
                style={{ fontSize: '0.85rem' }}
              />
              <motion.button
                type="submit"
                className="btn-primary"
                whileTap={{ scale: 0.97 }}
                style={{ fontSize: '0.8rem', padding: '0.65rem 1rem', color: '#000000', fontWeight: 800 }}
              >
                Subscribe
              </motion.button>
            </form>

            {/* Contact info */}
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { icon: Phone, text: '+1 (212) 555-0101' },
                { icon: Mail, text: 'hello@velvetbean.com' },
                { icon: MapPin, text: '128 Roast St, New York' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon size={14} color="#D4A373" />
                  <span style={{ color: 'var(--text-sub)', fontSize: '0.82rem' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 0',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}>
            © 2026 Velvet Bean Coffee Co. · Made with
            <Heart size={12} color="#D4A373" fill="#D4A373" />
            in New York
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <button
                key={item}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-sans)',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#D4A373'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#D4A373,#c17f40)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2C1810',
              boxShadow: '0 4px 16px rgba(212,163,115,0.3)',
            }}
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
