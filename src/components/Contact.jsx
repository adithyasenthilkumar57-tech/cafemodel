'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Sparkles, Clock, Car } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 4000);
  };

  return (
    <section id="contact" style={{ background: '#0F0F10', padding: 'var(--section-py) 0', color: '#FFFFFF' }}>
      <div className="container-wide" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            <span>CONCIERGE & DIRECT CONTACT</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            Connect With Velvet Bean Concierge
          </h2>
          <p style={{ color: '#A39C93', maxWidth: 600, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            Whether inquiring about VIP reservations, private dining suites, press features, or direct roast orders, our hospitality team is at your service.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          
          {/* Contact Direct Cards */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.5rem' }}>
              Direct Channels
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              <a
                href="tel:+12125550198"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.2rem',
                  background: '#1A1A1A',
                  border: '1px solid rgba(196, 154, 108, 0.2)',
                  borderRadius: '1.25rem',
                  textDecoration: 'none',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(196, 154, 108, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C49A6C' }}>
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Concierge Desk</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>+1 (212) 555-0198</div>
                </div>
              </a>

              <a
                href="https://wa.me/12125550198"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.2rem',
                  background: '#1A1A1A',
                  border: '1px solid rgba(196, 154, 108, 0.2)',
                  borderRadius: '1.25rem',
                  textDecoration: 'none',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(37, 211, 102, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366' }}>
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div style={{ color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>WhatsApp VIP Line</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#25D366' }}>Direct WhatsApp Chat</div>
                </div>
              </a>

              <a
                href="mailto:concierge@velvetbean.com"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.2rem',
                  background: '#1A1A1A',
                  border: '1px solid rgba(196, 154, 108, 0.2)',
                  borderRadius: '1.25rem',
                  textDecoration: 'none',
                  color: '#FFFFFF',
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(196, 154, 108, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E5B879' }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Inquiries</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FFFFFF' }}>concierge@velvetbean.com</div>
                </div>
              </a>
            </div>

            {/* Operating Status & Valet */}
            <div style={{ background: '#1A1A1A', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(196, 154, 108, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c55e', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                <Clock size={16} />
                <span>OPEN NOW • TODAY UNTIL 11:00 PM</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#A39C93', fontSize: '0.85rem' }}>
                <Car size={16} color="#C49A6C" />
                <span>Complimentary Valet Parking Available at 5th Ave Entrance.</span>
              </div>
            </div>
          </div>

          {/* Form Box */}
          <div style={{
            background: '#1A1A1A',
            border: '1px solid rgba(196, 154, 108, 0.25)',
            borderRadius: '1.75rem',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{
                  width: 70, height: 70, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem', color: '#0F0F10',
                }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>Message Sent</h3>
                <p style={{ color: '#A39C93', fontSize: '0.9rem' }}>Thank you! Our concierge team will reply shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF' }}>
                  Send a Direct Message
                </h3>

                <div>
                  <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Your Name *</label>
                  <input
                    {...register('name', { required: true })}
                    placeholder="Julian Vance"
                    style={{ width: '100%', padding: '0.8rem 1rem', background: '#0F0F10', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '0.75rem', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Email Address *</label>
                  <input
                    {...register('email', { required: true })}
                    type="email"
                    placeholder="julian@example.com"
                    style={{ width: '100%', padding: '0.8rem 1rem', background: '#0F0F10', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '0.75rem', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Message *</label>
                  <textarea
                    rows={4}
                    {...register('message', { required: true })}
                    placeholder="How can we assist your coffee or dining experience?"
                    style={{ width: '100%', padding: '0.8rem 1rem', background: '#0F0F10', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '0.75rem', color: '#FFFFFF', outline: 'none', resize: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
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
                  <Send size={16} />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
