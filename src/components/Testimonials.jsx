'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { fadeUp, viewportOptions } from './ScrollAnimations';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sophia Laurent',
    role: 'Food Blogger',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    rating: 5,
    review: "Velvet Bean is hands down the most beautiful café I've ever visited. The latte art is mesmerizing, the ambiance is cinematic, and the Burnt Basque Cheesecake? Absolute perfection. I've been here six times this month.",
    location: 'New York',
    source: 'Google Review',
  },
  {
    name: 'Marcus Chen',
    role: 'Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    rating: 5,
    review: "The Nitro Cold Brew alone is worth the trip. The interior design is exceptional — every corner is photograph-worthy. I come here every morning before work. The staff remembers my name and my order.",
    location: 'San Francisco',
    source: 'Google Review',
  },
  {
    name: 'Amara Okafor',
    role: 'Interior Designer',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80',
    rating: 5,
    review: "I hosted a private client dinner here and it was a dream. The space transformed beautifully, the food was impeccable, and the team went above and beyond to make it special. Truly 5-star service.",
    location: 'London',
    source: 'Yelp Review',
  },
  {
    name: 'James Whitfield',
    role: 'Remote Worker',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    rating: 5,
    review: "Best working café in the city. Fast WiFi, great playlists, perfectly brewed coffee that lasts for hours. The Rose Cardamom Latte is something I dream about. My second home.",
    location: 'Austin',
    source: 'Google Review',
  },
  {
    name: 'Isabella Rossi',
    role: 'Food Photographer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    rating: 5,
    review: "I've shot for some of the world's best restaurants and Velvet Bean holds up to all of them. The food styling, the lighting, the textures — it's all curated with intention. A visual masterpiece.",
    location: 'Milan',
    source: 'TripAdvisor',
  },
  {
    name: 'David Kim',
    role: 'Entrepreneur',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
    rating: 5,
    review: "Brought my investors here for a morning meeting and they were blown away. The ambiance screams premium. The espresso was the best I've had outside of Italy. We signed the deal over cortados.",
    location: 'Seoul',
    source: 'Google Review',
  },
];

function Stars({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: '1rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#F59E0B', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" style={{
      background: 'var(--bg-alt)',
      color: 'var(--text-main)',
      padding: 'var(--section-py) 0',
      overflow: 'hidden',
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
            Testimonials
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            marginBottom: '1rem',
          }}>
            What Our Guests Say
          </h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Real stories from the people who love Velvet Bean as much as we love coffee.
          </p>

          {/* Google rating badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginTop: '1.5rem',
            padding: '0.6rem 1.5rem',
            background: 'var(--bg-card)',
            borderRadius: '50px',
            boxShadow: 'var(--shadow-soft)',
            border: '1px solid var(--border-subtle)',
          }}>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
              <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.5 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 10-1.9 13.7-5.1l-6.3-5.3C29.5 35.5 26.9 36 24 36c-5.3 0-9.7-3-11.3-7.4l-6.6 5.1C9.5 40.1 16.3 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.3C41.4 35.9 44 30.4 44 24c0-1.3-.1-2.6-.4-3.9z"/>
            </svg>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
              4.9 / 5.0
            </span>
            <div style={{ display: 'flex', gap: 1 }}>
              {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#F59E0B', fontSize: '0.85rem' }}>★</span>)}
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Based on 2,400+ reviews</span>
          </div>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          centeredSlides={false}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640:  { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
            1400: { slidesPerView: 3 },
          }}
          style={{ paddingBottom: '3rem' }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-soft)',
                  border: '1px solid var(--border-subtle)',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Quote icon */}
                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.5rem',
                  opacity: 0.06,
                }}>
                  <Quote size={64} color="var(--color-caramel)" />
                </div>

                <Stars count={t.rating} />
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.95rem',
                  color: 'var(--text-sub)',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                }}>
                  "{t.review}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid rgba(212,163,115,0.4)',
                    }}
                  />
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                    }}>{t.name}</div>
                    <div style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                    }}>{t.role} · {t.location}</div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <span style={{
                      fontSize: '0.7rem',
                      color: 'var(--color-caramel)',
                      background: 'rgba(212,163,115,0.1)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '20px',
                      fontWeight: 600,
                    }}>{t.source}</span>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
