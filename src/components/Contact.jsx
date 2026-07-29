'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, viewportOptions } from './ScrollAnimations';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
import { useForm } from 'react-hook-form';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log('Contact:', data);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); reset(); }, 4000);
  };

  return (
    <section id="contact" style={{
      background: 'var(--bg-main)',
      color: 'var(--text-main)',
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
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Get in Touch
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            marginBottom: '1rem',
          }}>
            We'd Love to Hear From You
          </h2>
          <p style={{ color: 'var(--text-sub)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            Questions, collaborations, press enquiries, or just saying hello — we read every message.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'start',
        }}>
          {/* Info column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            {/* Contact cards */}
            {[
              { icon: Phone, label: 'Call Us', value: '+1 (212) 555-0101', href: 'tel:+12125550101', color: '#3b82f6' },
              { icon: Mail, label: 'Email Us', value: 'hello@velvetbean.com', href: 'mailto:hello@velvetbean.com', color: '#D4A373' },
              { icon: MessageCircle, label: 'WhatsApp', value: '+1 (212) 555-0101', href: 'https://wa.me/12125550101', color: '#25d366' },
              { icon: MapPin, label: 'Main Location', value: '128 Roast St, New York', href: '#locations', color: '#ef4444' },
              { icon: InstagramIcon, label: 'Instagram', value: '@velvetbean.coffee', href: '#', color: '#e1306c' },
            ].map(({ icon: Icon, label, value, href, color }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={18} color={color} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: 500 }}>{value}</div>
                </div>
              </motion.a>
            ))}

            {/* Hours */}
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', borderRadius: '1rem', background: 'rgba(212,163,115,0.08)', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>Opening Hours</h4>
              {[
                ['Monday – Friday', '7:00 AM – 10:00 PM'],
                ['Saturday', '8:00 AM – 11:00 PM'],
                ['Sunday', '9:00 AM – 10:00 PM'],
                ['Public Holidays', 'Check Instagram'],
              ].map(([day, time]) => (
                <div key={day} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-sub)' }}>{day}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 500 }}>{time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{ textAlign: 'center', padding: '3rem 1rem' }}
                >
                  <CheckCircle size={64} color="#16a34a" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: 'var(--text-sub)', lineHeight: 1.6 }}>
                    We'll get back to you within 24 hours. Thank you for reaching out!
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    Send Us a Message
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <input
                        {...register('name', { required: true })}
                        className="input-premium"
                        placeholder="Your name *"
                      />
                    </div>
                    <div>
                      <input
                        {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
                        className="input-premium"
                        placeholder="Email address *"
                      />
                    </div>
                  </div>

                  <select
                    {...register('subject')}
                    className="input-premium"
                  >
                    <option value="" style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Select subject</option>
                    <option style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>General Inquiry</option>
                    <option style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Private Event Booking</option>
                    <option style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Partnership / Collaboration</option>
                    <option style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Press / Media</option>
                    <option style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Feedback</option>
                    <option style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Job Application</option>
                    <option style={{ background: 'var(--bg-card)', color: 'var(--text-main)' }}>Other</option>
                  </select>

                  <textarea
                    {...register('message', { required: true })}
                    className="input-premium"
                    rows={5}
                    placeholder="Your message *"
                    style={{ resize: 'vertical' }}
                  />

                  {/* Newsletter */}
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" {...register('newsletter')} style={{ accentColor: '#D4A373', width: 16, height: 16 }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-sub)' }}>Subscribe to our newsletter for offers & events</span>
                  </label>

                  <motion.button
                    type="submit"
                    className="btn-primary ripple"
                    whileTap={{ scale: 0.97 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <Send size={16} /> Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
