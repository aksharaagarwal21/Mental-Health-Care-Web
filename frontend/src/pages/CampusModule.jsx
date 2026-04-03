import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, Home, Heart, Briefcase, Users, ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

const TOPICS = [
  {
    icon: BookOpen, title: 'Exam Anxiety', color: '#9333ea', articles: 24,
    desc: 'JEE, NEET, Board exams — evidence-based strategies from students who made it through',
    links: [
      { title: 'NIMHANS: Exam Stress Management', url: 'https://nimhans.ac.in/exam-stress/' },
      { title: 'iCall Student Helpline', url: 'https://icallhelpline.org/' },
    ],
  },
  {
    icon: Home, title: 'Hostel Loneliness', color: '#2dd4bf', articles: 18,
    desc: 'First time away from home? You are not alone. Real stories from students at IITs, NITs, SRM.',
    links: [
      { title: 'YourDOST Student Counselling', url: 'https://yourdost.com/' },
      { title: 'WHO: Adolescent Mental Health', url: 'https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health' },
    ],
  },
  {
    icon: Heart, title: 'Parental Pressure', color: '#fb7185', articles: 15,
    desc: 'Navigating expectations, disappointment, and love — at the same time',
    links: [
      { title: 'TLLLF: Family & Mental Health', url: 'https://www.thelivelovelaughfoundation.org/resources' },
      { title: 'MindPeers: Family Dynamics', url: 'https://www.mindpeers.co/blog' },
    ],
  },
  {
    icon: Briefcase, title: 'Placement Anxiety', color: '#fbbf24', articles: 12,
    desc: 'Handling rejection, comparing yourself to peers, finding your path',
    links: [
      { title: 'APA: Dealing with Rejection', url: 'https://www.apa.org/topics/resilience' },
      { title: 'LinkedIn: Career Anxiety Guide', url: 'https://www.linkedin.com/pulse/how-deal-career-anxiety/' },
    ],
  },
  {
    icon: Users, title: 'Peer Relationships', color: '#60a5fa', articles: 9,
    desc: 'Ragging, social anxiety, making friends in a new city',
    links: [
      { title: 'UGC Anti-Ragging Helpline', url: 'https://www.antiragging.in/', phone: '1800-180-5522' },
      { title: 'Mind.org: Social Anxiety', url: 'https://www.mind.org.uk/information-support/types-of-mental-health-problems/social-anxiety/' },
    ],
  },
  {
    icon: GraduationCap, title: 'Academic Pressure', color: '#a3e635', articles: 21,
    desc: 'GPA anxiety, professor relationships, imposter syndrome',
    links: [
      { title: 'APA: Imposter Syndrome', url: 'https://www.apa.org/gradpsych/2013/11/fraud' },
      { title: 'Headspace: Student Mental Health', url: 'https://www.headspace.com/students' },
    ],
  },
]

const STORIES = [
  {
    alias: 'Anonymous from IIT Delhi',
    preview: 'I failed 3 subjects in my first semester. Here is how I recovered...',
    reads: 4200,
    resourceUrl: 'https://yourdost.com/blog/student-stories/',
    source: 'YourDOST',
  },
  {
    alias: 'Anonymous from SRM',
    preview: 'Hostel life felt like prison for 2 months. Then I found my people...',
    reads: 3100,
    resourceUrl: 'https://www.thelivelovelaughfoundation.org/blog',
    source: 'TLLLF Blog',
  },
  {
    alias: 'Anonymous from Kota',
    preview: 'I dropped a year for JEE and what I learned about mental health...',
    reads: 6800,
    resourceUrl: 'https://icallhelpline.org/',
    source: 'iCall',
  },
]

export default function CampusModule() {
  const [activeTab, setActiveTab] = useState('topics')
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-orange-600/20 flex items-center justify-center">
            <GraduationCap size={18} className="text-orange-400" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white">Campus Module</h1>
        </div>
        <p className="text-slate-400 mb-8">Built specifically for Indian students — because academic pressure here is unlike anywhere else.</p>

        <div className="flex gap-2 mb-8 border-b border-slate-800 pb-4">
          {['topics', 'stories', 'peer-rooms'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === tab ? 'bg-orange-600/20 text-orange-300 border border-orange-500/30' : 'text-slate-400 hover:text-white'}`}>
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {activeTab === 'topics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOPICS.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <div className="glass p-5 h-full flex flex-col" style={{ borderColor: t.color + '30' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: t.color + '20' }}>
                    <t.icon size={18} style={{ color: t.color }} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{t.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 flex-1">{t.desc}</p>
                  
                  {/* Real resource links */}
                  <div className="space-y-2 mb-3">
                    {t.links.map(link => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs group transition-all hover:translate-x-1"
                      >
                        <ExternalLink size={10} className="text-slate-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                        <span className="text-slate-400 group-hover:text-white transition-colors">{link.title}</span>
                      </a>
                    ))}
                  </div>
                  <Link to="/articles" className="text-xs font-medium hover:underline" style={{ color: t.color }}>
                    {t.articles} articles →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="space-y-4">
            {STORIES.map((s, i) => (
              <motion.a
                key={i}
                href={s.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-5 flex items-center justify-between group hover:border-purple-500/30 transition-all cursor-pointer block"
              >
                <div>
                  <span className="text-xs text-orange-400 mb-1 block">{s.alias}</span>
                  <p className="text-white text-sm">{s.preview}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500">{s.reads.toLocaleString()} reads</span>
                    <span className="text-xs text-slate-600 px-2 py-0.5 rounded-full bg-slate-800">{s.source}</span>
                  </div>
                </div>
                <ExternalLink size={16} className="text-slate-600 group-hover:text-orange-400 transition-colors flex-shrink-0 ml-4" />
              </motion.a>
            ))}
            <Link to="/contribute" className="btn-glow block text-center py-4 mt-4">Share Your Story</Link>

            {/* Student Helplines */}
            <div className="glass p-5 mt-4">
              <h3 className="font-semibold text-white mb-3">🎓 Student-Specific Helplines</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { name: 'iCall (TISS)', phone: '9152987821', url: 'https://icallhelpline.org/', desc: 'Free student counselling' },
                  { name: 'YourDOST', phone: 'Online chat', url: 'https://yourdost.com/', desc: 'Online counselling for students' },
                  { name: 'UGC Anti-Ragging', phone: '1800-180-5522', url: 'https://www.antiragging.in/', desc: 'Toll-free ragging helpline' },
                  { name: 'Kiran Helpline', phone: '1800-599-0019', url: 'https://www.nimhans.ac.in/pssmhsa-kiran/', desc: 'Toll-free mental health' },
                ].map(h => (
                  <a
                    key={h.name}
                    href={h.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-orange-500/30 transition-all group"
                  >
                    <div>
                      <div className="text-sm text-white font-medium group-hover:text-orange-300 transition-colors">{h.name}</div>
                      <div className="text-xs text-slate-500">📞 {h.phone} · {h.desc}</div>
                    </div>
                    <ExternalLink size={12} className="text-slate-600 group-hover:text-orange-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'peer-rooms' && (
          <div className="glass p-8 text-center">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="font-semibold text-white mb-2">Student Peer Rooms</h2>
            <p className="text-slate-400 text-sm mb-6">Anonymous group chats for students — exam stress, hostel life, placements</p>
            <Link to="/groups" className="btn-glow inline-block px-8 py-3">Open Support Rooms</Link>
          </div>
        )}
      </motion.div>
    </div>
  )
}
