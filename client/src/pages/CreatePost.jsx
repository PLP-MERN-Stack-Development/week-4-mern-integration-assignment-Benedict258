import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePost } from '../hooks/usePosts';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/AuthContext';

const CreatePost = () => {
  const navigate = useNavigate();
  const createPostMutation = useCreatePost();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (data) => {
    try {
      const response = await createPostMutation.mutateAsync({
        ...data,
        author: user._id,
      });
      navigate(`/posts/${response.data.data._id}`);
    } catch (error) {
      console.error('❌ Failed to create post:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
        <p className="text-gray-600">
          Share your thoughts and ideas with the community.
        </p>
      </div>

      <div className="card p-8">
        <PostForm onSubmit={handleSubmit} loading={createPostMutation.isLoading} />
      </div>
    </div>
  );
};

export default CreatePost;
