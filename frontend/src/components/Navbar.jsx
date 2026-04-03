import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Menu, X, Heart, Users, BookOpen, BarChart2, GraduationCap, Smile, UserCheck, LogIn, LogOut, ChevronDown, PenTool, Calendar } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { getRoleNavItems } from '../pages/RoleDashboard'
import toast from 'react-hot-toast'

const PUBLIC_NAV = [
  { path: '/home', label: 'Home' },
]

const ROLE_COLORS = {
  patient: '#3b82f6',
  doctor: '#0d9488',
  caregiver: '#f59e0b',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, openAuth, logout } = useAuthStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setUserMenuOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  const roleColor = user ? (ROLE_COLORS[user.role] || '#3a5a40') : '#3a5a40'
  const navItems = user ? getRoleNavItems(user.role) : []

  // Icon map for dynamically rendered nav items
  const iconMap = { BookOpen, Smile, Users, Heart, GraduationCap, PenTool, UserCheck, BarChart2, Calendar }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`navbar-main ${scrolled ? 'navbar-scrolled' : ''}`}
      >
        <div className="navbar-inner">
          {/* Logo */}
          <Link to={user ? '/dashboard' : '/home'} className="navbar-logo">
            <div className="navbar-logo-icon">
              <Brain size={18} />
            </div>
            <div>
              <span className="navbar-brand-name">Bloodwing</span>
              <span className="navbar-brand-sub">Mental Health Commons</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="navbar-desktop">
            {user ? (
              /* Logged in: role-specific nav */
              <>
                <Link
                  to="/dashboard"
                  className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
                {navItems.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`navbar-link ${location.pathname === path ? 'active' : ''}`}
                  >
                    {label}
                  </Link>
                ))}
              </>
            ) : (
              /* Not logged in: public nav */
              <>
                <Link
                  to="/home"
                  className={`navbar-link ${location.pathname === '/home' ? 'active' : ''}`}
                >
                  Home
                </Link>
                <a href="#about" className="navbar-link">About</a>
                <a href="#contributions" className="navbar-link">Contributions</a>
              </>
            )}

            {/* Auth area */}
            {user ? (
              <div className="navbar-user-area">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="navbar-user-btn"
                  style={{ borderColor: roleColor + '40' }}
                >
                  <span className="navbar-user-avatar">{user.avatar}</span>
                  <span className="navbar-user-name">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={12} className={`navbar-chevron ${userMenuOpen ? 'open' : ''}`} />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="navbar-dropdown"
                    >
                      <div className="navbar-dropdown-info">
                        <div className="navbar-dropdown-name">{user.name}</div>
                        <div className="navbar-dropdown-email">{user.email}</div>
                        <span className="navbar-dropdown-badge" style={{ color: roleColor, borderColor: roleColor + '40', background: roleColor + '15' }}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </div>
                      <button
                        onClick={() => { logout(); toast.success('Signed out'); setUserMenuOpen(false); navigate('/home'); }}
                        className="navbar-dropdown-signout"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="navbar-auth-btns">
                <button onClick={() => navigate('/signin')} className="navbar-signin-btn">
                  <LogIn size={14} /> Sign In
                </button>
                <button onClick={() => navigate('/role-select')} className="navbar-register-btn">
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="navbar-mobile-toggle"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="navbar-mobile"
            >
              <div className="navbar-mobile-inner">
                {user && (
                  <div className="navbar-mobile-user">
                    <span className="text-2xl">{user.avatar}</span>
                    <div>
                      <div className="navbar-mobile-name">{user.name}</div>
                      <span style={{ color: roleColor, fontSize: '0.75rem', fontWeight: 600 }}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                  </div>
                )}

                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)} className={`navbar-mobile-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                      Dashboard
                    </Link>
                    {navItems.map(({ path, label }) => (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => setMobileOpen(false)}
                        className={`navbar-mobile-link ${location.pathname === path ? 'active' : ''}`}
                      >
                        {label}
                      </Link>
                    ))}
                    <button
                      onClick={() => { logout(); toast.success('Signed out'); setMobileOpen(false); navigate('/home'); }}
                      className="navbar-mobile-signout"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/home" onClick={() => setMobileOpen(false)} className="navbar-mobile-link">Home</Link>
                    <button
                      onClick={() => { navigate('/role-select'); setMobileOpen(false); }}
                      className="hero-cta-primary"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                    >
                      Register / Sign In
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <div style={{ height: '64px' }} /> {/* spacer */}
    </>
  )
}
