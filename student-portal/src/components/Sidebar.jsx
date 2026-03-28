import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const styles = {
  sidebar: {
    width: '220px',
    minHeight: '100vh',
    background: 'var(--bg2)',
    borderRight: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    flexShrink: 0,
  },
  logo: {
    padding: '24px 20px 20px',
    borderBottom: '1px solid var(--border)',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px',
  },
  logoSub: { fontSize: '11px', color: 'var(--text3)', marginTop: '2px', fontWeight: '500' },
  nav: { flex: 1, padding: '16px 10px' },
  navItem: (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '4px',
    background: active ? 'var(--accent-glow)' : 'transparent',
    color: active ? 'var(--accent)' : 'var(--text2)',
    fontWeight: active ? '600' : '400',
    fontSize: '14px',
    border: active ? '1px solid rgba(79,142,247,0.25)' : '1px solid transparent',
    transition: 'all 0.2s',
  }),
  navIcon: { fontSize: '18px', width: '20px', textAlign: 'center' },
  userBox: {
    margin: '10px',
    padding: '12px',
    background: 'var(--bg3)',
    borderRadius: '10px',
    border: '1px solid var(--border)',
  },
  userName: { fontSize: '13px', fontWeight: '600', color: 'var(--text)', marginBottom: '2px' },
  userRole: { fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.5px' },
  signOut: {
    margin: '0 10px 16px',
    padding: '9px',
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text2)',
    fontSize: '13px',
    width: 'calc(100% - 20px)',
    transition: 'all 0.2s',
    cursor: 'pointer',
  }
}

export default function Sidebar({ navItems }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        <div style={styles.logoText}>EduPortal</div>
        <div style={styles.logoSub}>Student Registration System</div>
      </div>

      <nav style={styles.nav}>
        {navItems.map(item => {
          const active = location.pathname.endsWith(item.path) || 
            (item.path !== '' && location.pathname.includes(item.path))
          return (
            <div
              key={item.label}
              style={styles.navItem(active)}
              onClick={() => navigate(item.fullPath)}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)' }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)' }}}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          )
        })}
      </nav>

      <div style={styles.userBox}>
        <div style={styles.userName}>{user?.name}</div>
        <div style={styles.userRole}>{user?.role}</div>
      </div>
      <button
        style={styles.signOut}
        onClick={() => { signOut(); navigate('/') }}
        onMouseEnter={e => { e.target.style.background = 'var(--bg3)'; e.target.style.color = 'var(--text)' }}
        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text2)' }}
      >
        Sign Out
      </button>
    </aside>
  )
}
