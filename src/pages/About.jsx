import React from 'react'

export default function About() {
  return (
    <main className="flex-grow pt-[100px] pb-12 px-4 md:px-10 max-w-[1000px] mx-auto w-full space-y-10">
      {/* Header */}
      <header className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex p-3 bg-primary-container/10 border border-primary-container/20 text-primary-container rounded-full">
          <span className="material-symbols-outlined text-3xl">code_blocks</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight">About DevConnect</h1>
        <p className="text-gray-600 text-base">
          A full-stack ReactJS showcase platform built for software developers to publish projects, connect, and receive peer feedback.
        </p>
      </header>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-black font-bold text-lg">
            <span className="material-symbols-outlined text-primary-container">laptop_mac</span>
            <h2>Frontend Architecture</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
              <span>React 18 Single Page Application framework (Vite)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
              <span>React Router v6 for SPA routing & Protected Routes</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
              <span>Context API + useReducer for global state management</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
              <span>Tailwind CSS & Material Symbols Outlined icons</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-black font-bold text-lg">
            <span className="material-symbols-outlined text-primary-container">database</span>
            <h2>Backend & Database</h2>
          </div>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
              <span>Supabase PostgreSQL Database engine</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
              <span>Supabase Auth for session security & user persistence</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-sm">check_circle</span>
              <span>Row Level Security (RLS) policies guarding CRUD access</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
