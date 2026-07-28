'use client';
import { motion } from 'framer-motion';
import { fadeUp, viewportOptions } from './ScrollAnimations';

const steps = [
  {
    num: '01',
    title: 'Origin',
    sub: 'Ethiopian Highlands',
    desc: 'Our beans grow at 1,800–2,200m elevation in the Yirgacheffe region, nurtured by volcanic soil and mountain mist.',
    img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&q=80',
    icon: '🌱',
  },
  {
    num: '02',
    title: 'Harvest',
    sub: 'Hand-Picked Selection',
    desc: 'Only perfectly ripe red cherries are selected by hand — no machines. Each picker processes a single tree at a time.',
    img: 'https://images.unsplash.com/photo-1442975631134-54a13c908b9e?w=400&q=80',
    icon: '🫐',
  },
  {
    num: '03',
    title: 'Roasting',
    sub: 'Small-Batch Craft',
    desc: 'Fresh weekly in our partner roastery. We use a drum roaster at precise temperatures to unlock every note in the bean.',
    img: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&q=80',
    icon: '🔥',
  },
  {
    num: '04',
    title: 'Brewing',
    sub: 'The Barista\'s Art',
    desc: 'Each cup is pulled by our trained baristas using calibrated equipment, fresh grounds, and filtered water at 93°C.',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80',
    icon: '☕',
  },
];

export default function CoffeeJourney() {
  return (
    <section id="journey" style={{
      background: 'var(--color-cream)',
      padding: 'var(--section-py) 0',
      overflow: 'hidden',
    }}>
      <div className="container-wide">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            The Journey
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 700,
            color: 'var(--color-coffee)',
            marginBottom: '1rem',
          }}>
            From Farm to Your Cup
          </h2>
          <p style={{ color: '#6b7280', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            Every sip of Velvet Bean coffee carries a story that spans continents, seasons, and the hands of dozens of dedicated people.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: 80,
            left: '10%',
            right: '10%',
            height: 2,
            background: 'linear-gradient(90deg, rgba(212,163,115,0) 0%, rgba(212,163,115,0.4) 20%, rgba(212,163,115,0.4) 80%, rgba(212,163,115,0) 100%)',
          }} className="hidden-mobile" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
          }}>
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                style={{ textAlign: 'center', position: 'relative' }}
              >
                {/* Step number + image circle */}
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid rgba(212,163,115,0.3)',
                    margin: '0 auto',
                    boxShadow: 'var(--shadow-soft)',
                  }}>
                    <motion.img
                      src={step.img}
                      alt={step.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  {/* Step number badge */}
                  <div style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg,#D4A373,#c17f40)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#2C1810',
                    boxShadow: '0 4px 12px rgba(212,163,115,0.4)',
                  }}>
                    {step.num}
                  </div>
                  {/* Emoji */}
                  <div style={{
                    position: 'absolute',
                    bottom: -5,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '1.5rem',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  }}>
                    {step.icon}
                  </div>
                </div>

                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  color: 'var(--color-caramel)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '0.35rem',
                }}>
                  {step.sub}
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--color-coffee)',
                  marginBottom: '0.75rem',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  lineHeight: 1.7,
                  maxWidth: 220,
                  margin: '0 auto',
                }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{ textAlign: 'center', marginTop: '4rem' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2rem',
            padding: '1.5rem 2.5rem',
            background: 'linear-gradient(135deg,#2C1810,#4A2C2A)',
            borderRadius: '1.5rem',
            boxShadow: 'var(--shadow-deep)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#FFF8F0', fontWeight: 600, marginBottom: '0.25rem' }}>
                Join a Barista Workshop
              </div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(245,237,224,0.6)' }}>
                Every Sunday 10 AM · Limited to 12 seats
              </div>
            </div>
            <button
              className="btn-primary"
              onClick={() => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Book My Spot
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
