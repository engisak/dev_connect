import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'

export default function MyProjects() {
  const { user } = useAuth()
  const { projects, loading, createProject, updateProject, deleteProject } = useProjects()

  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(null)

  const userProjects = projects.filter((p) => p.user_id === user?.id)

  const handleOpenCreate = () => {
    setActiveProject(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (project) => {
    setActiveProject(project)
    setModalOpen(true)
  }

  const handleOpenDelete = (project) => {
    setActiveProject(project)
    setDeleteModalOpen(true)
  }

  const handleSaveProject = async (projectPayload) => {
    if (activeProject) {
      return await updateProject(activeProject.id, projectPayload)
    } else {
      return await createProject(projectPayload, user.id)
    }
  }

  const handleDeleteProject = async () => {
    if (activeProject) {
      await deleteProject(activeProject.id)
    }
  }

  return (
    <div className="w-full bg-[#f7f9ff] py-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 space-y-8">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#171c21] tracking-tight flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-3xl md:text-4xl">dashboard</span>
              <span>My Projects / Dashboard</span>
            </h1>
            <p className="text-[#3f4851] text-base mt-1.5 font-medium">
              Manage your published software repositories, update code links, and create new showcases.
            </p>
          </div>

          <button
            onClick={handleOpenCreate}
            className="bg-primary-container hover:bg-sky-400 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Publish New Project</span>
          </button>
        </header>

        {/* Dashboard Stats Strip */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
            <div className="text-3xl font-black text-[#171c21]">{userProjects.length}</div>
            <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">Total Published</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
            <div className="text-3xl font-black text-primary-container">
              {userProjects.reduce((acc, p) => acc + (p.likes_count || 0), 0)}
            </div>
            <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">Total Likes Received</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
            <div className="text-3xl font-black text-emerald-600">Active</div>
            <div className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">Row Level Security Status</div>
          </div>
        </section>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-20 text-center text-gray-500 text-base font-medium">Loading your developer projects...</div>
        ) : userProjects.length === 0 ? (
          <div className="py-16 text-center bg-white border border-gray-200 rounded-xl p-8 space-y-4 max-w-lg mx-auto shadow-xs">
            <span className="material-symbols-outlined text-5xl text-gray-400">code_blocks</span>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#171c21]">No Projects Published Yet</h3>
              <p className="text-sm text-gray-600 font-medium">
                Share your software engineering projects, web applications, or scripts with the DevConnect community.
              </p>
            </div>
            <button
              onClick={handleOpenCreate}
              className="px-6 py-3 bg-primary-container text-white text-sm font-bold rounded-xl shadow-sm hover:bg-sky-400 transition-all"
            >
              Publish Your First Project
            </button>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isOwner={true}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            ))}
          </section>
        )}
      </div>

      {/* Add / Edit Project Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSaveProject}
        initialData={activeProject}
        isEditing={!!activeProject}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteProject}
        projectTitle={activeProject?.title || ''}
      />
    </div>
  )
}
