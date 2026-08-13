import React, { useState, useEffect } from 'react'
import { useProjects } from '../hooks/useProjects'
import { supabase } from '../services/supabase'
import { formatDate } from '../utils/formatters'
import DeleteConfirmModal from '../components/DeleteConfirmModal'

export default function AdminDashboard() {
  const { projects, deleteProject, fetchProjects } = useProjects()

  const [usersList, setUsersList] = useState([])
  const [commentsCount, setCommentsCount] = useState(0)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('projects')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

  // Fetch admin stats & users
  useEffect(() => {
    const fetchAdminData = async () => {
      setLoadingUsers(true)
      try {
        const { data: usersData } = await supabase
          .from('profiles')
          .select('*')
          .order('updated_at', { ascending: false })

        const { count: cCount } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })

        setUsersList(usersData || [])
        setCommentsCount(cCount || 0)
      } catch (err) {
        console.error('Error fetching admin data:', err.message)
      } finally {
        setLoadingUsers(false)
      }
    }

    fetchAdminData()
  }, [])

  const filteredProjects = projects.filter((p) => {
    const query = searchQuery.toLowerCase()
    return (
      p.title?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.profiles?.full_name?.toLowerCase().includes(query) ||
      p.tech_stack?.toLowerCase().includes(query)
    )
  })

  const handleOpenDelete = (project) => {
    setSelectedProject(project)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedProject) {
      await deleteProject(selectedProject.id)
      await fetchProjects()
    }
  }

  const toggleAdminStatus = async (userId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId)

      if (error) throw error

      setUsersList((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, is_admin: !currentStatus } : u))
      )
    } catch (err) {
      console.error('Error toggling admin privilege:', err.message)
    }
  }

  return (
    <div className="w-full bg-[#f7f9ff] py-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 space-y-8">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 border border-red-200 rounded-full text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              <span>Admin Moderation Control</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#171c21] tracking-tight">Admin Moderation Dashboard</h1>
            <p className="text-xs text-gray-500 font-medium mt-1">
              Review published repositories, moderate content, remove policy-violating posts, and manage platform users.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'projects'
                  ? 'bg-primary-container text-white shadow-sm'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'users'
                  ? 'bg-primary-container text-white shadow-sm'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Users ({usersList.length})
            </button>
          </div>
        </header>

        {/* Stats Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
            <div className="text-2xl font-black text-[#171c21]">{projects.length}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Total Published Repos</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
            <div className="text-2xl font-black text-primary-container">{usersList.length}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Registered Developers</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
            <div className="text-2xl font-black text-emerald-600">{commentsCount}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Total Comments</div>
          </div>
        </section>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
          <input
            type="text"
            placeholder="Search projects or authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-xl py-2 pl-9 pr-3 text-black text-xs placeholder-gray-400 outline-none transition-all font-medium"
          />
        </div>

        {/* Projects Tab Content */}
        {activeTab === 'projects' && (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 font-bold text-sm text-[#171c21] flex justify-between items-center">
              <span>All Published Repositories ({filteredProjects.length})</span>
              <span className="text-xs font-mono text-gray-500 font-normal">Moderate & Delete Violating Posts</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
                  <tr>
                    <th className="p-4">Project</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Tech Stack</th>
                    <th className="p-4">Likes</th>
                    <th className="p-4">Published</th>
                    <th className="p-4 text-right">Moderation Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {filteredProjects.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={p.image_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=150&q=80'}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-black text-sm">{p.title}</div>
                          <div className="text-[11px] text-gray-500 line-clamp-1 max-w-xs">{p.description}</div>
                        </div>
                      </td>

                      <td className="p-4 font-semibold text-black">
                        {p.profiles?.full_name || 'Developer'}
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-primary-container/10 text-primary font-mono rounded font-semibold text-[11px]">
                          {p.tech_stack || 'General'}
                        </span>
                      </td>

                      <td className="p-4 font-mono font-bold text-black">
                        {p.likes_count || 0}
                      </td>

                      <td className="p-4 text-gray-500 font-mono text-[11px]">
                        {formatDate(p.created_at)}
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleOpenDelete(p)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-200 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1 active:scale-95"
                          title="Remove policy-violating post"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                          <span>Delete (Admin)</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Users Tab Content */}
        {activeTab === 'users' && (
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 font-bold text-sm text-[#171c21]">
              Platform Users ({usersList.length})
            </div>

            {loadingUsers ? (
              <div className="p-8 text-center text-xs text-gray-400">Loading platform users...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-700">
                  <thead className="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100">
                    <tr>
                      <th className="p-4">Developer</th>
                      <th className="p-4">Title / Role</th>
                      <th className="p-4">Skills</th>
                      <th className="p-4">Role Status</th>
                      <th className="p-4 text-right">Admin Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {usersList.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50/80 transition-colors">
                        <td className="p-4 flex items-center gap-2.5">
                          {u.avatar_url ? (
                            <img src={u.avatar_url} alt={u.full_name} className="w-8 h-8 rounded-full border border-gray-300 object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary flex items-center justify-center font-bold text-xs">
                              {(u.full_name || 'D').charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="font-bold text-black">{u.full_name || 'Developer'}</span>
                        </td>

                        <td className="p-4 text-gray-600">
                          {u.title || 'Full-Stack Developer'}
                        </td>

                        <td className="p-4 font-mono text-[11px] text-gray-500">
                          {u.skills || 'React, JavaScript'}
                        </td>

                        <td className="p-4">
                          {u.is_admin ? (
                            <span className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 font-bold rounded-md text-[10px] uppercase">
                              Admin
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 border border-gray-200 font-semibold rounded-md text-[10px] uppercase">
                              User
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          <button
                            onClick={() => toggleAdminStatus(u.id, u.is_admin)}
                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-black border border-gray-300 rounded-lg text-xs font-semibold transition-all"
                          >
                            {u.is_admin ? 'Revoke Admin' : 'Make Admin'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        projectTitle={selectedProject?.title || ''}
      />
    </div>
  )
}
