import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Phone, Sparkles, Heart } from 'lucide-react'
import { analyzeSentiment, getAIResponse, getCopingSuggestion } from '../utils/sentimentEngine'

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Hey there! I am Aura, your AI wellness companion. I can understand how you are feeling and offer support. Try telling me about your day! 🌿',
      mood: 'neutral',
    },
  ])
  const [input, setInput] = useState('')
  const [currentMood, setCurrentMood] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = () => {
    if (!input.trim()) return

    const userText = input.trim()
    setInput('')

    const sentiment = analyzeSentiment(userText)
    setCurrentMood(sentiment)

    // Add user message immediately
    setMessages((prev) => [...prev, { role: 'user', text: userText, mood: sentiment.mood }])

    // Show typing indicator
    setIsTyping(true)

    // Simulate AI thinking delay (300-800ms)
    const delay = 300 + Math.random() * 500
    setTimeout(() => {
      const aiResponse = getAIResponse(sentiment.mood)
      const suggestion = getCopingSuggestion(sentiment.mood)

      let aiText = aiResponse
      if (sentiment.mood === 'crisis') {
        aiText +=
          '\n\n🆘 Crisis Helplines:\n📞 iCall: 9152987821\n📞 NIMHANS: 080-46110007\n📞 Vandrevala: 1860-2662-345'
      } else if (['veryNegative', 'negative'].includes(sentiment.mood)) {
        aiText += '\n\n💡 Try this: ' + suggestion
      }

      setMessages((prev) => [...prev, { role: 'ai', text: aiText, mood: sentiment.mood }])
      setIsTyping(false)
    }, delay)
  }

  const moodColors = {
    crisis: { bg: '#fef2f2', border: '#fca5a5' },
    veryNegative: { bg: '#fff7ed', border: '#fdba74' },
    negative: { bg: '#fefce8', border: '#fde047' },
    neutral: { bg: '#f0fdf4', border: '#86efac' },
    positive: { bg: '#ecfdf5', border: '#6ee7b7' },
    veryPositive: { bg: '#ecfdf5', border: '#34d399' },
  }

  const chatBg = currentMood ? moodColors[currentMood.mood]?.bg || '#f0fdf4' : '#f0fdf4'

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="chatbot-fab"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span className="chatbot-fab-badge">AI</span>}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-left">
                <div className="chatbot-avatar">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3>Aura</h3>
                  <p>AI Wellness Companion</p>
                </div>
              </div>
              {currentMood && (
                <div
                  className="chatbot-mood-badge"
                  style={{ background: currentMood.bg, color: currentMood.color }}
                >
                  {currentMood.emoji} {currentMood.label}
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="chatbot-messages" style={{ background: chatBg }}>
              {messages.map((msg, i) => (
                <div key={i} className={`chatbot-msg ${msg.role}`}>
                  {msg.role === 'ai' && <div className="chatbot-msg-avatar">🌿</div>}
                  <div className={`chatbot-msg-bubble ${msg.role}`}>
                    {msg.text.split('\n').map((line, j) => (
                      <React.Fragment key={j}>
                        {line}
                        {j < msg.text.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="chatbot-msg ai">
                  <div className="chatbot-msg-avatar">🌿</div>
                  <div className="chatbot-msg-bubble ai chatbot-typing">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Crisis banner */}
            {currentMood?.mood === 'crisis' && (
              <div className="chatbot-crisis">
                <Phone size={14} />
                <span>
                  Call iCall: <a href="tel:9152987821">9152987821</a>
                </span>
              </div>
            )}

            {/* Quick mood buttons */}
            {messages.length <= 2 && (
              <div className="chatbot-quick-moods">
                {['😊 I feel great', '😐 Okay I guess', '😔 Not so good', '😰 Really struggling'].map(
                  (q, i) => (
                    <button
                      key={i}
                      className="chatbot-quick-btn"
                      onClick={() => {
                        setInput(q.slice(2))
                        setTimeout(() => {
                          const fakeEvent = { trim: () => q.slice(2) }
                          setInput(q.slice(2))
                        }, 50)
                      }}
                    >
                      {q}
                    </button>
                  )
                )}
              </div>
            )}

            {/* Input */}
            <div className="chatbot-input-area">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                placeholder="How are you feeling..."
                className="chatbot-input"
                disabled={isTyping}
              />
              <button
                onClick={handleSend}
                className="chatbot-send"
                disabled={!input.trim() || isTyping}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
