import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePost, useUpdatePost } from '../hooks/usePosts'
import { useAuth } from '../context/AuthContext'
import PostForm from '../components/PostForm'

const EditPost = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: postData, isLoading } = usePost(id)
  const updatePostMutation = useUpdatePost()

  const post = postData?.data?.data

  const handleSubmit = async (data) => {
    try {
      await updatePostMutation.mutateAsync({ id, data })
      navigate(`/posts/${id}`)
    } catch (error) {
      console.error('Failed to update post:', error)
    }
  }

  // Check if user can edit this post
  const canEdit = user && (user._id === post?.author?._id || user.role === 'admin')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Post not found.</p>
      </div>
    )
  }

  if (!canEdit) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">You don't have permission to edit this post.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Post</h1>
        <p className="text-gray-600">
          Update your post content and settings.
        </p>
      </div>

      <div className="card p-8">
        <PostForm 
          post={post}
          onSubmit={handleSubmit} 
          loading={updatePostMutation.isLoading}
        />
      </div>
    </div>
  )
}

export default EditPost