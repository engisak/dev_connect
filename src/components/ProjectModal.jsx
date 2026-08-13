import React, { useState, useEffect } from 'react'

export default function ProjectModal({ isOpen, onClose, onSubmit, initialData = null, isEditing = false }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [techStack, setTechStack] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [githubUrl, setGithubUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '')
      setDescription(initialData.description || '')
      setTechStack(initialData.tech_stack || '')
      setDemoUrl(initialData.demo_url || '')
      setGithubUrl(initialData.github_url || '')
      setImageUrl(initialData.image_url || '')
    } else {
      setTitle('')
      setDescription('')
      setTechStack('')
      setDemoUrl('')
      setGithubUrl('')
      setImageUrl('')
    }
    setErrorMsg('')
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    if (!title.trim()) {
      setErrorMsg('Project title is required.')
      return
    }

    setLoading(true)
    const projectPayload = {
      title: title.trim(),
      description: description.trim(),
      tech_stack: techStack.trim(),
      demo_url: demoUrl.trim(),
      github_url: githubUrl.trim(),
      image_url: imageUrl.trim(),
    }

    const { error } = await onSubmit(projectPayload)
    setLoading(false)

    if (error) {
      setErrorMsg(error.message || 'Failed to save project.')
    } else {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white border border-gray-200 rounded-xl shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-container/10 text-primary-container rounded-xl">
            <span className="material-symbols-outlined text-2xl">code_blocks</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">
              {isEditing ? 'Edit Project' : 'Publish New Project'}
            </h2>
            <p className="text-xs text-gray-500">
              {isEditing ? 'Update your repository details & screenshot' : 'Share your application with custom screenshot & links'}
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Project Title <span className="text-primary-container">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="DevConnect Visualizer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-black placeholder-gray-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Project Cover Image URL <span className="text-gray-400 font-normal">(Optional Screenshot Link)</span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/project-screenshot.png"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-black placeholder-gray-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-black mb-1">
              Tech Stack <span className="text-gray-400 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              placeholder="React, Supabase, Tailwind, TypeScript"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-black placeholder-gray-400 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-black mb-1">Live Demo URL</label>
              <input
                type="url"
                placeholder="https://demo.vercel.app"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-black placeholder-gray-400 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-black mb-1">GitHub Repo URL</label>
              <input
                type="url"
                placeholder="https://github.com/user/repo"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-black placeholder-gray-400 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-black mb-1">Project Description</label>
            <textarea
              rows={3}
              placeholder="Describe your application features, architecture, and purpose..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg p-2.5 text-black placeholder-gray-400 outline-none transition-all resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-primary-container text-white font-bold text-xs rounded-lg shadow-sm hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Project' : 'Publish Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
