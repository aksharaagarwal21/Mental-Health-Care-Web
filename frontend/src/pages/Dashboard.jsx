import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart2, TrendingUp, MapPin, Users, AlertCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'

const STATE_DATA = [
  { state: 'Maharashtra', anxiety: 34, depression: 28, stress: 42 },
  { state: 'Karnataka', anxiety: 29, depression: 22, stress: 38 },
  { state: 'Tamil Nadu', anxiety: 31, depression: 25, stress: 35 },
  { state: 'Delhi', anxiety: 38, depression: 30, stress: 45 },
  { state: 'UP', anxiety: 22, depression: 18, stress: 30 },
  { state: 'West Bengal', anxiety: 27, depression: 21, stress: 33 },
]

const TREND_DATA = [
  { month: 'Oct', reports: 420 }, { month: 'Nov', reports: 580 },
  { month: 'Dec', reports: 720 }, { month: 'Jan', reports: 890 },
  { month: 'Feb', reports: 1040 }, { month: 'Mar', reports: 1280 },
]

const TRENDING = [
  { issue: 'Exam anxiety (JEE/NEET season)', change: '+34%', color: '#fb7185' },
  { issue: 'Workplace burnout (IT sector)', change: '+22%', color: '#fbbf24' },
  { issue: 'Seasonal depression (winter)', change: '-12%', color: '#2dd4bf' },
  { issue: 'Family pressure (marriage)', change: '+18%', color: '#9333ea' },
]

const customTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass px-3 py-2 text-xs">
        <p className="text-white font-medium mb-1">{label}</p>
        {payload.map(p => <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}%</p>)}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const [activeMetric, setActiveMetric] = useState('anxiety')
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 flex items-center justify-center">
            <BarChart2 size={18} className="text-emerald-400" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white">Community Health Dashboard</h1>
        </div>
        <p className="text-slate-400 mb-3">Anonymous public heatmap — useful for NGOs, researchers, and government policy makers.</p>
        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full bg-emerald-600/10 border border-emerald-500/20 text-xs text-emerald-400">
          🔒 All data is fully anonymized — no individual is identifiable
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Reports', value: '12,840', icon: Users, color: '#9333ea' },
            { label: 'Active This Month', value: '1,280', icon: TrendingUp, color: '#2dd4bf' },
            { label: 'States Covered', value: '28', icon: MapPin, color: '#fbbf24' },
            { label: 'Issues Tracked', value: '47', icon: AlertCircle, color: '#fb7185' },
          ].map((s) => (
            <div key={s.label} className="glass p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500">{s.label}</span>
                <s.icon size={14} style={{ color: s.color }} />
              </div>
              <div className="text-2xl font-bold text-white" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* State bar chart */}
          <div className="glass p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Reports by State</h3>
              <div className="flex gap-2">
                {['anxiety', 'depression', 'stress'].map(m => (
                  <button key={m} onClick={() => setActiveMetric(m)}
                    className={`px-2 py-1 rounded text-xs transition-all capitalize ${activeMetric === m ? 'bg-purple-600/30 text-purple-300' : 'text-slate-500 hover:text-white'}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={STATE_DATA} margin={{ left: -20 }}>
                <XAxis dataKey="state" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip content={customTooltip} />
                <Bar dataKey={activeMetric} fill="#9333ea" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Trend line */}
          <div className="glass p-5">
            <h3 className="font-semibold text-white mb-4">Platform Growth (Reports/Month)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={TREND_DATA} margin={{ left: -20 }}>
                <CartesianGrid stroke="#1e1e2e" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip content={customTooltip} />
                <Line type="monotone" dataKey="reports" stroke="#2dd4bf" strokeWidth={2} dot={{ fill: '#2dd4bf', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trending issues */}
        <div className="glass p-5">
          <h3 className="font-semibold text-white mb-4">Trending Mental Health Issues This Month</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TRENDING.map((t) => (
              <div key={t.issue} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-sm text-slate-300">{t.issue}</span>
                <span className="text-sm font-bold" style={{ color: t.color }}>{t.change}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-4">Data updated daily. Available via Public API for NGOs and researchers. Contact us for API access.</p>
        </div>
      </motion.div>
    </div>
  )
}
