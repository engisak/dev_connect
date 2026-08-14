import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthModal from './AuthModal'

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin')
  const [searchQuery, setSearchQuery] = useState('')

  const openAuth = (mode) => {
    setAuthMode(mode)
    setAuthModalOpen(true)
    setMobileMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4 text-sm font-semibold">
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
              <>
                <Link
                  to="/my-projects"
                  className={`transition-all px-3 py-1.5 rounded-lg ${
                    isActive('/my-projects') ? 'bg-primary-container text-white font-bold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  My Projects
                </Link>

                <Link
                  to="/profile"
                  className={`transition-all px-3 py-1.5 rounded-lg ${
                    isActive('/profile') ? 'bg-primary-container text-white font-bold shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  Profile
                </Link>
              </>
            )}

            {/* Admin Dashboard Link for Admin User */}
            {user && isAdmin && (
              <Link
                to="/admin"
                className={`transition-all px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 text-xs ${
                  isActive('/admin')
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-rose-400 hover:text-rose-200 border border-rose-500/30 bg-rose-950/20 hover:bg-rose-900/40'
                }`}
              >
                <span className="material-symbols-outlined text-sm">shield</span>
                <span>Admin Panel</span>
              </Link>
            )}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* Search Input Pill */}
            <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 rounded-full px-3.5 py-1.5 focus-within:border-primary-container focus-within:ring-1 focus-within:ring-primary-container transition-all">
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
              <div className="flex items-center gap-2.5">
                <Link to="/profile" className="flex items-center gap-2 group">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border border-primary-container object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-container text-white border border-sky-400 flex items-center justify-center font-bold text-xs">
                      {(user.user_metadata?.full_name || user.email).charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-200 hover:text-white hidden sm:inline max-w-[100px] truncate">
                    {user.user_metadata?.full_name || user.email.split('@')[0]}
                  </span>
                </Link>

                <button
                  onClick={signOut}
                  className="text-slate-400 hover:text-red-400 p-1.5 rounded-lg transition-colors"
                  title="Sign Out"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                </button>
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
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-primary-container">Profile</Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-rose-400 font-bold">Admin Panel</Link>
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
