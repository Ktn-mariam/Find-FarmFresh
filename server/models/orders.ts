const orderSchema = new mongoose.Schema({
  orderID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  FarmerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true,
  },
  FarmerName: {
    type: String,
    required: true,
  },
  Customer_ID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consumer',
    required: true,
  },
  OrderDate: {
    type: Date,
    default: Date.now,
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
