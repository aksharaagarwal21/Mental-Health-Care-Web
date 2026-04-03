import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft } from 'lucide-react'

const slides = [
  {
    image: '/images/patient-onboard-1.png',
    title: 'Your Safe Space',
    subtitle: 'Track your mood, express your feelings, and find peace. 100% anonymous. No tracking, no judgement.',
  },
  {
    image: '/images/patient-onboard-2.png',
    title: 'You Are Not Alone',
    subtitle: 'AI matches you with someone who truly understands. Anonymous peer support from people who have been there.',
  },
  {
    image: '/images/therapist-hero.png',
    title: 'Heal at Your Pace',
    subtitle: 'Access verified articles, crisis helplines, and self-care tools in 10+ Indian languages. Always free.',
  },
]

export default function PatientOnboarding() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()
  const slide = slides[current]

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1)
    else navigate('/patient-auth')
  }

  const skip = () => navigate('/patient-auth')
  const back = () => {
    if (current > 0) setCurrent(current - 1)
    else navigate('/role-select')
  }

  return (
    <div className="doc-onboard" style={{ background: 'linear-gradient(135deg, #e8f4f8 0%, #f0e8f5 50%, #fef9ef 100%)' }}>
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
                className={`doc-dot patient-dot ${i === current ? 'active' : ''}`}
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
            <button className="doc-onboard-next patient-next" onClick={next}>
              {current === slides.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
