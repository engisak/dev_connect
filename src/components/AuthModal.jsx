import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }) {
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    setMode(initialMode)
    setErrorMsg('')
    setSuccessMsg('')
  }, [initialMode, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')
    setLoading(true)

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.')
        setLoading(false)
        return
      }
      const { data, error } = await signUp({ email, password, fullName })
      if (error) {
        setErrorMsg(error.message)
      } else {
        setSuccessMsg('Account created successfully! You are now signed in.')
        setTimeout(() => onClose(), 1200)
      }
    } else {
      const { data, error } = await signIn({ email, password })
      if (error) {
        setErrorMsg(error.message)
      } else {
        onClose()
      }
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-2xl p-6 md:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-primary-container/10 text-primary-container rounded-xl mb-1">
            <span className="material-symbols-outlined text-3xl">terminal</span>
          </div>
          <h2 className="text-2xl font-extrabold text-black">
            {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-gray-500">
            {mode === 'signin' ? 'Sign in to manage your developer portfolio' : 'Join DevConnect and showcase your software projects'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => { setMode('signin'); setErrorMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded transition-all ${
              mode === 'signin' ? 'bg-white text-black shadow-sm font-bold' : 'text-gray-500 hover:text-black'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded transition-all ${
              mode === 'signup' ? 'bg-white text-black shadow-sm font-bold' : 'text-gray-500 hover:text-black'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Alerts */}
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg font-medium">
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-black mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Developer Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-black placeholder-gray-400 outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-black mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="developer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-black placeholder-gray-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-black placeholder-gray-400 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-primary-container hover:opacity-90 text-white font-semibold text-xs rounded-lg shadow-sm transition-all disabled:opacity-50 mt-2"
          >
            {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
