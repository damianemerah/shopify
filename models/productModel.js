const mongoose = require('mongoose');
const slugify = require('slugify');
// const Category = require('./categoryModel');
// const validator = require('validator');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product must have a name'],
      maxLength: 255,
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
      required: true,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    brand: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: 0,
    },
    discount_rate: {
      type: Number,
      default: 0,
    },
    sellerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.ObjectId,
      ref: 'SubCategory',
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      required: [true, 'Provide how many you have in stock'],
      min: 1,
    },
    soldout: {
      type: Boolean,
      default: false,
    },
    shipping: {
      cost: Number,
      condition: {
        opt: [
          {
            shipLocation: {
              state: [String],
              price: Number,
            },
          },
        ],
      },
    },
    // variants: [
    //   {
    //     type: mongoose.Schema.Mixed,
    //     name: {
    //       type: String,
    //       required: [true, 'Please provide variant name'],
    //     },
    //   },
    // ],
    relatedProducts: [String],
    videoURL: String,
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    seoDescription: {
      type: String,
    },
    keywords: {
      type: String,
      required: false,
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre('save', function (next) {
  this.slug = slugify(this.title);
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

//count isfeatured  Shippping[conditions]
