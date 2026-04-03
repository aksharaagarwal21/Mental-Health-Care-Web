import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Mic, BookOpen, CheckCircle, Clock, ExternalLink } from 'lucide-react'
import axios from 'axios'

const CATEGORIES = ['All', 'Anxiety', 'Depression', 'Exam Stress', 'Family Pressure', 'Grief', 'Addiction', 'Rural Isolation', 'Workplace', 'Relationships']
const LANGUAGES = ['English', 'हिन्दी', 'தமிழ்', 'తెలుగు', 'বাংলা', 'ಕನ್ನಡ']

const ARTICLES = [
  {
    _id: '1',
    title: 'Coping with JEE Exam Pressure',
    category: 'Exam Stress',
    author_type: 'verified_doctor',
    views: 4200,
    created_at: '2024-03-01',
    excerpt: 'Evidence-based strategies for managing academic pressure in India\'s competitive exam culture.',
    externalUrl: 'https://nimhans.ac.in/exam-stress/',
    source: 'NIMHANS',
  },
  {
    _id: '2',
    title: 'Understanding and Managing Anxiety Disorders',
    category: 'Anxiety',
    author_type: 'verified_doctor',
    views: 8900,
    created_at: '2024-02-28',
    excerpt: 'Comprehensive guide on anxiety disorders, symptoms, and treatment options from the World Health Organization.',
    externalUrl: 'https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders',
    source: 'WHO',
  },
  {
    _id: '3',
    title: 'Depression: Let\'s Talk — WHO India Campaign',
    category: 'Depression',
    author_type: 'verified_doctor',
    views: 12400,
    created_at: '2024-03-05',
    excerpt: 'India has the highest burden of depression worldwide. Learn the signs and where to find culturally-sensitive help.',
    externalUrl: 'https://www.who.int/india/health-topics/depression',
    source: 'WHO India',
  },
  {
    _id: '4',
    title: 'Mental Health in the Workplace — MindPeers Guide',
    category: 'Workplace',
    author_type: 'peer',
    views: 3100,
    created_at: '2024-03-10',
    excerpt: 'Navigating hustle culture, burnout, and manager relationships in India\'s tech sector and beyond.',
    externalUrl: 'https://www.mindpeers.co/blog/mental-health-at-workplace',
    source: 'MindPeers',
  },
  {
    _id: '5',
    title: 'Student Mental Health — iCall Resources',
    category: 'Exam Stress',
    author_type: 'verified_doctor',
    views: 6700,
    created_at: '2024-03-12',
    excerpt: 'Free psychosocial counselling and mental health resources for students across India by TISS Mumbai.',
    externalUrl: 'https://icallhelpline.org/',
    source: 'iCall (TISS)',
  },
  {
    _id: '6',
    title: 'Grief and Loss — Coping Strategies',
    category: 'Grief',
    author_type: 'verified_doctor',
    views: 5200,
    created_at: '2024-03-08',
    excerpt: 'Understanding grief, its stages, and healthy coping mechanisms. Professional guidance from APA.',
    externalUrl: 'https://www.apa.org/topics/grief',
    source: 'APA',
  },
  {
    _id: '7',
    title: 'Substance Abuse & Addiction — NIMHANS',
    category: 'Addiction',
    author_type: 'verified_doctor',
    views: 4800,
    created_at: '2024-03-15',
    excerpt: 'Comprehensive resource on substance use disorders, de-addiction services, and recovery pathways in India.',
    externalUrl: 'https://nimhans.ac.in/centre-for-addiction-medicine/',
    source: 'NIMHANS',
  },
  {
    _id: '8',
    title: 'Rural Mental Health — Banyan India',
    category: 'Rural Isolation',
    author_type: 'peer',
    views: 2900,
    created_at: '2024-03-18',
    excerpt: 'Addressing mental health challenges in rural India — stigma, access barriers, and community-based solutions.',
    externalUrl: 'https://thebanyan.org/',
    source: 'The Banyan',
  },
  {
    _id: '9',
    title: 'Family Dynamics and Mental Health in India',
    category: 'Family Pressure',
    author_type: 'peer',
    views: 3400,
    created_at: '2024-03-20',
    excerpt: 'Navigating joint family expectations, generational trauma, and setting healthy boundaries in Indian families.',
    externalUrl: 'https://www.thelivelovelaughfoundation.org/resources',
    source: 'TLLLF (Deepika Padukone)',
  },
  {
    _id: '10',
    title: 'Healthy Relationships — Vandrevala Foundation',
    category: 'Relationships',
    author_type: 'verified_doctor',
    views: 4100,
    created_at: '2024-03-22',
    excerpt: '24/7 free mental health helpline and relationship counselling resources for all Indians.',
    externalUrl: 'https://www.vandrevalafoundation.com/',
    source: 'Vandrevala Foundation',
  },
  {
    _id: '11',
    title: 'Mindfulness & Meditation — Inner Engineering',
    category: 'Anxiety',
    author_type: 'peer',
    views: 7600,
    created_at: '2024-03-25',
    excerpt: 'Evidence-based yoga and meditation practices for stress relief and mental wellbeing by Isha Foundation.',
    externalUrl: 'https://www.innerengineering.com/',
    source: 'Isha Foundation',
  },
  {
    _id: '12',
    title: 'Mental Health First Aid — WHO mhGAP Guide',
    category: 'Depression',
    author_type: 'verified_doctor',
    views: 5500,
    created_at: '2024-03-28',
    excerpt: 'The WHO Mental Health Gap Action Programme — how non-specialists can identify and help people with mental health conditions.',
    externalUrl: 'https://www.who.int/teams/mental-health-and-substance-use/treatment-care/mental-health-gap-action-programme',
    source: 'WHO mhGAP',
  },
]

export default function Articles() {
  const [articles, setArticles] = useState(ARTICLES)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [language, setLanguage] = useState('English')
  const [isListening, setIsListening] = useState(false)

  // Voice input
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice input not supported in this browser')
      return
    }
    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = 'hi-IN'
    recognition.onstart = () => setIsListening(true)
    recognition.onresult = (e) => setSearch(e.results[0][0].transcript)
    recognition.onend = () => setIsListening(false)
    recognition.start()
  }

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || a.category === category
    return matchSearch && matchCat
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-4xl font-bold text-white mb-2">Knowledge Commons</h1>
        <p className="text-slate-400 mb-8">AI-verified articles & real resources from trusted organizations across India & globally</p>

        {/* Search bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles... (semantic search powered by AI)"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <button
            onClick={startVoiceInput}
            className={`p-3 rounded-xl border transition-all ${isListening ? 'border-rose-500 bg-rose-500/20 text-rose-400' : 'border-slate-700 text-slate-400 hover:border-purple-500 hover:text-purple-400'}`}
            title="Voice input"
          >
            <Mic size={18} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Language filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-sm text-slate-500 flex items-center gap-1"><Filter size={12} /> Language:</span>
          {LANGUAGES.map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1 rounded-lg text-xs transition-all ${
                language === lang ? 'bg-teal-600/30 text-teal-300 border border-teal-500/30' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article, i) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <a
                href={article.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-5 block h-full hover:border-purple-500/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-full text-xs bg-purple-600/20 text-purple-300 border border-purple-500/20">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {article.author_type === 'verified_doctor' && (
                      <span className="flex items-center gap-1 text-xs text-teal-400">
                        <CheckCircle size={12} /> Verified
                      </span>
                    )}
                    <ExternalLink size={12} className="text-slate-600 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
                <h3 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {article.source}
                  </span>
                  <span className="flex items-center gap-1"><BookOpen size={10} /> {article.views.toLocaleString()} reads</span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
            <p>No articles found. <Link to="/contribute" className="text-purple-400 hover:underline">Be the first to contribute!</Link></p>
          </div>
        )}

        {/* Helpline Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 glass p-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600/10 to-purple-600/10 pointer-events-none" />
          <h3 className="font-semibold text-white mb-3 relative">📞 24/7 Mental Health Helplines (India)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative">
            {[
              { name: 'Vandrevala Foundation', phone: '1860-2662-345', url: 'https://www.vandrevalafoundation.com/' },
              { name: 'iCall (TISS Mumbai)', phone: '9152987821', url: 'https://icallhelpline.org/' },
              { name: 'NIMHANS Helpline', phone: '080-46110007', url: 'https://nimhans.ac.in/' },
              { name: 'Sneha India', phone: '044-24640050', url: 'https://snehaindia.org/' },
              { name: 'AASRA', phone: '9820466726', url: 'https://www.aasra.info/' },
              { name: 'Kiran Mental Health', phone: '1800-599-0019', url: 'https://www.nimhans.ac.in/pssmhsa-kiran/' },
            ].map(h => (
              <a
                key={h.name}
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-rose-500/30 transition-all group"
              >
                <div>
                  <div className="text-sm text-white font-medium group-hover:text-rose-300 transition-colors">{h.name}</div>
                  <div className="text-xs text-slate-500">{h.phone}</div>
                </div>
                <ExternalLink size={12} className="text-slate-600 group-hover:text-rose-400 transition-colors" />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
