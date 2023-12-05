const farmerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
      },
      direction: {
        type: String,
        enum: ['N', 'S'],
      },
    },
    longitude: {
      coordinate: {
        type: Number,
      },
      direction: {
        type: String,
        enum: ['E', 'W'],
      },
    },
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Replace 'Product' with the actual model name for products
    },
  ],
  farmerRating: {
    Rating: {
      type: Number,
      required: true,
      min: 0.0,
      max: 5.0,
    },
    VoteCount: {
      five: {
        type: Number,
        default: 0,
      },
      four: {
        type: Number,
        default: 0,
      },
      three: {
        type: Number,
        default: 0,
      },
      two: {
        type: Number,
        default: 0,
      },
      one: {
        type: Number,
        default: 0,
      },
    },
  },
  comments: [
    {
      commentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
      UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
      },
      UserName: {
        type: String,
      },
      Rating: {
        type: Number,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
})

module.exports = mongoose.model('Farmer', farmerSchema)
