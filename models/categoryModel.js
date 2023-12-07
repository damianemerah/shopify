const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Select product category'],
    unique: true,
    trim: true,
  },
  icon: String,
  color: {
    type: String,
    trim: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    trim: true,
  },
  slug: String,
});

categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;

//unisex category products

// enum: [
//   "men's fashion",
//   "women's fashion",
//   'phones & telecommunications',
//   'computer, office & security',
//   'consumer electronics',
//   'jewelry & watches',
//   'home, pet & appliances',
//   'bags & shoes',
//   'toyys, kids & babies',
//   'outdoor fun & sports',
//   'beauty, health & hair',
//   'automobiles & motorcycles',
//   'Tools & Home improvement',
// ],
