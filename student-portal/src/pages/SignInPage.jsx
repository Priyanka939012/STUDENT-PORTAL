import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const inp = {
  width: '100%', padding: '11px 14px',
  background: 'var(--bg)', border: '1px solid var(--border)',
  borderRadius: '9px', color: 'var(--text)', fontSize: '14px',
  marginTop: '6px', transition: 'border-color 0.2s',
}

export default function SignInPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const res = signIn(email, password, role)
    setLoading(false)
    if (res.ok) navigate(role === 'admin' ? '/admin' : '/student')
    else setError(res.msg)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(79,142,247,0.07), transparent)',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px', animation: 'fadeIn 0.35s ease' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{
            fontSize: '26px', fontWeight: '700',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>EduPortal</Link>
          <p style={{ color: 'var(--text3)', fontSize: '14px', marginTop: '6px' }}>Welcome back! Sign in to continue.</p>
        </div>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px' }}>
          {/* Role Toggle */}
          <div style={{
            display: 'flex', background: 'var(--bg)', borderRadius: '10px',
            padding: '4px', marginBottom: '24px', border: '1px solid var(--border)',
          }}>
            {['student', 'admin'].map(r => (
              <button key={r} onClick={() => setRole(r)} style={{
                flex: 1, padding: '9px', borderRadius: '7px', fontWeight: '600', fontSize: '13px',
                background: role === r ? 'linear-gradient(135deg, var(--accent), var(--accent2))' : 'transparent',
                color: role === r ? '#fff' : 'var(--text3)',
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}>{r === 'student' ? '🎓 Student' : '⚙️ Admin'}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)' }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder={role === 'admin' ? 'admin@eduportal.com' : 'your@email.com'}
                style={inp}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)' }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="Enter your password"
                style={inp}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {error && (
              <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: '8px', padding: '10px 14px', fontSize: '13px', color: 'var(--danger)' }}>
                {error}
              </div>
            )}

            {role === 'admin' && (
              <div style={{ background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: 'var(--text3)' }}>
                Demo: admin@eduportal.com / admin123
              </div>
            )}
            {role === 'student' && (
              <div style={{ background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.2)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: 'var(--text3)' }}>
                Demo: arjun@student.com / pass123
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              padding: '12px', borderRadius: '9px', fontWeight: '700', fontSize: '14px',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              color: '#fff', border: 'none', cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.75 : 1, marginTop: '4px', transition: 'opacity 0.2s',
            }}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text3)', marginTop: '20px' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: '600' }}>Sign Up</Link>
        </p>
        <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text3)', marginTop: '8px' }}>
          <Link to="/" style={{ color: 'var(--text3)' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  )
}
