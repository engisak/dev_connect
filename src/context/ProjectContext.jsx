import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { supabase } from '../services/supabase'

const ProjectContext = createContext(null)

const initialState = {
  projects: [],
  loading: true,
  error: null,
}

const projectReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload, loading: false, error: null }
    case 'ADD_PROJECT':
      return { ...state, projects: [action.payload, ...state.projects], loading: false }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((p) => (p.id === action.payload.id ? { ...p, ...action.payload } : p)),
        loading: false,
      }
    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.payload),
        loading: false,
      }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState)

  // Fetch all projects with full owner profile information including avatar_url
  const fetchProjects = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles (
            id,
            full_name,
            bio,
            github_url,
            skills,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      dispatch({ type: 'SET_PROJECTS', payload: data || [] })
    } catch (err) {
      console.error('Error fetching projects:', err.message)
      dispatch({ type: 'SET_ERROR', payload: err.message })
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // Create new project
  const createProject = async (projectData, userId) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...projectData, user_id: userId }])
        .select(`
          *,
          profiles (
            id,
            full_name,
            bio,
            github_url,
            skills,
            avatar_url
          )
        `)
        .single()

      if (error) throw error
      dispatch({ type: 'ADD_PROJECT', payload: data })
      return { data, error: null }
    } catch (err) {
      console.error('Error creating project:', err.message)
      dispatch({ type: 'SET_LOADING', payload: false })
      return { data: null, error: err }
    }
  }

  // Update existing project
  const updateProject = async (id, updatedData) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updatedData)
        .eq('id', id)
        .select(`
          *,
          profiles (
            id,
            full_name,
            bio,
            github_url,
            skills,
            avatar_url
          )
        `)
        .single()

      if (error) throw error
      dispatch({ type: 'UPDATE_PROJECT', payload: data })
      return { data, error: null }
    } catch (err) {
      console.error('Error updating project:', err.message)
      dispatch({ type: 'SET_LOADING', payload: false })
      return { data: null, error: err }
    }
  }

  // Delete project
  const deleteProject = async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (error) throw error
      dispatch({ type: 'DELETE_PROJECT', payload: id })
      return { error: null }
    } catch (err) {
      console.error('Error deleting project:', err.message)
      dispatch({ type: 'SET_LOADING', payload: false })
      return { error: err }
    }
  }

  // Toggle Like logic for a project
  const toggleLike = async (projectId) => {
    const targetProject = state.projects.find((p) => p.id === projectId)
    if (!targetProject) return

    const likedKey = `liked_project_${projectId}`
    const isCurrentlyLiked = localStorage.getItem(likedKey) === 'true'
    const newLikesCount = isCurrentlyLiked
      ? Math.max(0, (targetProject.likes_count || 0) - 1)
      : (targetProject.likes_count || 0) + 1

    if (isCurrentlyLiked) {
      localStorage.removeItem(likedKey)
    } else {
      localStorage.setItem(likedKey, 'true')
    }

    // Optimistic UI update
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: { ...targetProject, likes_count: newLikesCount },
    })

    try {
      await supabase
        .from('projects')
        .update({ likes_count: newLikesCount })
        .eq('id', projectId)
    } catch (err) {
      console.error('Error toggling like:', err.message)
    }

    return !isCurrentlyLiked
  }

  const value = {
    projects: state.projects,
    loading: state.loading,
    error: state.error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    toggleLike,
  }

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
}

export const useProjects = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}
