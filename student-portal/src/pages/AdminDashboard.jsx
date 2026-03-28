import React, { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import EventCard from '../components/EventCard'

const NAV = [
  { label: 'Dashboard', icon: '🏠', path: 'dashboard', fullPath: '/admin/dashboard' },
  { label: 'Manage Events', icon: '📅', path: 'events', fullPath: '/admin/events' },
  { label: 'All Students', icon: '🎓', path: 'students', fullPath: '/admin/students' },
]

const inp = {
  width: '100%', padding: '10px 14px',
  background: 'var(--bg)', border: '1px solid var(--border)',
  borderRadius: '8px', color: 'var(--text)', fontSize: '14px',
  marginTop: '6px',
}

const CATEGORIES = ['Technical', 'Cultural', 'Workshop', 'Sports', 'Other']

function StatCard({ icon, label, value, color }) {
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '20px',
      display: 'flex', alignItems: 'center', gap: '16px',
    }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '12px', fontSize: '22px', background: color || 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div>
        <div style={{ fontSize: '24px', fontWeight: '700' }}>{value}</div>
        <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '2px' }}>{label}</div>
      </div>
    </div>
  )
}

function AdminHome() {
  const { students, events } = useAuth()
  const totalReg = students.reduce((acc, s) => acc + (s.registeredEvents?.length || 0), 0)
  const navigate = useNavigate()

  return (
    <div style={{ padding: '28px', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>Admin Dashboard</h1>
        <p style={{ color: 'var(--text3)', fontSize: '14px' }}>Manage events, students, and registrations</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <StatCard icon="📅" label="Total Events" value={events.length} />
        <StatCard icon="🎓" label="Students" value={students.length} color="rgba(34,211,168,0.15)" />
        <StatCard icon="✅" label="Total Registrations" value={totalReg} color="rgba(124,92,252,0.15)" />
        <StatCard icon="📊" label="Avg per Event" value={events.length ? (totalReg / events.length).toFixed(1) : 0} color="rgba(245,158,11,0.15)" />
      </div>

      {/* Recent Students */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '600' }}>Recent Students</h2>
          <button onClick={() => navigate('/admin/students')} style={{ fontSize: '13px', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>View All →</button>
        </div>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', padding: '10px 16px', borderBottom: '1px solid var(--border)', fontSize: '11px', color: 'var(--text3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Name / Email</span><span>Branch</span><span>Registered Events</span>
          </div>
          {students.slice(0, 5).map(s => (
            <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', padding: '12px 16px', borderBottom: '1px solid var(--border)', fontSize: '14px', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500' }}>{s.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{s.email}</div>
              </div>
              <div style={{ color: 'var(--text2)', fontSize: '13px' }}>{s.branch || '—'}</div>
              <div style={{
                background: 'rgba(34,211,168,0.12)', color: '#22d3a8',
                border: '1px solid rgba(34,211,168,0.25)', borderRadius: '6px',
                padding: '3px 10px', fontSize: '12px', fontWeight: '600', textAlign: 'center',
              }}>{s.registeredEvents?.length || 0}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ManageEvents() {
  const { events, addEvent } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', date: '', venue: '', seats: '', description: '', category: 'Technical', image: '📅' })
  const [errors, setErrors] = useState({})

  const emojis = ['📅', '🚀', '🎭', '🤖', '🏆', '🎵', '🎨', '💡', '🌍', '🔬']

  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title required'
    if (!form.date) e.date = 'Date required'
    if (!form.venue.trim()) e.venue = 'Venue required'
    if (!form.seats || isNaN(form.seats)) e.seats = 'Valid seat count required'
    if (!form.description.trim()) e.description = 'Description required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleAdd = () => {
    if (!validate()) return
    addEvent({ ...form, seats: Number(form.seats) })
    setForm({ title: '', date: '', venue: '', seats: '', description: '', category: 'Technical', image: '📅' })
    setShowForm(false)
  }

  return (
    <div style={{ padding: '28px', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>Manage Events</h1>
          <p style={{ color: 'var(--text3)', fontSize: '14px' }}>{events.length} events currently active</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          padding: '10px 20px', borderRadius: '8px', fontWeight: '600', fontSize: '14px',
          background: showForm ? 'var(--bg3)' : 'linear-gradient(135deg, var(--accent), var(--accent2))',
          color: showForm ? 'var(--text)' : '#fff',
          border: showForm ? '1px solid var(--border)' : 'none', cursor: 'pointer',
        }}>{showForm ? '✕ Cancel' : '+ Add Event'}</button>
      </div>

      {showForm && (
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px', marginBottom: '24px', animation: 'fadeIn 0.25s ease' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '18px' }}>New Event</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)' }}>Event Icon</label>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                {emojis.map(e => (
                  <button key={e} onClick={() => setForm(p => ({ ...p, image: e }))} style={{
                    fontSize: '20px', width: '38px', height: '38px', borderRadius: '8px',
                    background: form.image === e ? 'var(--accent-glow)' : 'var(--bg3)',
                    border: form.image === e ? '2px solid var(--accent)' : '1px solid var(--border)',
                    cursor: 'pointer',
                  }}>{e}</button>
                ))}
              </div>
            </div>
            {[
              { id: 'title', label: 'Event Title', placeholder: 'e.g. Hackathon 2026', col: '1/-1' },
              { id: 'venue', label: 'Venue', placeholder: 'e.g. Main Auditorium' },
              { id: 'date', label: 'Date', type: 'date' },
              { id: 'seats', label: 'Seats', placeholder: '100', type: 'number' },
            ].map(f => (
              <div key={f.id} style={{ gridColumn: f.col }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)' }}>{f.label}</label>
                <input type={f.type || 'text'} value={form[f.id]}
                  onChange={e => { setForm(p => ({ ...p, [f.id]: e.target.value })); setErrors(p => ({ ...p, [f.id]: '' })) }}
                  placeholder={f.placeholder}
                  style={{ ...inp, borderColor: errors[f.id] ? 'var(--danger)' : 'var(--border)', colorScheme: 'dark' }}
                />
                {errors[f.id] && <p style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px' }}>{errors[f.id]}</p>}
              </div>
            ))}
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)' }}>Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={inp}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)' }}>Description</label>
              <textarea value={form.description} onChange={e => { setForm(p => ({ ...p, description: e.target.value })); setErrors(p => ({ ...p, description: '' })) }}
                placeholder="Brief event description..."
                rows={3}
                style={{ ...inp, resize: 'vertical', borderColor: errors.description ? 'var(--danger)' : 'var(--border)' }}
              />
              {errors.description && <p style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px' }}>{errors.description}</p>}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button onClick={handleAdd} style={{
              padding: '10px 24px', borderRadius: '8px', fontWeight: '600', fontSize: '14px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#fff', border: 'none', cursor: 'pointer',
            }}>Add Event</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {events.map(ev => <EventCard key={ev.id} event={ev} />)}
      </div>
    </div>
  )
}

function AllStudents() {
  const { students, events } = useAuth()
  const [selected, setSelected] = useState(null)

  const student = selected ? students.find(s => s.id === selected) : null
  const studentEvents = student ? events.filter(e => student.registeredEvents?.includes(e.id)) : []

  return (
    <div style={{ padding: '28px', animation: 'fadeIn 0.3s ease' }}>
      <h1 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>All Students</h1>
      <p style={{ color: 'var(--text3)', fontSize: '14px', marginBottom: '24px' }}>{students.length} registered students</p>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '20px' }}>
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', padding: '10px 16px', borderBottom: '1px solid var(--border)', fontSize: '11px', color: 'var(--text3)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Student</span><span>Branch</span><span>Univ. ID</span><span>Events</span>
          </div>
          {students.map(s => (
            <div key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto',
                padding: '13px 16px', borderBottom: '1px solid var(--border)',
                fontSize: '14px', alignItems: 'center', cursor: 'pointer',
                background: selected === s.id ? 'var(--accent-glow)' : 'transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (selected !== s.id) e.currentTarget.style.background = 'var(--bg3)' }}
              onMouseLeave={e => { if (selected !== s.id) e.currentTarget.style.background = 'transparent' }}
            >
              <div>
                <div style={{ fontWeight: '500' }}>{s.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{s.email}</div>
              </div>
              <div style={{ color: 'var(--text2)', fontSize: '13px' }}>{s.branch || '—'}</div>
              <div style={{ color: 'var(--text2)', fontSize: '12px', fontFamily: 'DM Mono, monospace' }}>{s.universityId || '—'}</div>
              <div style={{
                background: s.registeredEvents?.length ? 'rgba(34,211,168,0.12)' : 'var(--bg3)',
                color: s.registeredEvents?.length ? '#22d3a8' : 'var(--text3)',
                border: `1px solid ${s.registeredEvents?.length ? 'rgba(34,211,168,0.25)' : 'var(--border)'}`,
                borderRadius: '6px', padding: '3px 10px', fontSize: '12px', fontWeight: '600', textAlign: 'center',
              }}>{s.registeredEvents?.length || 0}</div>
            </div>
          ))}
        </div>

        {selected && student && (
          <div style={{ animation: 'fadeIn 0.2s ease' }}>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
              <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', fontWeight: '700', color: '#fff',
                }}>{student.name[0]}</div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '16px' }}>{student.name}</div>
                  <div style={{ color: 'var(--text3)', fontSize: '12px' }}>{student.email}</div>
                </div>
              </div>
              <div style={{ padding: '16px' }}>
                {[['University ID', student.universityId || '—'], ['Branch', student.branch || '—'], ['DOB', student.dob || '—']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: '13px' }}>
                    <span style={{ color: 'var(--text3)' }}>{k}</span>
                    <span style={{ fontWeight: '500' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
                  Registered Events ({studentEvents.length})
                </div>
                {studentEvents.length === 0 ? (
                  <p style={{ fontSize: '13px', color: 'var(--text3)', textAlign: 'center', padding: '16px' }}>No events registered yet</p>
                ) : (
                  studentEvents.map(ev => (
                    <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: 'var(--bg3)', borderRadius: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '20px' }}>{ev.image}</span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600' }}>{ev.title}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{ev.date} · {ev.venue}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar navItems={NAV} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminHome />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="students" element={<AllStudents />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  )
}
