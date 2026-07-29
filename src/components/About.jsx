'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeUp, slideLeft, slideRight, staggerContainer, staggerItem, viewportOptions } from './ScrollAnimations';
import { Award, Users, Coffee, Heart } from 'lucide-react';

function Counter({ target, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { icon: Coffee, value: 50000, suffix: '+', label: 'Cups Served', color: '#D4A373' },
  { icon: Users,  value: 15000, suffix: '+', label: 'Happy Guests', color: '#c17f40' },
  { icon: Award,  value: 12,    suffix: '',  label: 'Awards Won',  color: '#D4A373' },
  { icon: Heart,  value: 8,     suffix: ' Yrs', label: 'Est. Since 2018', color: '#c17f40' },
];

const timeline = [
  { year: '2018', title: 'The Beginning', desc: 'Founded in a small corner of the city with one espresso machine, a dream, and beans sourced directly from Ethiopian highlands.' },
  { year: '2020', title: 'Growing Community', desc: 'Expanded to a second location, introduced our signature cold brew line, and began hosting live music nights.' },
  { year: '2022', title: 'Award-Winning', desc: 'Recognized as the "Best Specialty Coffee" by the City Food Awards. Our latte art became an Instagram sensation.' },
  { year: '2024', title: 'Global Vision', desc: 'Launched our coffee subscription service, farm-to-cup partnerships, and chef-curated seasonal menus.' },
];

export default function About() {
  return (
    <section id="about" style={{
      background: 'var(--bg-main)',
      color: 'var(--text-main)',
      padding: 'var(--section-py) 0',
      overflow: 'hidden',
      transition: 'background-color 0.3s, color 0.3s',
    }}>
      <div className="container-wide">
        {/* Top: image + story */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(2rem, 4vw, 4rem)',
          alignItems: 'center',
          marginBottom: '5rem',
        }}>
          {/* Image collage */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            style={{ position: 'relative', height: 'clamp(320px, 50vh, 520px)', minHeight: 300 }}
          >
            <div style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '65%',
              height: '70%',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-deep)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=85"
                alt="Barista crafting coffee"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: 0, right: 0,
              width: '55%',
              height: '60%',
              borderRadius: '1.5rem',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-deep)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1442975631134-54a13c908b9e?w=500&q=85"
                alt="Coffee beans"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={viewportOptions}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'linear-gradient(135deg,#D4A373,#c17f40)',
                color: '#2C1810',
                borderRadius: '50%',
                width: 100,
                height: 100,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                boxShadow: '0 0 40px rgba(212,163,115,0.5)',
                zIndex: 2,
              }}
            >
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>8+</span>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Years of</span>
              <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Excellence</span>
            </motion.div>
          </motion.div>

          {/* Story text */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            <div className="section-label" style={{ color: 'var(--color-caramel)' }}>
              Our Story
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 700,
              color: 'var(--text-main)',
              lineHeight: 1.15,
              marginBottom: '1.5rem',
            }}>
              More Than Coffee —<br />
              <span style={{
                fontStyle: 'italic',
                fontWeight: 400,
                background: 'linear-gradient(135deg,#D4A373,#e8c99a)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                A Way of Life
              </span>
            </h2>
            <p style={{
              color: 'var(--text-sub)',
              lineHeight: 1.8,
              marginBottom: '1.2rem',
              fontSize: '1rem',
            }}>
              Velvet Bean was born from a simple obsession: the perfect cup of coffee. Our founder, Maria Chen, traveled to coffee farms across Ethiopia, Colombia, and Guatemala to learn the craft from the source — the farmers who pour their lives into every harvest.
            </p>
            <p style={{
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              marginBottom: '2rem',
              fontSize: '0.95rem',
            }}>
              Today, we bring that journey to your cup — from sustainable farms to expert roasting to the careful hands of our baristas. Every sip carries the story of people who genuinely care about coffee.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                className="btn-primary"
                onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Our Menu
              </button>
              <button
                className="btn-outline"
                onClick={() => document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Gallery
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem',
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                borderRadius: '1.25rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-soft)',
                transition: 'all 0.3s',
              }}
              whileHover={{
                borderColor: 'var(--color-caramel)',
                y: -4,
              }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}40)`,
                border: `1px solid ${stat.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}>
                <stat.icon size={22} color={stat.color} />
              </div>
              <div className="counter-number" style={{ fontSize: '2.5rem' }}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginTop: '0.4rem',
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div className="section-label" style={{ color: 'var(--color-caramel)', justifyContent: 'center' }}>
            Our Journey
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            color: 'var(--text-main)',
            fontWeight: 700,
          }}>
            From Dream to Destination
          </h2>
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: 1,
            background: 'linear-gradient(180deg, rgba(212,163,115,0), rgba(212,163,115,0.4), rgba(212,163,115,0))',
            transform: 'translateX(-50%)',
          }} className="hidden-mobile" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              variants={i % 2 === 0 ? slideLeft : slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              style={{
                display: 'flex',
                justify: i % 2 === 0 ? 'flex-start' : 'flex-end',
                marginBottom: '2.5rem',
                position: 'relative',
              }}
            >
              <div style={{
                width: '45%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '1.25rem',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-soft)',
              }}
              className="timeline-card"
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  fontWeight: 700,
                  color: '#D4A373',
                  opacity: 0.3,
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}>{item.year}</div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.3rem',
                  color: 'var(--text-main)',
                  marginBottom: '0.75rem',
                }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>

              {/* Dot */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#D4A373',
                border: '3px solid var(--bg-main)',
                boxShadow: '0 0 12px rgba(212,163,115,0.5)',
                zIndex: 1,
              }} className="hidden-mobile" />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-card { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
