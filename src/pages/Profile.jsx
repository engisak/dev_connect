import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../services/supabase'

export default function Profile() {
  const { user, signOut } = useAuth()

  const [fullName, setFullName] = useState('')
  const [title, setTitle] = useState('')
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') throw error

        if (data) {
          setFullName(data.full_name || '')
          setTitle(data.title || '')
          setBio(data.bio || '')
          setSkills(data.skills || '')
          setGithubUrl(data.github_url || '')
          setAvatarUrl(data.avatar_url || '')
        } else {
          setFullName(user.user_metadata?.full_name || '')
          setTitle(user.user_metadata?.title || '')
          setAvatarUrl(user.user_metadata?.avatar_url || '')
        }
      } catch (err) {
        console.error('Error fetching profile:', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSuccessMsg('')
    setErrorMsg('')

    try {
      const updates = {
        id: user.id,
        full_name: fullName.trim(),
        title: title.trim(),
        bio: bio.trim(),
        skills: skills.trim(),
        github_url: githubUrl.trim(),
        avatar_url: avatarUrl.trim(),
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error

      // Also update auth user metadata
      await supabase.auth.updateUser({
        data: {
          full_name: fullName.trim(),
          title: title.trim(),
          avatar_url: avatarUrl.trim(),
        },
      })

      setSuccessMsg('Profile updated successfully!')
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      console.error('Error updating profile:', err.message)
      setErrorMsg(err.message || 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="py-20 text-center text-gray-500 text-sm">Loading profile settings...</div>
  }

  const initials = (fullName || user.email)
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <main className="flex-grow pt-8 pb-16 px-4 md:px-10 max-w-[800px] mx-auto w-full">
      {/* Profile Header */}
      <header className="flex items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-8 bg-white p-6 rounded-xl shadow-xs border border-gray-200">
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={fullName}
              className="w-16 h-16 rounded-full border-2 border-primary-container object-cover shadow-sm"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary-container/10 border-2 border-primary-container text-primary-container flex items-center justify-center font-extrabold text-2xl">
              {initials}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-black text-[#171c21] tracking-tight">{fullName || 'Developer Profile'}</h1>
            <p className="text-xs font-bold text-primary-container mt-0.5">{title || 'Full-Stack Software Developer'}</p>
            <p className="text-xs font-semibold text-gray-500 font-mono mt-0.5">{user.email}</p>
          </div>
        </div>

        <button
          onClick={signOut}
          className="px-4 py-2 bg-gray-100 hover:bg-red-50 border border-gray-300 text-red-600 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          <span>Sign Out</span>
        </button>
      </header>

      {/* Profile Edit Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
          <span className="material-symbols-outlined text-primary-container">person</span>
          <h2 className="text-lg font-bold text-[#171c21]">Personal Information</h2>
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg flex items-center gap-2 font-semibold">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleUpdateProfile} className="space-y-5 text-sm">
          <div>
            <label className="block text-xs font-bold text-[#171c21] mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="Developer Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-[#171c21] font-semibold placeholder-gray-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171c21] mb-1">
              Developer Title / Role <span className="text-gray-500 font-normal">(e.g. Full-Stack React Developer, Frontend Engineer)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Full-Stack React Developer & UI Specialist"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-[#171c21] font-semibold placeholder-gray-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171c21] mb-1">
              Avatar Image URL <span className="text-gray-500 font-normal">(Profile Photo Link)</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/avatar-photo.png"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-[#171c21] placeholder-gray-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171c21] mb-1">
              Technical Skills <span className="text-gray-500 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              placeholder="React, JavaScript, Python, Node.js, Supabase"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-[#171c21] placeholder-gray-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171c21] mb-1">GitHub Profile Link</label>
            <input
              type="url"
              placeholder="https://github.com/username"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-[#171c21] placeholder-gray-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#171c21] mb-1">Developer Bio</label>
            <textarea
              rows={4}
              placeholder="Describe your engineering experience, projects, and tech stack focus..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-[#171c21] placeholder-gray-400 outline-none transition-all resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-primary-container hover:bg-sky-400 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
