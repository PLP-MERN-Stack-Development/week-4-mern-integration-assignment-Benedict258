import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useAddComment } from '../hooks/usePosts'
import { MessageCircle, User } from 'lucide-react'

const CommentSection = ({ post }) => {
  const { isAuthenticated, user } = useAuth()
  const [comment, setComment] = useState('')
  const addCommentMutation = useAddComment()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!comment.trim()) return

    try {
      await addCommentMutation.mutateAsync({
        id: post._id,
        content: comment
      })
      setComment('')
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="mt-12">
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className="h-6 w-6 text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-900">
          Comments ({post.comments?.length || 0})
        </h3>
      </div>

      {/* Add Comment Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              rows={4}
              className="textarea"
              required
            />
          </div>
          <button
            type="submit"
            disabled={addCommentMutation.isLoading || !comment.trim()}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addCommentMutation.isLoading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            Please <a href="/login" className="text-primary-600 hover:underline">login</a> to leave a comment.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment._id} className="border-l-4 border-gray-200 pl-4">
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-900">
                  {comment.author?.name || 'Anonymous'}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  )
}

export default CommentSection