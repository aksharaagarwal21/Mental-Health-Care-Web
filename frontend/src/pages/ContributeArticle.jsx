import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PenTool, CheckCircle, Send, Shield, Mic } from 'lucide-react'
import toast from 'react-hot-toast'

const CATEGORIES = ['Anxiety', 'Depression', 'Exam Stress', 'Family Pressure', 'Grief', 'Addiction', 'Rural Isolation', 'Workplace', 'Relationships', 'Other']
const TYPES = [
  { value: 'peer', label: 'My Personal Experience', desc: 'Anonymous story from your own life' },
  { value: 'caregiver', label: 'Caregiver Perspective', desc: 'Experience supporting someone else' },
  { value: 'doctor', label: 'Professional Advice', desc: 'Requires doctor verification badge' },
]

export default function ContributeArticle() {
  const [form, setForm] = useState({ title: '', category: '', type: 'peer', content: '', language: 'English' })
  const [submitted, setSubmitted] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) return toast.error('Voice not supported')
    const r = new window.webkitSpeechRecognition()
    r.lang = form.language === 'हिन्दी' ? 'hi-IN' : 'en-IN'
    r.continuous = true
    r.onstart = () => setIsListening(true)
    r.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join(' ')
      update('content', transcript)
    }
    r.onend = () => setIsListening(false)
    r.start()
  }

  const handleSubmit = async () => {
    if (!form.title || !form.content || !form.category) return toast.error('Please fill in all required fields')
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    toast.success('Submitted for AI review!')
  }

  if (submitted) return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <div className="w-20 h-20 rounded-full bg-teal-600/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-teal-400" />
        </div>
        <h2 className="font-display text-3xl font-bold text-white mb-4">Thank you for contributing!</h2>
        <p className="text-slate-400 mb-4">Your article has been submitted for AI moderation. It will be reviewed for accuracy, safety, and bias before going live.</p>
        <div className="glass p-4 text-left space-y-2 text-sm text-slate-400 mb-8">
          <p>✅ AI bias check — usually 2-4 hours</p>
          <p>✅ Safety review — harmful content filtered automatically</p>
          <p>✅ If doctor-authored, verification badge applied</p>
          <p>✅ Published anonymously — your name is never shown</p>
        </div>
        <button onClick={() => setSubmitted(false)} className="btn-glow px-8 py-3">Contribute Another</button>
      </motion.div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
            <PenTool size={18} className="text-purple-400" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white">Contribute Article</h1>
        </div>
        <p className="text-slate-400 mb-8">Share your experience or knowledge. Everything is anonymous and AI-verified before publishing.</p>

        <div className="space-y-5">
          {/* Contribution type */}
          <div className="glass p-5">
            <label className="text-sm text-slate-400 block mb-3">I am contributing as *</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {TYPES.map(t => (
                <button key={t.value} onClick={() => update('type', t.value)}
                  className={`p-3 rounded-xl border text-left transition-all ${form.type === t.value ? 'border-purple-500/50 bg-purple-600/10' : 'border-slate-700 hover:border-slate-600'}`}>
                  <div className="font-medium text-white text-sm">{t.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="glass p-5">
            <label className="text-sm text-slate-400 block mb-2">Article Title *</label>
            <input value={form.title} onChange={e => update('title', e.target.value)}
              placeholder="e.g. How I managed anxiety during board exams"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-colors" />
          </div>

          {/* Category + Language */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-5">
              <label className="text-sm text-slate-400 block mb-2">Category *</label>
              <select value={form.category} onChange={e => update('category', e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm">
                <option value="">Select...</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="glass p-5">
              <label className="text-sm text-slate-400 block mb-2">Language</label>
              <select value={form.language} onChange={e => update('language', e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 text-sm">
                {['English','हिन्दी','தமிழ்','తెలుగు','বাংলা','ಕನ್ನಡ'].map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="glass p-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-slate-400">Your Story / Article *</label>
              <button onClick={handleVoice}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs transition-all ${isListening ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'border border-slate-700 text-slate-400 hover:text-white'}`}>
                <Mic size={12} /> {isListening ? 'Listening...' : 'Voice Input'}
              </button>
            </div>
            <textarea value={form.content} onChange={e => update('content', e.target.value)}
              placeholder="Write your experience, tips, or advice here. Be as detailed as you feel comfortable sharing. Everything will be published anonymously."
              rows={10}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm resize-none transition-colors" />
            <p className="text-xs text-slate-600 mt-2">{form.content.length} characters</p>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-teal-600/10 border border-teal-500/20 text-xs text-teal-400">
            <Shield size={14} />
            Your identity is never stored. AI will check for safety, bias, and accuracy before publishing.
          </div>

          <button onClick={handleSubmit} className="btn-glow w-full py-4 flex items-center justify-center gap-2 text-base">
            <Send size={18} /> Submit for Review
          </button>
        </div>
      </motion.div>
    </div>
  )
}
