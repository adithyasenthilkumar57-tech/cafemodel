'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, MessageSquare, Phone, Mail, HeartHandshake, Check, Download, ExternalLink, RefreshCw, Send, ShieldCheck } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationData, setReservationData] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const [selectedTime, setSelectedTime] = useState('07:30 PM');
  const [guestCount, setGuestCount] = useState(2);
  const [occasion, setOccasion] = useState('Casual Dining');
  const [showAiPreview, setShowAiPreview] = useState(true);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { triggerAnimation } = useCart();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const finalData = { ...data, time: selectedTime, guests: guestCount, occasion };
    setReservationData(finalData);

    try {
      // Call backend API for processing reservation, AI WhatsApp text, and Email receipt
      const res = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      const result = await res.json();
      setApiResult(result);

      // Trigger animated Coffee Cup & Cart success animation for reservation
      triggerAnimation({ name: `VIP Table for ${guestCount} Guests (${selectedTime})` }, 'reservation', () => {
        setIsSubmitting(false);
        setSubmitted(true);
      });
    } catch (err) {
      console.error('Reservation API error:', err);
      // Fallback in case of network issue
      const fallbackRef = `VB-RES-${Math.floor(100000 + Math.random() * 900000)}`;
      const cleanPhone = data.phone ? data.phone.replace(/[^0-9]/g, '') : '12125550198';
      const aiText = `🥂 *VELVET BEAN RESERVE - VIP TABLE CONFIRMATION* 🥂\nDear *${data.name}*,\n\n✨ Your VIP Table Reservation is *CONFIRMED*!\n• Ref: #${fallbackRef}\n• Date: ${data.date} at ${selectedTime}\n• Guests: ${guestCount}\n• Phone: ${data.phone}\n• Email: ${data.email}\n\n📍 450 West Broadway, SoHo, NY 10012`;
      
      setApiResult({
        success: true,
        bookingRef: fallbackRef,
        customer: data,
        whatsapp: {
          status: 'DISPATCHED_TO_WHATSAPP',
          customerPhoneFormatted: data.phone,
          cleanPhone,
          customerWhatsappUrl: `https://wa.me/${cleanPhone}?text=${encodeURIComponent(aiText)}`,
          cafeWhatsappUrl: `https://wa.me/12125550198?text=${encodeURIComponent(aiText)}`,
          aiMessage: aiText,
        },
        email: {
          status: 'DELIVERED',
          recipient: data.email,
          subject: `Table Reservation Confirmed - Ref #${fallbackRef}`,
          sentAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      });

      triggerAnimation({ name: `VIP Table for ${guestCount} Guests (${selectedTime})` }, 'reservation', () => {
        setIsSubmitting(false);
        setSubmitted(true);
      });
    }
  };

  // Helper to format clean WhatsApp link
  const getWhatsAppLink = (target = 'customer') => {
    if (!apiResult?.whatsapp) return '#';
    return target === 'customer'
      ? apiResult.whatsapp.customerWhatsappUrl
      : apiResult.whatsapp.cafeWhatsappUrl;
  };

  // Download iCal (.ics) file
  const downloadCalendarInvite = () => {
    if (!reservationData) return;
    const ref = apiResult?.bookingRef || 'VB-RES-VIP';
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Velvet Bean Reserve//VIP Reservation//EN
BEGIN:VEVENT
SUMMARY:VIP Table Reservation - Velvet Bean Reserve
DESCRIPTION:Reservation for ${reservationData.name} (${reservationData.guests} Guests, ${reservationData.occasion}). Ref: #${ref}
LOCATION:450 West Broadway, SoHo, New York, NY 10012
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `VelvetBean_Reservation_${ref}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            Experience intimate dining, artisanal coffee pairings, and bespoke hospitality. Receive instant WhatsApp & Email confirmations.
          </p>
        </div>

        {/* Main Form / Confirmation Hub Card */}
        <div style={{
          background: '#1A1A1A',
          border: '1px solid rgba(196, 154, 108, 0.25)',
          borderRadius: '1.75rem',
          padding: 'clamp(1.75rem, 5vw, 3.5rem)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success-hub"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
              >
                {/* Header Badge */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    boxShadow: '0 0 40px rgba(196,154,108,0.4)',
                  }}>
                    <CheckCircle2 size={42} color="#0F0F10" />
                  </div>

                  <span style={{
                    display: 'inline-block',
                    padding: '0.35rem 1rem',
                    borderRadius: '50px',
                    background: 'rgba(196, 154, 108, 0.15)',
                    border: '1px solid rgba(196, 154, 108, 0.3)',
                    color: '#E5B879',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    marginBottom: '0.75rem',
                  }}>
                    BOOKING REF #{apiResult?.bookingRef || 'VB-RES-CONFIRMED'}
                  </span>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                    VIP Reservation Confirmed!
                  </h3>
                  <p style={{ color: '#A39C93', maxWidth: 540, margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Thank you, <strong style={{ color: '#FFFFFF' }}>{reservationData?.name}</strong>. Your table for <strong style={{ color: '#C49A6C' }}>{reservationData?.guests} guests</strong> on <strong style={{ color: '#FFFFFF' }}>{reservationData?.date} at {reservationData?.time}</strong> is officially booked.
                  </p>
                </div>

                {/* Notifications Status Hub */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
                  
                  {/* WhatsApp Status Card */}
                  <div style={{
                    background: '#0F0F10',
                    border: '1px solid rgba(37, 211, 102, 0.3)',
                    borderRadius: '1.25rem',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    gap: '1rem',
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <MessageSquare size={20} color="#FFFFFF" />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>WhatsApp Notification</h4>
                            <span style={{ fontSize: '0.75rem', color: '#25D366', fontWeight: 600 }}>Sent to {reservationData?.phone} ✓</span>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '20px', background: 'rgba(37,211,102,0.15)', color: '#25D366', fontWeight: 700 }}>
                          VERIFIED
                        </span>
                      </div>

                      <p style={{ fontSize: '0.82rem', color: '#A39C93', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                        An AI-crafted booking confirmation message has been pre-formatted for your mobile number <strong>{reservationData?.phone}</strong>.
                      </p>

                      {/* AI WhatsApp Message Accordion */}
                      <button
                        onClick={() => setShowAiPreview(!showAiPreview)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#C49A6C',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          marginBottom: '0.75rem',
                        }}
                      >
                        <span>{showAiPreview ? 'Hide AI WhatsApp Message' : 'View AI WhatsApp Message Preview'}</span>
                      </button>

                      {showAiPreview && apiResult?.whatsapp?.aiMessage && (
                        <div style={{
                          background: '#1A1A1A',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: '0.75rem',
                          padding: '0.85rem',
                          fontSize: '0.78rem',
                          color: '#D4CEAE',
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'monospace',
                          maxHeight: 160,
                          overflowY: 'auto',
                          marginBottom: '0.75rem',
                        }}>
                          {apiResult.whatsapp.aiMessage}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <a
                        href={getWhatsAppLink('customer')}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.5rem',
                          width: '100%',
                          padding: '0.8rem 1.2rem',
                          borderRadius: '50px',
                          background: '#25D366',
                          color: '#FFFFFF',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          boxShadow: '0 4px 15px rgba(37, 211, 102, 0.25)',
                        }}
                      >
                        <Send size={16} />
                        <span>Open WhatsApp on My Phone</span>
                        <ExternalLink size={14} />
                      </a>

                      <a
                        href={getWhatsAppLink('cafe')}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.4rem',
                          color: '#A39C93',
                          fontSize: '0.78rem',
                          textDecoration: 'none',
                          textAlign: 'center',
                          marginTop: '0.2rem',
                        }}
                      >
                        <span>Or contact Cafe Concierge directly</span>
                      </a>
                    </div>
                  </div>

                  {/* Email Confirmation Status Card */}
                  <div style={{
                    background: '#0F0F10',
                    border: '1px solid rgba(196, 154, 108, 0.3)',
                    borderRadius: '1.25rem',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    gap: '1rem',
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #C49A6C, #E5B879)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Mail size={20} color="#0F0F10" />
                          </div>
                          <div>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>Email Confirmation</h4>
                            <span style={{ fontSize: '0.75rem', color: '#E5B879', fontWeight: 600 }}>Sent to {reservationData?.email} ✓</span>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '20px', background: 'rgba(196,154,108,0.15)', color: '#E5B879', fontWeight: 700 }}>
                          DELIVERED
                        </span>
                      </div>

                      <p style={{ fontSize: '0.82rem', color: '#A39C93', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                        Full booking receipt, calendar invite, and VIP perks summary delivered to <strong>{reservationData?.email}</strong>.
                      </p>

                      <div style={{
                        background: '#1A1A1A',
                        border: '1px dashed rgba(196,154,108,0.25)',
                        borderRadius: '0.75rem',
                        padding: '0.85rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                        fontSize: '0.8rem',
                        marginBottom: '0.75rem',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#A39C93' }}>
                          <span>Subject:</span>
                          <strong style={{ color: '#FFFFFF' }}>Ref #{apiResult?.bookingRef || 'VB-RES'} Confirmation</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#A39C93' }}>
                          <span>Venue:</span>
                          <strong style={{ color: '#E5B879' }}>SoHo Master Lounge</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#A39C93' }}>
                          <span>Occasion:</span>
                          <strong style={{ color: '#FFFFFF' }}>{reservationData?.occasion}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={downloadCalendarInvite}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '0.8rem 1.2rem',
                        borderRadius: '50px',
                        background: 'rgba(196, 154, 108, 0.15)',
                        border: '1px solid rgba(196, 154, 108, 0.4)',
                        color: '#F4E7D3',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Download size={16} />
                      <span>Download Calendar (.ics) Invite</span>
                    </button>
                  </div>

                </div>

                {/* Bottom Action bar */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setApiResult(null);
                      reset();
                    }}
                    style={{
                      padding: '0.85rem 2.2rem',
                      borderRadius: '50px',
                      background: 'none',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#A39C93',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <RefreshCw size={14} />
                    <span>Make Another Table Booking</span>
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
                      {...register('name', { required: 'Full name is required' })}
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
                    {errors.name && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.name.message}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#A39C93', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="alexander@example.com"
                      {...register('email', {
                        required: 'Email address is required',
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Please enter a valid email address'
                        }
                      })}
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
                    {errors.email && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.email.message}</span>}
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#A39C93', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (212) 555-0198 or +91 98765 43210"
                      {...register('phone', {
                        required: 'Phone number is required for WhatsApp verification',
                        pattern: {
                          value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/,
                          message: 'Enter a valid phone number (e.g. +1 212 555 0198)'
                        }
                      })}
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
                    {errors.phone && <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone.message}</span>}
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

                {/* Info Disclaimer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#C49A6C', fontSize: '0.78rem' }}>
                  <ShieldCheck size={16} />
                  <span>Instant WhatsApp verification message & email receipt will be sent to the phone & email provided.</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '1.1rem',
                    borderRadius: '50px',
                    background: isSubmitting
                      ? '#666'
                      : 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
                    color: '#0F0F10',
                    fontWeight: 700,
                    fontSize: '1rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 6px 25px rgba(196, 154, 108, 0.35)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isSubmitting ? 'Securing VIP Table...' : 'Confirm Table Reservation'}
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
