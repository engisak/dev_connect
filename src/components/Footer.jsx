import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white w-full py-10 border-t border-gray-200 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-10 max-w-[1280px] mx-auto">
        <div className="col-span-1 md:col-span-1">
          <div className="text-xl font-extrabold text-black mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">code_blocks</span>
            DevConnect
          </div>
          <p className="text-xs text-gray-500 font-mono mt-2 max-w-xs">
            © {new Date().getFullYear()} DevConnect. Built for developers.
          </p>
        </div>
        
        <div className="col-span-1 md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xs font-semibold text-black uppercase tracking-wider mb-4">Ecosystem</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-600 font-mono">
              <li><Link className="hover:text-primary-container transition-colors" to="/">React</Link></li>
              <li><Link className="hover:text-primary-container transition-colors" to="/">Supabase</Link></li>
              <li><Link className="hover:text-primary-container transition-colors" to="/">Tailwind</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-black uppercase tracking-wider mb-4">Community</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-600 font-mono">
              <li><a className="hover:text-primary-container transition-colors" href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a className="hover:text-primary-container transition-colors" href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a></li>
              <li><a className="hover:text-primary-container transition-colors" href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-black uppercase tracking-wider mb-4">Pages</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-gray-600 font-mono">
              <li><Link className="hover:text-primary-container transition-colors" to="/explore">Explore</Link></li>
              <li><Link className="hover:text-primary-container transition-colors" to="/about">About</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
