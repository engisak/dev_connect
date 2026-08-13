import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProjects } from '../hooks/useProjects'
import { parseTechStack, formatDate } from '../utils/formatters'
import CommentSection from '../components/CommentSection'

export default function ProjectDetails() {
  const { id } = useParams()
  const { projects, toggleLike } = useProjects()
  const project = projects.find((p) => p.id === id)

  const likedKey = `liked_project_${id}`
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    setIsLiked(localStorage.getItem(likedKey) === 'true')
  }, [id])

  if (!project) {
    return (
      <main className="flex-grow pt-[100px] pb-12 px-4 md:px-10 max-w-[1280px] mx-auto w-full text-center space-y-4">
        <h2 className="text-2xl font-bold text-black">Project Not Found</h2>
        <p className="text-sm text-gray-600">The project you requested does not exist or has been removed.</p>
        <Link to="/explore" className="inline-block px-5 py-2.5 bg-primary-container text-white font-semibold text-xs rounded-lg">
          Back to Explore
        </Link>
      </main>
    )
  }

  const techTags = parseTechStack(project.tech_stack)
  const authorName = project.profiles?.full_name || 'Developer'
  const authorAvatar = project.profiles?.avatar_url
  const initials = authorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Project Hero Image
  const defaultImages = [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
  ]
  const projectImage = project.image_url || defaultImages[Math.abs(project.id?.charCodeAt(0) || 0) % defaultImages.length]

  const handleLikeClick = async () => {
    const nowLiked = await toggleLike(project.id)
    setIsLiked(nowLiked)
  }

  return (
    <main className="flex-grow pt-8 pb-16 px-4 md:px-10 max-w-[1000px] mx-auto w-full space-y-8">
      {/* Back Button */}
      <Link
        to="/explore"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-primary-container transition-colors"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span>Back to Explore</span>
      </Link>

      {/* Project Hero Banner Image */}
      <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden relative border border-gray-200 shadow-sm bg-gray-100">
        <img
          src={projectImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md">{project.title}</h1>
          <div className="flex items-center gap-3 text-xs text-slate-200 font-medium">
            <Link
              to={project.user_id ? `/developer/${project.user_id}` : '#'}
              className="flex items-center gap-2 text-white font-bold hover:underline"
            >
              {authorAvatar ? (
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className="w-7 h-7 rounded-full border-2 border-primary-container object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-primary-container border border-white text-white flex items-center justify-center font-bold text-xs">
                  {initials}
                </div>
              )}
              <span>{authorName}</span>
            </Link>
            <span>•</span>
            <span className="font-mono">Published {formatDate(project.created_at)}</span>
          </div>
        </div>
      </div>

      {/* Project Actions & Overview Container */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
          {/* Tech Stack Pills */}
          {techTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techTags.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-container/10 text-primary font-semibold rounded text-xs font-mono"
                >
                  #{tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Links */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={handleLikeClick}
              className={`px-4 py-2.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 ${
                isLiked
                  ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-rose-300 hover:text-rose-600'
              }`}
            >
              <span className={`material-symbols-outlined text-sm ${isLiked ? 'text-rose-500' : 'text-primary-container'}`} style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}>
                favorite
              </span>
              <span>{project.likes_count || 0} Likes</span>
            </button>

            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-black font-semibold text-xs rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">code</span>
                <span>GitHub</span>
              </a>
            )}

            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-primary-container hover:bg-sky-400 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Live Demo</span>
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 pt-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Project Description</h3>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line font-normal">
            {project.description || 'No detailed description provided.'}
          </p>
        </div>
      </div>

      {/* Discussion Section */}
      <CommentSection projectId={project.id} />
    </main>
  )
}
