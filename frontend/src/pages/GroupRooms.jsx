import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Users, Lock, Mic, Send, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCrisisDetection } from '../hooks/useCrisisDetection'

const ROOMS = [
  { id: 1, name: 'Exam Stress Support', members: 12, topic: 'Board exams, JEE, NEET, competitive exams', color: '#9333ea', icon: '📚' },
  { id: 2, name: 'Family Pressure Circle', members: 8, topic: 'Joint family, parental expectations, marriage pressure', color: '#fb7185', icon: '🏠' },
  { id: 3, name: 'Workplace Wellness', members: 15, topic: 'IT burnout, manager issues, career anxiety', color: '#2dd4bf', icon: '💼' },
  { id: 4, name: 'Grief & Loss', members: 6, topic: 'Bereavement, separation, loss of any kind', color: '#fbbf24', icon: '🕊️' },
  { id: 5, name: 'Rural Voices', members: 9, topic: 'Isolation, migration, rural mental health — Hindi/regional', color: '#a3e635', icon: '🌾' },
  { id: 6, name: 'LGBTQ+ Safe Space', members: 11, topic: 'Identity, acceptance, community — moderated & safe', color: '#60a5fa', icon: '🌈' },
]

const MOCK_MESSAGES = [
  { id: 1, alias: 'Anonymous Lotus', text: 'Has anyone dealt with parents comparing you to cousins? I can\'t take it anymore.', time: '2m ago' },
  { id: 2, alias: 'Anonymous River', text: 'Yes, exactly. I felt the same. What helped me was writing it down first before talking to them.', time: '1m ago' },
  { id: 3, alias: 'Anonymous Cloud', text: 'My therapist suggested the "grey rock" method. Works for me.', time: '45s ago' },
]

export default function GroupRooms() {
  const [activeRoom, setActiveRoom] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const { setCrisisText } = useCrisisDetection()

  const sendMessage = () => {
    if (!message.trim()) return
    if (setCrisisText(message)) {
      setMessage('')
      return
    }
    setMessages(prev => [...prev, { id: Date.now(), alias: 'Anonymous You', text: message, time: 'just now' }])
    setMessage('')
    toast.success('Message sent anonymously')
  }

  if (activeRoom) {
    const room = ROOMS.find(r => r.id === activeRoom)
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <button onClick={() => setActiveRoom(null)} className="text-slate-500 hover:text-white text-sm mb-6 flex items-center gap-2">
          ← Back to Rooms
        </button>
        <div className="glass flex flex-col" style={{ height: '70vh' }}>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{room.icon}</span>
              <div>
                <h2 className="font-semibold text-white">{room.name}</h2>
                <span className="text-xs text-slate-500 flex items-center gap-1"><Users size={10} /> {room.members} in room</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-teal-400">
              <Shield size={12} /> AI Moderated
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(m => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className={`flex gap-3 ${m.alias === 'Anonymous You' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: room.color + '30', color: room.color }}>
                    {m.alias[10]}
                  </div>
                  <div className={`max-w-xs ${m.alias === 'Anonymous You' ? 'items-end' : 'items-start'} flex flex-col`}>
                    <span className="text-xs text-slate-600 mb-1">{m.alias}</span>
                    <div className={`px-4 py-2 rounded-2xl text-sm ${m.alias === 'Anonymous You' ? 'bg-purple-600/30 text-purple-100 rounded-tr-sm' : 'bg-slate-800 text-slate-300 rounded-tl-sm'}`}>
                      {m.text}
                    </div>
                    <span className="text-xs text-slate-700 mt-1">{m.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-800 flex gap-2">
            <input
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Share anonymously..."
              className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
            />
            <button onClick={sendMessage} className="btn-glow p-2">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-4xl font-bold text-white mb-2">Support Group Rooms</h1>
        <p className="text-slate-400 mb-3">Small, private support circles — AI-moderated in real time to keep everyone safe.</p>
        <div className="flex gap-3 mb-8">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-600/10 border border-teal-500/20 text-xs text-teal-400">
            <Shield size={10} /> AI moderated
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs text-blue-400">
            <Lock size={10} /> Anonymous
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROOMS.map((room, i) => (
            <motion.button
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setActiveRoom(room.id)}
              className="glass p-5 text-left hover:scale-[1.02] transition-all group"
              style={{ borderColor: room.color + '30' }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{room.icon}</span>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Users size={10} /> {room.members}
                </span>
              </div>
              <h3 className="font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">{room.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{room.topic}</p>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium" style={{ color: room.color }}>
                <MessageCircle size={12} /> Join Room →
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
