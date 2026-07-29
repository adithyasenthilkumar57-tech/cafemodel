'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from './ScrollAnimations';
import { Star, Zap, Award, Gift, Coffee, ChevronRight, Lock, CheckCircle } from 'lucide-react';

const TIERS = [
  { name: 'Bean', min: 0, max: 499, color: '#9ca3af', icon: Coffee, perks: ['1 point per $1 spent', 'Birthday reward', 'Early menu access'] },
  { name: 'Roaster', min: 500, max: 1999, color: '#D4A373', icon: Zap, perks: ['1.5× points multiplier', 'Free size upgrade', 'Monthly mystery drink', 'Priority seating'] },
  { name: 'Master Barista', min: 2000, max: Infinity, color: '#a78bfa', icon: Award, perks: ['2× points multiplier', 'Exclusive blends', 'Private events access', 'Free delivery', 'Dedicated barista'] },
];

const REWARDS = [
  { id: 1, name: 'Free Espresso', points: 150, img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=200&q=80' },
  { id: 2, name: 'Free Pastry', points: 200, img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&q=80' },
  { id: 3, name: 'Free Latte', points: 300, img: 'https://images.unsplash.com/photo-1561882468-9110d70d3069?w=200&q=80' },
  { id: 4, name: '$5 Off Order', points: 400, img: 'https://images.unsplash.com/photo-1572490122747-3e9be5fe6a1e?w=200&q=80' },
  { id: 5, name: 'Dessert Combo', points: 550, img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&q=80' },
  { id: 6, name: '$10 Off Order', points: 750, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=200&q=80' },
];

const HISTORY = [
  { date: 'Jul 25', desc: 'Nitro Cold Brew + Cheesecake', pts: +85 },
  { date: 'Jul 20', desc: 'Loyalty Bonus — Monthly', pts: +50 },
  { date: 'Jul 18', desc: 'Weekend Brunch', pts: +120 },
  { date: 'Jul 10', desc: 'Redeemed: Free Espresso', pts: -150 },
  { date: 'Jul 08', desc: 'Rose Cardamom Latte', pts: +75 },
  { date: 'Jun 30', desc: 'Birthday Bonus 🎂', pts: +200 },
];

const MOCK_POINTS = 780;

export default function LoyaltyRewards() {
  const [redeemed, setRedeemed] = useState([]);
  const [points, setPoints] = useState(MOCK_POINTS);
  const [flash, setFlash] = useState(null);

  const currentTier = TIERS.find(t => points >= t.min && points <= t.max) || TIERS[0];
  const nextTier = TIERS[TIERS.indexOf(currentTier) + 1];
  const progress = nextTier ? ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  const redeem = (reward) => {
    if (points < reward.points || redeemed.includes(reward.id)) return;
    setPoints(p => p - reward.points);
    setRedeemed(prev => [...prev, reward.id]);
    setFlash(reward.id);
    setTimeout(() => setFlash(null), 2000);
  };

  return (
    <section id="loyalty" style={{ background: 'var(--bg-main)', color: 'var(--text-main)', padding: 'var(--section-py) 0', transition: 'background-color 0.3s' }}>
      <div className="container-wide">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Rewards Program
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
            Velvet Bean Loyalty
          </h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Every sip earns you points. Every point brings you closer to incredible rewards.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2rem', alignItems: 'start' }}>
          <div>
            {/* Points card */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
              style={{
                background: `linear-gradient(135deg, ${currentTier.color}22, ${currentTier.color}08)`,
                border: `1px solid ${currentTier.color}40`,
                borderRadius: '2rem',
                padding: '2.5rem',
                marginBottom: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
              {/* Background pattern */}
              <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${currentTier.color}15 0%, transparent 70%)`, pointerEvents: 'none' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    Your Balance
                  </div>
                  <motion.div key={points} initial={{ scale: 1.1 }} animate={{ scale: 1 }}
                    style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 800, color: currentTier.color, lineHeight: 1 }}>
                    {points.toLocaleString()}
                  </motion.div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>points available</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.4rem 1.1rem', borderRadius: '50px',
                    background: `${currentTier.color}20`, border: `1px solid ${currentTier.color}40`,
                    color: currentTier.color, fontWeight: 700, fontSize: '0.85rem',
                  }}>
                    <Award size={14} /> {currentTier.name}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                    {nextTier ? `${nextTier.min - points} pts to ${nextTier.name}` : 'Top tier achieved! 🎉'}
                  </div>
                </div>
              </div>

              {/* Progress to next tier */}
              {nextTier && (
                <div style={{ marginTop: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{currentTier.name}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{nextTier.name}</span>
                  </div>
                  <div style={{ height: 8, background: 'var(--border-subtle)', borderRadius: 4, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      style={{ height: '100%', background: `linear-gradient(90deg,${currentTier.color},${nextTier.color})`, borderRadius: 4 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Rewards grid */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '1.25rem' }}>
                Available Rewards
              </h3>
              <motion.div
                variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
                {REWARDS.map(reward => {
                  const canRedeem = points >= reward.points && !redeemed.includes(reward.id);
                  const isRedeemed = redeemed.includes(reward.id);
                  return (
                    <motion.div key={reward.id} variants={staggerItem}
                      whileHover={canRedeem ? { y: -4, boxShadow: 'var(--shadow-card)' } : {}}
                      style={{
                        background: 'var(--bg-card)', borderRadius: '1.25rem', overflow: 'hidden',
                        border: isRedeemed ? '1.5px solid #4ade80' : '1px solid var(--border-subtle)',
                        boxShadow: 'var(--shadow-soft)',
                        opacity: !canRedeem && !isRedeemed ? 0.6 : 1,
                        transition: 'opacity 0.3s',
                      }}>
                      <div style={{ position: 'relative', height: 120, overflow: 'hidden' }}>
                        <img src={reward.img} alt={reward.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {!canRedeem && !isRedeemed && (
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Lock size={24} color="#fff" />
                          </div>
                        )}
                        {isRedeemed && (
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckCircle size={32} color="#4ade80" />
                          </div>
                        )}
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>{reward.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#D4A373', fontWeight: 700, marginBottom: '0.75rem' }}>{reward.points} pts</div>
                        <button onClick={() => redeem(reward)} disabled={!canRedeem}
                          style={{
                            width: '100%', padding: '0.5rem', borderRadius: '0.5rem',
                            border: 'none', cursor: canRedeem ? 'pointer' : 'default',
                            background: isRedeemed ? 'rgba(74,222,128,0.15)' : canRedeem ? 'linear-gradient(135deg,#D4A373,#c17f40)' : 'var(--border-subtle)',
                            color: isRedeemed ? '#16a34a' : canRedeem ? '#2C1810' : 'var(--text-muted)',
                            fontWeight: 600, fontSize: '0.78rem', transition: 'all 0.2s',
                          }}>
                          {isRedeemed ? '✓ Redeemed' : canRedeem ? 'Redeem Now' : `Need ${reward.points - points} more`}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>

          {/* Sidebar: tiers + history */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Tier cards */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-caramel)', marginBottom: '1rem' }}>
                Membership Tiers
              </h4>
              {TIERS.map(tier => {
                const Icon = tier.icon;
                const isActive = tier.name === currentTier.name;
                return (
                  <motion.div key={tier.name}
                    style={{
                      padding: '1.25rem',
                      background: isActive ? `${tier.color}15` : 'var(--bg-card)',
                      border: `1.5px solid ${isActive ? tier.color + '60' : 'var(--border-subtle)'}`,
                      borderRadius: '1rem',
                      marginBottom: '0.75rem',
                      transition: 'all 0.3s',
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${tier.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={16} color={tier.color} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>{tier.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {tier.max === Infinity ? `${tier.min}+ points` : `${tier.min}–${tier.max} points`}
                        </div>
                      </div>
                      {isActive && <span style={{ marginLeft: 'auto', fontSize: '0.65rem', background: `${tier.color}20`, color: tier.color, padding: '0.15rem 0.5rem', borderRadius: '20px', fontWeight: 700 }}>CURRENT</span>}
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {tier.perks.map(perk => (
                        <li key={perk} style={{ fontSize: '0.78rem', color: 'var(--text-sub)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ color: tier.color }}>✓</span> {perk}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Points history */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
              style={{ background: 'var(--bg-card)', borderRadius: '1.5rem', padding: '1.5rem', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-soft)' }}>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-caramel)', marginBottom: '1rem' }}>
                Points History
              </h4>
              {HISTORY.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: i < HISTORY.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)' }}>{h.desc}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{h.date}</div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: h.pts > 0 ? '#16a34a' : '#ef4444' }}>
                    {h.pts > 0 ? `+${h.pts}` : h.pts}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #loyalty > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
