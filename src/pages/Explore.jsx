import React, { useState } from 'react'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from '../components/ProjectCard'

export default function Explore() {
  const { projects, loading } = useProjects()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTech, setSelectedTech] = useState('All')

  const techFilters = ['All', 'React', 'Supabase', 'Tailwind', 'NodeJS', 'Python', 'AI']

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech_stack?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTech =
      selectedTech === 'All' ||
      project.tech_stack?.toLowerCase().includes(selectedTech.toLowerCase())

    return matchesSearch && matchesTech
  })

  return (
    <div className="w-full bg-[#f7f9ff] py-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 space-y-8">
        {/* Header Section */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#171c21] tracking-tight">Explore Projects</h1>
          <p className="text-[#3f4851] text-base max-w-2xl font-medium">
            Discover cutting-edge developer projects, open-source tools, and innovative applications built by the DevConnect community.
          </p>
        </header>

        {/* Interactive Filter Bar */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-1/3">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input
              type="text"
              placeholder="Filter by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg py-2 pl-10 pr-3 text-black text-sm placeholder-gray-400 outline-none transition-all font-medium"
            />
          </div>

          {/* Popular Tech Chips */}
          <div className="flex flex-wrap gap-2 items-center w-full md:w-2/3">
            <span className="text-gray-500 font-mono text-xs mr-1 font-semibold">Popular Tech:</span>
            {techFilters.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1 rounded text-xs font-mono font-semibold transition-all ${
                  selectedTech === tech
                    ? 'bg-primary-container text-white shadow-sm font-bold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                #{tech}
              </button>
            ))}
          </div>
        </section>

        {/* Showcase Grid */}
        {loading ? (
          <div className="py-20 text-center text-gray-500 text-sm font-medium">Loading project showcase...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-16 text-center bg-white border border-gray-200 rounded-xl p-8 space-y-3 max-w-md mx-auto shadow-xs">
            <span className="material-symbols-outlined text-4xl text-gray-400">search_off</span>
            <h3 className="text-base font-bold text-black">No Matching Projects</h3>
            <p className="text-xs text-gray-600">
              No projects match "{searchQuery}" or tag "#{selectedTech}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedTech('All'); }}
              className="px-4 py-2 bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </section>
        )}
      </div>
    </div>
  )
}
