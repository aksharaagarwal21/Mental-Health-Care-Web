import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft } from 'lucide-react'

const slides = [
  {
    image: '/images/doctor-onboard-1.png',
    title: 'Welcome to Bloodwing',
    subtitle: 'Your trusted mental health knowledge commons — verify, publish, and help millions across India.',
  },
  {
    image: '/images/doctor-onboard-2.png',
    title: 'Connect with Patients',
    subtitle: 'Get matched with patients seeking professional help. Provide care through verified, evidence-based guidance.',
  },
  {
    image: '/images/doctor-onboard-3.png',
    title: 'Publish & Impact',
    subtitle: 'Write expert articles, get verified doctor badge, and build your professional profile. Your expertise saves lives.',
  },
]

export default function DoctorOnboarding() {
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()
  const slide = slides[current]

  const next = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1)
    } else {
      navigate('/doctor-auth')
    }
  }

  const skip = () => navigate('/doctor-auth')
  const back = () => {
    if (current > 0) setCurrent(current - 1)
    else navigate('/home')
  }

  return (
    <div className="doc-onboard">
      {/* Back button */}
      <button className="doc-onboard-back" onClick={back}>
        <ChevronLeft size={20} />
      </button>

      <div className="doc-onboard-card">
        {/* Image area */}
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

        {/* Content */}
        <div className="doc-onboard-content">
          {/* Dots */}
          <div className="doc-onboard-dots">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`doc-dot ${i === current ? 'active' : ''}`}
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

          {/* Actions */}
          <div className="doc-onboard-actions">
            <button className="doc-onboard-skip" onClick={skip}>
              Skip
            </button>
            <button className="doc-onboard-next" onClick={next}>
              {current === slides.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
