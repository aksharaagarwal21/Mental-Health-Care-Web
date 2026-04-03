import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LogOut, User, FileText, Users, BarChart2, Award, Clock,
  ChevronRight, PenTool, UserCheck, Shield, Activity,
  TrendingUp, BookOpen, Phone, MessageCircle, Calendar
} from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import AIChatbot from '../components/AIChatbot'
import toast from 'react-hot-toast'

const MOCK_PATIENTS = [
  { name: 'Ananya S.', mood: '🙂', trend: 'improving', lastSeen: '2 hrs ago', concern: 'Anxiety' },
  { name: 'Rahul K.', mood: '😔', trend: 'declining', lastSeen: '1 day ago', concern: 'Depression' },
  { name: 'Priya M.', mood: '😊', trend: 'stable', lastSeen: '5 hrs ago', concern: 'Stress' },
  { name: 'Dev P.', mood: '😐', trend: 'stable', lastSeen: '3 hrs ago', concern: 'Loneliness' },
]

const STATS = [
  { icon: Users, value: '12', label: 'Active Patients', color: '#0d9488' },
  { icon: FileText, value: '8', label: 'Articles Published', color: '#3b82f6' },
  { icon: Award, value: '96%', label: 'Accuracy Score', color: '#f59e0b' },
  { icon: TrendingUp, value: '1.2K', label: 'Readers Helped', color: '#10b981' },
]

const APPOINTMENTS = [
  { time: '10:00 AM', patient: 'Ananya S.', type: 'Follow-up', status: 'upcoming' },
  { time: '11:30 AM', patient: 'Rahul K.', type: 'Initial Consult', status: 'upcoming' },
  { time: '2:00 PM', patient: 'Priya M.', type: 'Review', status: 'completed' },
]

export default function DoctorDashboard() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const now = new Date()
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="dd-page">
      <div className="dd-container">
        {/* Header */}
        <header className="dd-header">
          <div className="dd-header-left">
            <div className="dd-avatar">👨‍⚕️</div>
            <div>
              <h1 className="dd-greeting">{greeting}, Dr. {user?.name || 'Doctor'}</h1>
              <div className="dd-badge">
                <Shield size={12} /> Verified Professional
              </div>
            </div>
          </div>
          <div className="dd-header-actions">
            <button onClick={() => { logout(); toast.success('Signed out'); navigate('/home'); }} className="dd-signout">
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="dd-stats">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="dd-stat"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <div className="dd-stat-icon" style={{ background: stat.color + '15' }}>
                <stat.icon size={18} style={{ color: stat.color }} />
              </div>
              <div className="dd-stat-value">{stat.value}</div>
              <div className="dd-stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="dd-grid">
          {/* Left: Patients */}
          <div className="dd-col">
            <div className="dd-card">
              <div className="dd-card-head">
                <h2><Users size={16} /> My Patients</h2>
                <span className="dd-card-count">{MOCK_PATIENTS.length}</span>
              </div>
              <div className="dd-patient-list">
                {MOCK_PATIENTS.map((p, i) => (
                  <motion.div
                    key={i}
                    className="dd-patient-row"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                  >
                    <div className="dd-patient-info">
                      <span className="dd-patient-mood">{p.mood}</span>
                      <div>
                        <h4>{p.name}</h4>
                        <span className="dd-patient-concern">{p.concern}</span>
                      </div>
                    </div>
                    <div className="dd-patient-meta">
                      <span className={`dd-trend dd-trend-${p.trend}`}>
                        {p.trend === 'improving' ? '↑' : p.trend === 'declining' ? '↓' : '→'} {p.trend}
                      </span>
                      <span className="dd-last-seen">{p.lastSeen}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Appointments */}
            <div className="dd-card">
              <div className="dd-card-head">
                <h2><Calendar size={16} /> Today's Schedule</h2>
              </div>
              <div className="dd-appt-list">
                {APPOINTMENTS.map((a, i) => (
                  <div key={i} className={`dd-appt ${a.status}`}>
                    <span className="dd-appt-time">{a.time}</span>
                    <div>
                      <h4>{a.patient}</h4>
                      <span>{a.type}</span>
                    </div>
                    <span className={`dd-appt-status ${a.status}`}>
                      {a.status === 'upcoming' ? '🟢' : '✅'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="dd-col">
            <div className="dd-card">
              <h2 className="dd-card-title">Quick Actions</h2>
              <div className="dd-actions">
                {[
                  { icon: PenTool, label: 'Write Article', desc: 'Publish mental health content', path: '/contribute', color: '#0d9488' },
                  { icon: UserCheck, label: 'Get Verified', desc: 'Verify your credentials', path: '/verify-doctor', color: '#3b82f6' },
                  { icon: BookOpen, label: 'Knowledge Base', desc: 'Browse articles', path: '/articles', color: '#8b5cf6' },
                  { icon: BarChart2, label: 'Health Heatmap', desc: 'Community trends', path: '/dashboard', color: '#f59e0b' },
                  { icon: MessageCircle, label: 'Support Groups', desc: 'Moderate discussions', path: '/groups', color: '#10b981' },
                ].map((action, i) => (
                  <Link key={i} to={action.path} className="dd-action-item">
                    <div className="dd-action-icon" style={{ background: action.color + '15' }}>
                      <action.icon size={18} style={{ color: action.color }} />
                    </div>
                    <div className="dd-action-text">
                      <h4>{action.label}</h4>
                      <p>{action.desc}</p>
                    </div>
                    <ChevronRight size={16} className="dd-action-arrow" />
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="dd-card dd-ai-card">
              <h2><Activity size={16} /> AI Insights</h2>
              <div className="dd-ai-insights">
                <div className="dd-insight">
                  <span className="dd-insight-emoji">⚠️</span>
                  <p><strong>Rahul K.</strong> shows declining mood trend. Consider reaching out.</p>
                </div>
                <div className="dd-insight">
                  <span className="dd-insight-emoji">📈</span>
                  <p><strong>Ananya S.</strong> has been consistently improving over 2 weeks.</p>
                </div>
                <div className="dd-insight">
                  <span className="dd-insight-emoji">📝</span>
                  <p>Your article on anxiety management reached <strong>340 readers</strong> this week.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Helpline */}
        <div className="dd-helpline">
          <Phone size={14} />
          <span>Patient emergency? Call <a href="tel:9152987821">iCall: 9152987821</a></span>
        </div>
      </div>

      <AIChatbot />
    </div>
  )
}
