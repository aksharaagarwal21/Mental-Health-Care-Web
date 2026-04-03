import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 30000,
})

export const getArticles = (params) => api.get('/api/articles', { params })
export const getArticle = (id) => api.get(`/api/articles/${id}`)
export const createArticle = (data) => api.post('/api/articles', data)
export const chat = (data) => api.post('/api/chat', data)
export const logMood = (data) => api.post('/api/mood', data)
export const findPeers = (data) => api.post('/api/peer-match', data)
export const getHeatmap = () => api.get('/api/heatmap')
export const submitDoctorVerification = (data) => api.post('/api/verify-doctor', data)
export default api
