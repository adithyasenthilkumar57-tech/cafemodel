'use client';
import { motion } from 'framer-motion';
import { Mail, Globe, MapPin, ArrowUp, Cpu, User, Layers, CheckCircle2 } from 'lucide-react';

const services = [
  'Custom Business Websites',
  'AI Automation Solutions',
  'UI/UX Design',
  'Responsive Web Development',
  'Landing Pages',
  'Website Maintenance & Support',
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{
      background: '#0B0B0C',
      color: '#FFFFFF',
      borderTop: '1px solid rgba(196, 154, 108, 0.25)',
      padding: '4rem 0 2rem',
      position: 'relative',
    }}>
      <div className="container-wide" style={{ maxWidth: 1140, margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Main Footer Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          
          {/* Column 1: Nexeon Brand & Mission */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(196, 154, 108, 0.3)',
              }}>
                <Cpu size={20} color="#0F0F10" />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: 800,
                color: '#FFFFFF',
                margin: 0,
                letterSpacing: '0.02em',
              }}>
                Nexeon
              </h3>
            </div>

            <p style={{ color: '#A39C93', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>
              Building modern websites, AI automation, and digital solutions that help businesses grow. We create fast, responsive, and scalable digital experiences tailored to your business needs.
            </p>
          </div>

          {/* Column 2: Founder Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#C49A6C', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <User size={15} />
              <span>Founder</span>
            </div>

            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF', margin: '0 0 0.3rem' }}>
                Adithya Senthilkumar
              </h4>
              <p style={{ color: '#E5B879', fontSize: '0.82rem', fontWeight: 600, margin: 0, lineHeight: 1.5 }}>
                Full-Stack Developer • AI Automation Developer • Entrepreneur
              </p>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ color: '#C49A6C', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Contact
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
              <a
                href="mailto:Adithyasenthilkumar57@gmail.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: '#A39C93',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#E5B879')}
                onMouseLeave={(e) => (e.target.style.color = '#A39C93')}
              >
                <Mail size={16} color="#C49A6C" />
                <span>Adithyasenthilkumar57@gmail.com</span>
              </a>

              <a
                href="https://adithyasenthilkumar57-tech.github.io/portfolio2/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: '#A39C93',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  wordBreak: 'break-all',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#E5B879')}
                onMouseLeave={(e) => (e.target.style.color = '#A39C93')}
              >
                <Globe size={16} color="#C49A6C" />
                <span>Portfolio Website</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#A39C93' }}>
                <MapPin size={16} color="#C49A6C" />
                <span>Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Column 4: Services */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#C49A6C', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <Layers size={15} />
              <span>Services</span>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {services.map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#A39C93', fontSize: '0.83rem' }}>
                  <CheckCircle2 size={13} color="#C49A6C" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <p style={{ color: '#736E67', fontSize: '0.82rem', margin: 0 }}>
            © 2026 <strong style={{ color: '#FFFFFF' }}>Nexeon</strong>. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '50px',
              background: 'rgba(196, 154, 108, 0.15)',
              border: '1px solid rgba(196, 154, 108, 0.3)',
              color: '#E5B879',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
