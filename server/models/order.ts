const orderSchema = new mongoose.Schema({
  farmer_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true,
  },
  farmerName: {
    type: String,
    required: true,
  },
  consumer_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  products: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
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
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Paid', 'UnPaid'],
    required: true,
  },
})

module.exports = mongoose.model('Order', orderSchema)
