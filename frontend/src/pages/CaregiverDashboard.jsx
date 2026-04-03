import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LogOut, Heart, Users, BookOpen, Calendar, Phone,
  ChevronRight, Sun, Moon, Smile, MessageCircle,
  Coffee, Activity, PenTool, Plus
} from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import AIChatbot from '../components/AIChatbot'
import toast from 'react-hot-toast'

const SELF_CARE_TASKS = [
  { title: 'Take a Break', emoji: '☕', done: true, color: '#fef3c7' },
  { title: 'Call a Friend', emoji: '📞', done: false, color: '#dbeafe' },
  { title: 'Go for a Walk', emoji: '🚶', done: false, color: '#d1fae5' },
  { title: 'Read Something', emoji: '📖', done: true, color: '#fce7f3' },
]

const CARE_LOG = [
  { time: 'Morning', activity: 'Gave medications', mood: '🙂', note: 'Seemed calmer today' },
  { time: 'Afternoon', activity: 'Accompanied to therapist', mood: '😊', note: 'Good session' },
  { time: 'Evening', activity: 'Prepared dinner together', mood: '🙂', note: 'Enjoyed cooking' },
]

const RESOURCES = [
  { title: 'Caregiver Burnout Guide', tag: 'Self-care', color: '#fef3c7' },
  { title: 'Managing Patient Anxiety', tag: 'Skills', color: '#dbeafe' },
  { title: 'When to Seek Professional Help', tag: 'Important', color: '#fecaca' },
  { title: 'Building Support Networks', tag: 'Community', color: '#d1fae5' },
]

export default function CaregiverDashboard() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [careDiary, setCareDiary] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('bw_care_diary')
    if (saved) setCareDiary(JSON.parse(saved))
  }, [])

  const addCareDiaryEntry = () => {
    const text = prompt('What caregiving activity did you do today?')
    if (!text) return
    const entry = { id: Date.now(), text, date: new Date().toLocaleDateString(), mood: '🙂' }
    const updated = [entry, ...careDiary].slice(0, 10)
    setCareDiary(updated)
    localStorage.setItem('bw_care_diary', JSON.stringify(updated))
    toast.success('Care diary updated! 💛')
  }

  return (
    <div className="cd-page">
      <div className="cd-container">
        {/* Header */}
        <header className="cd-header">
          <div>
            <h1 className="cd-greeting">You are doing great, {user?.name || 'Caregiver'}! 💛</h1>
            <p className="cd-motto">A healthy caregiver makes a better caregiver 🌻</p>
          </div>
          <button onClick={() => { logout(); toast.success('Signed out'); navigate('/home'); }} className="cd-signout">
            <LogOut size={14} /> Sign Out
          </button>
        </header>

        {/* Your Loved One */}
        <motion.section
          className="cd-loved-one"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="cd-loved-head">
            <h2><Heart size={16} /> Your Loved One</h2>
          </div>
          <div className="cd-loved-card">
            <div className="cd-loved-avatar">💚</div>
            <div className="cd-loved-info">
              <h3>Patient</h3>
              <p>Overall mood: <span className="cd-mood-good">Improving 📈</span></p>
              <p>Last mood check: <strong>Today, 2:00 PM</strong></p>
            </div>
          </div>
          <div className="cd-mood-week">
            {['😊', '🙂', '😐', '🙂', '😊', '😊', '➕'].map((emoji, i) => (
              <div key={i} className="cd-mood-dot">
                <span>{['M','T','W','T','F','S','S'][i]}</span>
                <span className="cd-mood-emoji">{emoji}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Today's Care Log */}
        <section className="cd-section">
          <div className="cd-section-head">
            <h2><Calendar size={16} /> Today's Care Log</h2>
            <button className="cd-add-btn" onClick={addCareDiaryEntry}><Plus size={14} /> Add</button>
          </div>
          <div className="cd-care-log">
            {CARE_LOG.map((log, i) => (
              <motion.div
                key={i}
                className="cd-log-item"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <span className="cd-log-time">{log.time}</span>
                <div className="cd-log-content">
                  <h4>{log.activity} {log.mood}</h4>
                  <p>{log.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Self-Care Check */}
        <section className="cd-section">
          <h2 className="cd-section-title"><Coffee size={16} /> Your Self-Care Today</h2>
          <div className="cd-selfcare-grid">
            {SELF_CARE_TASKS.map((task, i) => (
              <motion.div
                key={i}
                className={`cd-selfcare-card ${task.done ? 'done' : ''}`}
                style={{ background: task.color }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                <span className="cd-selfcare-emoji">{task.emoji}</span>
                <span className="cd-selfcare-title">{task.title}</span>
                {task.done && <span className="cd-selfcare-check">✅</span>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="cd-section">
          <h2 className="cd-section-title"><BookOpen size={16} /> Resources for You</h2>
          <div className="cd-resources">
            {RESOURCES.map((r, i) => (
              <Link key={i} to="/articles" className="cd-resource-card" style={{ borderLeftColor: r.color }}>
                <div>
                  <h4>{r.title}</h4>
                  <span className="cd-resource-tag" style={{ background: r.color }}>{r.tag}</span>
                </div>
                <ChevronRight size={16} />
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="cd-section">
          <div className="cd-quick-grid">
            {[
              { icon: Users, label: 'Support Groups', path: '/groups', color: '#f59e0b' },
              { icon: MessageCircle, label: 'Chat with AI', path: '#', color: '#10b981' },
              { icon: BookOpen, label: 'Learning Center', path: '/articles', color: '#8b5cf6' },
              { icon: Phone, label: 'Helplines', path: '/mood', color: '#ef4444' },
            ].map((item, i) => (
              <Link key={i} to={item.path} className="cd-quick-item">
                <div className="cd-quick-icon" style={{ background: item.color + '15' }}>
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="cd-helpline">
          <Phone size={14} />
          <span>Caregiver support: <a href="tel:9152987821">iCall: 9152987821</a></span>
        </div>
      </div>

      <AIChatbot />
    </div>
  )
}
