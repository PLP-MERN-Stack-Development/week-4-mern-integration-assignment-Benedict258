import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, Eye, MessageCircle } from 'lucide-react'

const PostCard = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="card p-6 hover:shadow-md transition-shadow duration-200">
      {/* Category Badge */}
      <div className="mb-3">
        <span 
          className="inline-block px-3 py-1 text-xs font-medium text-white rounded-full"
          style={{ backgroundColor: post.category?.color || '#3B82F6' }}
        >
          {post.category?.name || 'Uncategorized'}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
        <Link 
          to={`/posts/${post._id}`}
          className="hover:text-primary-600 transition-colors"
        >
          {post.title}
        </Link>
      </h2>

      {/* Excerpt */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.excerpt}
      </p>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Meta information */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{post.author?.name || 'Anonymous'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{post.views || 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard