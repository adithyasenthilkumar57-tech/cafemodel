'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, UtensilsCrossed, Sparkles, Send, CheckCircle2, Award } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function CateringFranchise() {
  const [activeTab, setActiveTab] = useState('catering'); // 'catering' | 'franchise'
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 4500);
  };

  return (
    <section id="catering" style={{ background: '#0F0F10', padding: 'var(--section-py) 0', color: '#FFFFFF' }}>
      <div className="container-normal" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem' }}>
        
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
            <span>PARTNERSHIPS & EVENTS</span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            Corporate Catering & Global Franchise
          </h2>
          <p style={{ color: '#A39C93', maxWidth: 600, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            Elevate your executive galas, corporate meetings, and private celebrations with mobile barista bars and fine dining catering.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <button
            onClick={() => setActiveTab('catering')}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '50px',
              border: '1px solid',
              borderColor: activeTab === 'catering' ? '#C49A6C' : 'rgba(196, 154, 108, 0.2)',
              background: activeTab === 'catering' ? 'linear-gradient(135deg, #C49A6C, #E5B879)' : '#1A1A1A',
              color: activeTab === 'catering' ? '#0F0F10' : '#F4E7D3',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <UtensilsCrossed size={18} />
            <span>Corporate & Event Catering</span>
          </button>

          <button
            onClick={() => setActiveTab('franchise')}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '50px',
              border: '1px solid',
              borderColor: activeTab === 'franchise' ? '#C49A6C' : 'rgba(196, 154, 108, 0.2)',
              background: activeTab === 'franchise' ? 'linear-gradient(135deg, #C49A6C, #E5B879)' : '#1A1A1A',
              color: activeTab === 'franchise' ? '#0F0F10' : '#F4E7D3',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Building2 size={18} />
            <span>Franchise Opportunities</span>
          </button>
        </div>

        {/* Card Form Container */}
        <div style={{
          background: '#1A1A1A',
          border: '1px solid rgba(196, 154, 108, 0.25)',
          borderRadius: '1.75rem',
          padding: 'clamp(2rem, 5vw, 3.5rem)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: '#0F0F10',
              }}>
                <CheckCircle2 size={42} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.5rem' }}>
                Inquiry Received
              </h3>
              <p style={{ color: '#A39C93', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
                Our corporate partnerships team will review your request and get back to you within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                {activeTab === 'catering' ? 'Request Corporate Catering Proposal' : 'Apply for Franchise Partnership'}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Victoria Sterling"
                    {...register('name', { required: true })}
                    style={{ width: '100%', padding: '0.85rem', background: '#0F0F10', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '0.75rem', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    placeholder="Sterling & Co. Partners"
                    {...register('company', { required: true })}
                    style={{ width: '100%', padding: '0.85rem', background: '#0F0F10', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '0.75rem', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="victoria@sterling.com"
                    {...register('email', { required: true })}
                    style={{ width: '100%', padding: '0.85rem', background: '#0F0F10', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '0.75rem', color: '#FFFFFF', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', color: '#A39C93', fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  {activeTab === 'catering' ? 'Event Details & Guest Estimate' : 'Target Location & Capital Investment'}
                </label>
                <textarea
                  rows={4}
                  placeholder={activeTab === 'catering' ? 'Describe date, venue, number of guests, and desired coffee bar setup...' : 'Specify city, state, location size, and investment timeline...'}
                  {...register('details', { required: true })}
                  style={{ width: '100%', padding: '0.85rem', background: '#0F0F10', border: '1px solid rgba(196, 154, 108, 0.25)', borderRadius: '0.75rem', color: '#FFFFFF', outline: 'none', resize: 'none' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: '1rem',
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #C49A6C 0%, #E5B879 100%)',
                  color: '#0F0F10',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                <Send size={18} />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
