import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Stethoscope, HandHeart, ArrowRight } from 'lucide-react'

const roles = [
  {
    key: 'patient',
    emoji: '🧘',
    sticker: '🌿',
    icon: Heart,
    title: 'Join as a Patient',
    subtitle: 'I need mental health support',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    path: '/patient-onboarding',
  },
  {
    key: 'doctor',
    emoji: '👨‍⚕️',
    sticker: '🩺',
    icon: Stethoscope,
    title: 'Join as a Doctor',
    subtitle: 'I provide professional care',
    color: '#0d9488',
    gradient: 'linear-gradient(135deg, #0d9488, #10b981)',
    path: '/doctor-onboarding',
  },
  {
    key: 'caregiver',
    emoji: '🤝',
    sticker: '💛',
    icon: HandHeart,
    title: 'Join as a Caregiver',
    subtitle: 'I support a loved one',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    path: '/caregiver-onboarding',
  },
]

export default function RoleSelect() {
  const navigate = useNavigate()

  return (
    <div className="rs-page">
      {/* Floating stickers */}
      <div className="rs-sticker rs-st-1">🌸</div>
      <div className="rs-sticker rs-st-2">🦋</div>
      <div className="rs-sticker rs-st-3">🌿</div>
      <div className="rs-sticker rs-st-4">💚</div>
      <div className="rs-sticker rs-st-5">✨</div>

      <div className="rs-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rs-header"
        >
          <div className="rs-logo-badge">🧠</div>
          <h1 className="rs-title">How will you use <span>Bloodwing</span>?</h1>
          <p className="rs-subtitle">Choose your role to get a personalized experience</p>
        </motion.div>

        <div className="rs-cards">
          {roles.map((role, i) => (
            <motion.button
              key={role.key}
              className="rs-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
              onClick={() => navigate(role.path)}
            >
              <div className="rs-card-accent" style={{ background: role.gradient }} />
              <div className="rs-card-emoji">{role.emoji}</div>
              <h3 className="rs-card-title">{role.title}</h3>
              <p className="rs-card-sub">{role.subtitle}</p>
              <div className="rs-card-btn" style={{ background: role.gradient }}>
                Continue <ArrowRight size={14} />
              </div>
            </motion.button>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="rs-footer"
        >
          Already have an account? <Link to="/signin" className="rs-link">Sign In</Link>
        </motion.p>
      </div>
    </div>
  )
}
