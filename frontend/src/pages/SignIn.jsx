import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

const ROLE_AVATARS = {
  patient: ['🧘', '🌿', '🦋', '🌸', '💚'],
  doctor: ['👨‍⚕️', '👩‍⚕️', '🩺', '⚕️'],
  caregiver: ['🤝', '💛', '🌻', '🤗', '🏠'],
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', role: 'patient' })
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      toast.error('Please fill all fields')
      return
    }
    const result = login(form.email, form.password)
    if (result.error) {
      toast.error(result.error)
      return
    }
    toast.success('Welcome back! 💚')
    navigate('/dashboard')
  }

  return (
    <div className="signin-light-page">
      {/* Animated gradient bg */}
      <div className="signin-light-bg" />

      {/* Floating stickers */}
      <div className="signin-sticker si-st-1">🌸</div>
      <div className="signin-sticker si-st-2">🦋</div>
      <div className="signin-sticker si-st-3">🌿</div>
      <div className="signin-sticker si-st-4">💚</div>
      <div className="signin-sticker si-st-5">✨</div>
      <div className="signin-sticker si-st-6">☁️</div>
      <div className="signin-sticker si-st-7">🌈</div>

      <div className="signin-light-container">
        <motion.div
          className="signin-light-card"
          initial={{ opacity: 0, y: 25, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <div className="signin-light-logo">
            <div className="signin-light-logo-icon">
              <Brain size={20} />
            </div>
            <span className="signin-light-logo-text">Bloodwing</span>
          </div>

          <h1 className="signin-light-title">Welcome Back! 👋</h1>
          <p className="signin-light-sub">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit} className="signin-light-form">
            {/* Role select */}
            <div className="signin-light-roles">
              {[
                { key: 'patient', emoji: '🧘', label: 'Patient' },
                { key: 'doctor', emoji: '👨‍⚕️', label: 'Doctor' },
                { key: 'caregiver', emoji: '🤝', label: 'Caregiver' },
              ].map(r => (
                <button
                  key={r.key}
                  type="button"
                  className={`signin-light-role ${form.role === r.key ? 'active' : ''}`}
                  onClick={() => setForm({ ...form, role: r.key })}
                >
                  <span className="signin-light-role-emoji">{r.emoji}</span>
                  <span>{r.label}</span>
                </button>
              ))}
            </div>

            <div className="al-field">
              <label>Email</label>
              <div className="al-input-wrap">
                <Mail size={16} />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
            </div>

            <div className="al-field">
              <label>Password</label>
              <div className="al-input-wrap">
                <Lock size={16} />
                <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Enter your password" required />
                <button type="button" className="al-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="signin-light-submit">
              <LogIn size={16} /> Sign In
            </button>
          </form>

          <div className="signin-light-divider"><span>or</span></div>

          <p className="signin-light-register">
            New here? <Link to="/role-select" className="signin-light-link">Create Account</Link>
          </p>

          <Link to="/home" className="al-home-link">Back to Home</Link>
        </motion.div>
      </div>
    </div>
  )
}
