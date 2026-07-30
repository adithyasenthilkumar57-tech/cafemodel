'use client';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from './ScrollAnimations';
import { Leaf, Wifi, PawPrint, Trophy, Music, UtensilsCrossed, Gift, Users } from 'lucide-react';

const features = [
  { icon: Leaf, title: 'Organic & Sustainable', desc: 'All our beans are ethically sourced from certified organic farms with direct-trade partnerships.', color: '#16a34a' },
  { icon: Trophy, title: 'Award-Winning Coffee', desc: 'Named Best Specialty Coffee for 3 consecutive years by the City Food & Beverage Awards.', color: '#D4A373' },
  { icon: Wifi, title: 'Lightning-Fast WiFi', desc: 'Dedicated 1Gbps connection across all seating areas — the best workspace café in town.', color: '#3b82f6' },
  { icon: PawPrint, title: 'Pet-Friendly Terrace', desc: 'Our sunny outdoor terrace welcomes well-behaved pets with a complimentary water bowl.', color: '#f97316' },
  { icon: Music, title: 'Live Music Weekly', desc: 'Live jazz, acoustic sets, and curated DJ nights every Thursday through Sunday.', color: '#8b5cf6' },
  { icon: UtensilsCrossed, title: 'Private Dining Room', desc: 'An exclusive 30-seat private dining space for corporate events and special celebrations.', color: '#ec4899' },
  { icon: Gift, title: 'Gift Cards & Loyalty', desc: 'Earn 1 point per dollar. Redeem for free drinks, desserts, and exclusive experiences.', color: '#D4A373' },
  { icon: Users, title: 'Community Focused', desc: 'A space for everyone — from remote workers to first dates to family Sunday brunches.', color: '#14b8a6' },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" style={{
      background: 'var(--bg-main)',
      color: 'var(--text-main)',
      padding: 'var(--section-py) 0',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background-color 0.3s, color 0.3s',
    }}>
      {/* Decorative gradient */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(212,163,115,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '4rem',
          }}
        >
          <div>
            <div className="section-label" style={{ color: 'var(--color-caramel)' }}>
              Why Velvet Bean
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontWeight: 700,
              color: 'var(--text-main)',
              lineHeight: 1.15,
            }}>
              We Do Things<br />
              <span style={{
                fontStyle: 'italic',
                fontWeight: 400,
                background: 'linear-gradient(135deg,#D4A373,#e8c99a)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Differently
              </span>
            </h2>
          </div>
          <div>
            <p style={{ color: 'var(--text-sub)', lineHeight: 1.8, fontSize: '1rem' }}>
              At Velvet Bean, every detail is considered — from the temperature of the espresso pull to the angle of the morning light. We believe a great café is more than just coffee. It's an experience worth returning to.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <button
                className="btn-primary"
                onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ color: '#000000', fontWeight: 800 }}
              >
                Our Story
              </button>
            </div>
          </div>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerItem}
              style={{
                padding: '1.75rem',
                borderRadius: '1.25rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-soft)',
                cursor: 'default',
                transition: 'all 0.3s',
              }}
              whileHover={{
                borderColor: `${feature.color}60`,
                y: -4,
              }}
            >
              <motion.div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '14px',
                  background: `${feature.color}18`,
                  border: `1px solid ${feature.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <feature.icon size={22} color={feature.color} />
              </motion.div>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                marginBottom: '0.5rem',
              }}>{feature.title}</h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
              }}>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
