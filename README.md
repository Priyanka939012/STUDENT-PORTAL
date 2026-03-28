# EduPortal — Student Registration System

A React + Vite based student event registration portal with role-based access.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 👤 Demo Accounts

### Student Login
- **Email:** arjun@student.com
- **Password:** pass123

### Admin Login
- **Email:** admin@eduportal.com
- **Password:** admin123

## ✨ Features

### Student
- Browse and filter events by category
- 3-step event registration (Event Info → Personal Details → Confirm)
- View all registered events
- Personal profile page

### Admin
- Dashboard with stats overview
- Add new events with icon picker
- View all registered students
- Click any student to see their registered events

## 🏗️ Tech Stack
- React 18
- React Router v6
- Vite 5
- Lucide React (icons)
- Custom CSS (no external UI library)

## 📁 Project Structure
```
src/
├── context/        # AuthContext (global state)
├── components/     # Sidebar, Footer, EventCard, RegistrationModal
├── pages/          # HomePage, SignIn, SignUp, StudentDashboard, AdminDashboard
└── App.jsx         # Routing
```
