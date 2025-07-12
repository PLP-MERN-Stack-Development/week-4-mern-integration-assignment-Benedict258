const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');

dotenv.config(); // Load MONGODB_URI from .env

const categories = [
  { name: 'Technology' },
  { name: 'Health' },
  { name: 'News' },
  { name: 'Education' },
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Category.deleteMany({});
    await Category.insertMany(categories);
    console.log('✅ Categories seeded!');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  });
