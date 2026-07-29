'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem, fadeUp, viewportOptions } from './ScrollAnimations';
import { Music, Cake, Briefcase, Heart, Coffee, Utensils, ChevronLeft, ChevronRight, X, Calendar } from 'lucide-react';

const events = [
  { icon: Music,    title: 'Live Jazz Nights',      date: 'Every Friday & Saturday',  desc: 'Unwind with live jazz, acoustic sets, and curated cocktails. Tables fill fast — reserve early.', img: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&q=80', color: '#8b5cf6', tag: 'Music',     calDay: [4, 5, 11, 12, 18, 19, 25, 26] },
  { icon: Cake,     title: 'Birthday Celebrations', date: 'By Appointment',            desc: 'Make their day unforgettable. We prepare custom cakes, decorations, and a private corner just for you.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', color: '#ec4899', tag: 'Private',   calDay: [7, 14, 21] },
  { icon: Briefcase,title: 'Corporate Events',       date: 'Mon–Fri, All Day',          desc: 'Premium space for team meetings, client dinners, product launches, and off-site brainstorming.', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80', color: '#0ea5e9', tag: 'Business',  calDay: [1, 2, 3, 8, 9, 10, 15, 16, 17, 22, 23, 24, 29, 30] },
  { icon: Heart,    title: 'Romantic Dinners',       date: 'Fri–Sun Evenings',          desc: 'Candlelight, curated 5-course menus, and a dedicated sommelier. The perfect date night.', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80', color: '#ef4444', tag: 'Dining',    calDay: [5, 6, 12, 13, 19, 20, 26, 27] },
  { icon: Coffee,   title: 'Barista Workshops',      date: 'Every Sunday 10 AM',        desc: 'Learn the art of espresso, latte art, and cold brew from our award-winning head barista.', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80', color: '#D4A373', tag: 'Workshop',  calDay: [6, 13, 20, 27] },
  { icon: Utensils, title: "Chef's Table Dinner",    date: 'Last Saturday Monthly',     desc: "An exclusive 8-course tasting menu curated by our Executive Chef. Only 12 seats available.", img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80', color: '#f59e0b', tag: 'Exclusive', calDay: [26] },
];

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function CalendarView({ month, year, onPrev, onNext, onDayClick, selectedDay }) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Build event map: day -> events
  const eventMap = {};
  events.forEach(ev => {
    ev.calDay.forEach(d => {
      if (!eventMap[d]) eventMap[d] = [];
      eventMap[d].push(ev);
    });
  });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-subtle)' }}>
      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <button onClick={onPrev} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.25rem' }}>
          <ChevronLeft size={18} />
        </button>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
          {MONTHS[month]} {year}
        </div>
        <button onClick={onNext} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.25rem' }}>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem', marginBottom: '0.5rem' }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.25rem 0' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem' }}>
        {cells.map((day, i) => {
          const dayEvents = day ? (eventMap[day] || []) : [];
          const isSelected = day === selectedDay;
          const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

          return (
            <div key={i}
              onClick={() => day && dayEvents.length > 0 && onDayClick(day, dayEvents)}
              style={{
                aspectRatio: '1',
                borderRadius: '0.6rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: day && dayEvents.length > 0 ? 'pointer' : 'default',
                background: isSelected ? 'linear-gradient(135deg,#D4A373,#c17f40)' : isToday ? 'rgba(212,163,115,0.15)' : 'transparent',
                border: isToday && !isSelected ? '1.5px solid var(--color-caramel)' : '1.5px solid transparent',
                transition: 'all 0.2s',
                position: 'relative',
              }}
            >
              {day && (
                <>
                  <span style={{ fontSize: '0.8rem', fontWeight: isToday || isSelected ? 700 : 400, color: isSelected ? '#fff' : isToday ? 'var(--color-caramel)' : 'var(--text-main)' }}>
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <div style={{ display: 'flex', gap: '1px', marginTop: '1px' }}>
                      {dayEvents.slice(0, 3).map((ev, j) => (
                        <div key={j} style={{ width: 4, height: 4, borderRadius: '50%', background: isSelected ? 'rgba(255,255,255,0.8)' : ev.color }} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {events.map(ev => (
          <div key={ev.title} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: ev.color }} />
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{ev.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Events() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayEvents, setDayEvents] = useState([]);
  const [view, setView] = useState('grid'); // 'grid' | 'calendar'

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setSelectedDay(null);
  };

  const handleDayClick = (day, evs) => {
    setSelectedDay(day);
    setDayEvents(evs);
  };

  return (
    <section id="events" style={{ background: 'var(--bg-main)', color: 'var(--text-main)', padding: 'var(--section-py) 0', transition: 'background-color 0.3s' }}>
      <div className="container-wide">
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Events & Experiences</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
            Create Memories Here
          </h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            From live music to private dining — Velvet Bean is the backdrop for life's most cherished moments.
          </p>

          {/* View toggle */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
            {['grid', 'calendar'].map(v => (
              <button key={v} onClick={() => setView(v)}
                style={{
                  padding: '0.45rem 1.25rem', borderRadius: '50px',
                  border: '1.5px solid',
                  borderColor: view === v ? 'var(--color-caramel)' : 'var(--border-subtle)',
                  background: view === v ? 'rgba(212,163,115,0.15)' : 'var(--bg-card)',
                  color: view === v ? 'var(--color-caramel)' : 'var(--text-sub)',
                  fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
                  textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '0.35rem',
                  transition: 'all 0.2s',
                }}>
                {v === 'calendar' && <Calendar size={13} />}
                {v === 'grid' ? '⊞ Grid View' : 'Calendar View'}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            /* Grid view */
            <motion.div key="grid"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              variants={staggerContainer}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
              {events.map((event) => (
                <motion.div key={event.title} variants={staggerItem}
                  style={{ borderRadius: '1.5rem', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-soft)', cursor: 'pointer', position: 'relative' }}
                  whileHover={{ y: -6, boxShadow: 'var(--shadow-card)' }}
                  transition={{ duration: 0.3 }}>
                  <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                    <motion.img src={event.img} alt={event.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', top: 14, right: 14, padding: '0.25rem 0.75rem', borderRadius: '50px', background: event.color + '33', border: `1px solid ${event.color}66`, color: event.color, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', backdropFilter: 'blur(8px)' }}>
                      {event.tag}
                    </div>
                    <div style={{ position: 'absolute', bottom: 14, left: 14, fontSize: '0.75rem', color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <event.icon size={12} /> {event.date}
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.6rem' }}>{event.title}</h3>
                    <p style={{ fontSize: '0.87rem', color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{event.desc}</p>
                    <button className="btn-primary"
                      onClick={() => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })}
                      style={{ fontSize: '0.8rem', padding: '0.6rem 1.5rem' }}>
                      Book This Event
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Calendar view */
            <motion.div key="calendar"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>
              <CalendarView month={month} year={year} onPrev={prevMonth} onNext={nextMonth}
                onDayClick={handleDayClick} selectedDay={selectedDay} />

              <div>
                {selectedDay && dayEvents.length > 0 ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                      {MONTHS[month]} {selectedDay} — {dayEvents.length} event{dayEvents.length > 1 ? 's' : ''}
                    </h4>
                    {dayEvents.map(ev => (
                      <div key={ev.title} style={{ background: 'var(--bg-card)', borderRadius: '1.25rem', padding: '1.25rem', marginBottom: '1rem', boxShadow: 'var(--shadow-soft)', border: `1px solid ${ev.color}30` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                          <div style={{ width: 38, height: 38, borderRadius: '50%', background: `${ev.color}15`, border: `1.5px solid ${ev.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ev.icon size={16} color={ev.color} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>{ev.title}</div>
                            <div style={{ fontSize: '0.72rem', color: ev.color, fontWeight: 600 }}>{ev.date}</div>
                          </div>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-sub)', lineHeight: 1.6, marginBottom: '1rem' }}>{ev.desc}</p>
                        <button className="btn-primary"
                          onClick={() => document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' })}
                          style={{ fontSize: '0.75rem', padding: '0.5rem 1.25rem' }}>
                          Book Now
                        </button>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <div style={{ background: 'var(--bg-card)', borderRadius: '1.5rem', padding: '2.5rem', textAlign: 'center', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                    <Calendar size={40} strokeWidth={1} style={{ margin: '0 auto 1rem', color: 'var(--color-caramel)' }} />
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                      Select a date
                    </div>
                    <p style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-sub)' }}>
                      Click on any highlighted date to see what events are happening.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #events > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
