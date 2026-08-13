import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="w-full bg-[#f7f9ff] py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 space-y-16">

        {/* Hero Header Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black text-[#171c21] tracking-tight leading-tight">
            Built for Software Engineers, by Software Engineers
          </h1>

          <p className="text-base md:text-lg text-[#3f4851] leading-relaxed font-medium">
            DevConnect is a full-stack developer showcase platform designed to bridge the gap between building software applications and gaining peer visibility, constructive feedback, and networking opportunities.
          </p>
        </section>

        {/* Vision & Mission Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-2xl">target</span>
            </div>
            <h2 className="text-xl font-bold text-[#171c21]">Our Core Mission</h2>
            <p className="text-sm text-[#3f4851] leading-relaxed font-normal">
              Software development is collaborative by nature. DevConnect provides a centralized, modern ecosystem where engineers can showcase their web applications, open-source repositories, and technical experiments to a community of like-minded professionals.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-2xl">visibility</span>
            </div>
            <h2 className="text-xl font-bold text-[#171c21]">Why DevConnect?</h2>
            <p className="text-sm text-[#3f4851] leading-relaxed font-normal">
              Traditional developer portfolios are static and often isolated. DevConnect makes portfolio showcases dynamic, interactive, and database-backed—allowing real-time likes, feedback discussions, custom profile customization, and live project demos.
            </p>
          </div>
        </section>

        {/* Platform Capabilities Breakdown (4 Grid Cards) */}
        <section className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171c21] tracking-tight">Platform Capabilities</h2>
            <p className="text-sm text-[#3f4851] font-medium">Explore the key features powering the DevConnect ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs hover:border-primary-container transition-all">
              <span className="material-symbols-outlined text-primary-container text-3xl">terminal</span>
              <h3 className="text-base font-bold text-[#171c21]">Interactive Showcases</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Publish live applications with custom cover screenshots, tech stack tags, live demo links, and GitHub repository URLs.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs hover:border-primary-container transition-all">
              <span className="material-symbols-outlined text-primary-container text-3xl">forum</span>
              <h3 className="text-base font-bold text-[#171c21]">Database Discussions</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Engage in peer code reviews with persistent database comments, nested reply threads, and interactive likes.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs hover:border-primary-container transition-all">
              <span className="material-symbols-outlined text-primary-container text-3xl">account_circle</span>
              <h3 className="text-base font-bold text-[#171c21]">Developer Profiles</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Personalize your profile with custom titles, avatar photos, technical skills, GitHub links, and published repositories.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3 shadow-xs hover:border-primary-container transition-all">
              <span className="material-symbols-outlined text-primary-container text-3xl">monitoring</span>
              <h3 className="text-base font-bold text-[#171c21]">Real-Time Metrics</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Track real-time database statistics on projects shared, active engineers, and community engagement metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Architecture & Stack Deep-Dive */}
        <section className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-[#171c21] tracking-tight">Technical Architecture & Stack</h2>
              <p className="text-xs text-gray-500 font-medium mt-1">Built with modern enterprise-grade web standards and security best practices.</p>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Production Ready</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend Architecture */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-[#171c21]">
                <span className="material-symbols-outlined text-primary-container">laptop_mac</span>
                <h3>Frontend Architecture</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>React 18 SPA Framework (Vite)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>React Router v6 SPA Protected Routing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>Context API + useReducer State Pattern</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>Tailwind CSS & Material Symbols</span>
                </li>
              </ul>
            </div>

            {/* Backend & Database */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-[#171c21]">
                <span className="material-symbols-outlined text-primary-container">database</span>
                <h3>Backend & Database</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>Supabase PostgreSQL Engine</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>Supabase Auth & Session Recovery</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>Row Level Security (RLS) Policies</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>Cascading Foreign Key Relations</span>
                </li>
              </ul>
            </div>

            {/* Security & Reliability */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-[#171c21]">
                <span className="material-symbols-outlined text-primary-container">shield</span>
                <h3>Security & Data Control</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-gray-700 font-medium">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>Auto-Refreshed JWT Auth Tokens</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>Owner-Only Resource Mutating RLS</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>Sanitized Form Payloads & Validation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
                  <span>Optimistic UI State Updates</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Banner Section */}
        <section className="bg-white border border-gray-200 rounded-2xl p-10 md:p-14 text-center relative overflow-hidden shadow-sm space-y-6">
          <div className="relative z-10 space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#171c21]">Ready to Showcase Your Software?</h2>
            <p className="text-sm text-[#3f4851] font-medium">
              Join the DevConnect community today. Publish your repositories, customize your profile, and receive peer feedback from developers worldwide.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/explore"
                className="w-full sm:w-auto bg-primary-container hover:bg-sky-400 text-white font-bold text-xs px-8 py-3.5 rounded-xl shadow-md transition-all"
              >
                Explore Community Projects
              </Link>
              <Link
                to="/my-projects"
                className="w-full sm:w-auto border border-gray-300 bg-white text-black font-bold text-xs px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-all shadow-xs"
              >
                Publish Your Project
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
