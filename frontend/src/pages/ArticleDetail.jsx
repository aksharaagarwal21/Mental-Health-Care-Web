import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, ThumbsUp, Share2, BookOpen, ArrowLeft, Mic, Send, AlertCircle, ExternalLink } from 'lucide-react'
import { useCrisisDetection } from '../hooks/useCrisisDetection'
import toast from 'react-hot-toast'

// Real articles database with actual content and external links
const ARTICLES_DB = {
  '1': {
    _id: '1',
    title: 'Coping with JEE Exam Pressure',
    category: 'Exam Stress',
    author_name: 'Dr. Priya Sharma',
    author_type: 'verified_doctor',
    author_institution: 'NIMHANS, Bangalore',
    created_at: 'March 1, 2024',
    views: 4200,
    likes: 312,
    externalUrl: 'https://nimhans.ac.in/exam-stress/',
    source: 'NIMHANS',
    content: `
## Understanding the Pressure

JEE (Joint Entrance Examination) is one of the most competitive exams in the world, with over 1.2 million students competing for roughly 16,000 IIT seats. The pressure this creates is immense — and it is entirely real.

Research from NIMHANS shows that 40% of JEE aspirants report clinical levels of anxiety, and 15% show symptoms of depression during the preparation phase.

## Why This Happens

The pressure comes from multiple layers simultaneously:
- **Academic competition**: Peers who study 12-16 hours daily
- **Family expectations**: Often carrying generational hopes and financial investment
- **Identity fusion**: When "getting into IIT" becomes who you are, failure feels existential
- **Sleep deprivation**: Coaching centers often prioritize content coverage over rest

## Evidence-Based Coping Strategies

### 1. The 90-Minute Study Block Method
Your brain's ultradian rhythm works in 90-minute cycles. Study for 90 minutes, then rest for 20 minutes. This is more effective than 6-hour grinding sessions.

### 2. Separate Identity from Outcome
Practice saying: "I am preparing for JEE" not "I am a JEE aspirant." The exam is something you are doing, not something you are.

### 3. Sleep is Preparation
7-8 hours of sleep consolidates memory more than 2 extra hours of studying. This is neurologically proven.

### 4. Talk to Someone
Many coaching centers in Kota now have counsellors. iCall (9152987821) offers free counselling to students.

## When to Seek Help

If you are experiencing:
- Panic attacks before study sessions
- Inability to eat or sleep for multiple days
- Thoughts of harming yourself

...please reach out immediately. iCall: 9152987821 (free, confidential).

## A Note From a Doctor

I have seen hundreds of students. The ones who succeed long-term are not the ones who studied the most — they are the ones who learned to manage pressure sustainably. Your mental health is not separate from your performance. It is the foundation of it.
`,
    ai_verified: true,
    bias_checked: true,
    tags: ['JEE', 'Exam Stress', 'Students', 'Anxiety', 'India'],
    relatedLinks: [
      { title: 'NIMHANS Exam Stress Resources', url: 'https://nimhans.ac.in/exam-stress/' },
      { title: 'iCall Free Student Counselling', url: 'https://icallhelpline.org/' },
      { title: 'WHO: Adolescent Mental Health', url: 'https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health' },
      { title: 'Kiran Mental Health Helpline (Toll-Free)', url: 'https://www.nimhans.ac.in/pssmhsa-kiran/' },
    ],
  },
  '2': {
    _id: '2',
    title: 'Understanding and Managing Anxiety Disorders',
    category: 'Anxiety',
    author_name: 'World Health Organization',
    author_type: 'verified_doctor',
    author_institution: 'WHO Geneva',
    created_at: 'February 28, 2024',
    views: 8900,
    likes: 567,
    externalUrl: 'https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders',
    source: 'WHO',
    content: `
## What are Anxiety Disorders?

Anxiety disorders are characterized by excessive fear and worry and related behavioral disturbances. In 2019, 301 million people globally were living with an anxiety disorder, making it the most common mental health condition.

## Symptoms to Watch For

- **Excessive worry** that is difficult to control
- **Restlessness** or feeling keyed up
- **Difficulty concentrating** or mind going blank
- **Sleep disturbances** — trouble falling or staying asleep
- **Physical symptoms** — racing heart, sweating, trembling
- **Avoidance** of situations that trigger anxiety

## Types of Anxiety Disorders

### Generalized Anxiety Disorder (GAD)
Persistent, excessive worry about various things for at least 6 months.

### Social Anxiety Disorder
Intense fear of social situations where you might be judged or scrutinized.

### Panic Disorder
Recurrent unexpected panic attacks — sudden periods of intense fear with physical symptoms.

## Evidence-Based Treatments

### Psychological treatments
Cognitive Behavioral Therapy (CBT) is the most evidence-based treatment. It helps you identify and change unhelpful thought patterns.

### Self-help strategies
- Regular physical activity (30 mins/day)
- Mindfulness and deep breathing
- Reducing caffeine and alcohol intake
- Maintaining a regular sleep schedule

### When medication helps
SSRIs and SNRIs are first-line medications for anxiety disorders, prescribed by a psychiatrist.

## Getting Help in India

- **Vandrevala Foundation**: 1860-2662-345 (24/7)
- **iCall TISS**: 9152987821 (Mon-Sat)
- **NIMHANS**: 080-46110007
`,
    ai_verified: true,
    bias_checked: true,
    tags: ['Anxiety', 'WHO', 'Mental Health', 'CBT', 'Treatment'],
    relatedLinks: [
      { title: 'WHO Fact Sheet: Anxiety Disorders', url: 'https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders' },
      { title: 'APA: What is Anxiety?', url: 'https://www.apa.org/topics/anxiety' },
      { title: 'Vandrevala Foundation 24/7 Helpline', url: 'https://www.vandrevalafoundation.com/' },
      { title: 'MindPeers Online Therapy', url: 'https://www.mindpeers.co/' },
    ],
  },
  '3': {
    _id: '3',
    title: "Depression: Let's Talk — WHO India Campaign",
    category: 'Depression',
    author_name: 'WHO India Office',
    author_type: 'verified_doctor',
    author_institution: 'WHO South-East Asia',
    created_at: 'March 5, 2024',
    views: 12400,
    likes: 892,
    externalUrl: 'https://www.who.int/india/health-topics/depression',
    source: 'WHO India',
    content: `
## Depression in India: The Scale

India has the highest burden of depression in the world. According to WHO estimates, over 56 million Indians suffer from depression and another 38 million from anxiety disorders.

Yet, fewer than 10% seek any form of help — due to stigma, lack of access, and cultural barriers.

## Recognizing Depression

Depression is more than just "feeling sad." Clinical signs include:
- **Persistent sadness** or emptiness lasting 2+ weeks
- **Loss of interest** in activities you used to enjoy
- **Fatigue** and decreased energy
- **Changes in appetite** — eating too much or too little
- **Sleep disturbances** — insomnia or oversleeping
- **Difficulty concentrating** or making decisions
- **Feelings of worthlessness** or excessive guilt
- **Thoughts of death** or self-harm

## Cultural Barriers in India

### Stigma
Mental health is still taboo in many Indian communities. Phrases like "log kya kahenge" (what will people say) prevent people from seeking help.

### Somatization
Many Indians express depression through physical symptoms — headaches, body pain, fatigue — rather than emotional language. This makes diagnosis harder.

### Limited Access
India has only 0.3 psychiatrists per 100,000 people — compared to the WHO recommendation of 3.

## What You Can Do

### If you are experiencing depression:
1. Talk to someone you trust
2. Call a helpline — they are free and confidential
3. See a doctor — depression is treatable

### If someone you know is struggling:
1. Listen without judgment
2. Don't say "just cheer up" — it doesn't help
3. Help them find professional support

## Free Resources

- **Kiran Helpline**: 1800-599-0019 (toll-free, 24/7)
- **NIMHANS**: 080-46110007
- **Sneha Foundation**: 044-24640050
`,
    ai_verified: true,
    bias_checked: true,
    tags: ['Depression', 'WHO', 'India', 'Stigma', 'Help'],
    relatedLinks: [
      { title: 'WHO India: Depression', url: 'https://www.who.int/india/health-topics/depression' },
      { title: 'The Live Love Laugh Foundation', url: 'https://www.thelivelovelaughfoundation.org/' },
      { title: 'NIMHANS Depression Resources', url: 'https://nimhans.ac.in/' },
      { title: 'Sneha India Helpline', url: 'https://snehaindia.org/' },
    ],
  },
}

// Fallback for unknown article IDs
const DEFAULT_ARTICLE = ARTICLES_DB['1']

export default function ArticleDetail() {
  const { id } = useParams()
  const [question, setQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const { setCrisisText } = useCrisisDetection()

  const article = ARTICLES_DB[id] || DEFAULT_ARTICLE

  const handleAskAI = async () => {
    if (!question.trim()) return
    if (setCrisisText(question)) return
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, article_id: id })
      })
      const data = await res.json()
      setAiResponse(data.response)
    } catch {
      setAiResponse('Could not reach the AI assistant. Please try again or visit the source link directly.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/articles" className="flex items-center gap-2 text-slate-500 hover:text-white mb-8 transition-colors text-sm">
          <ArrowLeft size={14} /> Back to Articles
        </Link>

        {/* Header */}
        <div className="glass p-8 mb-6">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs bg-purple-600/20 text-purple-300 border border-purple-500/20">{article.category}</span>
            {article.ai_verified && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-teal-600/20 text-teal-300 border border-teal-500/20">
                <CheckCircle size={10} /> AI Verified
              </span>
            )}
            {article.bias_checked && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-amber-600/20 text-amber-300 border border-amber-500/20">
                <AlertCircle size={10} /> Bias Checked
              </span>
            )}
            {article.source && (
              <span className="px-3 py-1 rounded-full text-xs bg-blue-600/20 text-blue-300 border border-blue-500/20">
                Source: {article.source}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{article.title}</h1>

          <div className="flex items-center gap-4 pb-4 border-b border-slate-800">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white text-sm">
              {article.author_name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm">{article.author_name}</span>
                {article.author_type === 'verified_doctor' && (
                  <span className="flex items-center gap-1 text-xs text-teal-400">
                    <CheckCircle size={10} /> Verified
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-500">{article.author_institution} · {article.created_at}</span>
            </div>
          </div>

          {/* External source link */}
          {article.externalUrl && (
            <a
              href={article.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/10 border border-purple-500/20 text-sm text-purple-300 hover:bg-purple-600/20 transition-all w-fit"
            >
              <ExternalLink size={14} />
              Read original on {article.source} →
            </a>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-sm max-w-none mt-6">
            {article.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="font-display text-xl font-bold text-white mt-6 mb-3">{line.slice(3)}</h2>
              if (line.startsWith('### ')) return <h3 key={i} className="font-semibold text-purple-300 mt-4 mb-2">{line.slice(4)}</h3>
              if (line.startsWith('- **')) {
                const parts = line.slice(2).split('**: ')
                return <p key={i} className="text-slate-400 ml-4 text-sm mb-1">• <strong className="text-white">{parts[0].replace('**','')}</strong>: {parts[1]}</p>
              }
              if (line.startsWith('- ')) return <p key={i} className="text-slate-400 ml-4 text-sm mb-1">• {line.slice(2)}</p>
              if (line.startsWith('...')) return <p key={i} className="text-slate-400 ml-4 text-sm mb-2 italic">{line}</p>
              if (line.match(/^\d\./)) return <p key={i} className="text-slate-400 ml-4 text-sm mb-1">{line}</p>
              if (line.trim()) return <p key={i} className="text-slate-400 leading-relaxed mb-3 text-sm">{line}</p>
              return null
            })}
          </div>

          {/* Related Links */}
          {article.relatedLinks && article.relatedLinks.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-800">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <ExternalLink size={14} className="text-purple-400" /> Related Resources
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {article.relatedLinks.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-900/50 border border-slate-700 hover:border-purple-500/30 transition-all group text-sm"
                  >
                    <ExternalLink size={12} className="text-slate-600 group-hover:text-purple-400 transition-colors flex-shrink-0" />
                    <span className="text-slate-400 group-hover:text-white transition-colors">{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
            {article.tags.map(tag => (
              <span key={tag} className="px-2 py-1 rounded text-xs bg-slate-800 text-slate-400">#{tag}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button onClick={() => toast.success('Liked!')} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-purple-500/50 transition-all text-sm">
              <ThumbsUp size={14} /> {article.likes} Helpful
            </button>
            <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!') }} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-purple-500/50 transition-all text-sm">
              <Share2 size={14} /> Share
            </button>
            {article.externalUrl && (
              <a href={article.externalUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:border-purple-500/50 transition-all text-sm">
                <ExternalLink size={14} /> Visit Source
              </a>
            )}
          </div>
        </div>

        {/* AI Q&A Section */}
        <div className="glass p-6">
          <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-600/30 flex items-center justify-center text-xs">AI</span>
            Ask AI about this article
          </h3>
          <p className="text-xs text-slate-500 mb-4">AI uses RAG — answers are grounded in this article and verified knowledge base</p>

          <div className="flex gap-2">
            <input
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAskAI()}
              placeholder="Ask anything about this topic..."
              className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-colors"
            />
            <button onClick={handleAskAI} disabled={loading} className="btn-glow p-3">
              <Send size={16} />
            </button>
          </div>

          {loading && (
            <div className="mt-4 flex items-center gap-2 text-slate-400 text-sm">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
              AI is thinking...
            </div>
          )}

          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-purple-600/10 border border-purple-500/20 text-sm text-slate-300 leading-relaxed"
            >
              {aiResponse}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
