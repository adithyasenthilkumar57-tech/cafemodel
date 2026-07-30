'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingCart, Search, Eye, Filter, Sparkles, Check, X, Shield, Info, ArrowUpDown } from 'lucide-react';
import { useCart } from './CartContext';

const categories = ['All', 'Coffee', 'Espresso', 'Cold Brew', 'Tea', 'Desserts', 'Savory Brunch', 'Seasonal'];

const menuItems = [
  { 
    id: 1, 
    cat: 'Coffee', 
    name: 'Velvet Gold Latte', 
    price: 7.50, 
    cal: 220, 
    rating: 4.9, 
    badge: 'bestseller', 
    desc: 'Double shot espresso infused with Madagascar vanilla bean, oat milk, and 24K gold dust leaf.', 
    img: 'https://images.unsplash.com/photo-1561882468-9110d70d3069?w=600&q=80',
    origin: 'Yirgacheffe, Ethiopia',
    ingredients: 'Double Espresso, Oat Milk, Vanilla Bean, Organic Honey, 24K Edible Gold',
    nutrition: { protein: '4g', carbs: '22g', fat: '5g' },
    diet: ['Organic', 'Vegan Available'],
    pairing: 'Complements our Burnt Basque Cheesecake perfectly.'
  },
  { 
    id: 2, 
    cat: 'Espresso', 
    name: 'Cortado Reserva', 
    price: 5.50, 
    cal: 80, 
    rating: 4.9, 
    badge: 'chef', 
    desc: 'Equal parts single-origin espresso and silky warm texturized milk served in custom ceramic.', 
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=80',
    origin: 'Antioquia, Colombia',
    ingredients: 'Ristretto Espresso, Whole Organic Milk',
    nutrition: { protein: '5g', carbs: '6g', fat: '4g' },
    diet: ['GF', 'Organic'],
    pairing: 'Pairs seamlessly with warm Almond Croissant.'
  },
  { 
    id: 3, 
    cat: 'Cold Brew', 
    name: 'Kyoto Drip Nitro Cold Brew', 
    price: 8.00, 
    cal: 15, 
    rating: 5.0, 
    badge: 'limited', 
    desc: 'Slow 18-hour cold water extraction infused with pure nitrogen for a cascading cream top.', 
    img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80',
    origin: 'Huehuetenango, Guatemala',
    ingredients: '100% Arabica Cold Brew Coffee, Pure Nitrogen',
    nutrition: { protein: '1g', carbs: '2g', fat: '0g' },
    diet: ['Zero Sugar', 'Vegan', 'GF'],
    pairing: 'Ideal refreshing companion for Avocado Toast.'
  },
  { 
    id: 4, 
    cat: 'Desserts', 
    name: 'Burnt Basque Caramel Cheesecake', 
    price: 9.50, 
    cal: 380, 
    rating: 5.0, 
    badge: 'bestseller', 
    desc: 'Caramelized Basque-style crust with a molten creamy cheese center and sea salt drizzle.', 
    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
    origin: 'House Pastry Kitchen',
    ingredients: 'Spanish Cream Cheese, Farm Eggs, Pure Vanilla, Salted Caramel',
    nutrition: { protein: '8g', carbs: '32g', fat: '24g' },
    diet: ['Vegetarian'],
    pairing: 'Unmatched pairing with our Velvet Gold Latte.'
  },
  { 
    id: 5, 
    cat: 'Savory Brunch', 
    name: 'Truffle Avocats Sourdough', 
    price: 15.00, 
    cal: 420, 
    rating: 4.8, 
    badge: 'chef', 
    desc: 'Artisan sourdough topped with whipped ricotta, crushed Hass avocado, black truffle oil, and poached egg.', 
    img: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=600&q=80',
    origin: 'Organic Farm Partners',
    ingredients: 'Hass Avocado, Sourdough, Black Truffle Oil, Poached Organic Egg, Microgreens',
    nutrition: { protein: '14g', carbs: '38g', fat: '22g' },
    diet: ['Organic', 'Vegetarian'],
    pairing: 'Best enjoyed with Nitro Cold Brew.'
  },
  { 
    id: 6, 
    cat: 'Tea', 
    name: 'Uji Matcha Ceremonial Latte', 
    price: 7.00, 
    cal: 130, 
    rating: 4.9, 
    badge: 'bestseller', 
    desc: 'First-harvest ceremonial Grade A Japanese matcha hand-whisked with steamed oat milk.', 
    img: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&q=80',
    origin: 'Kyoto, Japan',
    ingredients: 'Grade A Matcha Powder, Oat Milk, Blossom Honey',
    nutrition: { protein: '3g', carbs: '18g', fat: '3g' },
    diet: ['Vegan', 'Organic', 'GF'],
    pairing: 'Complements Rose Cardamom Macarons.'
  },
  { 
    id: 7, 
    cat: 'Seasonal', 
    name: 'Smoked Vanilla Bourbon Latte', 
    price: 8.50, 
    cal: 250, 
    rating: 4.9, 
    badge: 'limited', 
    desc: 'Oak-barrel aged bourbon vanilla, espresso, steamed whole milk, topped with smoked cinnamon.', 
    img: 'https://images.unsplash.com/photo-1477456137234-940ef8dda580?w=600&q=80',
    origin: 'Kentucky Bourbon Vanilla Beans',
    ingredients: 'Espresso, Aged Bourbon Vanilla, Whole Milk, Smoked Cinnamon',
    nutrition: { protein: '6g', carbs: '26g', fat: '7g' },
    diet: ['Seasonal Special'],
    pairing: 'Pairs delightfully with Chocolate Fondant.'
  },
  { 
    id: 8, 
    cat: 'Desserts', 
    name: 'Valrhona Molten Fondant', 
    price: 11.00, 
    cal: 440, 
    rating: 5.0, 
    badge: 'chef', 
    desc: 'Decadent French dark chocolate cake with a warm flowing cocoa lava center & Madagascar ice cream.', 
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
    origin: 'Valrhona France 70%',
    ingredients: '70% Dark Chocolate, Farm Butter, Cocoa, Gelato',
    nutrition: { protein: '7g', carbs: '45g', fat: '28g' },
    diet: ['Vegetarian'],
    pairing: 'Pairs superbly with Cortado Reserva.'
  }
];

const badgeMap = {
  bestseller: { label: 'Best Seller', bg: '#C49A6C', color: '#0F0F10' },
  chef:       { label: 'Chef Signature', bg: '#2B1E16', color: '#F4E7D3' },
  limited:    { label: 'Seasonal Limited', bg: '#E5B879', color: '#0F0F10' },
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [favorites, setFavorites] = useState({});
  const { addItem, setIsOpen: openCart } = useCart();

  const toggleFavorite = (id) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtering & Sorting
  let filtered = menuItems.filter(item => {
    const matchCat = activeCategory === 'All' || item.cat === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section id="menu" style={{ background: '#0F0F10', padding: 'var(--section-py) 0', color: '#FFFFFF' }}>
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
            <span>ARTISAN SELECTION</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            The Culinary & Roast Collection
          </h2>
          <p style={{ color: '#A39C93', maxWidth: 620, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            Every roast is precision brewed; every pastry baked fresh at sunrise by our master pastry chefs using single-origin organic ingredients.
          </p>
        </div>

        {/* Search, Category Filters & Sort Controls */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          marginBottom: '3.5rem',
        }}>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            width: '100%',
            maxWidth: 700,
          }}>
            {/* Search Input */}
            <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
              <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#C49A6C' }} />
              <input
                type="text"
                placeholder="Search coffee, desserts, brunch..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem 0.85rem 3rem',
                  background: '#1A1A1A',
                  border: '1px solid rgba(196, 154, 108, 0.25)',
                  borderRadius: '50px',
                  color: '#FFFFFF',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Sorting Select */}
            <div style={{ position: 'relative', width: 180 }}>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1.25rem',
                  background: '#1A1A1A',
                  border: '1px solid rgba(196, 154, 108, 0.25)',
                  borderRadius: '50px',
                  color: '#F4E7D3',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  outline: 'none',
                  cursor: 'pointer',
                }}
              >
                <option value="featured">Sort: Featured</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.6rem',
            width: '100%',
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '50px',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? '#C49A6C' : 'rgba(196, 154, 108, 0.18)',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, #C49A6C, #E5B879)'
                    : '#1A1A1A',
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
        </div>

        {/* Menu Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem',
        }}>
          {filtered.map((item) => {
            const isFav = !!favorites[item.id];
            const badge = item.badge ? badgeMap[item.badge] : null;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: '#1A1A1A',
                  borderRadius: '1.25rem',
                  overflow: 'hidden',
                  border: '1px solid rgba(196, 154, 108, 0.18)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
                className="hover:border-[#C49A6C]"
              >
                {/* Image & Badges */}
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(26,26,26,0.95) 0%, transparent 60%)',
                  }} />

                  {/* Badge */}
                  {badge && (
                    <div style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      padding: '0.3rem 0.8rem',
                      borderRadius: '50px',
                      background: badge.bg,
                      color: badge.color,
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}>
                      {badge.label}
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'rgba(15, 15, 16, 0.75)',
                      backdropFilter: 'blur(8px)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Heart size={16} fill={isFav ? '#ef4444' : 'none'} color={isFav ? '#ef4444' : '#F4E7D3'} />
                  </button>

                  {/* Quick View Button */}
                  <button
                    onClick={() => setQuickViewItem(item)}
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: 12,
                      padding: '0.4rem 0.8rem',
                      borderRadius: '50px',
                      background: 'rgba(15, 15, 16, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(196, 154, 108, 0.3)',
                      color: '#C49A6C',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      cursor: 'pointer',
                    }}
                  >
                    <Eye size={13} />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Content */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h3 style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        color: '#FFFFFF',
                      }}>
                        {item.name}
                      </h3>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.3rem',
                        fontWeight: 700,
                        color: '#C49A6C',
                      }}>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Rating & Diet */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#E5B879', fontSize: '0.8rem', fontWeight: 600 }}>
                        <Star size={13} fill="#E5B879" />
                        <span>{item.rating}</span>
                      </div>
                      <span style={{ color: '#A39C93', fontSize: '0.75rem' }}>• {item.cal} kcal</span>
                    </div>

                    <p style={{ color: '#A39C93', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Add to Cart CTA */}
                  <button
                    onClick={() => {
                      addItem(item);
                      openCart();
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.75rem',
                      background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
                      color: '#0F0F10',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      letterSpacing: '0.04em',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 15px rgba(196, 154, 108, 0.25)',
                    }}
                  >
                    <ShoppingCart size={15} />
                    <span>Add to Order</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick View Modal */}
        <AnimatePresence>
          {quickViewItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 120,
                background: 'rgba(0,0,0,0.85)',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
              }}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                style={{
                  background: '#1A1A1A',
                  border: '1px solid rgba(196, 154, 108, 0.3)',
                  borderRadius: '1.5rem',
                  maxWidth: 720,
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                }}
              >
                <button
                  onClick={() => setQuickViewItem(null)}
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 10,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(15, 15, 16, 0.8)',
                    border: '1px solid rgba(196, 154, 108, 0.3)',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={18} />
                </button>

                {/* Modal Left Image */}
                <div style={{ height: '100%', minHeight: 280 }}>
                  <img
                    src={quickViewItem.img}
                    alt={quickViewItem.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Modal Right Info */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ color: '#C49A6C', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                      {quickViewItem.cat} • {quickViewItem.origin}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: '#FFFFFF', margin: '0.4rem 0' }}>
                      {quickViewItem.name}
                    </h3>
                    <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#C49A6C', marginBottom: '1rem' }}>
                      ${quickViewItem.price.toFixed(2)}
                    </div>

                    <p style={{ color: '#A39C93', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {quickViewItem.desc}
                    </p>

                    <div style={{ background: '#0F0F10', padding: '1rem', borderRadius: '0.75rem', marginBottom: '1.25rem', border: '1px solid rgba(196, 154, 108, 0.15)' }}>
                      <div style={{ color: '#F4E7D3', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                        Craft Pairing Note:
                      </div>
                      <div style={{ color: '#A39C93', fontSize: '0.8rem', fontStyle: 'italic' }}>
                        "{quickViewItem.pairing}"
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', color: '#A39C93', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                      <div><strong style={{ color: '#FFFFFF' }}>Protein:</strong> {quickViewItem.nutrition.protein}</div>
                      <div><strong style={{ color: '#FFFFFF' }}>Carbs:</strong> {quickViewItem.nutrition.carbs}</div>
                      <div><strong style={{ color: '#FFFFFF' }}>Fat:</strong> {quickViewItem.nutrition.fat}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addItem(quickViewItem);
                      setQuickViewItem(null);
                      openCart();
                    }}
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      borderRadius: '50px',
                      background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
                      color: '#0F0F10',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <ShoppingCart size={16} />
                    <span>Add to Cart — ${quickViewItem.price.toFixed(2)}</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
