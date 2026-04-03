import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X, Heart } from 'lucide-react'

const HELPLINES = [
  { name: 'iCall (TISS)', number: '9152987821', hours: 'Mon–Sat, 8am–10pm' },
  { name: 'Vandrevala Foundation', number: '1860-2662-345', hours: '24/7' },
  { name: 'NIMHANS Helpline', number: '080-46110007', hours: '24/7' },
  { name: 'Snehi', number: '044-24640050', hours: 'Mon–Sat, 8am–10pm' },
]

export default function CrisisBanner({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-[100] p-4"
        style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="crisis-banner">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="relative mt-1">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center pulse-ring">
                    <Heart size={14} className="text-rose-400" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-rose-300 mb-1">You're not alone. Help is available right now.</p>
                  <p className="text-sm text-slate-400 mb-3">If you're in crisis, please reach out to one of these free helplines:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {HELPLINES.map((h) => (
                      <a
                        key={h.name}
                        href={`tel:${h.number}`}
                        className="flex flex-col p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all group"
                      >
                        <span className="text-xs text-rose-400 font-medium group-hover:text-rose-300">{h.name}</span>
                        <span className="text-sm font-bold text-white flex items-center gap-1 mt-1">
                          <Phone size={10} /> {h.number}
                        </span>
                        <span className="text-xs text-slate-500 mt-0.5">{h.hours}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="text-slate-500 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
