import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../services/categoryService';
import { AuthContext } from '../context/AuthContext';

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 🔒 Redirect if not authenticated
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // 📦 Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('❌ Failed to fetch categories:', err.message);
        setCategories([]); // fallback to empty array
      }
    };
    loadCategories();
  }, []);

  // 📩 Form input handling
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const postData = {
        ...form,
        author: user._id,
      };

      const response = await axios.post('/api/posts', postData);
      setMessage('✅ Post created successfully!');
      setForm({ title: '', content: '', category: '' });
      navigate(`/posts/${response.data.data._id}`);
    } catch (err) {
      console.error('❌ Error creating post:', err.message);
      setMessage('❌ Failed to create post.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create New Post</h2>

      {message && (
        <div className="mb-4 text-sm text-center text-blue-700 font-medium">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="input"
            placeholder="Post title"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="input"
            rows={5}
            placeholder="Post content"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">-- Select Category --</option>
            {Array.isArray(categories) &&
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
