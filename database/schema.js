const mongoose = require('mongoose');
const db = require('./index.js');

const ProductSchema = mongoose.Schema()

const Product = new ProductSchema({
  product: { type: String, unique: true},
  reviews: [{
    name: String,
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
    name: String,
    question: String,
    answers: [{
      name: String,
      answer: String,
      helpful: { type: Number, default: 0} ,
      notHelpful: { type: Number, default: 0 },
      report: { type: Boolean, default: false }
    }],
  }]
});

const model = mongoose.model('review', Product);

module.exports = model;