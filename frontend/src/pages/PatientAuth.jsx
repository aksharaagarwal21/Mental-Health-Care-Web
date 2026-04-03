import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Eye, EyeOff, Heart, Mail, Lock, User, Smile } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

export default function PatientAuth() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', age: '', concern: '' })
  const navigate = useNavigate()
  const { register } = useAuthStore()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill all required fields'); return
    }
    const result = register({
      name: form.name,
      email: form.email,
      password: form.password,
      role: 'patient',
      age: form.age,
      concern: form.concern,
    })
    if (result.error) {
      toast.error(result.error)
      return
    }
    toast.success('Welcome to Bloodwing! 💚')
    navigate('/dashboard')
  }

  return (
    <div className="auth-light-page">
      {/* Floating stickers */}
      <div className="auth-sticker a-st-1">🌸</div>
      <div className="auth-sticker a-st-2">🦋</div>
      <div className="auth-sticker a-st-3">🌿</div>
      <div className="auth-sticker a-st-4">💚</div>
      <div className="auth-sticker a-st-5">☁️</div>
      <div className="auth-sticker a-st-6">🌈</div>

      <div className="auth-light-container">
        <button onClick={() => navigate('/patient-onboarding')} className="auth-light-back">
          <ChevronLeft size={18} /> Back
        </button>

        <motion.div
          className="auth-light-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="auth-light-header">
            <div className="auth-light-badge" style={{ background: '#dbeafe' }}>🧘</div>
            <h1 className="auth-light-title">Patient Registration</h1>
            <p className="auth-light-sub">Start your wellness journey today ✨</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-light-form">
            <div className="al-field">
              <label>Full Name <span className="al-req">*</span></label>
              <div className="al-input-wrap">
                <User size={16} />
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
              </div>
            </div>

            <div className="al-field-row">
              <div className="al-field">
                <label>Age</label>
                <div className="al-input-wrap">
                  <Smile size={16} />
                  <input name="age" value={form.age} onChange={handleChange} placeholder="e.g. 22" type="number" />
                </div>
              </div>
              <div className="al-field">
                <label>Primary Concern</label>
                <div className="al-input-wrap">
                  <Heart size={16} />
                  <select name="concern" value={form.concern} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Anxiety</option>
                    <option>Depression</option>
                    <option>Stress</option>
                    <option>Loneliness</option>
                    <option>Grief</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="al-field">
              <label>Email <span className="al-req">*</span></label>
              <div className="al-input-wrap">
                <Mail size={16} />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" required />
              </div>
            </div>

            <div className="al-field">
              <label>Password <span className="al-req">*</span></label>
              <div className="al-input-wrap">
                <Lock size={16} />
                <input name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Min 8 characters" required />
                <button type="button" className="al-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="al-submit" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
              Start My Journey 🌱
            </button>
          </form>

          <p className="al-switch">
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
          <Link to="/home" className="al-home-link">Back to Home</Link>
        </motion.div>
      </div>
    </div>
  )
}
