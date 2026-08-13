import React, { useState } from 'react'

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, projectTitle }) {
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleDelete = async () => {
    setLoading(true)
    await onConfirm()
    setLoading(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 shadow-2xl space-y-6 text-center">
        
        <div className="inline-flex p-3 bg-red-50 text-red-600 rounded-xl border border-red-200">
          <span className="material-symbols-outlined text-3xl">warning</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-black">Delete Project</h3>
          <p className="text-xs text-gray-600">
            Are you sure you want to delete <span className="text-black font-semibold">"{projectTitle}"</span>? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-lg transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="px-5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-lg shadow-sm transition-all disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete Permanently'}
          </button>
        </div>
      </div>
    </div>
  )
}
