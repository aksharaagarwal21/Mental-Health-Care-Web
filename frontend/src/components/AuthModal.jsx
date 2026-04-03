import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Stethoscope, Heart, HandHeart, Eye, EyeOff, ArrowRight, CheckCircle, Shield } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

const ROLES = [
  {
    key: 'patient',
    label: 'Patient',
    icon: Heart,
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.12)',
    border: 'rgba(96,165,250,0.3)',
    desc: 'Track mood, access resources, connect with peers',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    key: 'doctor',
    label: 'Doctor',
    icon: Stethoscope,
    color: '#2dd4bf',
    bg: 'rgba(45,212,191,0.12)',
    border: 'rgba(45,212,191,0.3)',
    desc: 'Publish verified articles, get verified badge',
    gradient: 'linear-gradient(135deg, #0d9488, #10b981)',
  },
  {
    key: 'caregiver',
    label: 'Caregiver',
    icon: HandHeart,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.3)',
    desc: 'Care diary, support groups, self-care tools',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
  },
]

export default function AuthModal() {
  const { authModal, closeAuth, switchAuthMode, setAuthRole, register, login } = useAuthStore()
  const { open, mode, role } = authModal

  const [form, setForm] = useState({ name: '', email: '', password: '', specialization: '', institution: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const activeRole = ROLES.find((r) => r.key === role) || ROLES[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800))

    if (mode === 'register') {
      if (!form.name || !form.email || !form.password) {
        toast.error('Please fill all required fields')
        setLoading(false)
        return
      }
      if (form.password.length < 6) {
        toast.error('Password must be at least 6 characters')
        setLoading(false)
        return
      }
      const result = register({ ...form, role })
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`Welcome to Bloodwing, ${form.name}! 🎉`)
        closeAuth()
        setForm({ name: '', email: '', password: '', specialization: '', institution: '' })
      }
    } else {
      if (!form.email || !form.password) {
        toast.error('Please enter email and password')
        setLoading(false)
        return
      }
      const result = login(form.email, form.password)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Welcome back! 🌟')
        closeAuth()
        setForm({ name: '', email: '', password: '', specialization: '', institution: '' })
      }
    }
    setLoading(false)
  }

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }))

  if (!open) return null

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="auth-overlay"
          onClick={(e) => e.target === e.currentTarget && closeAuth()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="auth-modal"
          >
            {/* Close button */}
            <button onClick={closeAuth} className="auth-close-btn">
              <X size={18} />
            </button>

            {/* Header */}
            <div className="auth-header">
              <div className="auth-header-icon" style={{ background: activeRole.gradient }}>
                <activeRole.icon size={24} className="text-white" />
              </div>
              <h2 className="auth-title">
                {mode === 'login' ? 'Welcome Back' : 'Join Bloodwing'}
              </h2>
              <p className="auth-subtitle">
                {mode === 'login'
                  ? 'Sign in to continue your journey'
                  : `Register as a ${activeRole.label}`}
              </p>
            </div>

            {/* Role selector (register only) */}
            {mode === 'register' && (
              <div className="auth-role-selector">
                {ROLES.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => setAuthRole(r.key)}
                    className={`auth-role-btn ${role === r.key ? 'active' : ''}`}
                    style={{
                      borderColor: role === r.key ? r.border : 'transparent',
                      background: role === r.key ? r.bg : 'transparent',
                    }}
                  >
                    <r.icon size={16} style={{ color: r.color }} />
                    <span style={{ color: role === r.key ? r.color : '#94a3b8' }}>{r.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              {mode === 'register' && (
                <div className="auth-field">
                  <label className="auth-label">Full Name</label>
                  <div className="auth-input-wrap">
                    <User size={16} className="auth-input-icon" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>
              )}

              <div className="auth-field">
                <label className="auth-label">Email</label>
                <div className="auth-input-wrap">
                  <Mail size={16} className="auth-input-icon" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="auth-input"
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrap">
                  <Lock size={16} className="auth-input-icon" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    className="auth-input"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="auth-pass-toggle">
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Doctor-specific fields */}
              {mode === 'register' && role === 'doctor' && (
                <>
                  <div className="auth-field">
                    <label className="auth-label">Specialization</label>
                    <div className="auth-input-wrap">
                      <Stethoscope size={16} className="auth-input-icon" />
                      <input
                        type="text"
                        placeholder="e.g., Psychiatry, Clinical Psychology"
                        value={form.specialization}
                        onChange={(e) => update('specialization', e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Institution</label>
                    <div className="auth-input-wrap">
                      <Shield size={16} className="auth-input-icon" />
                      <input
                        type="text"
                        placeholder="Hospital / University"
                        value={form.institution}
                        onChange={(e) => update('institution', e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="auth-submit-btn"
                style={{ background: activeRole.gradient }}
              >
                {loading ? (
                  <div className="auth-spinner" />
                ) : (
                  <>
                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Mode switch */}
            <div className="auth-switch">
              {mode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => switchAuthMode('register')} className="auth-switch-btn" style={{ color: activeRole.color }}>
                    Create one
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => switchAuthMode('login')} className="auth-switch-btn" style={{ color: activeRole.color }}>
                    Sign in
                  </button>
                </p>
              )}
            </div>

            {/* Trust signals */}
            <div className="auth-trust">
              <div className="auth-trust-item">
                <CheckCircle size={12} /> 100% Anonymous
              </div>
              <div className="auth-trust-item">
                <Shield size={12} /> Encrypted
              </div>
              <div className="auth-trust-item">
                <Heart size={12} /> Free Forever
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
