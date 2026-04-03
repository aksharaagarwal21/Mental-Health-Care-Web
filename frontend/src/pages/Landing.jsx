import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Landing() {
  const navigate = useNavigate()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="landing-page">
      {/* Background split */}
      <div className="landing-bg">
        <div className="landing-bg-green" />
        <div className="landing-bg-cream" />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="landing-leaf landing-leaf-1"
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌿
      </motion.div>
      <motion.div
        className="landing-leaf landing-leaf-2"
        animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        🍃
      </motion.div>
      <motion.div
        className="landing-leaf landing-leaf-3"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        💚
      </motion.div>

      {/* Content container */}
      <div className="landing-content">
        {/* Title */}
        <motion.div
          className="landing-title-area"
          initial={{ opacity: 0, y: -30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="landing-title">
            It's Ok Not To Be
          </h1>
          <h1 className="landing-title landing-title-bold">
            OKAY !!
          </h1>
        </motion.div>

        {/* Illustration */}
        <motion.div
          className="landing-illustration"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        >
          <img
            src="/images/landing-woman.png"
            alt="A peaceful woman illustration"
            className="landing-image"
          />
          {/* Soft overlay glow */}
          <div className="landing-image-glow" />
        </motion.div>

        {/* CTA button */}
        <motion.div
          className="landing-cta-area"
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        >
          <motion.button
            className="landing-cta-btn"
            onClick={() => navigate('/home')}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="landing-cta-text">Let Us Help You</span>
            <motion.span
              className="landing-cta-arrow"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.button>

          {/* Subtle tagline */}
          <motion.p
            className="landing-tagline"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
          >
            Your safe space for mental health support 🌻
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom subtle branding */}
      <motion.div
        className="landing-branding"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="landing-brand-name">Bloodwing</span>
        <span className="landing-brand-sep">•</span>
        <span className="landing-brand-sub">Mental Health Commons</span>
      </motion.div>
    </div>
  )
}
