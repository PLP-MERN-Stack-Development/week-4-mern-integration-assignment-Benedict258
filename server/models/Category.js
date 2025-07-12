const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Category name must be less than 50 characters']
  },
  slug: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

// Auto-generate slug from name
CategorySchema.pre('save', function (next) {
  this.slug = this.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  next();
});

module.exports = mongoose.model('Category', CategorySchema);
