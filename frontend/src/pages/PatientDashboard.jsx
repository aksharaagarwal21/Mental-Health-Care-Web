import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LogOut, Settings, User, Smile, BookOpen, Users, Calendar,
  ChevronRight, Moon, Sun, CloudRain, Heart, Sparkles, Plus,
  PenTool, Leaf, MessageCircle, Phone, X, Send
} from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import AIChatbot from '../components/AIChatbot'
import toast from 'react-hot-toast'

const MOOD_EMOJIS = [
  { emoji: '😄', label: 'Great', color: '#22c55e' },
  { emoji: '🙂', label: 'Good', color: '#86efac' },
  { emoji: '😐', label: 'Okay', color: '#fbbf24' },
  { emoji: '😔', label: 'Low', color: '#f97316' },
  { emoji: '😢', label: 'Sad', color: '#ef4444' },
]

const EXERCISES = [
  { title: 'My Strengths', subtitle: 'Discover what makes you unique', color: '#ddd6fe', icon: '💪' },
  { title: 'Build Confidence', subtitle: 'Small steps, big changes', color: '#fef08a', icon: '🌱' },
  { title: 'Mindful Breathing', subtitle: 'Calm your mind in 5 minutes', color: '#a7f3d0', icon: '🧘' },
  { title: 'Gratitude List', subtitle: 'What are you thankful for?', color: '#fecaca', icon: '💚' },
]

const WELLNESS_TASKS = [
  { title: 'Morning Walk', items: ['20 mins', 'Park'], icon: '🚶', done: true },
  { title: 'Journal Writing', items: ['How I feel', 'Goals'], icon: '📝', done: false },
  { title: 'Read an Article', items: ['Self-care', 'Wellness'], icon: '📖', done: false },
  { title: 'Meditation', items: ['5 mins', 'Guided'], icon: '🧘', done: true },
]

export default function PatientDashboard() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [todayMood, setTodayMood] = useState(null)
  const [weekMoods, setWeekMoods] = useState([])
  const [journalEntries, setJournalEntries] = useState([])
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [viewingEntry, setViewingEntry] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem('bw_patient_moods')
    if (saved) setWeekMoods(JSON.parse(saved))
    const journal = localStorage.getItem('bw_patient_journal')
    if (journal) setJournalEntries(JSON.parse(journal))
    const today = localStorage.getItem('bw_patient_today_mood')
    if (today) setTodayMood(JSON.parse(today))
  }, [])

  const selectMood = (moodIdx) => {
    const mood = MOOD_EMOJIS[moodIdx]
    setTodayMood(mood)
    localStorage.setItem('bw_patient_today_mood', JSON.stringify(mood))
    const today = new Date().getDay()
    const newWeek = [...weekMoods]
    newWeek[today === 0 ? 6 : today - 1] = moodIdx
    setWeekMoods(newWeek)
    localStorage.setItem('bw_patient_moods', JSON.stringify(newWeek))
    toast.success('Mood logged! ' + mood.emoji)
  }

  const saveNote = () => {
    if (!noteText.trim()) return
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
      dateWeek: `${new Date().getDate()}-${new Date().getDate() + 6}.${(new Date().getMonth() + 1).toString().padStart(2, '0')}`,
      text: noteText.trim().slice(0, 300),
      mood: todayMood?.emoji || '😐',
    }
    const updated = [entry, ...journalEntries].slice(0, 8)
    setJournalEntries(updated)
    localStorage.setItem('bw_patient_journal', JSON.stringify(updated))
    setNoteText('')
    setShowNoteModal(false)
    toast.success('Journal entry saved! 📝')
  }

  const deleteEntry = (id) => {
    const updated = journalEntries.filter(e => e.id !== id)
    setJournalEntries(updated)
    localStorage.setItem('bw_patient_journal', JSON.stringify(updated))
    setViewingEntry(null)
    toast.success('Entry deleted')
  }

  return (
    <div className="pd-page">
      <div className="pd-leaf pd-leaf-1">🌿</div>
      <div className="pd-leaf pd-leaf-2">🍃</div>

      <div className="pd-container">
        {/* Header */}
        <header className="pd-header">
          <div>
            <h1 className="pd-greeting">Hey {user?.name || 'Friend'}! 👋</h1>
            <p className="pd-motto">Nothing is impossible. 🌿</p>
          </div>
          <div className="pd-header-actions">
            <Link to="/dashboard" className="pd-icon-btn"><User size={18} /></Link>
            <button onClick={() => { logout(); toast.success('Signed out'); navigate('/home'); }} className="pd-icon-btn">
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Mood Gauge */}
        <section className="pd-section">
          <motion.div
            className="pd-mood-gauge-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="pd-gauge-title">How would you describe your mood?</h2>
            <p className="pd-gauge-sublabel">
              {todayMood ? `I Feel ${todayMood.label}` : 'Tap the gauge to tell us'}
            </p>

            <div className="pd-gauge-emoji-wrap">
              <motion.div
                className="pd-gauge-big-emoji"
                key={todayMood?.emoji || 'default'}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {todayMood ? todayMood.emoji : '😐'}
              </motion.div>
            </div>

            {/* SVG Arc Gauge */}
            <div className="pd-gauge-arc-wrap">
              <svg viewBox="0 0 300 170" className="pd-gauge-svg">
                {[
                  { d: 'M 30 150 A 120 120 0 0 1 78 60', color: '#ef4444', idx: 4 },
                  { d: 'M 78 60 A 120 120 0 0 1 120 32', color: '#f97316', idx: 3 },
                  { d: 'M 120 32 A 120 120 0 0 1 180 32', color: '#fbbf24', idx: 2 },
                  { d: 'M 180 32 A 120 120 0 0 1 222 60', color: '#86efac', idx: 1 },
                  { d: 'M 222 60 A 120 120 0 0 1 270 150', color: '#22c55e', idx: 0 },
                ].map((seg) => (
                  <path
                    key={seg.idx}
                    d={seg.d}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="24"
                    strokeLinecap="round"
                    className="pd-gauge-segment"
                    onClick={() => selectMood(seg.idx)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
                <text x="20" y="158" fontSize="18" textAnchor="middle">😢</text>
                <text x="68" y="60" fontSize="18" textAnchor="middle">😔</text>
                <text x="150" y="24" fontSize="18" textAnchor="middle">😐</text>
                <text x="232" y="60" fontSize="18" textAnchor="middle">🙂</text>
                <text x="280" y="158" fontSize="18" textAnchor="middle">😄</text>

                {todayMood && (() => {
                  const angles = { 4: -160, 3: -130, 2: -90, 1: -50, 0: -20 }
                  const moodIdx = MOOD_EMOJIS.findIndex(m => m.emoji === todayMood.emoji)
                  const angle = angles[moodIdx] || -90
                  const rad = (angle * Math.PI) / 180
                  const cx = 150, cy = 150, r = 80
                  const nx = cx + r * Math.cos(rad)
                  const ny = cy + r * Math.sin(rad)
                  return (
                    <g>
                      <circle cx="150" cy="150" r="8" fill="#374151" />
                      <motion.line
                        x1="150" y1="150" x2={nx} y2={ny}
                        stroke="#374151" strokeWidth="3" strokeLinecap="round"
                        initial={{ x2: 150, y2: 70 }}
                        animate={{ x2: nx, y2: ny }}
                        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                      />
                      <motion.circle cx={nx} cy={ny} r="5" fill={todayMood.color} initial={{ r: 0 }} animate={{ r: 5 }} />
                    </g>
                  )
                })()}
              </svg>
            </div>

            <div className="pd-gauge-labels">
              {MOOD_EMOJIS.slice().reverse().map((m, i) => (
                <button
                  key={i}
                  className={`pd-gauge-label-btn ${todayMood?.emoji === m.emoji ? 'active' : ''}`}
                  onClick={() => selectMood(MOOD_EMOJIS.indexOf(m))}
                  style={todayMood?.emoji === m.emoji ? { borderColor: m.color, color: m.color } : {}}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <button className="pd-gauge-note-btn" onClick={() => setShowNoteModal(true)}>
              Add note
            </button>
          </motion.div>
        </section>

        {/* ─── Note Modal ─── */}
        <AnimatePresence>
          {showNoteModal && (
            <motion.div
              className="pd-note-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNoteModal(false)}
            >
              <motion.div
                className="pd-note-modal"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pd-note-modal-head">
                  <h3>📝 Write a Journal Entry</h3>
                  <button className="pd-note-close" onClick={() => setShowNoteModal(false)}>
                    <X size={18} />
                  </button>
                </div>

                {todayMood && (
                  <div className="pd-note-mood-tag">
                    Feeling: {todayMood.emoji} {todayMood.label}
                  </div>
                )}

                <textarea
                  className="pd-note-textarea"
                  placeholder="How was your week? What is on your mind? Write freely..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={5}
                  maxLength={300}
                  autoFocus
                />

                <div className="pd-note-footer">
                  <span className="pd-note-count">{noteText.length}/300</span>
                  <div className="pd-note-actions">
                    <button className="pd-note-cancel" onClick={() => { setNoteText(''); setShowNoteModal(false); }}>
                      Cancel
                    </button>
                    <button className="pd-note-save" onClick={saveNote} disabled={!noteText.trim()}>
                      <Send size={14} /> Save Entry
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── View Entry Modal ─── */}
        <AnimatePresence>
          {viewingEntry && (
            <motion.div
              className="pd-note-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingEntry(null)}
            >
              <motion.div
                className="pd-note-modal"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="pd-note-modal-head">
                  <h3>{viewingEntry.mood || '📝'} Journal Entry</h3>
                  <button className="pd-note-close" onClick={() => setViewingEntry(null)}>
                    <X size={18} />
                  </button>
                </div>
                <div className="pd-note-view-date">{viewingEntry.date}</div>
                <p className="pd-note-view-text">{viewingEntry.text}</p>
                <div className="pd-note-footer">
                  <span />
                  <div className="pd-note-actions">
                    <button className="pd-note-delete" onClick={() => deleteEntry(viewingEntry.id)}>
                      Delete
                    </button>
                    <button className="pd-note-cancel" onClick={() => setViewingEntry(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sleep Card */}
        <motion.div
          className="pd-sleep-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="pd-sleep-left">
            <h3>See how you slept today!</h3>
            <button className="pd-sleep-btn" onClick={() => navigate('/mood')}>
              Find out! <ChevronRight size={14} />
            </button>
          </div>
          <div className="pd-sleep-right">🌙✨🛌</div>
        </motion.div>

        {/* Wellness Tasks */}
        <section className="pd-section">
          <h2 className="pd-section-title">Your Tasks</h2>
          <div className="pd-tasks-grid">
            {WELLNESS_TASKS.map((task, i) => (
              <motion.div
                key={i}
                className={`pd-task-card ${task.done ? 'done' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
              >
                <span className="pd-task-icon">{task.icon}</span>
                <h4>{task.title}</h4>
                <div className="pd-task-items">
                  {task.items.map((item, j) => (
                    <span key={j}>{'• ' + item}</span>
                  ))}
                </div>
                {task.done && <span className="pd-task-check">✅</span>}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Exercises */}
        <section className="pd-section">
          <h2 className="pd-section-title">Exercises for You</h2>
          <p className="pd-section-sub">Based on your needs</p>
          <div className="pd-exercises-grid">
            {EXERCISES.map((ex, i) => (
              <motion.div
                key={i}
                className="pd-exercise-card"
                style={{ background: ex.color }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <h4>{ex.title}</h4>
                <p>{ex.subtitle}</p>
                <span className="pd-exercise-icon">{ex.icon}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Journal */}
        <section className="pd-section">
          <div className="pd-section-head">
            <h2 className="pd-section-title">My Week Journal</h2>
            <button className="pd-see-more" onClick={() => setShowNoteModal(true)}>
              <Plus size={14} /> New
            </button>
          </div>
          {journalEntries.length === 0 ? (
            <div className="pd-journal-empty">
              <p>No entries yet. Tap "Add note" or "New" to start journaling! 📝</p>
              <button className="pd-journal-start-btn" onClick={() => setShowNoteModal(true)}>
                Write your first entry
              </button>
            </div>
          ) : (
            <div className="pd-journal-grid">
              {journalEntries.map((entry) => (
                <motion.div
                  key={entry.id}
                  className="pd-journal-card"
                  onClick={() => setViewingEntry(entry)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="pd-journal-card-head">
                    <span className="pd-journal-date">{entry.dateWeek || entry.date}</span>
                    {entry.mood && <span className="pd-journal-mood">{entry.mood}</span>}
                  </div>
                  <p>{entry.text.length > 80 ? entry.text.slice(0, 80) + '...' : entry.text}</p>
                </motion.div>
              ))}
              <button className="pd-journal-add" onClick={() => setShowNoteModal(true)}>
                <Plus size={24} />
              </button>
            </div>
          )}
        </section>

        {/* Quick Links */}
        <section className="pd-section">
          <h2 className="pd-section-title">Quick Access</h2>
          <div className="pd-quick-grid">
            {[
              { icon: BookOpen, label: 'Articles', path: '/articles', color: '#8b5cf6' },
              { icon: Users, label: 'Peer Match', path: '/peer-match', color: '#06b6d4' },
              { icon: MessageCircle, label: 'Groups', path: '/groups', color: '#10b981' },
              { icon: Phone, label: 'Helplines', path: '/mood', color: '#ef4444' },
            ].map((item, i) => (
              <Link key={i} to={item.path} className="pd-quick-item">
                <div className="pd-quick-icon" style={{ background: item.color + '18' }}>
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="pd-helpline">
          <Phone size={14} />
          <span>In crisis? Call <a href="tel:9152987821">iCall: 9152987821</a></span>
        </div>
      </div>

      <AIChatbot />
    </div>
  )
}
