import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session with fallback to getUser()
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) throw sessionError

        if (currentSession) {
          setSession(currentSession)
          setUser(currentSession.user)
        } else {
          // Fallback: verify user directly from Supabase server
          const { data: { user: currentUser } } = await supabase.auth.getUser()
          setUser(currentUser ?? null)
        }
      } catch (error) {
        console.error('Error initializing auth session:', error.message)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth state changes (login, logout, token refresh, password recovery)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  // Sign Up function
  const signUp = async ({ email, password, fullName }) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })
      if (error) throw error

      if (data?.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign In function
  const signIn = async ({ email, password }) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  // Sign Out function
  const signOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Error signing out:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
