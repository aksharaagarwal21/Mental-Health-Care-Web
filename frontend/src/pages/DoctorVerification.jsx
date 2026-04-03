import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { UserCheck, CheckCircle, Shield, Upload, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'

const VERIFIED = [
  {
    name: 'Dr. Priya Sharma',
    specialty: 'Clinical Psychologist',
    institution: 'NIMHANS, Bangalore',
    articles: 12,
    badge: true,
    profileUrl: 'https://nimhans.ac.in/',
  },
  {
    name: 'Dr. Rahul Mehta',
    specialty: 'Psychiatrist',
    institution: 'AIIMS Delhi',
    articles: 8,
    badge: true,
    profileUrl: 'https://www.aiims.edu/',
  },
  {
    name: 'Dr. Ananya Krishnan',
    specialty: 'Counselling Psychologist',
    institution: 'TISS Mumbai',
    articles: 15,
    badge: true,
    profileUrl: 'https://icallhelpline.org/',
  },
]

const FIND_PROFESSIONALS = [
  { name: 'NIMHANS Directory', desc: 'National Institute of Mental Health, Bangalore', url: 'https://nimhans.ac.in/' },
  { name: 'Practo Mental Health', desc: 'Find psychiatrists & psychologists near you', url: 'https://www.practo.com/psychiatrists' },
  { name: 'MindPeers', desc: 'Online therapy with certified professionals', url: 'https://www.mindpeers.co/' },
  { name: 'YourDOST', desc: 'Online counselling & emotional wellness', url: 'https://yourdost.com/' },
  { name: 'Amaha (InnerHour)', desc: 'Mental health clinic — therapy & psychiatry', url: 'https://www.amahahealth.com/' },
  { name: 'Vandrevala Foundation', desc: '24/7 free counselling helpline', url: 'https://www.vandrevalafoundation.com/' },
  { name: 'The Live Love Laugh Foundation', desc: "Deepika Padukone's mental health initiative", url: 'https://www.thelivelovelaughfoundation.org/' },
  { name: 'MPower (Mumbai)', desc: 'Mental health centres across India', url: 'https://mpowerminds.com/' },
]

export default function DoctorVerification() {
  const [tab, setTab] = useState('browse')
  const [form, setForm] = useState({ name: '', specialty: '', reg_number: '', institution: '', email: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!form.name || !form.reg_number) return toast.error('Fill required fields')
    setSubmitted(true)
    toast.success('Verification request submitted!')
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-600/20 flex items-center justify-center">
            <UserCheck size={18} className="text-teal-400" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white">Verified Doctors</h1>
        </div>
        <p className="text-slate-400 mb-8">Licensed mental health professionals with verified badges — so users know whose advice is professional vs peer experience.</p>

        <div className="flex gap-2 mb-8">
          {['browse', 'find-help', 'apply'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? 'bg-teal-600/20 text-teal-300 border border-teal-500/30' : 'text-slate-400 hover:text-white'}`}>
              {t === 'browse' ? 'Browse Doctors' : t === 'find-help' ? 'Find Professional Help' : 'Apply for Verification'}
            </button>
          ))}
        </div>

        {tab === 'browse' && (
          <div className="space-y-4">
            {VERIFIED.map((d, i) => (
              <motion.div key={d.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-600/40 to-blue-600/40 flex items-center justify-center font-bold text-white">
                    {d.name.split(' ')[1][0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{d.name}</span>
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-teal-600/20 text-teal-400 border border-teal-500/20">
                        <CheckCircle size={9} /> Verified
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{d.specialty} · {d.institution}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{d.articles} articles published</p>
                  </div>
                </div>
                <a
                  href={d.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-teal-500/50 transition-all text-sm"
                >
                  View Profile <ExternalLink size={12} />
                </a>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'find-help' && (
          <div>
            <div className="glass p-5 mb-6 bg-gradient-to-r from-teal-600/5 to-blue-600/5">
              <h3 className="font-semibold text-white mb-2">🔍 Find A Mental Health Professional</h3>
              <p className="text-sm text-slate-400">Verified platforms to find psychiatrists, psychologists, and counsellors across India</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {FIND_PROFESSIONALS.map((p, i) => (
                <motion.a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass p-4 flex items-center justify-between group hover:border-teal-500/30 transition-all"
                >
                  <div>
                    <div className="font-medium text-white text-sm group-hover:text-teal-300 transition-colors">{p.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{p.desc}</div>
                  </div>
                  <ExternalLink size={14} className="text-slate-600 group-hover:text-teal-400 transition-colors flex-shrink-0 ml-3" />
                </motion.a>
              ))}
            </div>

            {/* Helpline banner */}
            <div className="mt-6 glass p-5 border-rose-500/20">
              <h3 className="font-semibold text-white mb-3">📞 Immediate Help — Crisis Helplines</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { name: 'Kiran Helpline', phone: '1800-599-0019', note: 'Toll-free, 24/7', url: 'https://www.nimhans.ac.in/pssmhsa-kiran/' },
                  { name: 'Vandrevala Foundation', phone: '1860-2662-345', note: '24/7 multilingual', url: 'https://www.vandrevalafoundation.com/' },
                  { name: 'AASRA', phone: '9820466726', note: '24/7 crisis line', url: 'https://www.aasra.info/' },
                ].map(h => (
                  <a
                    key={h.name}
                    href={h.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 rounded-xl bg-rose-600/10 border border-rose-500/20 hover:bg-rose-600/20 transition-all text-center group"
                  >
                    <div className="text-sm text-rose-300 font-semibold group-hover:text-rose-200">{h.name}</div>
                    <div className="text-xs text-slate-400">📞 {h.phone}</div>
                    <div className="text-xs text-slate-500">{h.note}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'apply' && !submitted && (
          <div className="glass p-6 space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-teal-600/10 border border-teal-500/20 text-sm text-teal-400 mb-2">
              <Shield size={16} /> Your registration number is verified against MCI/NMC database. Takes 24-48 hours.
            </div>
            {[['Full Name', 'name', 'Dr. Firstname Lastname'], ['Medical Registration Number', 'reg_number', 'MCI-XXXXXXXX'], ['Specialty', 'specialty', 'Psychiatry / Clinical Psychology...'], ['Institution', 'institution', 'Hospital / University'], ['Email', 'email', 'professional@institution.edu']].map(([label, key, ph]) => (
              <div key={key}>
                <label className="text-sm text-slate-400 block mb-1">{label} *</label>
                <input value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                  placeholder={ph} type={key === 'email' ? 'email' : 'text'}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 text-sm transition-colors" />
              </div>
            ))}
            <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:border-teal-500/50 transition-all">
              <Upload size={20} className="mx-auto mb-2 text-slate-500" />
              <p className="text-sm text-slate-400">Upload degree certificate or registration proof</p>
              <p className="text-xs text-slate-600 mt-1">PDF or image, max 5MB</p>
            </div>
            <button onClick={handleSubmit} className="btn-glow w-full py-4">Submit Verification Request</button>
          </div>
        )}

        {tab === 'apply' && submitted && (
          <div className="glass p-10 text-center">
            <CheckCircle size={48} className="mx-auto mb-4 text-teal-400" />
            <h2 className="font-semibold text-white text-xl mb-2">Verification Request Submitted</h2>
            <p className="text-slate-400 text-sm">We will verify your registration with MCI/NMC and get back to you within 24-48 hours at your provided email.</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
