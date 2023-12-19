import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  rating: {
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
  createdAt: {
    type: Date,
    required: true,
  },
  productID: {
    // It can be null
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  farmerID: {
    // It can be null
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
  },
})

export default mongoose.model('Comment', CommentSchema)
