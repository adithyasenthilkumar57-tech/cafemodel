'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from './ScrollAnimations';
import { Coffee, Star, Award, Heart, X } from 'lucide-react';

const TEAM = [
  {
    name: 'James Moretti',
    role: 'Head Barista',
    specialty: 'Espresso & Latte Art',
    bio: 'James has 12 years of specialty coffee experience across London, Tokyo, and New York. He won the regional barista championship in 2023 and oversaw Velvet Bean\'s entire espresso programme development.',
    funFact: 'James can identify a coffee\'s origin by smell alone — he\'s yet to be stumped.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    color: '#D4A373',
    icon: Coffee,
    rating: 4.99,
  },
  {
    name: 'Maria Santos',
    role: 'Executive Pastry Chef',
    specialty: 'Artisan Desserts & Pastries',
    bio: 'Trained at Le Cordon Bleu Paris and l\'Atelier de Joël Robuchon, Maria brings classical French technique to every item on our food menu. Her Burnt Basque Cheesecake has been featured in New York Magazine.',
    funFact: 'Maria tastes every single dessert that goes out each morning — and has never missed a day.',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    color: '#ec4899',
    icon: Star,
    rating: 5.00,
  },
  {
    name: 'Samuel Park',
    role: 'Café Manager',
    specialty: 'Operations & Guest Experience',
    bio: 'Sam built Velvet Bean\'s operational infrastructure from the ground up. His background in luxury hospitality at The Four Seasons means no detail is too small. He personally trains every new team member.',
    funFact: 'Sam has memorised the coffee order of every regular guest — over 200 people.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    color: '#60a5fa',
    icon: Award,
    rating: 4.97,
  },
  {
    name: 'Priya Nair',
    role: 'Coffee Sourcing Lead',
    specialty: 'Green Bean Procurement & Roasting',
    bio: 'Priya travels 4 months a year visiting farms across Ethiopia, Colombia, and Indonesia to source our seasonal offerings. Her direct-trade relationships ensure farmers receive fair prices.',
    funFact: 'Priya has tasted over 2,000 coffees from 38 countries. She keeps a tasting journal.',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
    color: '#a78bfa',
    icon: Coffee,
    rating: 4.98,
  },
  {
    name: 'Tina Wallis',
    role: 'Senior Barista',
    specialty: 'Cold Brew & Seasonal Specials',
    bio: 'Tina developed our entire cold brew programme, including the award-winning Nitro Cold Brew. She has a background in food science and brings an analytical approach to flavour development.',
    funFact: 'Tina brews 40L of cold brew every single day and has done so for 3 years without interruption.',
    img: 'https://images.unsplash.com/photo-1494790108755-2616b0b92c96?w=400&q=80',
    color: '#4ade80',
    icon: Heart,
    rating: 4.96,
  },
  {
    name: 'Leon Fischer',
    role: 'Barista & Trainer',
    specialty: 'Milk Technique & Latte Art',
    bio: 'Leon competed internationally in the World Latte Art Championship (top 8, 2024). He runs our in-house training sessions and is the lead instructor for the upcoming Coffee Academy.',
    funFact: 'Leon once poured a 100-layer tulip latte art pattern — it took 11 attempts.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    color: '#fb923c',
    icon: Star,
    rating: 4.99,
  },
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="team" style={{ background: 'var(--bg-alt)', color: 'var(--text-main)', padding: 'var(--section-py) 0', position: 'relative', overflow: 'hidden', transition: 'background-color 0.3s' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 70%, rgba(212,163,115,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--color-caramel)' }}>
            The People Behind the Cup
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
            Meet Our Team
          </h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            World-class baristas, pastry chefs, and hospitality experts united by a love for exceptional coffee.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {TEAM.map(member => {
            const Icon = member.icon;
            const isHovered = hoveredId === member.name;
            return (
              <motion.div key={member.name}
                variants={staggerItem}
                onMouseEnter={() => setHoveredId(member.name)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedMember(member)}
                style={{
                  background: 'var(--bg-card)',
                  border: `1px solid ${isHovered ? member.color + '60' : 'var(--border-subtle)'}`,
                  borderRadius: '1.5rem',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-soft)',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                {/* Photo */}
                <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                  <motion.img src={member.img} alt={member.name}
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', border: `2.5px solid ${isHovered ? member.color : 'rgba(212,163,115,0.2)'}`, transition: 'border-color 0.3s' }} />
                  <div style={{
                    position: 'absolute', bottom: 0, right: 'calc(100% - 110px)',
                    width: 30, height: 30, borderRadius: '50%',
                    background: `${member.color}25`, border: `1px solid ${member.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={13} color={member.color} />
                  </div>
                </div>

                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                  {member.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: member.color, fontWeight: 600, marginBottom: '0.15rem', letterSpacing: '0.04em' }}>
                  {member.role}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  {member.specialty}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1rem' }}>
                  <Star size={12} fill="#D4A373" color="#D4A373" />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-sub)', fontWeight: 600 }}>{member.rating}</span>
                </div>

                {/* Fun fact reveal on hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ overflow: 'hidden' }}>
                      <div style={{
                        padding: '0.75rem', borderRadius: '0.75rem',
                        background: `${member.color}15`, border: `1px solid ${member.color}30`,
                        fontSize: '0.8rem', color: 'var(--text-sub)', lineHeight: 1.6,
                        marginTop: '0.25rem',
                      }}>
                        <span style={{ color: member.color, fontWeight: 700 }}>Fun fact: </span>
                        {member.funFact}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div style={{
                  marginTop: '1rem', fontSize: '0.75rem', fontWeight: 600,
                  color: isHovered ? member.color : 'var(--text-muted)',
                  transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: '0.3rem',
                }}>
                  View Full Bio →
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bio modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', zIndex: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: 520, width: '100%',
                background: 'var(--bg-modal)',
                border: `1px solid var(--border-subtle)`,
                borderRadius: '2rem', padding: '2.5rem',
                boxShadow: `var(--shadow-deep)`,
                color: 'var(--text-main)',
              }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <img src={selectedMember.img} alt={selectedMember.name}
                    style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: `2px solid ${selectedMember.color}` }} />
                  <div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-main)', fontWeight: 700 }}>{selectedMember.name}</div>
                    <div style={{ color: selectedMember.color, fontSize: '0.82rem', fontWeight: 600 }}>{selectedMember.role}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.1rem' }}>{selectedMember.specialty}</div>
                  </div>
                </div>
                <button onClick={() => setSelectedMember(null)}
                  style={{ background: 'var(--border-subtle)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-main)', flexShrink: 0 }}>
                  <X size={16} />
                </button>
              </div>
              <p style={{ color: 'var(--text-sub)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                {selectedMember.bio}
              </p>
              <div style={{ padding: '1rem 1.25rem', background: `${selectedMember.color}15`, border: `1px solid ${selectedMember.color}30`, borderRadius: '0.75rem' }}>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: selectedMember.color, fontWeight: 700, marginBottom: '0.4rem' }}>Fun Fact</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: 1.6 }}>{selectedMember.funFact}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
