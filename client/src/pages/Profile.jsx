import React from 'react'
import { useAuth } from '../context/AuthContext'
import { usePosts } from '../hooks/usePosts'
import PostCard from '../components/PostCard'
import { User, Calendar, Edit } from 'lucide-react'

const Profile = () => {
  const { user } = useAuth()
  const { data: postsData, isLoading } = usePosts({ 
    author: user?._id,
    published: undefined // Show both published and unpublished posts
  })

  const posts = postsData?.data?.data || []

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="card p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-primary-600" />
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user?.name}
            </h1>
            <p className="text-gray-600 mb-2">{user?.email}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Member since {formatDate(user?.createdAt)}</span>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{posts.length}</div>
            <div className="text-sm text-gray-500">Posts</div>
          </div>
        </div>
      </div>

      {/* User's Posts */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Posts</h2>
          <a href="/create" className="btn btn-primary flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>Write New Post</span>
          </a>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="relative">
                <PostCard post={post} />
                {!post.published && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                      Draft
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You haven't written any posts yet.</p>
            <a href="/create" className="btn btn-primary">
              Write Your First Post
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile