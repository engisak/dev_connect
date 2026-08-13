import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Loader2, ShieldAlert, LogIn } from 'lucide-react'
import AuthModal from '../components/AuthModal'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-sm text-slate-400 font-medium">Verifying authentication status...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="inline-flex p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl">
            <ShieldAlert className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Authentication Required</h2>
            <p className="text-sm text-slate-400">
              You must be signed in to access your project dashboard or profile settings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In Now</span>
            </button>
          </div>
        </div>

        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode="signin"
        />
      </div>
    )
  }

  return children
}
