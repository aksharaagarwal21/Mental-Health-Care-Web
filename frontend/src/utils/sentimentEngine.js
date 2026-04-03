/**
 * Bloodwing Sentiment Engine v2
 * Improved mood detection with phrase matching, negation handling, and rich responses
 */

/* ─── Negative Phrases (checked first) ─── */
const NEGATIVE_PHRASES = [
  { phrase: 'not feeling well', score: -3 },
  { phrase: 'not feeling good', score: -3 },
  { phrase: 'not okay', score: -2 },
  { phrase: 'not ok', score: -2 },
  { phrase: 'not good', score: -2 },
  { phrase: 'not great', score: -2 },
  { phrase: 'not fine', score: -2 },
  { phrase: 'not happy', score: -3 },
  { phrase: 'feel bad', score: -2 },
  { phrase: 'feel sad', score: -3 },
  { phrase: 'feel down', score: -3 },
  { phrase: 'feel low', score: -3 },
  { phrase: 'feel lonely', score: -3 },
  { phrase: 'feel empty', score: -3 },
  { phrase: 'feel lost', score: -3 },
  { phrase: 'feel tired', score: -2 },
  { phrase: 'feel anxious', score: -3 },
  { phrase: 'feel stressed', score: -2 },
  { phrase: 'feel sick', score: -2 },
  { phrase: 'feel hopeless', score: -4 },
  { phrase: 'feel worthless', score: -4 },
  { phrase: 'feel numb', score: -3 },
  { phrase: 'feeling bad', score: -2 },
  { phrase: 'feeling sad', score: -3 },
  { phrase: 'feeling down', score: -3 },
  { phrase: 'feeling low', score: -3 },
  { phrase: 'feeling lonely', score: -3 },
  { phrase: 'feeling empty', score: -3 },
  { phrase: 'feeling lost', score: -3 },
  { phrase: 'feeling tired', score: -2 },
  { phrase: 'feeling anxious', score: -3 },
  { phrase: 'feeling stressed', score: -2 },
  { phrase: 'feeling sick', score: -2 },
  { phrase: 'feeling hopeless', score: -4 },
  { phrase: 'feeling worthless', score: -4 },
  { phrase: 'feeling numb', score: -3 },
  { phrase: 'can not sleep', score: -2 },
  { phrase: 'cannot sleep', score: -2 },
  { phrase: 'cant sleep', score: -2 },
  { phrase: 'no one cares', score: -4 },
  { phrase: 'nobody cares', score: -4 },
  { phrase: 'i hate myself', score: -4 },
  { phrase: 'i hate my life', score: -5 },
  { phrase: 'what is the point', score: -4 },
  { phrase: 'give up', score: -4 },
  { phrase: 'want to cry', score: -3 },
  { phrase: 'having a bad day', score: -2 },
  { phrase: 'bad day', score: -2 },
  { phrase: 'rough day', score: -2 },
  { phrase: 'tough day', score: -2 },
  { phrase: 'hard time', score: -2 },
  { phrase: 'having a hard time', score: -3 },
  { phrase: 'so stressed', score: -3 },
  { phrase: 'so tired', score: -2 },
  { phrase: 'so sad', score: -3 },
  { phrase: 'very sad', score: -3 },
  { phrase: 'really sad', score: -3 },
  { phrase: 'really stressed', score: -3 },
  { phrase: 'really anxious', score: -3 },
  { phrase: 'really tired', score: -2 },
  { phrase: 'mentally exhausted', score: -3 },
  { phrase: 'emotionally drained', score: -3 },
  { phrase: 'burned out', score: -3 },
  { phrase: 'burnt out', score: -3 },
]

const POSITIVE_PHRASES = [
  { phrase: 'feeling good', score: 3 },
  { phrase: 'feeling great', score: 4 },
  { phrase: 'feeling happy', score: 4 },
  { phrase: 'feeling better', score: 3 },
  { phrase: 'feeling amazing', score: 5 },
  { phrase: 'feeling wonderful', score: 5 },
  { phrase: 'feeling blessed', score: 3 },
  { phrase: 'feeling grateful', score: 3 },
  { phrase: 'feel good', score: 3 },
  { phrase: 'feel great', score: 4 },
  { phrase: 'feel happy', score: 4 },
  { phrase: 'feel better', score: 3 },
  { phrase: 'feel amazing', score: 5 },
  { phrase: 'had a great day', score: 4 },
  { phrase: 'good day', score: 2 },
  { phrase: 'great day', score: 3 },
  { phrase: 'really happy', score: 4 },
  { phrase: 'so happy', score: 4 },
  { phrase: 'very happy', score: 4 },
  { phrase: 'doing well', score: 2 },
  { phrase: 'doing great', score: 3 },
  { phrase: 'doing good', score: 2 },
  { phrase: 'doing fine', score: 1 },
  { phrase: 'i am okay', score: 1 },
  { phrase: 'i am fine', score: 1 },
  { phrase: 'i am good', score: 2 },
  { phrase: 'im good', score: 2 },
  { phrase: 'im fine', score: 1 },
  { phrase: 'im okay', score: 1 },
]

const POSITIVE_WORDS = {
  happy: 3, joy: 3, joyful: 3, great: 2, wonderful: 3, amazing: 3, love: 2,
  grateful: 3, thankful: 3, blessed: 2, calm: 2, peaceful: 3, relaxed: 2,
  excited: 2, hopeful: 3, confident: 2, strong: 2, proud: 2, better: 2,
  good: 1, nice: 1, smile: 2, laugh: 2, fun: 1, well: 1,
  beautiful: 2, awesome: 2, fantastic: 3, cheerful: 2, motivated: 2,
  energetic: 2, content: 2, optimistic: 3, positive: 2, delighted: 3,
  thrilled: 3, blissful: 3, serene: 2, satisfied: 2, accomplished: 2,
  relieved: 2, comfortable: 1, supported: 2, understood: 2, valued: 2,
}

const NEGATIVE_WORDS = {
  sad: -2, depressed: -3, anxious: -3, worried: -2, scared: -2, afraid: -2,
  lonely: -3, alone: -2, hurt: -2, pain: -2, angry: -2, frustrated: -2,
  hopeless: -3, worthless: -3, tired: -1, exhausted: -2, stressed: -2,
  overwhelmed: -3, miserable: -3, terrible: -2, awful: -2, bad: -1,
  crying: -2, tears: -2, broken: -3, empty: -3, numb: -2, lost: -2,
  confused: -1, nervous: -2, panic: -3, dread: -3, guilt: -2, shame: -2,
  irritated: -1, annoyed: -1, suffering: -3, struggling: -2, helpless: -3,
  trapped: -3, drowning: -3, failing: -2, ugly: -2, hate: -2, useless: -3,
  sick: -1, weak: -1, disturbed: -2, restless: -2, insecure: -2,
  disappointed: -2, regret: -2, burden: -3, cry: -2, upset: -2,
}

const CRISIS_WORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'self harm', 'self-harm', 'cutting', 'overdose', 'no reason to live',
  'better off dead', 'not worth living', 'end it all', 'give up on life',
]

const MOOD_MAP = {
  crisis: { emoji: '🆘', label: 'Crisis Detected', color: '#ef4444', bg: '#fef2f2' },
  veryNegative: { emoji: '😢', label: 'Very Low', color: '#f97316', bg: '#fff7ed' },
  negative: { emoji: '😔', label: 'Low', color: '#eab308', bg: '#fefce8' },
  neutral: { emoji: '😐', label: 'Neutral', color: '#6b7280', bg: '#f9fafb' },
  positive: { emoji: '🙂', label: 'Good', color: '#22c55e', bg: '#f0fdf4' },
  veryPositive: { emoji: '😊', label: 'Great', color: '#10b981', bg: '#ecfdf5' },
}

const COPING_SUGGESTIONS = {
  crisis: [
    'Please reach out to someone who can help right now.',
    'Call iCall: 9152987821 or NIMHANS: 080-46110007',
    'You are not alone. Help is available 24/7.',
  ],
  veryNegative: [
    'Try the 5-4-3-2-1 grounding technique: name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.',
    'It is okay to not be okay. Consider talking to a trusted person.',
    'Try deep breathing: inhale 4 seconds, hold 4, exhale 4.',
    'Place your hand on your chest and take 3 slow deep breaths. Focus only on the sensation.',
    'Try splashing cold water on your face — it activates your body\'s calming response.',
  ],
  negative: [
    'A short walk in nature can help clear your mind.',
    'Try journaling your feelings — writing helps process emotions.',
    'Remember: feelings are temporary. This will pass.',
    'Listen to a song that makes you feel calm or nostalgic.',
    'Try the box breathing technique: breathe in 4s, hold 4s, out 4s, hold 4s.',
    'Would you like to try a guided meditation? Even 3 minutes can help.',
  ],
  neutral: [
    'How about trying a quick mindfulness exercise?',
    'Consider setting a small goal for today — even tiny wins matter!',
    'Try writing down 3 things you are grateful for right now.',
    'A glass of water and a 5-minute stretch can do wonders!',
  ],
  positive: [
    'That is wonderful! Keep nurturing what makes you feel good.',
    'Consider writing down what made you happy today.',
    'Share your positivity with someone — it will multiply!',
  ],
  veryPositive: [
    'Your positive energy is inspiring! Keep it up!',
    'Share your joy with someone you care about today.',
    'Celebrate this moment — you deserve to feel this way!',
  ],
}

const AI_RESPONSES = {
  crisis: [
    'I hear you, and I want you to know that you matter deeply. Please talk to a professional right now. Call iCall: 9152987821.',
    'What you are feeling is real, but there are people who want to help. You do not have to face this alone. Please call NIMHANS: 080-46110007.',
  ],
  veryNegative: [
    'I can sense you are going through a really tough time. Thank you for sharing that with me. Would you like to try a breathing exercise together?',
    'It takes courage to express how you feel. Remember, tough times do not last, but tough people do. I am here for you. 💚',
    'Your feelings are valid. Sometimes the bravest thing is simply getting through the day. What is one small thing that could bring you comfort right now?',
    'I am sorry you are feeling this way. You deserve to feel better, and I believe you will. Would you like me to suggest something that might help?',
    'That sounds really hard. Please know your feelings matter and you are not alone in this. I am right here with you. 🌿',
  ],
  negative: [
    'I understand things feel difficult right now. What is one small thing that usually makes you smile?',
    'It sounds like you are having a hard time. Remember, it is okay to take things one step at a time. 🌱',
    'I hear you. Sometimes just acknowledging our feelings is the first step toward feeling better. You are already doing that! 💚',
    'Thank you for being honest with me. On days like this, be extra kind to yourself — you deserve it.',
    'I am sorry you are not feeling great. Would you like to talk more about it, or would you prefer a distraction? I can suggest activities!',
    'It is completely okay to have days like this. What matters is that you are here and talking about it. That takes strength. 🌿',
  ],
  neutral: [
    'Thanks for checking in! How has your day been going so far?',
    'I am here whenever you want to talk. What is on your mind today? 🌿',
    'It is great that you are taking time to reflect. Is there anything specific you would like to explore or talk about?',
    'Hey! No pressure to share anything deep — we can just chat. What is new with you? 😊',
    'How are things going? I am all ears if you want to share anything.',
    'Good to hear from you! Would you like to do a quick mood check-in, or just chat?',
    'I am glad you stopped by! What would make today a little better for you?',
    'Is there anything on your mind you would like to get off your chest? I am a judgment-free zone! 💚',
  ],
  positive: [
    'I love hearing that! What is making you feel good today? 😊',
    'That is great to hear! Keep riding that positive wave. 🌊',
    'Your positivity is wonderful! What are you grateful for today?',
    'So glad to hear you are doing well! What has been the highlight of your day?',
    'That makes me happy to hear! Remember this feeling — it is proof that good times are always around the corner. ✨',
  ],
  veryPositive: [
    'You are absolutely glowing with positivity! That is amazing! 🌟',
    'What a wonderful mood! Your energy is contagious. Keep spreading that light! ✨',
    'I am so happy to hear that! Moments like these are worth savoring. 💚',
    'Incredible! You are radiating good vibes. The world needs more of this energy! 🎉',
    'This is beautiful! Hold onto this feeling and remember it on harder days. You are capable of so much joy! 🌈',
  ],
}

/* Track last response to avoid repeats */
let lastResponseIndex = -1

export function analyzeSentiment(text) {
  if (!text || text.trim().length === 0) {
    return { mood: 'neutral', score: 0, ...MOOD_MAP.neutral }
  }

  const lower = text.toLowerCase().trim()

  // Crisis check first
  for (const phrase of CRISIS_WORDS) {
    if (lower.includes(phrase)) {
      return { mood: 'crisis', score: -10, ...MOOD_MAP.crisis }
    }
  }

  let score = 0
  let phraseMatched = false

  // Check negative phrases first (they take priority)
  for (const { phrase, score: s } of NEGATIVE_PHRASES) {
    if (lower.includes(phrase)) {
      score += s
      phraseMatched = true
    }
  }

  // Check positive phrases
  for (const { phrase, score: s } of POSITIVE_PHRASES) {
    if (lower.includes(phrase)) {
      score += s
      phraseMatched = true
    }
  }

  // If no phrase matched, do word-level analysis
  if (!phraseMatched) {
    const words = lower.split(/\s+/)
    for (let i = 0; i < words.length; i++) {
      const clean = words[i].replace(/[^a-z]/g, '')
      if (!clean) continue

      // Check for negation (not, dont, can't, etc.)
      const prevWord = i > 0 ? words[i - 1].replace(/[^a-z]/g, '') : ''
      const isNegated = ['not', 'dont', 'no', 'never', 'cant', 'cannot', 'isnt', 'arent', 'wasnt', 'werent', 'wont', 'didnt'].includes(prevWord)

      if (POSITIVE_WORDS[clean]) {
        score += isNegated ? -POSITIVE_WORDS[clean] : POSITIVE_WORDS[clean]
      }
      if (NEGATIVE_WORDS[clean]) {
        score += isNegated ? -NEGATIVE_WORDS[clean] * 0.5 : NEGATIVE_WORDS[clean]
      }
    }
  }

  // For very short messages with no sentiment words, keep neutral
  const normalized = Math.max(-10, Math.min(10, score))

  let mood
  if (normalized <= -4) mood = 'veryNegative'
  else if (normalized <= -1) mood = 'negative'
  else if (normalized <= 1) mood = 'neutral'
  else if (normalized <= 4) mood = 'positive'
  else mood = 'veryPositive'

  return { mood, score: normalized, ...MOOD_MAP[mood] }
}

export function getAIResponse(mood) {
  const responses = AI_RESPONSES[mood] || AI_RESPONSES.neutral
  // Avoid repeating the same response
  let idx
  do {
    idx = Math.floor(Math.random() * responses.length)
  } while (idx === lastResponseIndex && responses.length > 1)
  lastResponseIndex = idx
  return responses[idx]
}

export function getCopingSuggestion(mood) {
  const suggestions = COPING_SUGGESTIONS[mood] || COPING_SUGGESTIONS.neutral
  return suggestions[Math.floor(Math.random() * suggestions.length)]
}

export function getMoodEmoji(moodScore) {
  if (moodScore <= -5) return '😢'
  if (moodScore <= -3) return '😔'
  if (moodScore <= -1) return '😕'
  if (moodScore <= 1) return '😐'
  if (moodScore <= 3) return '🙂'
  if (moodScore <= 5) return '😊'
  return '😄'
}

export { MOOD_MAP }
