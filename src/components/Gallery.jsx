'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Play, Compass, Sparkles, Eye, Film } from 'lucide-react';

const categories = ['All', 'Ambiance', 'Artisan Coffee', 'Culinary & Pastry', 'Private Dining'];

const galleryItems = [
  { id: 1, cat: 'Artisan Coffee', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&q=85', title: 'Velvet Gold Latte Art', desc: 'Precision 24K gold leaf latte art handcrafted by Head Barista.', tall: true },
  { id: 2, cat: 'Ambiance', src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1000&q=85', title: 'Warm Velvet Interior', desc: 'Custom Italian leather seating and ambient warm lighting.', tall: false },
  { id: 3, cat: 'Artisan Coffee', src: 'https://images.unsplash.com/photo-1442975631134-54a13c908b9e?w=1000&q=85', title: 'Ethiopian Yirgacheffe Beans', desc: 'Single-origin small batch roast roasted in-house daily.', tall: false },
  { id: 4, cat: 'Private Dining', src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&q=85', title: 'The VIP Grand Reserve Room', desc: 'Private dining suite equipped with acoustic glass & personal sommelier.', tall: true },
  { id: 5, cat: 'Culinary & Pastry', src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=1000&q=85', title: 'Traditional Tiramisu Layer', desc: 'Espresso-soaked ladyfingers with imported mascarpone.', tall: false },
  { id: 6, cat: 'Culinary & Pastry', src: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=1000&q=85', title: 'Truffle Avocats Sourdough', desc: 'Black truffle oil with poached egg and microgreens.', tall: true },
  { id: 7, cat: 'Artisan Coffee', src: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1000&q=85', title: 'Kyoto Drip Nitro Cold Brew', desc: '18-hour cold brew extraction with nitrogen cascade.', tall: false },
  { id: 8, cat: 'Culinary & Pastry', src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1000&q=85', title: 'Valrhona Chocolate Molten', desc: 'French 70% dark chocolate fondant served with Madagascar ice cream.', tall: false },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [viewMode, setViewMode] = useState('photo'); // 'photo' | '360' | 'video'
  const [rotation360, setRotation360] = useState(0);

  const filtered = galleryItems.filter(item => activeCategory === 'All' || item.cat === activeCategory);

  const openLightbox = (idx) => {
    setLightboxIndex(idx);
    setViewMode('photo');
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextSlide = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  const prevSlide = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, filtered.length]);

  return (
    <section id="gallery" style={{ background: '#0F0F10', padding: 'var(--section-py) 0', color: '#FFFFFF' }}>
      <div className="container-wide" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Section Header */}
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
            <span>VISUAL ATMOSPHERE</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            The Velvet Bean Gallery
          </h2>
          <p style={{ color: '#A39C93', maxWidth: 600, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            Immerse yourself in our cinematic environment, master barista techniques, and elegant private dining rooms.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '50px',
                border: '1px solid',
                borderColor: activeCategory === cat ? '#C49A6C' : 'rgba(196, 154, 108, 0.18)',
                background: activeCategory === cat ? 'linear-gradient(135deg, #C49A6C, #E5B879)' : '#1A1A1A',
                color: activeCategory === cat ? '#0F0F10' : '#F4E7D3',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => openLightbox(idx)}
              style={{
                position: 'relative',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                cursor: 'pointer',
                height: item.tall ? 360 : 240,
                border: '1px solid rgba(196, 154, 108, 0.18)',
                background: '#1A1A1A',
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={item.src}
                alt={item.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              
              {/* Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15,15,16,0.9) 0%, transparent 60%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.25rem',
                transition: 'opacity 0.3s ease',
              }}>
                <div style={{ color: '#C49A6C', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {item.cat}
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>
                  {item.title}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && filtered[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 200,
                background: 'rgba(0,0,0,0.92)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
              }}
            >
              {/* Top Controls */}
              <div style={{
                position: 'absolute',
                top: 24,
                left: 24,
                right: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                zIndex: 10,
              }}>
                {/* View Mode Switcher */}
                <div style={{ display: 'flex', gap: '0.5rem', background: '#1A1A1A', padding: '0.3rem', borderRadius: '50px', border: '1px solid rgba(196,154,108,0.3)' }}>
                  <button
                    onClick={() => setViewMode('photo')}
                    style={{
                      padding: '0.4rem 1rem',
                      borderRadius: '50px',
                      background: viewMode === 'photo' ? '#C49A6C' : 'transparent',
                      color: viewMode === 'photo' ? '#0F0F10' : '#F4E7D3',
                      border: 'none',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <Eye size={14} />
                    <span>HD Photo</span>
                  </button>

                  <button
                    onClick={() => setViewMode('360')}
                    style={{
                      padding: '0.4rem 1rem',
                      borderRadius: '50px',
                      background: viewMode === '360' ? '#C49A6C' : 'transparent',
                      color: viewMode === '360' ? '#0F0F10' : '#F4E7D3',
                      border: 'none',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                    }}
                  >
                    <Compass size={14} />
                    <span>360° View</span>
                  </button>
                </div>

                <button
                  onClick={closeLightbox}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: '#1A1A1A',
                    border: '1px solid rgba(196, 154, 108, 0.3)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Prev / Next Buttons */}
              <button
                onClick={prevSlide}
                style={{
                  position: 'absolute',
                  left: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#1A1A1A',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                  color: '#C49A6C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextSlide}
                style={{
                  position: 'absolute',
                  right: 24,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#1A1A1A',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                  color: '#C49A6C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <ChevronRight size={24} />
              </button>

              {/* Main Media Display */}
              <div style={{ maxWidth: 900, width: '100%', maxHeight: '75vh', position: 'relative', textAlign: 'center' }}>
                {viewMode === 'photo' && (
                  <motion.img
                    key={filtered[lightboxIndex].src}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={filtered[lightboxIndex].src}
                    alt={filtered[lightboxIndex].title}
                    style={{
                      maxHeight: '65vh',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      borderRadius: '1rem',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                    }}
                  />
                )}

                {viewMode === '360' && (
                  <div style={{ position: 'relative', width: '100%', height: 450, borderRadius: '1rem', overflow: 'hidden', border: '1px solid #C49A6C' }}>
                    <img
                      src={filtered[lightboxIndex].src}
                      alt="360 view"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transform: `scale(1.25) rotate(${rotation360}deg)`,
                        transition: 'transform 0.1s linear',
                      }}
                    />
                    <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(15,15,16,0.85)', padding: '0.6rem 1.2rem', borderRadius: '50px', color: '#E5B879', fontSize: '0.85rem' }}>
                      Drag or Use Slider to Rotate 360°
                    </div>
                    <input
                      type="range"
                      min="-180"
                      max="180"
                      value={rotation360}
                      onChange={e => setRotation360(e.target.value)}
                      style={{ position: 'absolute', bottom: 65, left: '50%', transform: 'translateX(-50%)', width: 240 }}
                    />
                  </div>
                )}

                <div style={{ marginTop: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {filtered[lightboxIndex].title}
                  </h3>
                  <p style={{ color: '#A39C93', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                    {filtered[lightboxIndex].desc}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
