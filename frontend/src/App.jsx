import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import CrisisBanner from './components/CrisisBanner'
import AuthModal from './components/AuthModal'
import Landing from './pages/Landing'
import Home from './pages/Home'
import RoleSelect from './pages/RoleSelect'
import PatientOnboarding from './pages/PatientOnboarding'
import PatientAuth from './pages/PatientAuth'
import DoctorOnboarding from './pages/DoctorOnboarding'
import DoctorAuth from './pages/DoctorAuth'
import CaregiverOnboarding from './pages/CaregiverOnboarding'
import CaregiverAuth from './pages/CaregiverAuth'
import SignIn from './pages/SignIn'
import RoleDashboard from './pages/RoleDashboard'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import MoodTracker from './pages/MoodTracker'
import PeerMatch from './pages/PeerMatch'
import GroupRooms from './pages/GroupRooms'
import CampusModule from './pages/CampusModule'
import Dashboard from './pages/Dashboard'
import ContributeArticle from './pages/ContributeArticle'
import DoctorVerification from './pages/DoctorVerification'
import { useCrisisDetection } from './hooks/useCrisisDetection'
import './styles/dashboards.css'

/* Full-screen routes (no navbar, no auth modal) */
const FULLSCREEN_PATHS = [
  '/',
  '/role-select',
  '/patient-onboarding', '/patient-auth',
  '/doctor-onboarding', '/doctor-auth',
  '/caregiver-onboarding', '/caregiver-auth',
  '/signin',
]

function AppLayout() {
  const [showCrisis, setShowCrisis] = useState(false)
  const { crisisDetected } = useCrisisDetection()
  const location = useLocation()

  useEffect(() => {
    if (crisisDetected) setShowCrisis(true)
  }, [crisisDetected])

  const isFullscreen = FULLSCREEN_PATHS.includes(location.pathname)

  if (location.pathname === '/') return <Landing />

  if (isFullscreen) {
    return (
      <>
        <Toaster position="top-right" toastOptions={{ style: { background: '#fff', color: '#1a2e1d', border: '1px solid #e8e4d8' } }} />
        <Routes>
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/patient-onboarding" element={<PatientOnboarding />} />
          <Route path="/patient-auth" element={<PatientAuth />} />
          <Route path="/doctor-onboarding" element={<DoctorOnboarding />} />
          <Route path="/doctor-auth" element={<DoctorAuth />} />
          <Route path="/caregiver-onboarding" element={<CaregiverOnboarding />} />
          <Route path="/caregiver-auth" element={<CaregiverAuth />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-main)' }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#fff', color: '#1a2e1d', border: '1px solid #e8e4d8' }
        }}
      />
      <AuthModal />
      {showCrisis && <CrisisBanner onClose={() => setShowCrisis(false)} />}
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<RoleDashboard />} />
        <Route path="/heatmap" element={<Dashboard />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/peer-match" element={<PeerMatch />} />
        <Route path="/groups" element={<GroupRooms />} />
        <Route path="/campus" element={<CampusModule />} />
        <Route path="/contribute" element={<ContributeArticle />} />
        <Route path="/verify-doctor" element={<DoctorVerification />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  )
}
