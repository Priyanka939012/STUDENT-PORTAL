import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// ✅ ONLY ONE ADMIN (fixed credentials)
const ADMIN_CREDS = {
  email: 'admin@eduportal.com',
  password: 'admin123'
}

const INITIAL_STUDENTS = [
  { id: 1, name: 'Poojitha Varma', email: 'poojitha@student.com', password: 'pass123', universityId: '2500040225', branch: 'Computer Science', dob: '2008-09-29', registeredEvents: [1] },
  { id: 2, name: 'Priya Reddy', email: 'priya@student.com', password: 'pass123', universityId: '2500040157', branch: 'Electronics', dob: '2007-12-11', registeredEvents: [] },
]

const INITIAL_EVENTS = [
  { id: 1, title: 'Hackathon 2026', date: '2026-04-15', venue: 'Main Auditorium', seats: 100, description: 'Build innovative solutions in 24 hours.', category: 'Technical', image: '🚀' },
  { id: 2, title: 'Cultural Fest', date: '2026-04-20', venue: 'Open Grounds', seats: 500, description: 'Celebrate arts, music and culture.', category: 'Cultural', image: '🎭' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [students, setStudents] = useState(INITIAL_STUDENTS)
  const [events, setEvents] = useState(INITIAL_EVENTS)

  // ❌ ADMIN SIGNUP BLOCKED
  const signUp = (name, email, password, role) => {
    if (role === 'admin') {
      return { ok: false, msg: 'Admin registration not allowed.' }
    }

    if (students.find(s => s.email === email)) {
      return { ok: false, msg: 'Email already registered.' }
    }

    const newStudent = {
      id: Date.now(),
      name,
      email,
      password,
      universityId: '',
      branch: '',
      dob: '',
      registeredEvents: []
    }

    setStudents(prev => [...prev, newStudent])
    return { ok: true }
  }

  // ✅ ADMIN LOGIN (only one)
  const signIn = (email, password, role) => {
    if (role === 'admin') {
      if (email === ADMIN_CREDS.email && password === ADMIN_CREDS.password) {
        setUser({ role: 'admin', name: 'Administrator', email })
        return { ok: true }
      }
      return { ok: false, msg: 'Invalid admin credentials.' }
    }

    const student = students.find(s => s.email === email && s.password === password)

    if (student) {
      setUser({ role: 'student', ...student })
      return { ok: true }
    }

    return { ok: false, msg: 'Invalid email or password.' }
  }

  const signOut = () => setUser(null)

  const addEvent = (eventData) => {
    setEvents(prev => [...prev, { id: Date.now(), ...eventData }])
  }

  return (
    <AuthContext.Provider value={{ user, students, events, signUp, signIn, signOut, addEvent }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)