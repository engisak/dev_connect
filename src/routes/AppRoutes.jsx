import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { ProjectProvider } from '../context/ProjectContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProtectedRoute from './ProtectedRoute'

import Home from '../pages/Home'
import Explore from '../pages/Explore'
import ProjectDetails from '../pages/ProjectDetails'
import MyProjects from '../pages/MyProjects'
import Profile from '../pages/Profile'
import PublicProfile from '../pages/PublicProfile'
import About from '../pages/About'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <div className="min-h-screen flex flex-col bg-[#f7f9ff] text-[#171c21] selection:bg-primary-container selection:text-white">
            <Navbar />
            <main className="flex-1 w-full bg-[#f7f9ff]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="/developer/:userId" element={<PublicProfile />} />
                <Route path="/profile/:userId" element={<PublicProfile />} />
                <Route path="/about" element={<About />} />
                
                {/* Protected Routes */}
                <Route
                  path="/my-projects"
                  element={
                    <ProtectedRoute>
                      <MyProjects />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
