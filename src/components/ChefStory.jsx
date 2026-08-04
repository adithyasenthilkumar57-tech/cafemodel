'use client';
import { motion } from 'framer-motion';
import { Award, Flame, Heart, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

const awards = [
  { year: '2026', title: 'World Specialty Coffee Excellence', org: 'Global Coffee Association' },
  { year: '2025', title: 'Michelin Guide Hospitality Award', org: 'Michelin Guide New York' },
  { year: '2024', title: 'Master Roaster of the Year', org: 'Specialty Coffee Guild' },
  { year: '2023', title: 'Best Artisan Dessert Dining', org: 'NYC Culinary Awards' },
];

export default function ChefStory() {
  return (
    <section id="chef-story" style={{ background: '#141416', padding: 'var(--section-py) 0', color: '#FFFFFF', position: 'relative' }}>
      <div className="container-wide" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            <span>CRAFT & HERITAGE</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            Master Roasters & Culinary Artistry
          </h2>
          <p style={{ color: '#A39C93', maxWidth: 620, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            Led by Executive Chef Antoine Vance and Head Sommelier Elena Rostova, Velvet Bean blends centuries-old European roasting techniques with modern fine dining precision.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
        }}>
          
          {/* Left Chef Imagery */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '1.75rem',
              overflow: 'hidden',
              border: '1px solid rgba(196, 154, 108, 0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=85"
                alt="Chef Antoine Vance"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&q=85'; }}
                style={{ width: '100%', height: 480, objectFit: 'cover' }}
              />
            </div>

            {/* Badge overlay */}
            <div style={{
              position: 'absolute',
              bottom: -24,
              right: 24,
              background: '#1A1A1A',
              border: '1px solid #C49A6C',
              borderRadius: '1.25rem',
              padding: '1.25rem',
              boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0F0F10',
              }}>
                <Award size={24} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>
                  Antoine Vance
                </div>
                <div style={{ color: '#C49A6C', fontSize: '0.8rem', fontWeight: 600 }}>
                  Master Chef & Founder
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative & Awards Timeline */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '1.25rem',
              lineHeight: 1.2,
            }}>
              "We don't just serve coffee. We create unforgettable sensory moments."
            </h3>

            <p style={{ color: '#A39C93', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '2rem' }}>
              Every coffee bean at Velvet Bean is hand-selected from high-altitude micro-lots in Ethiopia, Colombia, and Guatemala. Roasted in small batches of 5 kilograms using custom cast-iron drums, we preserve fragile floral aromatics and natural caramel sweetness.
            </p>

            {/* Awards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
              {awards.map((aw, i) => (
                <div
                  key={i}
                  style={{
                    background: '#1A1A1A',
                    padding: '1.2rem',
                    borderRadius: '1rem',
                    border: '1px solid rgba(196, 154, 108, 0.2)',
                  }}
                >
                  <div style={{ color: '#C49A6C', fontSize: '1.2rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginBottom: '0.2rem' }}>
                    {aw.year}
                  </div>
                  <div style={{ color: '#FFFFFF', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    {aw.title}
                  </div>
                  <div style={{ color: '#A39C93', fontSize: '0.75rem' }}>
                    {aw.org}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
