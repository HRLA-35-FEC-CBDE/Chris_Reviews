const mongoose = require('mongoose');
const db = require('./index.js');

const ProductSchema = mongoose.Schema()

const Product = new ProductSchema({
  product: { type: String, unique: true},
  reviews: [{
    rating: Number,
    title: String,
    review: String,
    recommend: Boolean,
    email: String,
    feedback: String,
    helpful: { type: Number, default: 0 },
    notHelpful: { type: Number, default: 0 },
    report: { type: Boolean, default: false }
  }],
  questions: [{
    question: String,
    answer: String,
    helpful: { type: Number, default: 0} ,
    notHelpful: { type: Number, default: 0 },
    report: { type: Boolean, default: false }
  }]
});

const model = mongoose.model('review', Product);

module.exports = model;