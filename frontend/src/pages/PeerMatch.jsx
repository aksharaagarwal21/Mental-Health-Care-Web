import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Search, Globe, Heart, MessageCircle, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const SITUATIONS = [
  'JEE/NEET exam pressure', 'Family expectations', 'Relationship breakup',
  'Job loss/career anxiety', 'Grief and loss', 'Hostel loneliness',
  'Workplace stress', 'Social anxiety', 'Rural isolation',
  "Parent's illness", 'Financial stress', 'Identity/sexuality',
]

const MOCK_MATCHES = [
  { id: 1, alias: 'Anonymous Sunflower', similarity: 94, situation: 'JEE exam pressure', city: 'Kota', experience: '2 years ago', badge: null },
  { id: 2, alias: 'Anonymous River', similarity: 88, situation: 'Family expectations', city: 'Chennai', experience: '1 year ago', badge: 'peer_mentor' },
  { id: 3, alias: 'Anonymous Mountain', similarity: 82, situation: 'Hostel loneliness', city: 'Delhi', experience: '6 months ago', badge: null },
]

export default function PeerMatch() {
  const [step, setStep] = useState('select') // select | searching | results
  const [selected, setSelected] = useState([])
  const [matches, setMatches] = useState([])

  const toggle = (s) => setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const findMatches = async () => {
    if (selected.length === 0) return toast.error('Select at least one situation')
    setStep('searching')
    await new Promise(r => setTimeout(r, 2000)) // simulate AI matching
    setMatches(MOCK_MATCHES)
    setStep('results')
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
            <Users size={18} className="text-blue-400" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white">AI Peer Matching</h1>
        </div>
        <p className="text-slate-400 mb-8 ml-13">Find someone globally who went through the same exact experience — matched by AI similarity, not random assignment.</p>

        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs text-blue-400">
          <Globe size={10} /> Fully anonymous · No real names shared
        </div>

        <AnimatePresence mode="wait">
          {step === 'select' && (
            <motion.div key="select" exit={{ opacity: 0 }}>
              <div className="glass p-6 mb-6">
                <h2 className="font-semibold text-white mb-4">What are you going through? <span className="text-slate-500 font-normal text-sm">(select all that apply)</span></h2>
                <div className="flex flex-wrap gap-2">
                  {SITUATIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => toggle(s)}
                      className={`px-3 py-2 rounded-xl text-sm transition-all border ${
                        selected.includes(s)
                          ? 'border-blue-500/50 bg-blue-600/20 text-blue-300'
                          : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={findMatches} className="btn-glow w-full py-4 flex items-center justify-center gap-2">
                <Search size={16} /> Find My Match with AI
              </button>
            </motion.div>
          )}

          {step === 'searching' && (
            <motion.div key="searching" className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-purple-600/30" />
                <div className="absolute inset-2 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                <Users size={24} className="absolute inset-0 m-auto text-purple-400" />
              </div>
              <h2 className="font-semibold text-white mb-2">AI is searching across the network...</h2>
              <p className="text-slate-500 text-sm">Matching by experience type, cultural context, and emotional similarity</p>
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="font-semibold text-white mb-4">Your Matches</h2>
              <div className="space-y-4">
                {matches.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="glass p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/40 to-purple-600/40 flex items-center justify-center font-bold text-white">
                          {m.alias[10]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{m.alias}</span>
                            {m.badge === 'peer_mentor' && (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-amber-600/20 text-amber-400 border border-amber-500/20">
                                <CheckCircle size={9} /> Peer Mentor
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-500">{m.city} · Went through this {m.experience}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-400">{m.similarity}%</div>
                        <div className="text-xs text-slate-500">match</div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2 py-1 rounded-lg text-xs bg-blue-600/10 text-blue-400 border border-blue-500/20">{m.situation}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => toast.success('Request sent! They will reach out anonymously.')}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-600/20 text-blue-300 border border-blue-500/20 hover:bg-blue-600/30 transition-all text-sm font-medium"
                      >
                        <Heart size={14} /> Connect
                      </button>
                      <button
                        onClick={() => toast.success('Message sent anonymously!')}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-all text-sm"
                      >
                        <MessageCircle size={14} /> Message
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button onClick={() => setStep('select')} className="mt-6 w-full py-3 rounded-xl border border-slate-700 text-slate-400 hover:text-white text-sm transition-all">
                Search again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
