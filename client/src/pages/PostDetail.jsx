import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { usePost, useDeletePost } from '../hooks/usePosts'
import { useAuth } from '../context/AuthContext'
import CommentSection from '../components/CommentSection'
import { Calendar, User, Eye, Edit, Trash2, ArrowLeft } from 'lucide-react'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  const { data: postData, isLoading, error } = usePost(id)
  const deletePostMutation = useDeletePost()

  const post = postData?.data?.data

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePostMutation.mutateAsync(id)
        navigate('/')
      } catch (error) {
        console.error('Failed to delete post:', error)
      }
    }
  }

  const canEditPost =
    isAuthenticated &&
    user &&
    (user._id === post?.author?._id || user.role === 'admin')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Post not found or failed to load.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Posts</span>
      </Link>

      {/* Header */}
      <header className="mb-8">
        {/* Category */}
        <div className="mb-4">
          <span
            className="inline-block px-3 py-1 text-sm font-medium text-white rounded-full"
            style={{ backgroundColor: post.category?.color || '#3B82F6' }}
          >
            {post.category?.name || 'Uncategorized'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>{post.author?.name || 'Anonymous'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>{post.views} views</span>
          </div>
        </div>

        {/* Edit/Delete */}
        {canEditPost && (
          <div className="flex items-center space-x-4 mb-6">
            <Link
              to={`/edit/${post._id}`}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Link>
            <button
              onClick={handleDelete}
              disabled={deletePostMutation.isLoading}
              className="btn btn-danger flex items-center space-x-2 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              <span>
                {deletePostMutation.isLoading ? 'Deleting...' : 'Delete'}
              </span>
            </button>
          </div>
        )}

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {post.content}
        </div>
      </div>

      {/* Comments */}
      <CommentSection post={post} />
    </article>
  )
}

export default PostDetail
