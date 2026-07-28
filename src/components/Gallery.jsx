'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from './ScrollAnimations';
import { X, ZoomIn, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const galleryImages = [
  { id: 1,  src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=85', alt: 'Latte art',           tall: true  },
  { id: 2,  src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=85', alt: 'Café interior',       tall: false },
  { id: 3,  src: 'https://images.unsplash.com/photo-1442975631134-54a13c908b9e?w=600&q=85', alt: 'Coffee beans',        tall: false },
  { id: 4,  src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=85', alt: 'Modern café',          tall: true  },
  { id: 5,  src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=85', alt: 'Barista at work',     tall: false },
  { id: 6,  src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=85', alt: 'Tiramisu dessert',   tall: false },
  { id: 7,  src: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=600&q=85', alt: 'Avocado toast',      tall: true  },
  { id: 8,  src: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=85', alt: 'Nitro cold brew',     tall: false },
  { id: 9,  src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=85', alt: 'Fresh croissant',     tall: false },
  { id: 10, src: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&q=85', alt: 'Matcha latte',       tall: true  },
  { id: 11, src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=85', alt: 'Chocolate fondant',  tall: false },
  { id: 12, src: 'https://images.unsplash.com/photo-1572490122747-3e9be5fe6a1e?w=600&q=85', alt: 'Cold brew tonic',    tall: false },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null); // index
  const [zoomed, setZoomed] = useState(false);

  const open = (i) => { setLightbox(i); setZoomed(false); };
  const close = () => { setLightbox(null); setZoomed(false); };
  const prev = () => { setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length); setZoomed(false); };
  const next = () => { setLightbox((lightbox + 1) % galleryImages.length); setZoomed(false); };

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  // Touch swipe
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    touchStartX.current = null;
  };

  return (
    <section id="gallery" style={{
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
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--color-caramel)' }}>
            Gallery
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 700,
            color: '#FFF8F0',
            marginBottom: '1rem',
          }}>
            Moments That Matter
          </h2>
          <p style={{ color: 'rgba(245,237,224,0.55)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Every corner of Velvet Bean is a frame worth capturing. Click any image to explore in full screen.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="masonry-grid"
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.id}
              variants={staggerItem}
              className="masonry-item"
              onClick={() => open(i)}
              style={{ cursor: 'pointer' }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.75rem' }}>
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: img.tall ? 340 : 220,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.5 }}
                />
                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(44,24,16,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '0.75rem',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'rgba(212,163,115,0.9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ZoomIn size={20} color="#2C1810" />
                  </div>
                  <span style={{ color: 'rgba(255,248,240,0.8)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em' }}>
                    {img.alt}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={close}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ flexDirection: 'column', gap: '1rem' }}
          >
            {/* Top bar */}
            <div style={{
              position: 'fixed', top: 0, left: 0, right: 0,
              padding: '1rem 1.5rem',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              zIndex: 10,
            }}>
              <div style={{ color: 'rgba(255,248,240,0.7)', fontSize: '0.8rem', fontFamily: 'var(--font-sans)' }}>
                <span style={{ color: '#D4A373', fontWeight: 600 }}>{lightbox + 1}</span>
                <span> / {galleryImages.length}</span>
                <span style={{ marginLeft: '1rem', color: 'rgba(255,248,240,0.5)' }}>
                  Use ← → keys or swipe to navigate
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={(e) => { e.stopPropagation(); setZoomed(z => !z); }}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                  <Maximize2 size={15} />
                </button>
                <button onClick={close}
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '0.5rem', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                borderRadius: '1rem',
                overflow: 'hidden',
                maxWidth: zoomed ? '95vw' : '900px',
                maxHeight: '80vh',
                transition: 'max-width 0.3s',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightbox}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  src={galleryImages[lightbox].src.replace('w=600', 'w=1200')}
                  alt={galleryImages[lightbox].alt}
                  style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', display: 'block' }}
                />
              </AnimatePresence>
              {/* Caption */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1rem 1.5rem',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                color: '#FFF8F0', fontFamily: 'var(--font-serif)', fontSize: '1rem',
              }}>
                {galleryImages[lightbox].alt}
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', maxWidth: '90vw', padding: '0.25rem' }}
              onClick={e => e.stopPropagation()}>
              {galleryImages.map((img, i) => (
                <button key={img.id} onClick={() => open(i)}
                  style={{
                    width: 56, height: 42, borderRadius: '0.4rem', overflow: 'hidden', flexShrink: 0,
                    border: i === lightbox ? '2px solid #D4A373' : '2px solid transparent',
                    cursor: 'pointer', padding: 0, transition: 'border-color 0.2s',
                    opacity: i === lightbox ? 1 : 0.6,
                  }}>
                  <img src={img.src.replace('w=600', 'w=100')} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>

            {/* Nav arrows */}
            <button onClick={(e) => { e.stopPropagation(); prev(); }} style={{
              position: 'fixed', left: '1rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(212,163,115,0.85)', border: 'none', borderRadius: '50%',
              width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#2C1810', backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}>
              <ChevronLeft size={24} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} style={{
              position: 'fixed', right: '1rem', top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(212,163,115,0.85)', border: 'none', borderRadius: '50%',
              width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#2C1810', backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}>
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
