import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Eye, EyeOff, HandHeart, Mail, Lock, User, Users } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

export default function CaregiverAuth() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', relation: '', careFor: '' })
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
      role: 'caregiver',
      relation: form.relation,
      careFor: form.careFor,
    })
    if (result.error) {
      toast.error(result.error)
      return
    }
    toast.success('Welcome, Caregiver! 💛')
    navigate('/dashboard')
  }

  return (
    <div className="auth-light-page">
      <div className="auth-sticker a-st-1">💛</div>
      <div className="auth-sticker a-st-2">🌻</div>
      <div className="auth-sticker a-st-3">🤗</div>
      <div className="auth-sticker a-st-4">🏠</div>
      <div className="auth-sticker a-st-5">🌈</div>
      <div className="auth-sticker a-st-6">☀️</div>

      <div className="auth-light-container">
        <button onClick={() => navigate('/caregiver-onboarding')} className="auth-light-back">
          <ChevronLeft size={18} /> Back
        </button>

        <motion.div
          className="auth-light-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="auth-light-header">
            <div className="auth-light-badge" style={{ background: '#fef3c7' }}>🤝</div>
            <h1 className="auth-light-title">Caregiver Registration</h1>
            <p className="auth-light-sub">You are not alone in this journey 💛</p>
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
                <label>Relation to Patient</label>
                <div className="al-input-wrap">
                  <HandHeart size={16} />
                  <select name="relation" value={form.relation} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Parent</option>
                    <option>Spouse</option>
                    <option>Sibling</option>
                    <option>Child</option>
                    <option>Friend</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="al-field">
                <label>Caring For</label>
                <div className="al-input-wrap">
                  <Users size={16} />
                  <select name="careFor" value={form.careFor} onChange={handleChange}>
                    <option value="">Select condition</option>
                    <option>Depression</option>
                    <option>Anxiety</option>
                    <option>Bipolar Disorder</option>
                    <option>Schizophrenia</option>
                    <option>PTSD</option>
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

            <button type="submit" className="al-submit" style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)' }}>
              Join as Caregiver 🌻
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
