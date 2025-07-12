const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET /api/categories — get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch categories', error: err.message });
  }
});

module.exports = router;
