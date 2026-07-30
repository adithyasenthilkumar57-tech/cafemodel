'use client';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, Sparkles } from 'lucide-react';

const locations = [
  {
    id: 'downtown',
    name: 'Fifth Avenue Flagship & Reserve',
    address: '742 Fifth Avenue, New York, NY 10019',
    phone: '+1 (212) 555-0198',
    hours: 'Mon–Fri 7:00 AM – 10:00 PM | Sat–Sun 8:00 AM – 11:00 PM',
    features: ['VIP Private Room', '24K Gold Espresso', 'Valet Parking', 'Oat Milk Bar'],
    mapUrl: 'https://maps.google.com/?q=742+Fifth+Avenue+New+York',
  },
  {
    id: 'soho',
    name: 'SoHo Artisan & Roastery Lounge',
    address: '142 Mercer Street, New York, NY 10012',
    phone: '+1 (212) 555-0245',
    hours: 'Mon–Sun 7:30 AM – 9:00 PM',
    features: ['Live Roasting Lab', 'Outdoor Terrace', 'Cold Brew Taps'],
    mapUrl: 'https://maps.google.com/?q=142+Mercer+Street+SoHo+New+York',
  },
];

export default function Locations() {
  return (
    <section id="locations" style={{ background: '#141416', padding: 'var(--section-py) 0', color: '#FFFFFF' }}>
      <div className="container-wide" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
            <span>OUR DESTINATIONS</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            New York Locations
          </h2>
          <p style={{ color: '#A39C93', maxWidth: 580, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            Visit our flagship destinations designed for quiet luxury, hand-roasted espresso, and exquisite pastries.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {locations.map((loc) => (
            <div
              key={loc.id}
              style={{
                background: '#1A1A1A',
                border: '1px solid rgba(196, 154, 108, 0.25)',
                borderRadius: '1.5rem',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  {loc.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#A39C93', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                  <MapPin size={18} color="#C49A6C" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{loc.address}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#A39C93', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                  <Phone size={16} color="#C49A6C" style={{ flexShrink: 0 }} />
                  <span>{loc.phone}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#A39C93', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                  <Clock size={16} color="#C49A6C" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span>{loc.hours}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {loc.features.map((feat, i) => (
                    <span key={i} style={{ padding: '0.3rem 0.75rem', borderRadius: '50px', background: 'rgba(196, 154, 108, 0.12)', color: '#E5B879', fontSize: '0.75rem', fontWeight: 600 }}>
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem',
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
                  color: '#0F0F10',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  textDecoration: 'none',
                }}
              >
                <Navigation size={16} />
                <span>Get Directions & Map</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
