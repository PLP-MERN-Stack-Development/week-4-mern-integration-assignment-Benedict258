// server/seed/categorySeeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('../models/Category');

dotenv.config();

const categories = [
  { name: 'Technology' },
  { name: 'Health' },
  { name: 'News' },
  { name: 'Education' },
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await Category.deleteMany({});
    
    for (const cat of categories) {
      const category = new Category(cat);
      await category.save(); // ✅ this triggers slug pre-save
    }

    console.log('✅ Categories seeded!');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  });
