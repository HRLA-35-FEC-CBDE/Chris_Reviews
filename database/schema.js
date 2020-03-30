const mongoose = require('mongoose');
const db = require('./');

const ProductSchema = mongoose.Schema;

const NewSchema = new ProductSchema({
  product: {
    type: String, 
    unique: true
  },
  reviews: [{
    name: String,
    createdAt: { type: Date, default: Date.now },
    rating: Number,
    title: String,
    review: String,
    recommend: Boolean,
    email: String,
    feedback: String,
    helpful: {
      type: Number,
      default: 0 
    },
    notHelpful: {
      type: Number,
      default: 0
    },
    report: {
      type: Boolean,
      default: false 
    }
  }],
  questions: [{
    name: String,
    createdAt: { type: Date, default: Date.now },
    question: String,
    answers: [{
      name: String,
      createdAt: { type: Date, default: Date.now },
      answer: String,
      helpful: {
        type: Number,
        default: 0
      } ,
      notHelpful: {
        type: Number,
        default: 0
      },
      report: {
        type: Boolean,
        default: false
      }
    }],
  }]
});

const productModel = mongoose.model('review', NewSchema);

module.exports = productModel;