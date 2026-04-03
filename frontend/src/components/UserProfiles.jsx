import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart, Stethoscope, HandHeart, Sparkles, TrendingUp,
  BookOpen, Users, Calendar, Brain, Shield, Star,
  Activity, FileText, MessageCircle, LogOut, Settings,
  ChevronRight, Award, Flame, Target, ArrowRight
} from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

/* ─── User Profile Dashboard (shown when logged in) ─── */
export function UserProfileDashboard() {
  const { user, logout } = useAuthStore()
  if (!user) return null

  const roleConfig = getRoleData(user.role)

  return (
    <section className="py-16 max-w-6xl mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Welcome banner */}
        <div className="glass p-6 mb-6 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ background: roleConfig.bgGradient }}
          />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                style={{ background: roleConfig.bgGradient }}
              >
                {user.avatar}
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-white">Welcome back, {user.name}!</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-semibold border"
                    style={{ color: roleConfig.color, borderColor: roleConfig.color + '40', background: roleConfig.color + '15' }}
                  >
                    {roleConfig.badge}
                  </span>
                  <span className="text-slate-500 text-sm">{user.email}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { logout(); toast.success('Signed out successfully') }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all text-sm"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {roleConfig.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="glass p-4 text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <stat.icon size={18} style={{ color: roleConfig.color }} />
              </div>
              <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {roleConfig.actions.map((action, i) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              onClick={() => toast.success(`Opening ${action.label}...`)}
              className="glass p-4 text-left hover:border-opacity-50 transition-all group"
              style={{ borderColor: roleConfig.color + '25' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: roleConfig.color + '20' }}
                >
                  <action.icon size={16} style={{ color: roleConfig.color }} />
                </div>
                <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
              </div>
              <h4 className="font-semibold text-white text-sm">{action.label}</h4>
              <p className="text-xs text-slate-500 mt-1">{action.desc}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

/* ─── Role Selection Cards (shown when not logged in) ─── */
export function RoleCards() {
  const { user, openAuth } = useAuthStore()
  if (user) return null

  const roles = [
    {
      key: 'patient',
      title: 'I Need Support',
      subtitle: 'Patient',
      icon: Heart,
      color: '#60a5fa',
      gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      features: ['Anonymous mood tracking', 'AI peer matching', 'Crisis detection & helplines', 'Multilingual articles'],
      cta: 'Get Started Free',
    },
    {
      key: 'doctor',
      title: 'I Provide Care',
      subtitle: 'Doctor / Therapist',
      icon: Stethoscope,
      color: '#2dd4bf',
      gradient: 'linear-gradient(135deg, #0d9488, #10b981)',
      features: ['Verified professional badge', 'Publish expert articles', 'Community insights dashboard', 'Consultation management'],
      cta: 'Get Verified',
    },
    {
      key: 'caregiver',
      title: 'I Support Someone',
      subtitle: 'Caregiver / Family',
      icon: HandHeart,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      features: ['Care diary & logging', 'Caregiver support groups', 'Self-care toolkit', 'Guided resources library'],
      cta: 'Join as Caregiver',
    },
  ]

  return (
    <section className="py-16 max-w-6xl mx-auto px-6" id="join-section">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-600/10 border border-purple-500/20 text-xs text-purple-400 mb-4">
          <Sparkles size={12} /> Choose your role
        </div>
        <h2 className="font-display text-4xl font-bold text-white mb-3">
          How will you use <span className="gradient-text">Bloodwing</span>?
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          Whether you're seeking help, providing care, or supporting a loved one — there's a space for you here
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {roles.map((role, i) => (
          <motion.div
            key={role.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="role-card group"
            style={{ '--role-color': role.color }}
          >
            {/* Card glow */}
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"
              style={{ background: role.gradient }}
            />

            <div className="glass p-6 h-full flex flex-col relative overflow-hidden">
              {/* Decorative circle */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-10 pointer-events-none"
                style={{ background: role.gradient }}
              />

              {/* Icon & title */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ background: role.gradient }}
                >
                  <role.icon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{role.title}</h3>
                  <span className="text-xs font-medium" style={{ color: role.color }}>{role.subtitle}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-1">
                {role.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center mt-0.5 flex-shrink-0"
                      style={{ background: role.color + '20' }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4.5 7.5L8 3" stroke={role.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => openAuth('register', role.key)}
                  className="role-cta-btn w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:shadow-lg"
                  style={{ background: role.gradient }}
                >
                  {role.cta} <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => openAuth('login', role.key)}
                  className="w-full py-2.5 rounded-xl text-sm font-medium border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all"
                >
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ─── Role config helper ─── */
function getRoleData(role) {
  const configs = {
    patient: {
      color: '#60a5fa',
      badge: '🧘 Patient',
      bgGradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      stats: [
        { icon: Activity, value: '7', label: 'Mood Entries' },
        { icon: Flame, value: '3', label: 'Day Streak' },
        { icon: BookOpen, value: '12', label: 'Articles Read' },
        { icon: Star, value: '45', label: 'Points' },
      ],
      actions: [
        { icon: Brain, label: 'Mood Check-in', desc: 'Log how you feel today' },
        { icon: Users, label: 'Find a Peer', desc: 'AI-matched support buddy' },
        { icon: BookOpen, label: 'Browse Articles', desc: 'Explore mental health knowledge' },
        { icon: MessageCircle, label: 'Group Chat', desc: 'Join a support room' },
      ],
    },
    doctor: {
      color: '#2dd4bf',
      badge: '✅ Verified Doctor',
      bgGradient: 'linear-gradient(135deg, #0d9488, #10b981)',
      stats: [
        { icon: FileText, value: '8', label: 'Articles Published' },
        { icon: Award, value: '1.2k', label: 'Readers Helped' },
        { icon: Target, value: '96%', label: 'Accuracy Score' },
        { icon: Star, value: '320', label: 'Points' },
      ],
      actions: [
        { icon: FileText, label: 'Write Article', desc: 'Publish expert content' },
        { icon: TrendingUp, label: 'Analytics', desc: 'See your article impact' },
        { icon: Shield, label: 'Verification', desc: 'Manage your credentials' },
        { icon: Calendar, label: 'Availability', desc: 'Set consultation hours' },
      ],
    },
    caregiver: {
      color: '#f59e0b',
      badge: '🤝 Caregiver',
      bgGradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      stats: [
        { icon: Calendar, value: '14', label: 'Care Entries' },
        { icon: Heart, value: '5', label: 'Self-care Days' },
        { icon: Users, value: '3', label: 'Support Groups' },
        { icon: Star, value: '85', label: 'Points' },
      ],
      actions: [
        { icon: FileText, label: 'Care Diary', desc: 'Log caregiving moments' },
        { icon: Users, label: 'Support Groups', desc: 'Connect with fellow caregivers' },
        { icon: Heart, label: 'Self-Care', desc: 'Track your own wellbeing' },
        { icon: BookOpen, label: 'Resources', desc: 'Guides & toolkits' },
      ],
    },
  }
  return configs[role] || configs.patient
}
