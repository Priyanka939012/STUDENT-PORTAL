import React from 'react'

const styles = {
  footer: {
    background: 'var(--bg2)',
    borderTop: '1px solid var(--border)',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  left: { fontSize: '13px', color: 'var(--text3)' },
  right: { display: 'flex', gap: '20px' },
  link: {
    fontSize: '12px',
    color: 'var(--text3)',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  brand: {
    fontSize: '13px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }
}

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.left}>
        <span style={styles.brand}>EduPortal</span>
        <span style={{ marginLeft: '8px' }}>© 2026 All rights reserved.</span>
      </div>
      <div style={styles.right}>
        {['Privacy Policy', 'Terms of Service', 'Support', 'Contact'].map(link => (
          <span key={link} style={styles.link}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--text3)'}
          >{link}</span>
        ))}
      </div>
    </footer>
  )
}
