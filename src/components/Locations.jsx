'use client';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from './ScrollAnimations';
import { MapPin, Clock, Phone, Mail, MessageCircle } from 'lucide-react';

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const locations = [
  {
    name: 'Downtown Flagship',
    address: '128 Roast Street, Financial District',
    city: 'New York, NY 10004',
    phone: '+1 (212) 555-0101',
    email: 'downtown@velvetbean.com',
    hours: 'Mon–Fri: 7AM–10PM · Sat–Sun: 8AM–11PM',
    embed: 'https://maps.google.com/maps?q=New+York+NY&t=&z=13&ie=UTF8&iwloc=&output=embed',
    tags: ['Drive-Through', 'Outdoor Seating', 'Private Dining', 'Free Parking'],
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&q=80',
  },
  {
    name: 'Midtown Espresso Bar',
    address: '55 Fifth Avenue, Suite 101',
    city: 'New York, NY 10003',
    phone: '+1 (212) 555-0202',
    email: 'midtown@velvetbean.com',
    hours: 'Mon–Fri: 6AM–9PM · Sat: 8AM–8PM · Sun: Closed',
    embed: 'https://maps.google.com/maps?q=Midtown+Manhattan&t=&z=13&ie=UTF8&iwloc=&output=embed',
    tags: ['Fast Service', 'Co-working Friendly', 'Takeaway'],
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&q=80',
  },
];

export default function Locations() {
  return (
    <section id="locations" style={{
      background: 'var(--bg-main)',
      color: 'var(--text-main)',
      padding: 'var(--section-py) 0',
      transition: 'background-color 0.3s',
    }}>
      <div className="container-wide">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Find Us
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            marginBottom: '1rem',
          }}>
            Our Locations
          </h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Two premium locations in the heart of New York. Each with its own character, both with the same exceptional coffee.
          </p>
        </motion.div>

        {/* Location cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {locations.map((loc) => (
            <motion.div
              key={loc.name}
              variants={staggerItem}
              style={{
                background: 'var(--bg-card)',
                borderRadius: '1.5rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-soft)',
                border: '1px solid var(--border-subtle)',
              }}
              whileHover={{ y: -4, boxShadow: 'var(--shadow-card)' }}
              transition={{ duration: 0.3 }}
            >
              {/* Location image */}
              <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                <motion.img
                  src={loc.img}
                  alt={loc.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(44,24,16,0.7) 0%, transparent 50%)',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 14,
                  left: 14,
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.3rem',
                    color: '#FFF8F0',
                    fontWeight: 700,
                  }}>{loc.name}</h3>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '1.5rem' }}>
                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {loc.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: '20px',
                      background: 'rgba(212,163,115,0.12)',
                      color: 'var(--color-caramel)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                    }}>{tag}</span>
                  ))}
                </div>

                {/* Details */}
                {[
                  { icon: MapPin, text: `${loc.address}, ${loc.city}` },
                  { icon: Clock, text: loc.hours },
                  { icon: Phone, text: loc.phone },
                  { icon: Mail, text: loc.email },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                  }}>
                    <Icon size={16} color="#D4A373" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: '0.87rem', color: 'var(--text-sub)', lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ fontSize: '0.8rem', padding: '0.6rem 1.25rem' }}
                  >
                    <MapPin size={14} /> Get Directions
                  </a>
                  <a
                    href={`tel:${loc.phone}`}
                    className="btn-outline"
                    style={{ fontSize: '0.8rem', padding: '0.55rem 1.1rem', color: 'var(--text-main)', borderColor: 'var(--border-subtle)' }}
                  >
                    <Phone size={14} /> Call
                  </a>
                  <a
                    href={`https://wa.me/${loc.phone.replace(/\D/g,'')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ fontSize: '0.8rem', padding: '0.55rem 1.1rem', color: '#16a34a', borderColor: '#16a34a40' }}
                  >
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Map embed */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{
            borderRadius: '1.5rem',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)',
            height: 400,
            border: '1px solid var(--border-subtle)',
          }}
        >
          <iframe
            src="https://maps.google.com/maps?q=New+York+NY&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'saturate(0.8) contrast(1.1)' }}
            allowFullScreen
            loading="lazy"
            title="Velvet Bean Location Map"
          />
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{ textAlign: 'center', marginTop: '3rem' }}
        >
          <p style={{ color: 'var(--text-sub)', marginBottom: '1rem', fontSize: '0.9rem' }}>Follow our journey</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {[
              { icon: InstagramIcon, label: 'Instagram', color: '#e1306c', href: '#' },
              { icon: FacebookIcon, label: 'Facebook', color: '#1877f2', href: '#' },
              { icon: TwitterIcon, label: 'Twitter', color: '#1da1f2', href: '#' },
              { icon: MessageCircle, label: 'WhatsApp', color: '#25d366', href: '#' },
            ].map(({ icon: Icon, label, color, href }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: color,
                  transition: 'all 0.3s',
                }}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
