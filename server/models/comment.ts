export {}
const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  consumer_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: true,
  },
  Username: {
    type: String,
    required: true,
  },
  Rating: {
    type: Number,
    required: true,
    min: 0.0,
    max: 5.0,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  product_ID: {
    // It can be null
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  farmer_ID: {
    // It can be null
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
  },
})

module.exports = mongoose.model('Comment', commentSchema)
