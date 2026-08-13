import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProjects } from '../hooks/useProjects'
import { supabase } from '../services/supabase'
import ProjectCard from '../components/ProjectCard'

export default function Home() {
  const { user } = useAuth()
  const { projects } = useProjects()

  const [stats, setStats] = useState({
    projectsCount: 0,
    developersCount: 0,
    totalLikes: 0,
    commentsCount: 0,
  })

  useEffect(() => {
    const fetchRealTimeStats = async () => {
      try {
        // Fetch real count of projects
        const { count: pCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })

        // Fetch real count of developers/profiles
        const { count: dCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        // Fetch real count of comments
        const { count: cCount } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })

        // Calculate total likes sum
        const totalLikes = projects.reduce((sum, p) => sum + (p.likes_count || 0), 0)

        setStats({
          projectsCount: pCount || projects.length,
          developersCount: dCount || 0,
          totalLikes: totalLikes,
          commentsCount: cCount || 0,
        })
      } catch (err) {
        console.error('Error fetching real-time stats:', err.message)
      }
    }

    fetchRealTimeStats()
  }, [projects])

  const featuredProjects = projects.slice(0, 6)

  return (
    <main className="flex-grow pt-12 md:pt-16 pb-12 bg-[#f7f9ff]">
      {/* Hero Section */}
      <section className="px-4 md:px-10 max-w-[1280px] mx-auto text-center mb-12 md:mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#171c21] max-w-4xl mx-auto mb-6 leading-tight tracking-tight">
          Showcase Your Code to the Developer World
        </h1>
        
        <p className="text-lg md:text-xl text-[#3f4851] max-w-2xl mx-auto mb-10 font-semibold leading-relaxed">
          Join a premium community of software engineers. Deploy projects, get architectural feedback, and discover cutting-edge open source tools.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/explore"
            className="w-full sm:w-auto bg-primary-container hover:bg-sky-400 text-white text-sm font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md"
          >
            <span>Explore Projects</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
          
          <Link
            to={user ? "/my-projects" : "/explore"}
            className="w-full sm:w-auto border border-gray-300 bg-white text-black text-sm font-bold px-8 py-4 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">terminal</span>
            <span>Submit Your Project</span>
          </Link>
        </div>
      </section>

      {/* Real-Time Database Stats Counter Section */}
      <section className="border-y border-gray-200 bg-white mb-12 md:mb-20 shadow-xs">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Real Projects Shared Count */}
            <div className="pt-8 md:pt-0">
              <div className="font-extrabold text-primary-container mb-2 text-4xl">
                {stats.projectsCount > 0 ? `${stats.projectsCount}+` : '0'}
              </div>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">Projects Shared</div>
            </div>

            {/* Real Registered Developers Count */}
            <div className="pt-8 md:pt-0">
              <div className="font-extrabold text-primary-container mb-2 text-4xl">
                {stats.developersCount > 0 ? `${stats.developersCount}+` : '0'}
              </div>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">Active Developers</div>
            </div>

            {/* Real Community Engagement (Likes & Comments) */}
            <div className="pt-8 md:pt-0">
              <div className="font-extrabold text-primary-container mb-2 text-4xl">
                {stats.totalLikes + stats.commentsCount > 0 ? `${stats.totalLikes + stats.commentsCount}+` : '0'}
              </div>
              <div className="text-xs font-bold text-gray-700 uppercase tracking-wider">Community Likes & Comments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Repositories Grid */}
      <section className="px-4 md:px-10 max-w-[1280px] mx-auto mb-12 md:mb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171c21] mb-2 tracking-tight">Trending Repositories</h2>
            <p className="text-sm font-medium text-[#3f4851]">Discover what the community is building today.</p>
          </div>
          <Link
            to="/explore"
            className="hidden sm:flex items-center gap-1 text-primary-container hover:text-sky-600 text-xs font-bold transition-colors"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white border border-gray-200 rounded-xl space-y-3 shadow-xs">
            <span className="material-symbols-outlined text-4xl text-primary-container">code_blocks</span>
            <p className="text-sm text-gray-700 font-semibold">No projects published yet. Be the first developer to publish!</p>
            <Link
              to="/my-projects"
              className="inline-block px-5 py-2.5 bg-primary-container text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Share Your Project
            </Link>
          </div>
        )}
      </section>

      {/* CTA Banner Section */}
      <section className="px-4 md:px-10 max-w-[1280px] mx-auto mb-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container rounded-full blur-[120px]" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-200 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#171c21]">Ready to Push to Production?</h2>
            <p className="text-base text-[#3f4851] max-w-xl mx-auto font-medium">
              Create your developer profile today. Showcase your portfolio, connect with peers, and elevate your engineering career.
            </p>
            <Link
              to="/explore"
              className="inline-block bg-primary-container hover:bg-sky-400 text-white text-xs font-bold px-8 py-3.5 rounded-xl shadow-md transition-all"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
