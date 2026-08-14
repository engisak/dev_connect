import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthModal from './AuthModal'

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin')
  const [searchQuery, setSearchQuery] = useState('')

  const dropdownRef = useRef(null)

  const openAuth = (mode) => {
    setAuthMode(mode)
    setAuthModalOpen(true)
    setMobileMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {/* Dark High-Contrast Navbar over Light Canvas */}
      <header className="bg-[#080c14] text-white sticky top-0 w-full z-50 border-b border-slate-800 shadow-md">
        <div className="flex justify-between items-center h-16 px-4 md:px-10 max-w-[1280px] mx-auto">
          
          {/* Logo */}
          <Link to="/" className="text-white flex items-center gap-2 group shrink-0">
            <span className="material-symbols-outlined text-primary-container text-2xl font-extrabold group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
              code_blocks
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tight text-white">DevConnect</span>
          </Link>

          {/* Desktop Uncluttered Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-5 text-sm font-semibold">
            <Link
              to="/"
              className={`transition-all px-3 py-1.5 rounded-lg ${
                isActive('/') ? 'bg-primary-container text-white font-bold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/explore"
              className={`transition-all px-3 py-1.5 rounded-lg ${
                isActive('/explore') ? 'bg-primary-container text-white font-bold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Explore
            </Link>

            <Link
              to="/about"
              className={`transition-all px-3 py-1.5 rounded-lg ${
                isActive('/about') ? 'bg-primary-container text-white font-bold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`transition-all px-3 py-1.5 rounded-lg ${
                isActive('/contact') ? 'bg-primary-container text-white font-bold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Contact
            </Link>

            {user && (
              <Link
                to="/my-projects"
                className={`transition-all px-3 py-1.5 rounded-lg ${
                  isActive('/my-projects') ? 'bg-primary-container text-white font-bold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                My Projects
              </Link>
            )}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-4">
            {/* Search Input Pill */}
            <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 focus-within:border-primary-container focus-within:ring-1 focus-within:ring-primary-container transition-all">
              <span className="material-symbols-outlined text-slate-400 text-sm">search</span>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-sm text-white focus:ring-0 placeholder:text-slate-500 ml-2 w-32 xl:w-40 outline-none"
              />
            </div>

            {user ? (
              /* User Profile & Submenu Dropdown Container */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onMouseEnter={() => setDropdownOpen(true)}
                  className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all focus:outline-none"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Avatar"
                      className="w-7 h-7 rounded-full border border-primary-container object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-primary-container text-white border border-sky-400 flex items-center justify-center font-bold text-xs">
                      {(user.user_metadata?.full_name || user.email).charAt(0).toUpperCase()}
                    </div>
                  )}

                  <span className="text-xs font-bold text-slate-200 hidden sm:inline max-w-[100px] truncate">
                    {user.user_metadata?.full_name || user.email.split('@')[0]}
                  </span>

                  <span className={`material-symbols-outlined text-slate-400 text-sm transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                {/* Submenu Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-[#0d131f] border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    {/* User Info Header */}
                    <div className="px-3 py-2.5 border-b border-slate-800/80 mb-1">
                      <div className="text-xs font-extrabold text-white truncate">
                        {user.user_metadata?.full_name || 'Developer'}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate font-mono mt-0.5">
                        {user.email}
                      </div>
                      {isAdmin && (
                        <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950/60 border border-rose-500/40 text-rose-400 text-[10px] font-bold">
                          <span className="material-symbols-outlined text-[12px]">shield</span>
                          <span>Admin Access</span>
                        </div>
                      )}
                    </div>

                    {/* Submenu Items */}
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive('/profile') ? 'bg-primary-container text-white font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">person</span>
                      <span>My Profile</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          isActive('/admin')
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'text-rose-400 hover:text-white hover:bg-rose-950/60 border border-rose-500/20'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">shield</span>
                        <span>Admin Moderation Panel</span>
                      </Link>
                    )}

                    <div className="border-t border-slate-800/80 pt-1 mt-1">
                      <button
                        onClick={() => {
                          setDropdownOpen(false)
                          signOut()
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-white hover:bg-red-950/60 transition-all text-left"
                      >
                        <span className="material-symbols-outlined text-sm">logout</span>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuth('signin')}
                  className="text-slate-200 font-semibold text-xs px-4 py-2 hover:bg-slate-900 rounded-lg transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuth('signup')}
                  className="bg-primary-container hover:bg-sky-400 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-1 active:scale-95 shadow-sm"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg"
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#080c14] border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 text-sm font-semibold text-slate-200">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-primary-container">Home</Link>
            <Link to="/explore" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-primary-container">Explore</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-primary-container">About</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-primary-container">Contact</Link>
            {user && (
              <>
                <Link to="/my-projects" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-primary-container">My Projects</Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-primary-container">My Profile</Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-rose-400 font-bold">Admin Moderation Panel</Link>
                )}
                <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="block w-full text-left py-2 text-red-400">Sign Out</button>
              </>
            )}
            {!user && (
              <div className="pt-2 flex flex-col gap-2">
                <button onClick={() => openAuth('signin')} className="w-full py-2 text-center text-slate-200 bg-slate-900 border border-slate-800 rounded-lg">Sign In</button>
                <button onClick={() => openAuth('signup')} className="w-full py-2 text-center text-white bg-primary-container rounded-lg font-bold">Sign Up</button>
              </div>
            )}
          </div>
        )}
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  )
}
