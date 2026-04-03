import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Brain, ArrowRight, Award, Heart, Users, Shield, Globe,
  BookOpen, Sparkles, Star, CheckCircle, Leaf, Phone
} from 'lucide-react'
import { useAuthStore } from '../stores/authStore'

/* ─── Team / Contributors ─── */
const contributors = [
  { name: 'Aditya Agarwal', role: 'Full-Stack Lead', emoji: '🧑‍💻' },
  { name: 'Team Bloodwing', role: 'AI/ML Engineers', emoji: '🤖' },
  { name: 'SRM University', role: 'Academic Partner', emoji: '🎓' },
]

/* ─── About pillars ─── */
const pillars = [
  { icon: BookOpen, title: 'Open Source', desc: 'Every line of code is transparent. Community-driven, peer-reviewed, and forever free.' },
  { icon: Shield, title: 'Privacy First', desc: '100% anonymous. No tracking, no data selling. Your mental health is yours alone.' },
  { icon: Globe, title: 'Built for India', desc: '10+ Indian languages with cultural sensitivity. Designed for our unique challenges.' },
  { icon: Heart, title: 'Evidence-Based', desc: 'AI-verified articles from doctors, patients & caregivers. No misinformation.' },
]

/* ─── Impact numbers ─── */
const impacts = [
  { value: '10K+', label: 'Lives Touched', icon: '💚' },
  { value: '500+', label: 'Verified Articles', icon: '📖' },
  { value: '50+', label: 'Verified Doctors', icon: '🩺' },
  { value: '₹0', label: 'Always Free', icon: '✨' },
]

export default function Home() {
  const { user, openAuth } = useAuthStore()
  const navigate = useNavigate()

  // If logged in, redirect to dashboard
  if (user) {
    navigate('/dashboard')
    return null
  }

  return (
    <div className="home-redesign">

      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-inner">
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-badge">
              <Leaf size={14} />
              <span>India's Open Mental Health Platform</span>
            </div>

            <h1 className="hero-heading">
              Asking for Help
              <br />
              <span className="hero-heading-light">is Not a Weakness</span>
              <br />
              <span className="hero-heading-bold">It's a Strength</span>
            </h1>

            <div className="hero-trust-row">
              <div className="hero-gold-seal">
                <Award size={20} color="#fff" />
              </div>
              <div className="hero-trust-text">
                <strong>Free & verified mental health resources.</strong> India's largest
                open-source mental health knowledge commons — AI-verified articles,
                anonymous peer support, and crisis detection. Always free, always safe.
              </div>
            </div>

            <div className="hero-cta-row">
              <button onClick={() => navigate('/role-select')} className="hero-cta-primary">
                Register Now <ArrowRight size={16} />
              </button>
              <button onClick={() => navigate('/signin')} className="hero-cta-secondary">
                Sign In
              </button>
            </div>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="hero-image-frame">
              <div className="hero-image-border" />
              <img
                src="/images/therapist-hero.png"
                alt="Mental health professional"
                className="hero-image"
              />
              <motion.div
                className="hero-float-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="hero-float-stars">★★★★★</div>
                <p className="hero-float-text">
                  <strong>"It changed my life."</strong><br />
                  Helped 10,000+ people
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT US
          ═══════════════════════════════════════════ */}
      <section className="about-section">
        <div className="about-inner">
          <motion.div
            className="about-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-label">
              <Sparkles size={14} />
              About Us
            </div>
            <h2 className="section-title">
              Why <span className="gold-text">Bloodwing</span>?
            </h2>
            <p className="section-subtitle">
              We believe mental health care should be accessible, affordable, and
              stigma-free for every Indian — from metros to villages.
            </p>
          </motion.div>

          <div className="pillars-grid">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                className="pillar-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="pillar-icon">
                  <p.icon size={22} />
                </div>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOREST TRANSITION
          ═══════════════════════════════════════════ */}
      <section className="forest-section">
        <img src="/images/misty-forest.png" alt="Misty forest" className="forest-image" />
        <div className="forest-overlay" />
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS — 3 ROLES
          ═══════════════════════════════════════════ */}
      <section className="roles-section">
        <div className="roles-inner">
          <motion.div
            className="roles-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="section-label-dark">
              <Users size={14} />
              Join As
            </div>
            <h2 className="section-title-dark">
              Choose how you want to <span className="gold-text">help</span>
            </h2>
            <p className="section-subtitle-dark">
              Whether you're seeking support, providing care, or helping a loved one
            </p>
          </motion.div>

          <div className="roles-grid">
            {/* Patient */}
            <motion.div
              className="role-card-new"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <div className="role-card-accent" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }} />
              <div className="role-card-emoji">🧘</div>
              <h3 className="role-card-title">I Need Support</h3>
              <p className="role-card-subtitle">Patient</p>
              <ul className="role-card-features">
                <li><CheckCircle size={14} /> Anonymous mood tracking</li>
                <li><CheckCircle size={14} /> AI peer matching</li>
                <li><CheckCircle size={14} /> Crisis detection & helplines</li>
                <li><CheckCircle size={14} /> Multilingual articles</li>
              </ul>
              <button
                onClick={() => navigate('/patient-onboarding')}
                className="role-card-btn"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
              >
                Get Started Free <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/signin')}
                className="role-card-signin"
              >
                Sign In as Patient
              </button>
            </motion.div>

            {/* Doctor */}
            <motion.div
              className="role-card-new"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="role-card-accent" style={{ background: 'linear-gradient(135deg, #0d9488, #10b981)' }} />
              <div className="role-card-emoji">👨‍⚕️</div>
              <h3 className="role-card-title">I Provide Care</h3>
              <p className="role-card-subtitle">Doctor / Therapist</p>
              <ul className="role-card-features">
                <li><CheckCircle size={14} /> Verified professional badge</li>
                <li><CheckCircle size={14} /> Publish expert articles</li>
                <li><CheckCircle size={14} /> Community insights dashboard</li>
                <li><CheckCircle size={14} /> Consultation management</li>
              </ul>
              <button
                onClick={() => navigate('/doctor-onboarding')}
                className="role-card-btn"
                style={{ background: 'linear-gradient(135deg, #0d9488, #10b981)' }}
              >
                Get Verified <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/doctor-auth')}
                className="role-card-signin"
              >
                Sign In as Doctor
              </button>
            </motion.div>

            {/* Caregiver */}
            <motion.div
              className="role-card-new"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="role-card-accent" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }} />
              <div className="role-card-emoji">🤝</div>
              <h3 className="role-card-title">I Support Someone</h3>
              <p className="role-card-subtitle">Caregiver / Family</p>
              <ul className="role-card-features">
                <li><CheckCircle size={14} /> Care diary & logging</li>
                <li><CheckCircle size={14} /> Caregiver support groups</li>
                <li><CheckCircle size={14} /> Self-care toolkit</li>
                <li><CheckCircle size={14} /> Guided resources library</li>
              </ul>
              <button
                onClick={() => navigate('/caregiver-onboarding')}
                className="role-card-btn"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}
              >
                Join as Caregiver <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/signin')}
                className="role-card-signin"
              >
                Sign In as Caregiver
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          IMPACT / OUR CONTRIBUTIONS
          ═══════════════════════════════════════════ */}
      <section className="impact-section">
        <div className="impact-inner">
          <motion.div
            className="impact-header"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="section-label">
              <Star size={14} />
              Our Contributions
            </div>
            <h2 className="section-title">
              Making a <span className="gold-text">Difference</span>
            </h2>
            <p className="section-subtitle">
              Real impact through open-source technology and community support
            </p>
          </motion.div>

          <div className="impact-grid">
            {impacts.map((item, i) => (
              <motion.div
                key={item.label}
                className="impact-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="impact-emoji">{item.icon}</div>
                <div className="impact-value">{item.value}</div>
                <div className="impact-label">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Key contributions */}
          <div className="contributions-grid">
            <motion.div
              className="contribution-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="contribution-icon" style={{ background: '#e8f5e9' }}>
                <Brain size={24} style={{ color: '#3a5a40' }} />
              </div>
              <h3>AI-Powered Knowledge Commons</h3>
              <p>
                Wikipedia meets AI for mental health. Anyone can contribute articles — patients
                sharing experiences, doctors providing expertise, caregivers offering guidance.
                All content is AI-verified for accuracy before publishing.
              </p>
            </motion.div>

            <motion.div
              className="contribution-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="contribution-icon" style={{ background: '#e1f5fe' }}>
                <Users size={24} style={{ color: '#0277bd' }} />
              </div>
              <h3>Anonymous Peer Support Network</h3>
              <p>
                AI matches you with someone who has been through a similar experience. Anonymous,
                safe, and moderated. Because sometimes the best help comes from someone who truly
                understands.
              </p>
            </motion.div>

            <motion.div
              className="contribution-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="contribution-icon" style={{ background: '#fff3e0' }}>
                <Phone size={24} style={{ color: '#e65100' }} />
              </div>
              <h3>24/7 Crisis Detection</h3>
              <p>
                Our AI quietly monitors conversations for distress signals. If detected, it
                gently surfaces helpline numbers and emergency contacts — never intrusive,
                always caring.
              </p>
            </motion.div>
          </div>
        </div>
      </section>




      {/* ═══════════════════════════════════════════
          CTA — REGISTER
          ═══════════════════════════════════════════ */}
      <section className="cta-banner-section">
        <div className="cta-banner-inner">
          <img src="/images/misty-forest.png" alt="" className="cta-banner-bg" />
          <div className="cta-banner-overlay" />
          <motion.div
            className="cta-banner-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-banner-title">Ready to take the first step?</h2>
            <p className="cta-banner-subtitle">
              Join thousands who've found support. Your journey starts here — anonymous, free, and safe.
            </p>
            <div className="cta-banner-buttons">
              <button onClick={() => navigate('/role-select')} className="cta-banner-primary">
                Register Now <ArrowRight size={16} />
              </button>
              <button onClick={() => navigate('/signin')} className="cta-banner-secondary">
                Sign In
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HELPLINE
          ═══════════════════════════════════════════ */}
      <section className="helpline-section">
        <div className="helpline-inner">
          <Phone size={18} />
          <span>
            <strong>In crisis?</strong> Call <a href="tel:9152987821">iCall: 9152987821</a>
            {' '}or <a href="tel:08046110007">NIMHANS: 080-46110007</a>
            {' '}• Available 24/7
          </span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <Brain size={20} />
            <span>Bloodwing</span>
          </div>
          <p>Open source, free forever. Built with 💚 for India 🇮🇳</p>
          <p className="footer-sub">Bloodwing Sect — SRM University • Aossome Hacks 3 • AI/ML Track</p>
        </div>
      </footer>
    </div>
  )
}
