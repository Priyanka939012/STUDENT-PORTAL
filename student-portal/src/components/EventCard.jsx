import React from 'react'

const catColors = {
  Technical: { bg: 'rgba(79,142,247,0.12)', text: '#4f8ef7', border: 'rgba(79,142,247,0.3)' },
  Cultural: { bg: 'rgba(124,92,252,0.12)', text: '#7c5cfc', border: 'rgba(124,92,252,0.3)' },
  Workshop: { bg: 'rgba(34,211,168,0.12)', text: '#22d3a8', border: 'rgba(34,211,168,0.3)' },
  Sports: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
}

export default function EventCard({ event, registered, onRegister }) {
  const cat = catColors[event.category] || catColors.Technical
  const dateObj = new Date(event.date)
  const day = dateObj.getDate()
  const month = dateObj.toLocaleString('default', { month: 'short' })

  return (
    <div style={{
      background: 'var(--bg2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      transition: 'border-color 0.2s, transform 0.2s',
      animation: 'fadeIn 0.3s ease both',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '36px' }}>{event.image}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            background: cat.bg, color: cat.text, border: `1px solid ${cat.border}`,
            borderRadius: '6px', padding: '3px 8px', fontSize: '11px', fontWeight: '600'
          }}>{event.category}</div>
          {registered && (
            <div style={{
              background: 'rgba(34,211,168,0.12)', color: '#22d3a8',
              border: '1px solid rgba(34,211,168,0.3)',
              borderRadius: '6px', padding: '3px 8px', fontSize: '11px', fontWeight: '600'
            }}>✓ Registered</div>
          )}
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '6px' }}>{event.title}</h3>
        <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.5' }}>{event.description}</p>
      </div>

      <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text3)' }}>
        <span>📅 {month} {day}, 2026</span>
        <span>📍 {event.venue}</span>
        <span>👥 {event.seats} seats</span>
      </div>

      {onRegister && (
        <button
          onClick={() => onRegister(event)}
          disabled={registered}
          style={{
            padding: '9px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            background: registered ? 'var(--bg3)' : 'linear-gradient(135deg, var(--accent), var(--accent2))',
            color: registered ? 'var(--text3)' : '#fff',
            border: registered ? '1px solid var(--border)' : 'none',
            cursor: registered ? 'default' : 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => { if (!registered) e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          {registered ? 'Already Registered' : 'Register Now →'}
        </button>
      )}
    </div>
  )
}
