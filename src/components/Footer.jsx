import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#080c14] border-t border-slate-800 text-slate-300 py-12 md:py-16 px-4 md:px-10 text-sm">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white font-black text-xl">
            <span className="material-symbols-outlined text-primary-container text-2xl font-extrabold" style={{ fontVariationSettings: "'FILL' 1" }}>
              code_blocks
            </span>
            <span>DevConnect</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed font-normal">
            The premier developer showcase platform for sharing applications, getting code feedback, and discovering open-source tools.
          </p>
        </div>

        {/* Navigation Column */}
        <div className="space-y-4">
          <h4 className="text-white font-extrabold uppercase tracking-wider text-xs md:text-sm">Navigation</h4>
          <ul className="space-y-2.5 text-sm font-medium">
            <li><Link to="/" className="hover:text-primary-container transition-colors">Home</Link></li>
            <li><Link to="/explore" className="hover:text-primary-container transition-colors">Explore Projects</Link></li>
            <li><Link to="/about" className="hover:text-primary-container transition-colors">About Platform</Link></li>
            <li><Link to="/contact" className="hover:text-primary-container transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        {/* Community Column */}
        <div className="space-y-4">
          <h4 className="text-white font-extrabold uppercase tracking-wider text-xs md:text-sm">Community & Ecosystem</h4>
          <ul className="space-y-2.5 text-sm font-medium">
            <li><a href="https://github.com/engisak/dev_connect" target="_blank" rel="noreferrer" className="hover:text-primary-container transition-colors">GitHub Repository</a></li>
            <li><a href="https://supabase.com" target="_blank" rel="noreferrer" className="hover:text-primary-container transition-colors">Supabase Cloud</a></li>
            <li><a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:text-primary-container transition-colors">React 18 Docs</a></li>
          </ul>
        </div>

        {/* System Status & Copyright */}
        <div className="space-y-4">
          <h4 className="text-white font-extrabold uppercase tracking-wider text-xs md:text-sm">System Status</h4>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>All Systems Operational</span>
          </div>
          <p className="text-slate-400 text-xs md:text-sm pt-1 leading-relaxed">
            &copy; {new Date().getFullYear()} DevConnect Inc. All rights reserved. Built with React & Supabase.
          </p>
        </div>

      </div>
    </footer>
  )
}
