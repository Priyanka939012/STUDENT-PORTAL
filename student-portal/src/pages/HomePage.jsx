import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'

const btnPrimary = {
  padding: '12px 28px',
  borderRadius: '10px',
  fontWeight: '600',
  fontSize: '15px',
  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
  color: '#fff',
  cursor: 'pointer',
  border: 'none',
  transition: 'opacity 0.2s, transform 0.2s',
}
const btnSecondary = {
  padding: '12px 28px',
  borderRadius: '10px',
  fontWeight: '600',
  fontSize: '15px',
  background: 'transparent',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  cursor: 'pointer',
  transition: 'background 0.2s',
}

const stats = [
  { label: 'Total Students', value: '2,400+', icon: '🎓' },
  { label: 'Active Events', value: '4', icon: '📅' },
  { label: 'Registrations', value: '1,200+', icon: '✅' },
  { label: 'Departments', value: '10', icon: '🏛️' },
]

const features = [
  { icon: '🎯', title: 'Easy Registration', desc: 'Register for events in just 3 simple steps with a guided flow.' },
  { icon: '📊', title: 'Track Events', desc: 'View all your registered events and upcoming schedules in one place.' },
  { icon: '🔐', title: 'Secure Access', desc: 'Role-based access for students and administrators.' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleDashboard = () => {
    if (!user) { navigate('/signin'); return }
    navigate(user.role === 'admin' ? '/admin' : '/student')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 40px', borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)', position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{
          fontSize: '22px', fontWeight: '700',
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>EduPortal</div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {user ? (
            <button style={btnPrimary} onClick={handleDashboard}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}>
              Go to Dashboard →
            </button>
          ) : (
            <>
              <button style={btnSecondary} onClick={() => navigate('/signin')}
                onMouseEnter={e => e.target.style.background = 'var(--bg3)'}
                onMouseLeave={e => e.target.style.background = 'transparent'}>
                Sign In
              </button>
              <button style={btnPrimary} onClick={() => navigate('/signup')}
                onMouseEnter={e => e.target.style.opacity = '0.85'}
                onMouseLeave={e => e.target.style.opacity = '1'}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '80px 24px 60px',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,142,247,0.08), transparent)',
      }}>
        <div style={{
          display: 'inline-block', background: 'var(--accent-glow)', border: '1px solid rgba(79,142,247,0.3)',
          borderRadius: '20px', padding: '5px 14px', fontSize: '12px', fontWeight: '600',
          color: 'var(--accent)', marginBottom: '24px', letterSpacing: '0.5px',
        }}>STUDENT REGISTRATION SYSTEM</div>

        <h1 style={{
          fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: '700',
          lineHeight: '1.15', marginBottom: '20px', maxWidth: '700px',
          letterSpacing: '-1px',
        }}>
          Register Events,<br />
          <span style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Track Your Journey</span>
        </h1>

        <p style={{ fontSize: '17px', color: 'var(--text2)', maxWidth: '520px', marginBottom: '36px', lineHeight: '1.7' }}>
          A seamless portal for students to discover and register for campus events. Admins can manage events and track participation.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button style={{ ...btnPrimary, padding: '14px 32px', fontSize: '16px' }}
            onClick={() => navigate('/signup')}
            onMouseEnter={e => { e.target.style.opacity = '0.85'; e.target.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)' }}>
            Get Started Free
          </button>
          <button style={btnSecondary} onClick={() => navigate('/signin')}
            onMouseEnter={e => e.target.style.background = 'var(--bg3)'}
            onMouseLeave={e => e.target.style.background = 'transparent'}>
            Sign In →
          </button>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '40px', background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '6px' }}>{s.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: '700', marginBottom: '4px' }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: 'var(--text3)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '60px 40px', maxWidth: '960px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: '700', marginBottom: '40px' }}>Why EduPortal?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {features.map(f => (
            <div key={f.title} style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '24px',
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{f.icon}</div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text2)', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
