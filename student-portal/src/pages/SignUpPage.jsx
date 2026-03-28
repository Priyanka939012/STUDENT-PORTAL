import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const inp = {
  width: '100%',
  padding: '11px 14px',
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '9px',
  color: 'var(--text)',
  fontSize: '14px',
  marginTop: '6px',
  transition: 'border-color 0.2s',
}

// ✅ Field Component
const Field = ({ label, type = 'text', value, onChange, placeholder, error }) => (
  <div>
    <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)' }}>
      {label}
    </label>

    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        ...inp,
        borderColor: error ? 'var(--danger)' : 'var(--border)'
      }}
      onFocus={e =>
        (e.target.style.borderColor = error ? 'var(--danger)' : 'var(--accent)')
      }
      onBlur={e =>
        (e.target.style.borderColor = error ? 'var(--danger)' : 'var(--border)')
      }
    />

    {error && (
      <p style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px' }}>
        {error}
      </p>
    )}
  </div>
)

export default function SignUpPage() {
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const [role, setRole] = useState('student')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (key) => (e) => {
    setForm(prev => ({
      ...prev,
      [key]: e.target.value
    }))
  }

  const validate = () => {
    const e = {}

    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.includes('@')) e.email = 'Enter a valid email'
    if (form.password.length < 6)
      e.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirm)
      e.confirm = 'Passwords do not match'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    if (!validate()) return

    setLoading(true)

    await new Promise(r => setTimeout(r, 700))

    const res = signUp(form.name, form.email, form.password, role)

    setLoading(false)

    if (res.ok) navigate('/signin')
    else setServerError(res.msg)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,92,252,0.07), transparent)',
        padding: '24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link
            to="/"
            style={{
              fontSize: '26px',
              fontWeight: '700',
              background:
                'linear-gradient(135deg, var(--accent), var(--accent2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            EduPortal
          </Link>
          <p style={{ color: 'var(--text3)', fontSize: '14px', marginTop: '6px' }}>
            Create your account to get started.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '28px',
          }}
        >
          {/* Role Selection */}
          <p style={{ fontSize: '13px', fontWeight: '600', marginBottom: '10px' }}>
            I am registering as:
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '22px',
            }}
          >
            {[
              { value: 'student', label: 'Student' },
              { value: 'admin', label: 'Admin' },
            ].map(r => (
              <div
                key={r.value}
                onClick={() => setRole(r.value)}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border:
                    role === r.value
                      ? '2px solid var(--accent)'
                      : '1px solid var(--border)',
                  background:
                    role === r.value ? 'var(--accent-glow)' : 'var(--bg)',
                }}
              >
                {r.label}
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <Field
              label="Full Name"
              value={form.name}
              onChange={handleChange('name')}
              error={errors.name}
              placeholder="e.g. Arjun Sharma"
            />

            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              error={errors.email}
              placeholder="your@email.com"
            />

            <Field
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              error={errors.password}
              placeholder="Min. 6 characters"
            />

            <Field
              label="Confirm Password"
              type="password"
              value={form.confirm}
              onChange={handleChange('confirm')}
              error={errors.confirm}
              placeholder="Repeat password"
            />

            {serverError && (
              <div style={{ color: 'red', fontSize: '13px' }}>
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px',
                borderRadius: '9px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                color: '#fff',
                border: 'none',
                cursor: loading ? 'wait' : 'pointer',
              }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account?{' '}
          <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  )
}