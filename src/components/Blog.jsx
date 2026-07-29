'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from './ScrollAnimations';
import { Clock, Tag, ArrowRight, X, BookOpen, ChevronLeft } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    title: 'The Science Behind the Perfect Espresso Pull',
    excerpt: 'Why a 25-second shot at 9 bars of pressure and 93°C produces the most complex flavour compounds...',
    body: `The perfect espresso is a delicate balance of science and craft. Every variable matters — from the grind size to the tamping pressure to the water temperature.

**The Ideal Parameters**
Professional baristas aim for a 25–30 second extraction at 9 bars of pressure with water at 90–96°C. These aren't arbitrary numbers — they're the sweet spot where the most desirable flavour compounds extract without the bitter, harsh ones that come out too late.

**The Maillard Reaction**
When coffee roasts, the Maillard reaction creates hundreds of aromatic compounds. The espresso extraction dissolves them in a precise order — first the solubles that create brightness and sweetness, then the body-building compounds, and finally the bitters.

**At Velvet Bean**
Our baristas recalibrate grinder settings every morning and dial in each new coffee bag. We measure extraction yield using a refractometer to ensure every shot falls within our 18–22% TDS target.

The result? Espresso that's complex, balanced, and repeatable — every single time.`,
    category: 'Brewing Tips',
    date: 'Jul 22, 2026',
    readTime: '5 min read',
    img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=80',
    catColor: '#D4A373',
  },
  {
    id: 2,
    title: 'Behind the Scenes: Our Sourcing Trip to Ethiopia',
    excerpt: 'We travelled to the Yirgacheffe region to meet the farmers growing our signature single-origin beans...',
    body: `Last spring, our head barista and sourcing team flew to the Yirgacheffe region of southern Ethiopia — the birthplace of coffee itself.

**The Farmers We Met**
We visited three smallholder cooperatives whose combined output is only 12 tonnes per year. These families have been growing coffee for generations using traditional natural processing methods.

**The Natural Process**
The cherries are dried whole on raised beds for 20–30 days, allowing the fruit's sugars to ferment into the bean. The result is an intensely fruity, wine-like flavour that no washed coffee can replicate.

**What Comes Back**
Our Yirgacheffe single-origin comes back with notes of blueberry, jasmine, and dark chocolate. It's our most requested pour-over and sells out within weeks of each harvest.

**Why Direct Trade Matters**
By buying directly, we pay 40–60% above commodity prices, ensuring the farmers receive a living wage and can invest in their farms for future harvests.`,
    category: 'Behind the Scenes',
    date: 'Jul 15, 2026',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    catColor: '#ec4899',
  },
  {
    id: 3,
    title: 'How to Make Velvet Bean\'s Rose Cardamom Latte at Home',
    excerpt: 'Our most Instagrammed drink, recreated at home with a simple 4-ingredient recipe...',
    body: `Our Rose Cardamom Latte has become a cult favourite. Good news: you can make a version at home.

**What You'll Need**
- 2 shots of espresso (or strong brewed coffee)
- 200ml oat milk (or any plant milk)
- 2 tablespoons rose syrup (store-bought or homemade)
- ¼ teaspoon freshly cracked cardamom
- Dried rose petals for garnish (optional)

**The Method**
1. Brew your espresso and add the cardamom directly to the grounds before pulling the shot.
2. In a small saucepan, gently warm the oat milk. Whisk vigorously or use a milk frother.
3. Add the rose syrup to your cup, pour in the espresso, then gently pour the frothed milk over the top.
4. Dust with extra cardamom and a few dried rose petals.

**The Secret**
At Velvet Bean, we use house-pressed fresh rose petals in our syrup. For the closest result, simmer 1 cup of fresh rose petals with 1 cup of sugar and 1 cup of water for 10 minutes, then strain.

You won't get the same latte art, but you'll get the same warmth. 🌹`,
    category: 'Recipes',
    date: 'Jul 8, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1542992015-4a0b729b1385?w=800&q=80',
    catColor: '#60a5fa',
  },
  {
    id: 4,
    title: 'Announcing Our First Coffee Academy — Fall 2026',
    excerpt: 'Join our 6-week barista certification programme, taught by our award-winning head barista...',
    body: `We're thrilled to announce the launch of the Velvet Bean Coffee Academy — our first ever professional barista training programme.

**What Is It?**
A 6-week, in-person certification course running every Saturday morning from September through October. Classes are held in our Downtown flagship location in the Roastery Annex.

**What You'll Learn**
- Week 1–2: Coffee theory, origins, and tasting
- Week 3: Espresso and milk technique
- Week 4: Pour-over and alternative brewing
- Week 5: Latte art fundamentals
- Week 6: Running a café — bar management, cleaning, workflow

**Who Is It For?**
Complete beginners are welcome. We also offer an Advanced Pathway for those with existing barista experience.

**Pricing & Enrolment**
Standard pathway: $495 (includes all equipment and coffee)
Advanced pathway: $695

Enrolment opens August 1st via our website. Spots are limited to 12 students per cohort.`,
    category: 'Events',
    date: 'Jul 1, 2026',
    readTime: '3 min read',
    img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    catColor: '#4ade80',
  },
  {
    id: 5,
    title: 'The Beginner\'s Guide to Coffee Grinders',
    excerpt: 'Burr vs blade, hand vs electric — understanding grinders is the single biggest upgrade you can make...',
    body: `If you're serious about better coffee at home, the grinder is the single most impactful purchase you can make — more than the brewer itself.

**Burr vs Blade**
Blade grinders chop beans unevenly, producing a mix of fine dust and coarse chunks. This uneven particle distribution causes uneven extraction — bitter from the fines, sour from the coarses.

Burr grinders — whether flat or conical — crush beans uniformly between two abrasive surfaces. Uniform grind = uniform extraction = better coffee.

**Manual vs Electric**
Manual burr grinders (like the Comandante or 1Zpresso) offer excellent grind quality at $100–200. They require effort but are quiet, portable, and produce café-quality results.

Electric burr grinders start at $100 (Baratza Encore) and scale up to professional flat burr grinders like the Eureka Mignon or DF64 at $300–600.

**Our Recommendation**
For espresso at home: Eureka Mignon Specialita or Niche Zero
For pour-over/filter: Comandante C40 or Fellow Ode Gen 2
For a budget option: Timemore C2 (manual)`,
    category: 'Brewing Tips',
    date: 'Jun 24, 2026',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
    catColor: '#D4A373',
  },
  {
    id: 6,
    title: 'Staff Picks: Our Top 5 Drinks for Summer 2026',
    excerpt: 'The Velvet Bean team shares their current obsessions from our Summer Specials menu...',
    body: `As the temperature rises, our team's orders shift dramatically. Here's what we're drinking right now.

**1. Espresso Tonic — Chef Maria's pick**
"The bitterness of the espresso, the quinine of the tonic, served over ice with a slice of lemon. It's polarising and perfect." — Maria, Pastry Chef

**2. Kyoto-Style Cold Brew — James's pick**
"12-hour drip cold brew through a tower. Insanely clean, almost tea-like. It's meditative to make and even better to drink." — James, Head Barista

**3. Mango Chilli Cold Brew — Priya's pick**
"I wasn't sure about this one when we developed it. Now I have one every shift. The chilli edge against the mango sweetness is a revelation." — Priya, Barista

**4. Sparkling Yuzu Lemonade (non-coffee) — Sam's pick**
"For days when I've had enough caffeine. Japanese yuzu, fresh lemon, sparkling water. Simple and stunning." — Sam, Manager

**5. Cascara Fizz — Tina's pick**
"Coffee cherry tea, carbonated, with a hint of hibiscus. Guests don't know what to make of it — then they order another one." — Tina, Barista`,
    category: 'Behind the Scenes',
    date: 'Jun 17, 2026',
    readTime: '4 min read',
    img: 'https://images.unsplash.com/photo-1572490122747-3e9be5fe6a1e?w=800&q=80',
    catColor: '#a78bfa',
  },
];

const CATEGORIES = ['All', 'Brewing Tips', 'Recipes', 'Events', 'Behind the Scenes'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  const filtered = activeCategory === 'All' ? POSTS : POSTS.filter(p => p.category === activeCategory);

  return (
    <section id="blog" style={{ background: 'var(--bg-main)', color: 'var(--text-main)', padding: 'var(--section-py) 0', transition: 'background-color 0.3s' }}>
      <div className="container-wide">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Journal</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
            Coffee Stories & Guides
          </h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Brewing tips, behind the scenes, recipes, and announcements from the Velvet Bean team.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
          style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.45rem 1.1rem', borderRadius: '50px',
                border: '1.5px solid',
                borderColor: activeCategory === cat ? 'var(--color-caramel)' : 'var(--border-subtle)',
                background: activeCategory === cat ? 'rgba(212,163,115,0.15)' : 'var(--bg-card)',
                color: activeCategory === cat ? 'var(--color-caramel)' : 'var(--text-sub)',
                fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
                transition: 'all 0.2s', letterSpacing: '0.04em',
              }}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOptions}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map(post => (
              <motion.article key={post.id}
                variants={staggerItem}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6, boxShadow: 'var(--shadow-card)' }}
                onClick={() => setSelectedPost(post)}
                style={{
                  background: 'var(--bg-card)', borderRadius: '1.5rem', overflow: 'hidden',
                  boxShadow: 'var(--shadow-soft)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer', transition: 'all 0.3s',
                }}>
                <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                  <motion.img src={post.img} alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    whileHover={{ scale: 1.06 }} transition={{ duration: 0.5 }} />
                  <div style={{
                    position: 'absolute', top: 14, left: 14,
                    padding: '0.2rem 0.65rem', borderRadius: '50px',
                    background: `${post.catColor}20`, border: `1px solid ${post.catColor}40`,
                    color: post.catColor, fontSize: '0.7rem', fontWeight: 700,
                    backdropFilter: 'blur(12px)', letterSpacing: '0.05em',
                  }}>
                    {post.category}
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={11} /> {post.readTime}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: 700, marginBottom: '0.6rem', lineHeight: 1.4 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-caramel)', fontWeight: 600, fontSize: '0.82rem' }}>
                    Read More <ArrowRight size={14} />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Article modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 400, overflowY: 'auto', padding: '2rem 1rem' }}
            onClick={() => setSelectedPost(null)}>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: 740, margin: '0 auto',
                background: 'var(--bg-modal)', borderRadius: '2rem', overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-deep)',
                color: 'var(--text-main)',
              }}>
              {/* Hero image */}
              <div style={{ height: 280, position: 'relative', overflow: 'hidden' }}>
                <img src={selectedPost.img} alt={selectedPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
                <button onClick={() => setSelectedPost(null)}
                  style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,0,0,0.4)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <X size={16} />
                </button>
                <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
                  <div style={{ display: 'inline-flex', padding: '0.2rem 0.75rem', borderRadius: '50px', background: `${selectedPost.catColor}30`, border: `1px solid ${selectedPost.catColor}50`, color: selectedPost.catColor, fontSize: '0.72rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                    {selectedPost.category}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} />{selectedPost.readTime}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{selectedPost.date}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--text-main)', fontWeight: 700, lineHeight: 1.3, marginBottom: '1.5rem' }}>
                  {selectedPost.title}
                </h2>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-sub)', lineHeight: 1.8 }}>
                  {selectedPost.body.split('\n\n').map((para, i) => {
                    if (para.startsWith('**') && para.endsWith('**')) {
                      return <h4 key={i} style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, color: 'var(--text-main)', marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1rem' }}>{para.replace(/\*\*/g, '')}</h4>;
                    }
                    return <p key={i} style={{ marginBottom: '1rem' }}>{para.replace(/\*\*(.*?)\*\*/g, '$1')}</p>;
                  })}
                </div>
                <button onClick={() => setSelectedPost(null)}
                  className="btn-primary ripple" style={{ marginTop: '2rem', fontSize: '0.85rem' }}>
                  <ChevronLeft size={16} /> Back to Journal
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
