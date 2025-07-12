import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/categoryService';

const PostForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('❌ Failed to fetch categories:', err.message);
        setCategories([]);
      }
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await onSubmit(form); // call prop function
      setMessage('✅ Post created successfully!');
      setForm({ title: '', content: '', category: '' });
    } catch (err) {
      console.error('❌ Error in PostForm:', err);
      setMessage('❌ Failed to create post.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className="text-center text-sm text-blue-700 font-medium">{message}</div>
      )}

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
          required
        />
      </div>

      {/* Category */}
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
          {categories.map((cat) => (
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
  );
};

export default PostForm;
