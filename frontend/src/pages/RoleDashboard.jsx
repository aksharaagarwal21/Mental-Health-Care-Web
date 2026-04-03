import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import PatientDashboard from './PatientDashboard'
import DoctorDashboard from './DoctorDashboard'
import CaregiverDashboard from './CaregiverDashboard'

export default function RoleDashboard() {
  const { user } = useAuthStore()
  const navigate = useNavigate()

  if (!user) {
    navigate('/home')
    return null
  }

  switch (user.role) {
    case 'doctor':
      return <DoctorDashboard />
    case 'caregiver':
      return <CaregiverDashboard />
    case 'patient':
    default:
      return <PatientDashboard />
  }
}

/* Export the nav items getter for Navbar */
export function getRoleNavItems(role) {
  const configs = {
    patient: [
      { path: '/articles', label: 'Articles' },
      { path: '/mood', label: 'Mood' },
      { path: '/peer-match', label: 'Peers' },
      { path: '/groups', label: 'Groups' },
    ],
    doctor: [
      { path: '/contribute', label: 'Write' },
      { path: '/articles', label: 'Articles' },
      { path: '/verify-doctor', label: 'Verify' },
      { path: '/groups', label: 'Groups' },
    ],
    caregiver: [
      { path: '/articles', label: 'Resources' },
      { path: '/mood', label: 'Care Diary' },
      { path: '/groups', label: 'Groups' },
    ],
  }
  return configs[role] || configs.patient
}
