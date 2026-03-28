import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const inp = {
  width: '100%',
  padding: '10px 14px',
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  color: 'var(--text)',
  fontSize: '14px',
  marginTop: '6px',
  transition: 'border-color 0.2s',
}

const BRANCHES = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Chemical', 'IT', 'EEE', 'ECE', 'MBA', 'MCA']

export default function RegistrationModal({ event, onClose }) {
  const { user, registerEvent } = useAuth()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    universityId: user.universityId || '',
    branch: user.branch || '',
    dob: user.dob || '',
  })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.universityId.trim()) e.universityId = 'University ID is required'
    if (!form.branch) e.branch = 'Branch is required'
    if (!form.dob) e.dob = 'Date of birth is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (step === 1) setStep(2)
    else if (step === 2) { if (validate()) setStep(3) }
    else if (step === 3) {
      registerEvent(user.id, event.id, form)
      setDone(true)
    }
  }

  const steps = ['Event Info', 'Your Details', 'Confirm']

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      backdropFilter: 'blur(4px)',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: 'var(--bg2)', border: '1px solid var(--border)',
        borderRadius: '16px', width: '480px', maxWidth: '94vw',
        padding: '28px', animation: 'fadeIn 0.25s ease',
      }}>
        {done ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '8px' }}>Registration Successful!</h2>
            <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '24px' }}>
              You've been registered for <strong style={{ color: 'var(--accent)' }}>{event.title}</strong>
            </p>
            <button onClick={onClose} style={{
              padding: '11px 28px', borderRadius: '8px', fontWeight: '600',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#fff',
            }}>Done</button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Event Registration</h2>
                <p style={{ fontSize: '13px', color: 'var(--text3)', marginTop: '2px' }}>{event.title}</p>
              </div>
              <button onClick={onClose} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 10px', color: 'var(--text2)', fontSize: '16px' }}>✕</button>
            </div>

            {/* Step indicator */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '28px', gap: '0' }}>
              {steps.map((s, i) => (
                <React.Fragment key={s}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '50%',
                      background: i + 1 <= step ? 'linear-gradient(135deg, var(--accent), var(--accent2))' : 'var(--bg3)',
                      border: i + 1 <= step ? 'none' : '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: '700',
                      color: i + 1 <= step ? '#fff' : 'var(--text3)',
                    }}>{i + 1 < step ? '✓' : i + 1}</div>
                    <span style={{ fontSize: '10px', color: i + 1 === step ? 'var(--accent)' : 'var(--text3)', fontWeight: i + 1 === step ? '600' : '400' }}>{s}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ flex: 1, height: '1px', background: i + 1 < step ? 'var(--accent)' : 'var(--border)', margin: '0 4px', marginBottom: '20px' }} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step content */}
            {step === 1 && (
              <div style={{ animation: 'fadeIn 0.2s ease' }}>
                <div style={{ background: 'var(--bg3)', borderRadius: '10px', padding: '16px', marginBottom: '8px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>{event.image}</div>
                  <h3 style={{ fontWeight: '600', marginBottom: '6px' }}>{event.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '12px' }}>{event.description}</p>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text3)' }}>
                    <span>📅 {event.date}</span>
                    <span>📍 {event.venue}</span>
                    <span>👥 {event.seats} seats</span>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', animation: 'fadeIn 0.2s ease' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)' }}>University ID *</label>
                  <input
                    value={form.universityId}
                    onChange={e => { setForm(p => ({ ...p, universityId: e.target.value })); setErrors(p => ({ ...p, universityId: '' })) }}
                    placeholder="e.g. UID2021001"
                    style={{ ...inp, borderColor: errors.universityId ? 'var(--danger)' : 'var(--border)' }}
                  />
                  {errors.universityId && <p style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px' }}>{errors.universityId}</p>}
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)' }}>Branch *</label>
                  <select
                    value={form.branch}
                    onChange={e => { setForm(p => ({ ...p, branch: e.target.value })); setErrors(p => ({ ...p, branch: '' })) }}
                    style={{ ...inp, borderColor: errors.branch ? 'var(--danger)' : 'var(--border)' }}
                  >
                    <option value="">Select branch</option>
                    {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  {errors.branch && <p style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px' }}>{errors.branch}</p>}
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text2)' }}>Date of Birth *</label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={e => { setForm(p => ({ ...p, dob: e.target.value })); setErrors(p => ({ ...p, dob: '' })) }}
                    style={{ ...inp, borderColor: errors.dob ? 'var(--danger)' : 'var(--border)', colorScheme: 'dark' }}
                  />
                  {errors.dob && <p style={{ fontSize: '12px', color: 'var(--danger)', marginTop: '4px' }}>{errors.dob}</p>}
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ animation: 'fadeIn 0.2s ease' }}>
                <div style={{ background: 'var(--bg3)', borderRadius: '10px', padding: '16px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text3)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Confirm Details</h3>
                  {[
                    ['Name', user.name],
                    ['Email', user.email],
                    ['University ID', form.universityId],
                    ['Branch', form.branch],
                    ['Date of Birth', form.dob],
                    ['Event', event.title],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: '14px' }}>
                      <span style={{ color: 'var(--text3)' }}>{k}</span>
                      <span style={{ fontWeight: '500' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} style={{
                  flex: 1, padding: '11px', borderRadius: '8px', fontWeight: '600',
                  background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text2)',
                }}>← Back</button>
              )}
              <button onClick={handleNext} style={{
                flex: 2, padding: '11px', borderRadius: '8px', fontWeight: '600',
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#fff',
              }}>
                {step === 3 ? 'Confirm Registration' : 'Continue →'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
