'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from './ScrollAnimations';
import { Star, Heart, ShoppingCart, Search, Check } from 'lucide-react';
import { useCart } from './CartContext';

const categories = ['All', 'Coffee', 'Espresso', 'Cold Brew', 'Tea', 'Desserts', 'Breakfast', 'Seasonal'];

const menuItems = [
  // Coffee
  { id: 1, cat: 'Coffee', name: 'Signature Latte', price: 6.50, cal: 220, rating: 4.9, badge: 'bestseller', desc: 'Velvety steamed milk, double espresso, house caramel drizzle', img: 'https://images.unsplash.com/photo-1561882468-9110d70d3069?w=400&q=80' },
  { id: 2, cat: 'Espresso', name: 'Cortado', price: 4.75, cal: 80, rating: 4.8, badge: 'chef', desc: 'Equal parts espresso and warm milk, silky balance', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80' },
  { id: 3, cat: 'Coffee', name: 'Flat White', price: 5.50, cal: 150, rating: 4.7, badge: 'new', desc: 'Micro-foam milk poured over a ristretto base', img: 'https://images.unsplash.com/photo-1534687941688-651ccaafbff8?w=400&q=80' },
  { id: 4, cat: 'Cold Brew', name: 'Nitro Cold Brew', price: 7.00, cal: 15, rating: 5.0, badge: 'limited', desc: 'Nitrogen-infused cold brew, cascading velvety foam', img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80' },
  { id: 5, cat: 'Cold Brew', name: 'Cold Brew Tonic', price: 6.25, cal: 90, rating: 4.6, badge: 'new', desc: 'Cold brew over tonic water, bright & refreshing', img: 'https://images.unsplash.com/photo-1572490122747-3e9be5fe6a1e?w=400&q=80' },
  { id: 6, cat: 'Tea', name: 'Matcha Ceremonial', price: 6.00, cal: 130, rating: 4.8, badge: 'bestseller', desc: 'Grade A Japanese matcha, oat milk, touch of honey', img: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400&q=80' },
  { id: 7, cat: 'Tea', name: 'Chai Latte', price: 5.75, cal: 200, rating: 4.7, badge: null, desc: 'House-spiced masala chai, steamed milk, cinnamon', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80' },
  { id: 8, cat: 'Desserts', name: 'Tiramisu Cake', price: 8.50, cal: 380, rating: 4.9, badge: 'chef', desc: 'Classic Italian layers, espresso-soaked ladyfingers', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80' },
  { id: 9, cat: 'Desserts', name: 'Burnt Basque Cheesecake', price: 7.50, cal: 340, rating: 5.0, badge: 'bestseller', desc: 'Creamy, caramelised top, served warm', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80' },
  { id: 10, cat: 'Breakfast', name: 'Avocado Toast', price: 12.00, cal: 420, rating: 4.6, badge: null, desc: 'Sourdough, whipped ricotta, poached egg, microgreens', img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80' },
  { id: 11, cat: 'Breakfast', name: 'Croissant Almond', price: 5.50, cal: 310, rating: 4.8, badge: 'new', desc: 'Flaky all-butter croissant filled with frangipane', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80' },
  { id: 12, cat: 'Seasonal', name: 'Pumpkin Spice Latte', price: 7.25, cal: 260, rating: 4.9, badge: 'limited', desc: 'Seasonal spice blend, oat milk, gold dust topping', img: 'https://images.unsplash.com/photo-1477456137234-940ef8dda580?w=400&q=80' },
  { id: 13, cat: 'Espresso', name: 'Affogato', price: 6.00, cal: 180, rating: 4.9, badge: 'chef', desc: 'Vanilla gelato drowned in a double ristretto shot', img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80' },
  { id: 14, cat: 'Coffee', name: 'Caramel Macchiato', price: 6.00, cal: 240, rating: 4.7, badge: null, desc: 'Vanilla-marked espresso with caramel drizzle', img: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=400&q=80' },
  { id: 15, cat: 'Desserts', name: 'Chocolate Fondant', price: 9.00, cal: 440, rating: 5.0, badge: 'chef', desc: 'Warm molten centre, served with vanilla ice cream', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80' },
  { id: 16, cat: 'Seasonal', name: 'Rose Cardamom Latte', price: 7.50, cal: 210, rating: 4.8, badge: 'new', desc: 'Fragrant rose syrup, cardamom, steamed oat milk', img: 'https://images.unsplash.com/photo-1542992015-4a0b729b1385?w=400&q=80' },
];

const badgeMap = {
  bestseller: { label: 'Best Seller', cls: 'badge-bestseller' },
  new:        { label: 'New', cls: 'badge-new' },
  chef:       { label: 'Chef Special', cls: 'badge-chef' },
  limited:    { label: 'Limited', cls: 'badge-limited' },
};

function StarRating({ value }) {
  return (
    <div className="star-rating" style={{ fontSize: '0.75rem' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ opacity: i <= Math.floor(value) ? 1 : 0.3 }}>★</span>
      ))}
      <span style={{ color: '#6b7280', marginLeft: 4 }}>{value}</span>
    </div>
  );
}

function MenuCard({ item }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const cardRef = useRef(null);
  const { addItem, setIsOpen } = useCart();

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(10px)`;
  };
  const handleMouseLeave = () => {
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
  };

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    // Brief flash then open cart
    setTimeout(() => setIsOpen(true), 400);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={staggerItem}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'var(--bg-card)',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-soft)',
        transition: 'transform 0.15s ease, box-shadow 0.3s ease, background-color 0.3s',
        cursor: 'default',
      }}
      whileHover={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <motion.img
          src={item.img}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
        }} />
        {/* Badge */}
        {item.badge && (
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <span className={`badge ${badgeMap[item.badge].cls}`}>
              {badgeMap[item.badge].label}
            </span>
          </div>
        )}
        {/* Like button */}
        <button
          onClick={() => setLiked(!liked)}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          <Heart
            size={16}
            fill={liked ? '#ef4444' : 'none'}
            color={liked ? '#ef4444' : 'var(--text-muted)'}
          />
        </button>
        {/* Calories */}
        <div style={{
          position: 'absolute',
          bottom: 10,
          right: 12,
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.85)',
          fontWeight: 500,
        }}>
          {item.cal} kcal
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '1.2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.05rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            lineHeight: 1.3,
          }}>{item.name}</h3>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--color-caramel)',
            whiteSpace: 'nowrap',
            marginLeft: '0.5rem',
          }}>${item.price.toFixed(2)}</span>
        </div>
        <StarRating value={item.rating} />
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-sub)',
          marginTop: '0.5rem',
          marginBottom: '1rem',
          lineHeight: 1.5,
        }}>{item.desc}</p>

        <motion.button
          onClick={handleAdd}
          className="ripple"
          whileTap={{ scale: 0.95 }}
          style={{
            width: '100%',
            padding: '0.65rem',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: 'pointer',
            background: added
              ? 'linear-gradient(135deg,#16a34a,#15803d)'
              : 'linear-gradient(135deg,#D4A373,#c17f40)',
            color: added ? '#fff' : '#2C1810',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
          }}
        >
          <ShoppingCart size={14} />
          {added ? 'Added to Cart ✓' : 'Add to Cart'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.cat === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="menu" style={{
      background: 'var(--bg-alt)',
      padding: 'var(--section-py) 0',
      transition: 'background-color 0.3s',
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
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Our Menu
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            marginBottom: '1rem',
          }}>
            Crafted for Every Craving
          </h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            From single-origin espresso to artisan desserts — every item is made fresh daily with the finest ingredients.
          </p>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 400, width: '100%' }}>
            <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              className="input-premium"
              placeholder="Search menu…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          {/* Category tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: '50px',
                  border: '1.5px solid',
                  borderColor: activeCategory === cat ? '#D4A373' : 'var(--border-subtle)',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg,#D4A373,#c17f40)'
                    : 'var(--bg-card)',
                  color: activeCategory === cat ? '#2C1810' : 'var(--text-sub)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  letterSpacing: '0.04em',
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + search}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {filtered.length > 0 ? filtered.map(item => (
              <MenuCard key={item.id} item={item} />
            )) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                No items found. Try a different search.
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
