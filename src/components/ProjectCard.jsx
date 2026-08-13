import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { parseTechStack } from '../utils/formatters'
import { useProjects } from '../hooks/useProjects'

export default function ProjectCard({ project, isOwner = false, onEdit, onDelete }) {
  const { toggleLike } = useProjects()
  const techTags = parseTechStack(project.tech_stack)
  const authorName = project.profiles?.full_name || 'Developer'
  const authorAvatar = project.profiles?.avatar_url
  const initials = authorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const likedKey = `liked_project_${project.id}`
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    setIsLiked(localStorage.getItem(likedKey) === 'true')
  }, [project.id])

  const handleLikeClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const nowLiked = await toggleLike(project.id)
    setIsLiked(nowLiked)
  }

  // Default curated tech background image if user hasn't provided custom image_url
  const defaultImages = [
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
  ]
  const cardImage = project.image_url || defaultImages[Math.abs(project.id?.charCodeAt(0) || 0) % defaultImages.length]

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary-container hover:shadow-xl hover:shadow-primary-container/15 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        {/* Card Header Image */}
        <div className="h-48 w-full relative overflow-hidden bg-gray-100">
          <Link to={`/project/${project.id}`}>
            <img
              src={cardImage}
              alt={project.title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent pointer-events-none" />
          
          {isOwner && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-lg border border-gray-200 shadow-md z-20">
              <button
                onClick={(e) => { e.preventDefault(); onEdit(project); }}
                className="p-1 text-gray-700 hover:text-primary-container rounded transition-colors"
                title="Edit Project"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
              <button
                onClick={(e) => { e.preventDefault(); onDelete(project); }}
                className="p-1 text-gray-700 hover:text-red-600 rounded transition-colors"
                title="Delete Project"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 relative z-10 space-y-3">
          {/* Tech Stack Pills */}
          {techTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techTags.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs font-semibold px-2 py-1 bg-primary-container/10 text-primary rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <Link to={`/project/${project.id}`} className="block">
            <h3 className="text-lg font-bold text-black group-hover:text-primary-container transition-colors line-clamp-1">
              {project.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed font-normal">
            {project.description || 'No detailed description provided.'}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-6 pt-0 relative z-10">
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs">
          {/* Author Profile Link */}
          <Link
            to={project.user_id ? `/developer/${project.user_id}` : '#'}
            className="flex items-center gap-2.5 hover:text-primary-container transition-colors group/author"
            title={`View ${authorName}'s Profile`}
          >
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-8 h-8 rounded-full border border-gray-300 object-cover group-hover/author:border-primary-container transition-colors"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-container/10 text-primary border border-primary-container/20 flex items-center justify-center font-bold text-xs group-hover/author:bg-primary-container group-hover/author:text-white transition-all">
                {initials}
              </div>
            )}
            <span className="font-semibold text-black group-hover/author:text-primary-container transition-colors truncate max-w-[110px]">
              {authorName}
            </span>
          </Link>

          {/* Interactive Like Button */}
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono font-semibold transition-all active:scale-95 ${
              isLiked
                ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-rose-300 hover:text-rose-600'
            }`}
            title={isLiked ? 'Unlike' : 'Like'}
          >
            <span
              className={`material-symbols-outlined text-sm ${isLiked ? 'text-rose-500' : 'text-primary-container'}`}
              style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
            <span>{project.likes_count || 0}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
