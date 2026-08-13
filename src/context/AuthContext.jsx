import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const checkAdminStatus = async (userId) => {
    if (!userId) {
      setIsAdmin(false)
      return
    }
    try {
      const { data } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', userId)
        .single()
      
      setIsAdmin(data?.is_admin === true)
    } catch (err) {
      console.error('Error checking admin status:', err.message)
      setIsAdmin(false)
    }
  }

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) throw sessionError

        if (currentSession) {
          setSession(currentSession)
          setUser(currentSession.user)
          await checkAdminStatus(currentSession.user.id)
        } else {
          const { data: { user: currentUser } } = await supabase.auth.getUser()
          setUser(currentUser ?? null)
          if (currentUser) {
            await checkAdminStatus(currentUser.id)
          }
        }
      } catch (error) {
        console.error('Error initializing auth session:', error.message)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      if (currentSession?.user) {
        await checkAdminStatus(currentSession.user.id)
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

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

  const signIn = async ({ email, password }) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.signInWithPassword({
        email,
        password,
      })
      if (error) throw error

      if (data?.user) {
        await checkAdminStatus(data.user.id)
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setSession(null)
      setIsAdmin(false)
    } catch (error) {
      console.error('Error signing out:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    session,
    isAdmin,
    loading,
    signUp,
    signIn,
    signOut,
    refreshAdminStatus: () => user && checkAdminStatus(user.id),
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
