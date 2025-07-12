const express = require('express');
const router = express.Router();

// ✅ Import controller functions
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment
} = require('../controllers/postController');

// ✅ Auth middleware to protect routes
const { protect } = require('../middleware/auth');

// 📄 Public Routes
router.get('/', getPosts);         // Get all posts
router.get('/:id', getPost);       // Get a single post by ID

// 🔐 Protected Routes
router.post('/', protect, createPost);              // Create a new post
router.put('/:id', protect, updatePost);            // Update a post
router.delete('/:id', protect, deletePost);         // Delete a post
router.post('/:id/comments', protect, addComment);  // Add a comment to a post

// ✅ Export router
module.exports = router;
