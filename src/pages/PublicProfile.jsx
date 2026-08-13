import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../services/supabase'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from '../components/ProjectCard'
import { parseTechStack } from '../utils/formatters'

export default function PublicProfile() {
  const { userId } = useParams()
  const { projects } = useProjects()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDeveloperProfile = async () => {
      if (!userId) return
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) throw error
        setProfile(data)
      } catch (err) {
        console.error('Error fetching developer profile:', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDeveloperProfile()
  }, [userId])

  // Filter projects belonging to this developer
  const developerProjects = projects.filter((p) => p.user_id === userId)

  if (loading) {
    return <div className="py-20 text-center text-gray-500 text-sm font-medium">Loading developer profile...</div>
  }

  if (!profile) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#171c21]">Developer Profile Not Found</h2>
        <p className="text-sm text-gray-600">The developer profile you requested does not exist.</p>
        <Link to="/explore" className="inline-block px-5 py-2.5 bg-primary-container text-white font-bold text-xs rounded-xl shadow-sm">
          Back to Explore
        </Link>
      </div>
    )
  }

  const initials = (profile.full_name || 'Developer')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const skillBadges = parseTechStack(profile.skills)

  return (
    <main className="flex-grow pt-10 pb-16 px-4 md:px-10 max-w-[1280px] mx-auto w-full space-y-10">
      {/* Profile Banner & Info */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-5">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="w-20 h-20 rounded-full border-2 border-primary-container object-cover shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary-container/10 border-2 border-primary-container text-primary-container flex items-center justify-center font-extrabold text-3xl">
                {initials}
              </div>
            )}
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-[#171c21] tracking-tight">{profile.full_name || 'Developer'}</h1>
              <p className="text-xs font-bold text-primary-container">{profile.title || 'Full-Stack Software Developer'}</p>
            </div>
          </div>

          {profile.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-black font-semibold text-xs rounded-xl flex items-center gap-2 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-base">code</span>
              <span>GitHub Profile</span>
            </a>
          )}
        </div>

        {/* Bio & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">About Developer</h3>
            <p className="text-sm text-[#3f4851] leading-relaxed font-normal whitespace-pre-line">
              {profile.bio || 'No personal bio provided.'}
            </p>
          </div>

          {skillBadges.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skillBadges.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-container/10 text-primary font-semibold rounded-lg text-xs font-mono"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Developer Published Projects Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-extrabold text-[#171c21] flex items-center gap-2 tracking-tight">
            <span className="material-symbols-outlined text-primary-container text-2xl">grid_view</span>
            <span>Published Projects ({developerProjects.length})</span>
          </h2>
        </div>

        {developerProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developerProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-gray-200 rounded-xl space-y-2 shadow-xs">
            <span className="material-symbols-outlined text-4xl text-gray-400">code_blocks</span>
            <p className="text-sm text-gray-600 font-medium">This developer has not published any projects yet.</p>
          </div>
        )}
      </section>
    </main>
  )
}
