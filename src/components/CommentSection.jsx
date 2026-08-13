import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../services/supabase'
import { formatDate } from '../utils/formatters'

export default function CommentSection({ projectId }) {
  const { user } = useAuth()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [newCommentText, setNewCommentText] = useState('')
  const [replyingToId, setReplyingToId] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [posting, setPosting] = useState(false)

  // Fetch comments and nested replies directly from Supabase Database
  const fetchComments = async () => {
    if (!projectId) return
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: true })

      if (error) throw error

      const rawComments = data || []
      
      // Separate top-level comments and nested replies
      const topLevel = rawComments.filter((c) => !c.parent_id)
      const replies = rawComments.filter((c) => c.parent_id)

      // Attach replies to their respective parent comment
      const structuredComments = topLevel.map((comment) => ({
        ...comment,
        replies: replies.filter((r) => r.parent_id === comment.id),
      }))

      setComments(structuredComments)
    } catch (err) {
      console.error('Error fetching database comments:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [projectId])

  // Post top-level comment to Supabase Database
  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newCommentText.trim() || !user) return

    setPosting(true)
    try {
      const { error } = await supabase.from('comments').insert([
        {
          project_id: projectId,
          user_id: user.id,
          content: newCommentText.trim(),
          parent_id: null,
        },
      ])

      if (error) throw error
      setNewCommentText('')
      await fetchComments()
    } catch (err) {
      console.error('Error posting comment:', err.message)
    } finally {
      setPosting(false)
    }
  }

  // Post nested reply to parent comment in Supabase Database
  const handleAddReply = async (parentId, e) => {
    e.preventDefault()
    if (!replyText.trim() || !user) return

    setPosting(true)
    try {
      const { error } = await supabase.from('comments').insert([
        {
          project_id: projectId,
          user_id: user.id,
          content: replyText.trim(),
          parent_id: parentId,
        },
      ])

      if (error) throw error
      setReplyText('')
      setReplyingToId(null)
      await fetchComments()
    } catch (err) {
      console.error('Error posting reply:', err.message)
    } finally {
      setPosting(false)
    }
  }

  // Delete comment or reply from Supabase Database
  const handleDeleteComment = async (commentId) => {
    try {
      const { error } = await supabase.from('comments').delete().eq('id', commentId)
      if (error) throw error
      await fetchComments()
    } catch (err) {
      console.error('Error deleting comment:', err.message)
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-4 text-black font-bold text-lg">
        <span className="material-symbols-outlined text-primary-container">chat</span>
        <h2>Database Discussion ({comments.length})</h2>
      </div>

      {/* Main Comment Box */}
      {user ? (
        <form onSubmit={handleAddComment} className="flex gap-3">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="User"
              className="w-8 h-8 rounded-full border border-primary-container object-cover shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary-container/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary-container/20">
              {(user.user_metadata?.full_name || user.email).charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              placeholder="Write a feedback comment to save in database..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="flex-1 bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg px-4 py-2 text-xs text-black placeholder-gray-400 outline-none transition-all font-medium"
            />
            <button
              type="submit"
              disabled={!newCommentText.trim() || posting}
              className="px-4 py-2 bg-primary-container hover:bg-sky-400 disabled:opacity-40 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1 transition-all shrink-0"
            >
              <span>{posting ? 'Posting...' : 'Post'}</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 text-center font-medium">
          Please sign in to post comments and replies into the Supabase database.
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="py-8 text-center text-xs text-gray-400 font-medium">Fetching comments from database...</div>
      ) : comments.length === 0 ? (
        <div className="py-8 text-center text-xs text-gray-500 font-medium">No comments in database yet. Be the first to comment!</div>
      ) : (
        /* Comments List */
        <div className="space-y-6 pt-2">
          {comments.map((c) => {
            const authorName = c.profiles?.full_name || 'Developer'
            const authorAvatar = c.profiles?.avatar_url
            const initials = authorName.charAt(0).toUpperCase()
            const isCommentOwner = user && user.id === c.user_id

            return (
              <div key={c.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                {/* Comment Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    {authorAvatar ? (
                      <img src={authorAvatar} alt={authorName} className="w-7 h-7 rounded-full object-cover border border-gray-300" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-white border border-gray-300 flex items-center justify-center font-bold text-black text-[10px]">
                        {initials}
                      </div>
                    )}
                    <span className="font-bold text-[#171c21]">{authorName}</span>
                    <span className="text-[10px] text-gray-500 font-mono">• {formatDate(c.created_at)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {user && (
                      <button
                        onClick={() => setReplyingToId(replyingToId === c.id ? null : c.id)}
                        className="text-xs font-semibold text-primary-container hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">reply</span>
                        <span>Reply</span>
                      </button>
                    )}
                    {isCommentOwner && (
                      <button
                        onClick={() => handleDeleteComment(c.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete comment from database"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Comment Content */}
                <p className="text-xs text-gray-800 pl-9 leading-relaxed font-normal">{c.content}</p>

                {/* Nested Reply Form */}
                {replyingToId === c.id && (
                  <form onSubmit={(e) => handleAddReply(c.id, e)} className="pl-9 pt-2 flex gap-2">
                    <input
                      type="text"
                      placeholder={`Reply to ${authorName}...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-1 bg-white border border-gray-300 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg px-3 py-1.5 text-xs text-black placeholder-gray-400 outline-none font-medium"
                    />
                    <button
                      type="submit"
                      disabled={!replyText.trim() || posting}
                      className="px-3 py-1.5 bg-primary-container text-white font-bold text-xs rounded-lg shadow-xs hover:bg-sky-400 disabled:opacity-40"
                    >
                      {posting ? 'Sending...' : 'Send Reply'}
                    </button>
                  </form>
                )}

                {/* Nested Replies List */}
                {c.replies && c.replies.length > 0 && (
                  <div className="pl-8 pt-2 space-y-2 border-l-2 border-primary-container/30 ml-3">
                    {c.replies.map((reply) => {
                      const replyAuthorName = reply.profiles?.full_name || 'Developer'
                      const replyAuthorAvatar = reply.profiles?.avatar_url
                      const replyInitials = replyAuthorName.charAt(0).toUpperCase()
                      const isReplyOwner = user && user.id === reply.user_id

                      return (
                        <div key={reply.id} className="p-3 bg-white border border-gray-200 rounded-lg space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-xs">
                              {replyAuthorAvatar ? (
                                <img src={replyAuthorAvatar} alt={replyAuthorName} className="w-5 h-5 rounded-full object-cover border border-gray-300" />
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-primary-container/10 border border-primary-container/20 flex items-center justify-center font-bold text-[9px] text-primary">
                                  {replyInitials}
                                </div>
                              )}
                              <span className="font-bold text-[#171c21]">{replyAuthorName}</span>
                              <span className="text-[10px] text-gray-500 font-mono">• {formatDate(reply.created_at)}</span>
                            </div>

                            {isReplyOwner && (
                              <button
                                onClick={() => handleDeleteComment(reply.id)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                                title="Delete reply from database"
                              >
                                <span className="material-symbols-outlined text-xs">delete</span>
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-gray-700 pl-7 leading-relaxed font-normal">{reply.content}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
