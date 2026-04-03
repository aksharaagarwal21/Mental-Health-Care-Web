import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, Eye, EyeOff, Stethoscope, Mail, Lock, User, Award, Phone } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

export default function DoctorAuth() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', specialization: '', licenseNo: '', phone: '' })
  const navigate = useNavigate()
  const { register } = useAuthStore()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password || !form.specialization || !form.licenseNo) {
      toast.error('Please fill all required fields'); return
    }
    const result = register({
      name: form.name,
      email: form.email,
      password: form.password,
      role: 'doctor',
      specialization: form.specialization,
      licenseNo: form.licenseNo,
      phone: form.phone,
    })
    if (result.error) {
      toast.error(result.error)
      return
    }
    toast.success('Welcome, Doctor! 🩺')
    navigate('/dashboard')
  }

  return (
    <div className="auth-light-page">
      <div className="auth-sticker a-st-1">🩺</div>
      <div className="auth-sticker a-st-2">💊</div>
      <div className="auth-sticker a-st-3">🌿</div>
      <div className="auth-sticker a-st-4">💚</div>
      <div className="auth-sticker a-st-5">⚕️</div>
      <div className="auth-sticker a-st-6">🏥</div>

      <div className="auth-light-container">
        <button onClick={() => navigate('/doctor-onboarding')} className="auth-light-back">
          <ChevronLeft size={18} /> Back
        </button>

        <motion.div
          className="auth-light-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="auth-light-header">
            <div className="auth-light-badge" style={{ background: '#d1fae5' }}>👨‍⚕️</div>
            <h1 className="auth-light-title">Doctor Registration</h1>
            <p className="auth-light-sub">Join our network of verified professionals 🩺</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-light-form">
            <div className="al-field">
              <label>Full Name <span className="al-req">*</span></label>
              <div className="al-input-wrap">
                <User size={16} />
                <input name="name" value={form.name} onChange={handleChange} placeholder="Dr. Rajesh Kumar" required />
              </div>
            </div>

            <div className="al-field-row">
              <div className="al-field">
                <label>Specialization <span className="al-req">*</span></label>
                <div className="al-input-wrap">
                  <Stethoscope size={16} />
                  <select name="specialization" value={form.specialization} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option>Psychiatrist</option>
                    <option>Psychologist</option>
                    <option>Clinical Therapist</option>
                    <option>Counselor</option>
                    <option>Neuropsychiatrist</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="al-field">
                <label>License No. <span className="al-req">*</span></label>
                <div className="al-input-wrap">
                  <Award size={16} />
                  <input name="licenseNo" value={form.licenseNo} onChange={handleChange} placeholder="MCI-XXXXX" required />
                </div>
              </div>
            </div>

            <div className="al-field">
              <label>Phone</label>
              <div className="al-input-wrap">
                <Phone size={16} />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98XXXXXXXX" />
              </div>
            </div>

            <div className="al-field">
              <label>Email <span className="al-req">*</span></label>
              <div className="al-input-wrap">
                <Mail size={16} />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="doctor@hospital.com" required />
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

            <button type="submit" className="al-submit" style={{ background: 'linear-gradient(135deg, #0d9488, #10b981)' }}>
              Get Verified ✅
            </button>
          </form>

          <p className="al-switch">
            Already registered? <Link to="/signin">Sign In</Link>
          </p>
          <Link to="/home" className="al-home-link">Back to Home</Link>
        </motion.div>
      </div>
    </div>
  )
}
