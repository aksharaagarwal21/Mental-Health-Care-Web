import { create } from 'zustand'

const USERS_KEY = 'bloodwing_users'
const SESSION_KEY = 'bloodwing_session'

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch { return [] }
}

const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch { return null }
}

const ROLE_DEFAULTS = {
  patient: {
    avatar: '🧘',
    color: '#60a5fa',
    gradient: 'from-blue-600 to-cyan-500',
    dashboardItems: ['Mood History', 'My Articles', 'Peer Connections', 'Saved Resources'],
  },
  doctor: {
    avatar: '👨‍⚕️',
    color: '#2dd4bf',
    gradient: 'from-teal-600 to-emerald-500',
    dashboardItems: ['Verified Badge', 'Published Articles', 'Patient Insights', 'Consultation Queue'],
  },
  caregiver: {
    avatar: '🤝',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-500',
    dashboardItems: ['Care Diary', 'Support Groups', 'Resources', 'Self-Care Tracker'],
  },
}

export const useAuthStore = create((set, get) => ({
  user: getSession(),
  users: getStoredUsers(),
  authModal: { open: false, mode: 'login', role: 'patient' },

  openAuth: (mode = 'login', role = 'patient') =>
    set({ authModal: { open: true, mode, role } }),

  closeAuth: () =>
    set({ authModal: { open: false, mode: 'login', role: 'patient' } }),

  switchAuthMode: (mode) =>
    set((s) => ({ authModal: { ...s.authModal, mode } })),

  setAuthRole: (role) =>
    set((s) => ({ authModal: { ...s.authModal, role } })),

  register: (data) => {
    const users = getStoredUsers()
    const exists = users.find((u) => u.email === data.email)
    if (exists) return { error: 'Email already registered' }

    const newUser = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      ...data,
      ...ROLE_DEFAULTS[data.role],
      createdAt: new Date().toISOString(),
      moodEntries: [],
      articles: [],
      points: 0,
    }
    const updated = [...users, newUser]
    localStorage.setItem(USERS_KEY, JSON.stringify(updated))
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser))
    set({ user: newUser, users: updated })
    return { success: true }
  },

  login: (email, password) => {
    const users = getStoredUsers()
    const found = users.find((u) => u.email === email && u.password === password)
    if (!found) return { error: 'Invalid email or password' }
    localStorage.setItem(SESSION_KEY, JSON.stringify(found))
    set({ user: found })
    return { success: true }
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY)
    set({ user: null })
  },

  getRoleConfig: (role) => ROLE_DEFAULTS[role] || ROLE_DEFAULTS.patient,
}))
