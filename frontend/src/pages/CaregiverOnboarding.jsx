import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft } from 'lucide-react'

const slides = [
  {
    image: '/images/caregiver-onboard-1.png',
    title: 'You Matter Too',
    subtitle: 'Caring for someone is beautiful but exhausting. Bloodwing supports caregivers with tools, groups, and self-care resources.',
  },
  {
    image: '/images/caregiver-onboard-2.png',
    title: 'Learn and Grow',
    subtitle: 'Access expert guides on caregiving, join support groups with fellow caregivers, and never feel alone in your journey.',
  },
  {
    image: '/images/misty-forest.png',
    title: 'Find Your Peace',
    subtitle: 'Care diary, self-care reminders, and community support. A healthy caregiver makes a better caregiver.',
  },
]

export default function CaregiverOnboarding() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()
  const slide = slides[current]

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1)
    else navigate('/caregiver-auth')
  }

  const skip = () => navigate('/caregiver-auth')
  const back = () => {
    if (current > 0) setCurrent(current - 1)
    else navigate('/role-select')
  }

  return (
    <div className="doc-onboard" style={{ background: 'linear-gradient(135deg, #fef3e2 0%, #fde8d0 50%, #fff5f5 100%)' }}>
      <button className="doc-onboard-back" onClick={back}>
        <ChevronLeft size={20} />
      </button>

      <div className="doc-onboard-card">
        <div className="doc-onboard-img-wrap">
          <AnimatePresence mode="wait">
            <motion.img
              key={slide.image}
              src={slide.image}
              alt={slide.title}
              className="doc-onboard-img"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35 }}
            />
          </AnimatePresence>
        </div>

        <div className="doc-onboard-content">
          <div className="doc-onboard-dots">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`doc-dot caregiver-dot ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="doc-onboard-title">{slide.title}</h2>
              <p className="doc-onboard-subtitle">{slide.subtitle}</p>
            </motion.div>
          </AnimatePresence>

          <div className="doc-onboard-actions">
            <button className="doc-onboard-skip" onClick={skip}>Skip</button>
            <button className="doc-onboard-next caregiver-next" onClick={next}>
              {current === slides.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
