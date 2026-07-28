'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from './ScrollAnimations';
import { Star, ArrowRight } from 'lucide-react';

const featured = [
  {
    name: 'Nitro Cold Brew',
    tagline: 'The Signature Experience',
    desc: 'Slow-steeped for 24 hours, then infused with nitrogen. The result? A silky, cascading waterfall in a glass with a natural sweetness that needs nothing else.',
    price: '$7.00',
    badge: 'Limited Edition',
    badgeColor: '#8b5cf6',
    rating: 5.0,
    reviews: 847,
    img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=700&q=85',
    bg: 'linear-gradient(135deg,#1a0e2e,#2d1b4e)',
    accent: '#8b5cf6',
  },
  {
    name: 'Burnt Basque Cheesecake',
    tagline: 'The Crowd Pleaser',
    desc: 'A San Sebastián classic made our way — caramelised top that shatters like crème brûlée, molten cream cheese centre, zero crust. Served warm.',
    price: '$7.50',
    badge: 'Best Seller',
    badgeColor: '#D4A373',
    rating: 5.0,
    reviews: 1204,
    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&q=85',
    bg: 'linear-gradient(135deg,#2C1810,#4A2C2A)',
    accent: '#D4A373',
  },
  {
    name: 'Rose Cardamom Latte',
    tagline: 'The Seasonal Star',
    desc: 'House-pressed rose petals, freshly cracked cardamom pods, and velvety oat milk layered over a double ristretto. Floral. Warm. Unforgettable.',
    price: '$7.50',
    badge: 'New Arrival',
    badgeColor: '#ec4899',
    rating: 4.8,
    reviews: 392,
    img: 'https://images.unsplash.com/photo-1542992015-4a0b729b1385?w=700&q=85',
    bg: 'linear-gradient(135deg,#2d0a1e,#4a1535)',
    accent: '#ec4899',
  },
];

function FeaturedCard({ item }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    cardRef.current.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1200px) rotateY(0) rotateX(0) translateZ(0)';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={staggerItem}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: item.bg,
        borderRadius: '2rem',
        overflow: 'hidden',
        boxShadow: `0 20px 60px ${item.accent}20`,
        border: `1px solid ${item.accent}20`,
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        cursor: 'default',
      }}
      whileHover={{ boxShadow: `0 30px 80px ${item.accent}35` }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <motion.img
          src={item.img}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
          whileHover={{ scale: 1.06, opacity: 0.9 }}
          transition={{ duration: 0.6 }}
        />
        {/* Badge */}
        <div style={{
          position: 'absolute', top: 16, left: 16,
          padding: '0.3rem 0.9rem', borderRadius: '50px',
          background: `${item.badgeColor}25`, border: `1px solid ${item.badgeColor}60`,
          color: item.badgeColor, fontSize: '0.72rem', fontWeight: 700,
          letterSpacing: '0.08em', backdropFilter: 'blur(12px)',
        }}>
          {item.badge}
        </div>
        {/* Price */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: '50px',
          padding: '0.3rem 0.9rem',
          fontFamily: 'var(--font-display)', fontSize: '1.1rem',
          fontWeight: 700, color: item.accent,
        }}>
          {item.price}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.75rem' }}>
        <div style={{
          fontSize: '0.72rem', color: item.accent,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          fontWeight: 600, marginBottom: '0.4rem',
        }}>{item.tagline}</div>
        <h3 style={{
          fontFamily: 'var(--font-serif)', fontSize: '1.5rem',
          fontWeight: 700, color: '#FFF8F0', marginBottom: '0.75rem',
        }}>{item.name}</h3>
        <p style={{
          fontSize: '0.87rem', color: 'rgba(245,237,224,0.55)',
          lineHeight: 1.7, marginBottom: '1.25rem',
        }}>{item.desc}</p>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={13} fill={item.accent} color={item.accent} />
            ))}
          </div>
          <span style={{ fontSize: '0.82rem', color: 'rgba(245,237,224,0.55)' }}>
            {item.rating} · {item.reviews.toLocaleString()} reviews
          </span>
        </div>

        <button
          className="btn-primary ripple"
          onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: `linear-gradient(135deg,${item.accent},${item.accent}cc)`,
            boxShadow: `0 4px 20px ${item.accent}40`,
            fontSize: '0.82rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          }}
        >
          Order Now <ArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts() {
  return (
    <section id="featured" style={{
      background: 'var(--color-dark)',
      padding: 'var(--section-py) 0',
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
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--color-caramel)' }}>
            Fan Favourites
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 700,
            color: '#FFF8F0',
            marginBottom: '1rem',
          }}>
            The Icons of Velvet Bean
          </h2>
          <p style={{ color: 'rgba(245,237,224,0.55)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Three creations that define who we are — tried, trusted, and talked about.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
          }}
        >
          {featured.map((item) => (
            <FeaturedCard key={item.name} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
