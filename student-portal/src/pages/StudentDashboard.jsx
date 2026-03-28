import React, { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'
import RegistrationModal from '../components/RegistrationModal'

const NAV = [
  { label: 'Dashboard', icon: '🏠', path: 'dashboard', fullPath: '/student/dashboard' },
  { label: 'Browse Events', icon: '📅', path: 'events', fullPath: '/student/events' },
  { label: 'My Registrations', icon: '✅', path: 'my-events', fullPath: '/student/my-events' },
  { label: 'My Profile', icon: '👤', path: 'profile', fullPath: '/student/profile' },
]

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '20px',
      display: 'flex', alignItems: 'center', gap: '16px',
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '12px', fontSize: '22px',
        background: color || 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: '22px', fontWeight: '700' }}>{value}</div>
        <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '2px' }}>{label}</div>
      </div>
    </div>
  )
}

function StudentHome() {
  const { user, events } = useAuth()
  const registered = user.registeredEvents || []
  const navigate = useNavigate()

  return (
    <div style={{ padding: '28px', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
          Hello, {user.name.split(' ')[0]} 👋
        </h1>
        <p style={{ color: 'var(--text3)', fontSize: '14px' }}>Here's your activity overview</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <StatCard icon="📅" label="Total Events" value={events.length} />
        <StatCard icon="✅" label="Registered" value={registered.length} color="rgba(34,211,168,0.15)" />
        <StatCard icon="🎯" label="Available" value={events.length - registered.length} color="rgba(124,92,252,0.15)" />
      </div>

      <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: 'var(--text2)' }}>Upcoming Events</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {events.slice(0, 3).map(ev => (
          <EventCard key={ev.id} event={ev} registered={registered.includes(ev.id)}
            onRegister={() => navigate('/student/events')} />
        ))}
      </div>
    </div>
  )
}

function BrowseEvents({ onRegister }) {
  const { user, events } = useAuth()
  const registered = user.registeredEvents || []
  const [filter, setFilter] = useState('All')
  const categories = ['All', ...new Set(events.map(e => e.category))]
  const filtered = filter === 'All' ? events : events.filter(e => e.category === filter)

  return (
    <div style={{ padding: '28px', animation: 'fadeIn 0.3s ease' }}>
      <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>Browse Events</h1>
      <p style={{ color: 'var(--text3)', fontSize: '14px', marginBottom: '24px' }}>Find and register for upcoming campus events</p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: '7px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500',
            background: filter === c ? 'linear-gradient(135deg, var(--accent), var(--accent2))' : 'var(--bg2)',
            color: filter === c ? '#fff' : 'var(--text2)',
            border: filter === c ? 'none' : '1px solid var(--border)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {filtered.map(ev => (
          <EventCard key={ev.id} event={ev} registered={registered.includes(ev.id)}
            onRegister={() => onRegister(ev)} />
        ))}
      </div>
    </div>
  )
}

function MyEvents() {
  const { user, events } = useAuth()
  const registered = user.registeredEvents || []
  const myEvents = events.filter(e => registered.includes(e.id))

  return (
    <div style={{ padding: '28px', animation: 'fadeIn 0.3s ease' }}>
      <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>My Registrations</h1>
      <p style={{ color: 'var(--text3)', fontSize: '14px', marginBottom: '24px' }}>Events you've successfully registered for</p>
      {myEvents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text3)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
          <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>No registrations yet</h3>
          <p style={{ fontSize: '14px' }}>Browse events and register to see them here.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {myEvents.map(ev => <EventCard key={ev.id} event={ev} registered={true} />)}
        </div>
      )}
    </div>
  )
}

function Profile() {
  const { user } = useAuth()
  const fields = [
    ['Full Name', user.name],
    ['Email', user.email],
    ['University ID', user.universityId || 'Not set'],
    ['Branch', user.branch || 'Not set'],
    ['Date of Birth', user.dob || 'Not set'],
  ]
  return (
    <div style={{ padding: '28px', animation: 'fadeIn 0.3s ease' }}>
      <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '24px' }}>My Profile</h1>
      <div style={{ maxWidth: '540px', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: '700', color: '#fff',
          }}>{user.name[0]}</div>
          <div>
            <div style={{ fontWeight: '700', fontSize: '18px' }}>{user.name}</div>
            <div style={{ color: 'var(--text3)', fontSize: '13px' }}>Student Account</div>
          </div>
        </div>
        {fields.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid var(--border)', fontSize: '14px' }}>
            <span style={{ color: 'var(--text3)' }}>{k}</span>
            <span style={{ fontWeight: '500', color: v === 'Not set' ? 'var(--text3)' : 'var(--text)' }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StudentDashboard() {
  const [modalEvent, setModalEvent] = useState(null)

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar navItems={NAV} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentHome />} />
            <Route path="events" element={<BrowseEvents onRegister={setModalEvent} />} />
            <Route path="my-events" element={<MyEvents />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </div>
      {modalEvent && <RegistrationModal event={modalEvent} onClose={() => setModalEvent(null)} />}
    </div>
  )
}
