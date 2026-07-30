'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, MessageSquare, Phone, Mail, Award, HeartHandshake } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useCart } from './CartContext';

const timeSlots = [
  '08:00 AM', '09:30 AM', '11:00 AM', '12:30 PM',
  '02:00 PM', '04:00 PM', '06:00 PM', '07:30 PM', '09:00 PM'
];

const occasions = [
  'Casual Dining', 'Romantic Date', 'Birthday Celebration', 
  'Anniversary', 'Business Meeting', 'Private Wine & Coffee Tasting'
];

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const [reservationData, setReservationData] = useState(null);
  const [selectedTime, setSelectedTime] = useState('07:30 PM');
  const [guestCount, setGuestCount] = useState(2);
  const [occasion, setOccasion] = useState('Casual Dining');

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { triggerAnimation } = useCart();

  const onSubmit = (data) => {
    const finalData = { ...data, time: selectedTime, guests: guestCount, occasion };
    setReservationData(finalData);
    
    // Trigger animated Coffee Cup & Cart success animation for reservation
    triggerAnimation({ name: `VIP Table for ${guestCount} Guests (${selectedTime})` }, 'reservation', () => {
      setSubmitted(true);
    });
  };

  const getWhatsAppLink = () => {
    if (!reservationData) return '#';
    const text = encodeURIComponent(
      `*New Reservation Request - Velvet Bean Reserve*\n` +
      `👤 Name: ${reservationData.name}\n` +
      `📅 Date: ${reservationData.date}\n` +
      `⏰ Time: ${reservationData.time}\n` +
      `👥 Guests: ${reservationData.guests}\n` +
      `✨ Occasion: ${reservationData.occasion}\n` +
      `📞 Phone: ${reservationData.phone}`
    );
    return `https://wa.me/12125550198?text=${text}`;
  };

  return (
    <section id="reservation" style={{ background: '#0F0F10', padding: 'var(--section-py) 0', color: '#FFFFFF', position: 'relative' }}>
      <div className="container-normal" style={{ maxWidth: 1080, margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header */}
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
            <span>TABLE RESERVATION</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            Reserve Your VIP Experience
          </h2>
          <p style={{ color: '#A39C93', maxWidth: 580, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            Experience intimate dining, artisanal coffee pairings, and bespoke hospitality. Secure your table online instantly.
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: '#1A1A1A',
          border: '1px solid rgba(196, 154, 108, 0.25)',
          borderRadius: '1.75rem',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: 'center', padding: '2rem 1rem' }}
              >
                <div style={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 0 40px rgba(196,154,108,0.4)',
                }}>
                  <CheckCircle2 size={48} color="#0F0F10" />
                </div>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  Reservation Confirmed!
                </h3>
                <p style={{ color: '#A39C93', maxWidth: 520, margin: '0 auto 2rem', lineHeight: 1.6 }}>
                  Thank you, <strong style={{ color: '#FFFFFF' }}>{reservationData?.name}</strong>. Your reservation for <strong style={{ color: '#C49A6C' }}>{reservationData?.guests} guests</strong> on <strong style={{ color: '#FFFFFF' }}>{reservationData?.date} at {reservationData?.time}</strong> has been secured.
                </p>

                {/* WhatsApp & Print Actions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.85rem 1.8rem',
                      borderRadius: '50px',
                      background: '#25D366',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)',
                    }}
                  >
                    <MessageSquare size={18} />
                    <span>Send WhatsApp Confirmation</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      reset();
                    }}
                    style={{
                      padding: '0.85rem 1.8rem',
                      borderRadius: '50px',
                      background: 'rgba(244, 231, 211, 0.1)',
                      border: '1px solid rgba(196, 154, 108, 0.3)',
                      color: '#F4E7D3',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                    }}
                  >
                    Make Another Booking
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                
                {/* Guest Count Selector */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F4E7D3', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                    <Users size={16} color="#C49A6C" />
                    <span>Number of Guests</span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {[1, 2, 3, 4, 5, 6, 8, 10, '12+'].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuestCount(num)}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          border: '1px solid',
                          borderColor: guestCount === num ? '#C49A6C' : 'rgba(196, 154, 108, 0.2)',
                          background: guestCount === num ? 'linear-gradient(135deg, #C49A6C, #E5B879)' : '#0F0F10',
                          color: guestCount === num ? '#0F0F10' : '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                  
                  {/* Date Input */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F4E7D3', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                      <Calendar size={16} color="#C49A6C" />
                      <span>Reservation Date *</span>
                    </label>
                    <input
                      type="date"
                      {...register('date', { required: 'Please select a date' })}
                      min={new Date().toISOString().split('T')[0]}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1.2rem',
                        background: '#0F0F10',
                        border: errors.date ? '1px solid #ef4444' : '1px solid rgba(196, 154, 108, 0.25)',
                        borderRadius: '0.75rem',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                    {errors.date && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.date.message}</span>}
                  </div>

                  {/* Occasion Dropdown */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F4E7D3', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                      <HeartHandshake size={16} color="#C49A6C" />
                      <span>Dining Occasion</span>
                    </label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1.2rem',
                        background: '#0F0F10',
                        border: '1px solid rgba(196, 154, 108, 0.25)',
                        borderRadius: '0.75rem',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    >
                      {occasions.map((occ) => (
                        <option key={occ} value={occ}>{occ}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#F4E7D3', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                    <Clock size={16} color="#C49A6C" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        style={{
                          padding: '0.55rem 1.1rem',
                          borderRadius: '50px',
                          border: '1px solid',
                          borderColor: selectedTime === slot ? '#C49A6C' : 'rgba(196, 154, 108, 0.2)',
                          background: selectedTime === slot ? 'rgba(196, 154, 108, 0.2)' : '#0F0F10',
                          color: selectedTime === slot ? '#E5B879' : '#A39C93',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name, Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', color: '#A39C93', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alexander Wright"
                      {...register('name', { required: 'Name is required' })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1.2rem',
                        background: '#0F0F10',
                        border: errors.name ? '1px solid #ef4444' : '1px solid rgba(196, 154, 108, 0.25)',
                        borderRadius: '0.75rem',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#A39C93', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="alexander@example.com"
                      {...register('email', { required: 'Email is required' })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1.2rem',
                        background: '#0F0F10',
                        border: errors.email ? '1px solid #ef4444' : '1px solid rgba(196, 154, 108, 0.25)',
                        borderRadius: '0.75rem',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#A39C93', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (212) 555-0198"
                      {...register('phone', { required: 'Phone is required' })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1.2rem',
                        background: '#0F0F10',
                        border: errors.phone ? '1px solid #ef4444' : '1px solid rgba(196, 154, 108, 0.25)',
                        borderRadius: '0.75rem',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label style={{ display: 'block', color: '#A39C93', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Special Requests or Dietary Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Window seat preferred, gluten allergy, champagne on arrival..."
                    {...register('notes')}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.2rem',
                      background: '#0F0F10',
                      border: '1px solid rgba(196, 154, 108, 0.25)',
                      borderRadius: '0.75rem',
                      color: '#FFFFFF',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1.1rem',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
                    color: '#0F0F10',
                    fontWeight: 700,
                    fontSize: '1rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 6px 25px rgba(196, 154, 108, 0.35)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Confirm Table Reservation
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
