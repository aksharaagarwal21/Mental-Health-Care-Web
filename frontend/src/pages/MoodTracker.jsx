import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCrisisDetection } from '../hooks/useCrisisDetection'
import toast from 'react-hot-toast'
import { ArrowRight, Mic, ExternalLink } from 'lucide-react'

const MOODS = [
  { emoji: '😊', label: 'Great', value: 5, color: '#2dd4bf' },
  { emoji: '🙂', label: 'Good', value: 4, color: '#a3e635' },
  { emoji: '😐', label: 'Okay', value: 3, color: '#fbbf24' },
  { emoji: '😔', label: 'Low', value: 2, color: '#f97316' },
  { emoji: '😢', label: 'Struggling', value: 1, color: '#fb7185' },
]

const SUGGESTED_RESOURCES = {
  5: [
    { title: 'Maintaining Positive Mental Health — WHO', url: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response' },
    { title: 'Building Resilience — APA Guide', url: 'https://www.apa.org/topics/resilience' },
    { title: 'Share Your Story on Bloodwing', url: '/contribute', internal: true },
  ],
  4: [
    { title: 'Mindfulness Practices — Headspace', url: 'https://www.headspace.com/mindfulness' },
    { title: 'Sleep Hygiene Tips — Sleep Foundation', url: 'https://www.sleepfoundation.org/sleep-hygiene' },
    { title: 'Inner Engineering (Free Trial)', url: 'https://www.innerengineering.com/' },
  ],
  3: [
    { title: 'Grounding Techniques — Therapist Aid', url: 'https://www.therapistaid.com/therapy-worksheet/grounding-techniques' },
    { title: 'Breathing Exercises — NHS Guide', url: 'https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/' },
    { title: 'The Live Love Laugh Foundation', url: 'https://www.thelivelovelaughfoundation.org/' },
  ],
  2: [
    { title: 'When You Feel Low — Mind.org Guide', url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/depression/' },
    { title: 'iCall Free Counselling (TISS Mumbai)', url: 'https://icallhelpline.org/', phone: '9152987821' },
    { title: 'Vandrevala Foundation 24/7', url: 'https://www.vandrevalafoundation.com/', phone: '1860-2662-345' },
    { title: 'Find a Peer on Bloodwing', url: '/peer-match', internal: true },
  ],
  1: [
    { title: '🆘 Kiran Mental Health Helpline (Toll-Free)', url: 'https://www.nimhans.ac.in/pssmhsa-kiran/', phone: '1800-599-0019', urgent: true },
    { title: '🆘 AASRA 24/7 Crisis Line', url: 'https://www.aasra.info/', phone: '9820466726', urgent: true },
    { title: '🆘 Sneha Foundation (Chennai)', url: 'https://snehaindia.org/', phone: '044-24640050', urgent: true },
    { title: '🆘 Vandrevala Foundation 24/7', url: 'https://www.vandrevalafoundation.com/', phone: '1860-2662-345', urgent: true },
    { title: 'WHO: Help for Suicidal Thoughts', url: 'https://www.who.int/health-topics/suicide', urgent: true },
  ],
}

export default function MoodTracker() {
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const { setCrisisText } = useCrisisDetection()

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window)) return toast.error('Voice not supported')
    const r = new window.webkitSpeechRecognition()
    r.lang = 'hi-IN'
    r.onstart = () => setIsListening(true)
    r.onresult = e => {
      const text = e.results[0][0].transcript
      setNote(text)
      setCrisisText(text)
    }
    r.onend = () => setIsListening(false)
    r.start()
  }

  const handleSubmit = () => {
    if (!selected) return toast.error('Please select a mood first')
    if (note) setCrisisText(note)
    setSubmitted(true)
    toast.success('Mood logged anonymously ✓')
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl font-bold text-white mb-2">How are you feeling?</h1>
          <p className="text-slate-400">Anonymous. No login. No name. Just honest.</p>
          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-teal-600/10 border border-teal-500/20 text-xs text-teal-400">
            🔒 Your answer is never stored with your identity
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" exit={{ opacity: 0 }}>
              {/* Mood buttons */}
              <div className="flex justify-center gap-4 mb-8">
                {MOODS.map((m) => (
                  <motion.button
                    key={m.value}
                    onClick={() => setSelected(m)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                      selected?.value === m.value
                        ? 'border-opacity-100 bg-opacity-20'
                        : 'border-slate-700 hover:border-slate-500'
                    }`}
                    style={selected?.value === m.value ? { borderColor: m.color, background: m.color + '20' } : {}}
                  >
                    <span className="text-4xl">{m.emoji}</span>
                    <span className="text-xs text-slate-400 font-medium">{m.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Optional note */}
              <div className="glass p-5 mb-6">
                <label className="text-sm text-slate-400 block mb-2">Want to add a note? (optional)</label>
                <div className="flex gap-2">
                  <textarea
                    value={note}
                    onChange={e => { setNote(e.target.value); setCrisisText(e.target.value) }}
                    placeholder="What's on your mind today..."
                    rows={3}
                    className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm resize-none transition-colors"
                  />
                  <button
                    onClick={handleVoice}
                    className={`p-3 rounded-xl border transition-all self-start ${isListening ? 'border-rose-500 bg-rose-500/20 text-rose-400' : 'border-slate-700 text-slate-400 hover:border-purple-500'}`}
                  >
                    <Mic size={16} />
                  </button>
                </div>
              </div>

              <button onClick={handleSubmit} className="btn-glow w-full flex items-center justify-center gap-2 py-4">
                Log My Mood <ArrowRight size={16} />
              </button>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="glass p-8 text-center mb-6">
                <div className="text-6xl mb-4">{selected?.emoji}</div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  Feeling {selected?.label} — that's valid.
                </h2>
                <p className="text-slate-400 text-sm">
                  {selected?.value <= 2
                    ? "Here are real resources and helplines that can help you right now"
                    : "Here are resources that might be useful for you today"}
                </p>
              </div>

              <div className="space-y-3">
                {(SUGGESTED_RESOURCES[selected?.value] || []).map((resource, i) => (
                  <motion.div
                    key={resource.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {resource.internal ? (
                      <a
                        href={resource.url}
                        className={`glass p-4 flex items-center justify-between hover:border-purple-500/30 transition-all group block ${
                          resource.urgent ? 'border-rose-500/30 bg-rose-600/5' : ''
                        }`}
                      >
                        <div>
                          <span className="text-white text-sm group-hover:text-purple-300 transition-colors block">{resource.title}</span>
                        </div>
                        <ArrowRight size={14} className="text-slate-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                      </a>
                    ) : (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`glass p-4 flex items-center justify-between hover:border-purple-500/30 transition-all group block ${
                          resource.urgent ? 'border-rose-500/30 bg-rose-600/5' : ''
                        }`}
                      >
                        <div>
                          <span className={`text-sm block transition-colors ${resource.urgent ? 'text-rose-300 font-semibold group-hover:text-rose-200' : 'text-white group-hover:text-purple-300'}`}>
                            {resource.title}
                          </span>
                          {resource.phone && (
                            <span className="text-xs text-slate-500 mt-0.5 block">📞 {resource.phone}</span>
                          )}
                        </div>
                        <ExternalLink size={14} className={`flex-shrink-0 transition-colors ${resource.urgent ? 'text-rose-500 group-hover:text-rose-300' : 'text-slate-600 group-hover:text-purple-400'}`} />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => { setSubmitted(false); setSelected(null); setNote('') }}
                className="mt-6 w-full py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all text-sm"
              >
                Check in again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
