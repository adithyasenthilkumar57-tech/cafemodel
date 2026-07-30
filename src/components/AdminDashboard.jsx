'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, ShoppingBag, Calendar, Utensils, Users, Sparkles, 
  Settings, LogOut, ArrowUpRight, CheckCircle2, Clock, XCircle, 
  Plus, Edit, Trash2, MessageSquare, ShieldCheck, DollarSign
} from 'lucide-react';

const mockOrders = [
  { id: '#VB-9401', customer: 'Victoria Sterling', items: '2x Velvet Gold Latte, 1x Basque Cheesecake', total: '$24.50', status: 'Pending', time: '5 mins ago' },
  { id: '#VB-9400', customer: 'Alexander Wright', items: '1x Truffle Avocats Sourdough, 1x Nitro Cold Brew', total: '$23.00', status: 'Preparing', time: '12 mins ago' },
  { id: '#VB-9399', customer: 'Elena Rostova', items: '3x Uji Matcha Latte, 2x Almond Croissant', total: '$32.00', status: 'Completed', time: '28 mins ago' },
  { id: '#VB-9398', customer: 'Marcus Brody', items: '1x Smoked Vanilla Bourbon Latte, 1x Molten Fondant', total: '$19.50', status: 'Completed', time: '45 mins ago' },
];

const mockReservations = [
  { id: '#RES-104', name: 'Dr. Harrison Ford', guests: 4, date: 'Tonight, 8:00 PM', occasion: 'Anniversary', status: 'Confirmed' },
  { id: '#RES-103', name: 'Sophia Chen', guests: 2, date: 'Tomorrow, 1:30 PM', occasion: 'Business Lunch', status: 'Confirmed' },
  { id: '#RES-102', name: 'Lord Henry Sterling', guests: 6, date: 'Friday, 7:30 PM', occasion: 'VIP Tasting', status: 'Pending' },
];

const mockReviews = [
  { id: 1, author: 'Claire D.', rating: 5, comment: 'The 24K Gold Latte and atmosphere made our anniversary unforgettable!' },
  { id: 2, author: 'David K.', rating: 4, comment: 'Extremely good coffee, though peak weekend hours had a short wait for seating.' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState(mockOrders);
  const [reservations, setReservations] = useState(mockReservations);
  const [aiResponse, setAiResponse] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);

  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const updateResStatus = (id, newStatus) => {
    setReservations(reservations.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const generateAIReply = (review) => {
    setSelectedReview(review);
    setAiResponse(
      `Dear ${review.author},\n\nThank you sincerely for dining with Velvet Bean Grand Reserve. We are thrilled to hear that your experience met our master roasters' standard. We look forward to welcoming you back for another exquisite afternoon.\n\nWarmest regards,\nAntoine Vance, Executive Chef`
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F0F10', color: '#FFFFFF' }}>
      
      {/* Admin Sidebar */}
      <div style={{
        width: 260,
        background: '#1A1A1A',
        borderRight: '1px solid rgba(196, 154, 108, 0.2)',
        padding: '2rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.5rem' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C49A6C, #E5B879)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0F0F10',
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.1rem' }}>
                Velvet Admin
              </div>
              <div style={{ fontSize: '0.7rem', color: '#C49A6C', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Executive Suite
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {[
              { id: 'overview', label: 'Overview & Revenue', icon: BarChart3 },
              { id: 'orders', label: 'Orders Portal', icon: ShoppingBag },
              { id: 'reservations', label: 'Table Reservations', icon: Calendar },
              { id: 'menu', label: 'Menu Manager', icon: Utensils },
              { id: 'ai-reply', label: 'AI Review Generator', icon: Sparkles },
              { id: 'users', label: 'Staff & Roles', icon: Users },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    background: isActive ? 'linear-gradient(135deg, #C49A6C, #E5B879)' : 'transparent',
                    color: isActive ? '#0F0F10' : '#A39C93',
                    border: 'none',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left',
                  }}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            background: '#0F0F10',
            border: '1px solid rgba(196, 154, 108, 0.2)',
            color: '#F4E7D3',
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          <LogOut size={16} />
          <span>Exit Admin Portal</span>
        </button>
      </div>

      {/* Main Admin Area */}
      <div style={{ flex: 1, padding: '2.5rem', overflowY: 'auto' }}>
        
        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 800 }}>
              Grand Reserve Management
            </h1>
            <p style={{ color: '#A39C93', fontSize: '0.9rem' }}>
              Real-time analytics, order dispatcher, and AI customer response engine.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ padding: '0.4rem 1rem', borderRadius: '50px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', fontSize: '0.8rem', fontWeight: 700 }}>
              ● Live Systems Online
            </span>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[
                { label: 'Today Revenue', val: '$4,825.00', inc: '+18.4%', icon: DollarSign },
                { label: 'Active Orders', val: '14 Pending', inc: 'Real-time', icon: ShoppingBag },
                { label: 'Today Reservations', val: '28 Guests', inc: 'Full House', icon: Calendar },
                { label: 'Customer Rating', val: '4.95 / 5.0', inc: '1,280 reviews', icon: Sparkles },
              ].map((kpi, i) => {
                const Icon = kpi.icon;
                return (
                  <div key={i} style={{ background: '#1A1A1A', padding: '1.5rem', borderRadius: '1.25rem', border: '1px solid rgba(196, 154, 108, 0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ color: '#A39C93', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{kpi.label}</span>
                      <Icon size={18} color="#C49A6C" />
                    </div>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.3rem' }}>
                      {kpi.val}
                    </div>
                    <div style={{ color: '#C49A6C', fontSize: '0.75rem', fontWeight: 600 }}>
                      {kpi.inc}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Live Orders Table */}
            <div style={{ background: '#1A1A1A', padding: '1.75rem', borderRadius: '1.25rem', border: '1px solid rgba(196, 154, 108, 0.2)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                Recent Live Orders
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(196, 154, 108, 0.2)', color: '#C49A6C' }}>
                      <th style={{ padding: '0.8rem' }}>Order ID</th>
                      <th style={{ padding: '0.8rem' }}>Customer</th>
                      <th style={{ padding: '0.8rem' }}>Items</th>
                      <th style={{ padding: '0.8rem' }}>Total</th>
                      <th style={{ padding: '0.8rem' }}>Status</th>
                      <th style={{ padding: '0.8rem' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '0.8rem', fontWeight: 700 }}>{o.id}</td>
                        <td style={{ padding: '0.8rem' }}>{o.customer}</td>
                        <td style={{ padding: '0.8rem', color: '#A39C93' }}>{o.items}</td>
                        <td style={{ padding: '0.8rem', color: '#C49A6C', fontWeight: 700 }}>{o.total}</td>
                        <td style={{ padding: '0.8rem' }}>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '50px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: o.status === 'Completed' ? 'rgba(34, 197, 94, 0.15)' : o.status === 'Preparing' ? 'rgba(229, 184, 121, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: o.status === 'Completed' ? '#22c55e' : o.status === 'Preparing' ? '#E5B879' : '#ef4444',
                          }}>
                            {o.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.8rem' }}>
                          {o.status !== 'Completed' && (
                            <button
                              onClick={() => updateOrderStatus(o.id, 'Completed')}
                              style={{ padding: '0.35rem 0.75rem', borderRadius: '50px', background: 'linear-gradient(135deg, #C49A6C, #E5B879)', color: '#0F0F10', fontWeight: 700, fontSize: '0.75rem', border: 'none', cursor: 'pointer' }}
                            >
                              Mark Ready
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders */}
        {activeTab === 'orders' && (
          <div style={{ background: '#1A1A1A', padding: '1.75rem', borderRadius: '1.25rem', border: '1px solid rgba(196, 154, 108, 0.2)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>
              Full Orders Dispatch Portal
            </h3>
            <p style={{ color: '#A39C93', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Manage active kitchens, baristas, and delivery statuses.</p>
            
            {orders.map(o => (
              <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#0F0F10', borderRadius: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{o.id} — {o.customer}</div>
                  <div style={{ color: '#A39C93', fontSize: '0.85rem' }}>{o.items} ({o.total})</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => updateOrderStatus(o.id, 'Preparing')} style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', background: '#2B1E16', border: '1px solid #C49A6C', color: '#E5B879', fontSize: '0.8rem' }}>Set Preparing</button>
                  <button onClick={() => updateOrderStatus(o.id, 'Completed')} style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', background: '#22c55e', color: '#FFFFFF', fontSize: '0.8rem', border: 'none' }}>Set Delivered</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Reservations */}
        {activeTab === 'reservations' && (
          <div style={{ background: '#1A1A1A', padding: '1.75rem', borderRadius: '1.25rem', border: '1px solid rgba(196, 154, 108, 0.2)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>
              Table Reservation Dispatch
            </h3>
            {reservations.map(r => (
              <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#0F0F10', borderRadius: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{r.name} ({r.guests} Guests)</div>
                  <div style={{ color: '#A39C93', fontSize: '0.85rem' }}>{r.date} • {r.occasion}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => updateResStatus(r.id, 'Confirmed')} style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', background: 'linear-gradient(135deg, #C49A6C, #E5B879)', color: '#0F0F10', fontWeight: 700, fontSize: '0.8rem', border: 'none' }}>Confirm Table</button>
                  <button onClick={() => updateResStatus(r.id, 'Cancelled')} style={{ padding: '0.4rem 0.8rem', borderRadius: '50px', background: '#ef4444', color: '#FFFFFF', fontSize: '0.8rem', border: 'none' }}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: AI Review Generator */}
        {activeTab === 'ai-reply' && (
          <div style={{ background: '#1A1A1A', padding: '1.75rem', borderRadius: '1.25rem', border: '1px solid rgba(196, 154, 108, 0.2)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              AI Executive Review Response Assistant
            </h3>
            <p style={{ color: '#A39C93', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Instantly draft polished, executive-toned responses to customer feedback.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div>
                <h4 style={{ color: '#C49A6C', marginBottom: '0.75rem' }}>Customer Reviews</h4>
                {mockReviews.map(rv => (
                  <div
                    key={rv.id}
                    onClick={() => generateAIReply(rv)}
                    style={{ padding: '1rem', background: '#0F0F10', borderRadius: '0.75rem', marginBottom: '0.75rem', cursor: 'pointer', border: '1px solid rgba(196, 154, 108, 0.2)' }}
                  >
                    <div style={{ fontWeight: 700 }}>{rv.author} (★ {rv.rating}.0)</div>
                    <div style={{ color: '#A39C93', fontSize: '0.85rem', marginTop: '0.25rem' }}>"{rv.comment}"</div>
                  </div>
                ))}
              </div>

              <div>
                <h4 style={{ color: '#C49A6C', marginBottom: '0.75rem' }}>AI Generated Executive Draft</h4>
                <textarea
                  rows={8}
                  value={aiResponse}
                  onChange={e => setAiResponse(e.target.value)}
                  placeholder="Click a review to generate AI response..."
                  style={{ width: '100%', padding: '1rem', background: '#0F0F10', border: '1px solid rgba(196, 154, 108, 0.3)', borderRadius: '0.75rem', color: '#FFFFFF', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
