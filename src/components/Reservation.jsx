'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, viewportOptions } from './ScrollAnimations';
import { Calendar, Clock, Users, MessageSquare, CheckCircle, Coffee } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log('Reservation:', data);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); reset(); }, 5000);
  };

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  return (
    <section id="reservation" style={{
      background: 'var(--bg-main)',
      color: 'var(--text-main)',
      padding: 'var(--section-py) 0',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background-color 0.3s',
    }}>
      {/* Background image overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=60)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.04,
      }} />

      <div className="container-normal" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="section-label" style={{ justifyContent: 'center', color: 'var(--color-caramel)' }}>
            Make a Reservation
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            marginBottom: '1rem',
          }}>
            Reserve Your Table
          </h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Book your spot for an unforgettable dining experience. We'll have everything ready for your arrival.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          style={{
            background: 'var(--bg-card)',
            backdropFilter: 'blur(24px)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '2rem',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            maxWidth: 780,
            margin: '0 auto',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{
                  textAlign: 'center',
                  padding: '3rem 2rem',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg,#D4A373,#c17f40)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 0 40px rgba(212,163,115,0.5)',
                  }}
                >
                  <CheckCircle size={48} color="#2C1810" />
                </motion.div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  color: 'var(--text-main)',
                  marginBottom: '0.75rem',
                }}>Reservation Confirmed!</h3>
                <p style={{ color: 'var(--text-sub)', lineHeight: 1.7 }}>
                  Thank you for choosing Velvet Bean. You'll receive a confirmation email shortly. We look forward to welcoming you!
                </p>
                <div style={{
                  marginTop: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  color: 'var(--color-caramel)',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                }}>
                  <Coffee size={18} />
                  <span>See you soon!</span>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                {/* Name + Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="input-premium"
                      placeholder="Your full name"
                    />
                    {errors.name && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.name.message}</span>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Phone *
                    </label>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      className="input-premium"
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone.message}</span>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Email *
                  </label>
                  <input
                    {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
                    className="input-premium"
                    type="email"
                    placeholder="your@email.com"
                  />
                  {errors.email && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.email.message}</span>}
                </div>

                {/* Date + Time + Guests */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      <Calendar size={12} style={{ display: 'inline', marginRight: 4 }} /> Date *
                    </label>
                    <input
                      {...register('date', { required: 'Date is required' })}
                      type="date"
                      className="input-premium"
                    />
                    {errors.date && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.date.message}</span>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      <Clock size={12} style={{ display: 'inline', marginRight: 4 }} /> Time *
                    </label>
                    <select
                      {...register('time', { required: 'Time is required' })}
                      className="input-premium"
                    >
                      <option value="" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Select time</option>
                      {timeSlots.map(t => (
                        <option key={t} value={t} style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>{t}</option>
                      ))}
                    </select>
                    {errors.time && <span style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.time.message}</span>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      <Users size={12} style={{ display: 'inline', marginRight: 4 }} /> Guests *
                    </label>
                    <select
                      {...register('guests', { required: true })}
                      className="input-premium"
                    >
                      <option value="" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Select</option>
                      {[1,2,3,4,5,6,7,8,10,12,15,20].map(n => (
                        <option key={n} value={n} style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Occasion */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Occasion
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {['Birthday', 'Anniversary', 'Business', 'Date Night', 'Family', 'Other'].map((occ) => (
                      <label key={occ} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}>
                        <input type="radio" value={occ} {...register('occasion')} style={{ accentColor: '#D4A373' }} />
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-sub)' }}>{occ}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    <MessageSquare size={12} style={{ display: 'inline', marginRight: 4 }} /> Special Requests
                  </label>
                  <textarea
                    {...register('requests')}
                    className="input-premium"
                    rows={3}
                    placeholder="Dietary requirements, allergies, seating preferences, decorations…"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn-primary ripple" style={{ alignSelf: 'center', padding: '1rem 3rem', fontSize: '1rem' }}>
                  <Calendar size={18} /> Confirm Reservation
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
