import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  farmerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true,
  },
  farmerName: {
    type: String,
    required: true,
  },
  consumerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
      },
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  deliveryStatus: {
    type: String,
    enum: ['Waiting', 'Transported', 'Cancelled', 'Delivered'],
    default: 'Waiting',
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'UnPaid'],
    default: 'UnPaid',
  },
  notifyConsumer: {
    type: Boolean,
    default: true,
  },
})

export default mongoose.model('Order', OrderSchema)
