const consumerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  locationCoordinates: {
    latitude: {
      coordinate: {
        type: Number,
        required: true,
      },
      direction: {
        type: String,
        enum: ['N', 'S'],
        required: true,
      },
    },
    longitude: {
      coordinate: {
        type: Number,
        required: true,
      },
      direction: {
        type: String,
        enum: ['E', 'W'],
        required: true,
      },
    },
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmer',
    },
  ],
  cart: [
    {
      farmer_ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
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
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
})

module.exports = mongoose.model('Consumer', consumerSchema)
