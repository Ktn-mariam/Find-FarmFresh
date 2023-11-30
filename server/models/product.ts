const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  parentCategory: {
    type: String,
    enum: {
      values: [
        'Fruits',
        'Vegetables',
        'Coffee & Tea',
        'Diary & Eggs',
        'Meat',
        'Honey & Bee Products',
        'Flowers',
        'Dried Fruits',
      ],
      message: '{VALUE} is not supported',
    },
  },
  childCategory: {
    type: String,
    enum: {
      values: [
        'Apples',
        'Bananas',
        'Carrots',
        'Brinjals',
        'Coffee',
        'Tea',
        'Milk',
        'Chicken',
        'Mutton',
        'Honey',
        'Roses',
        'Almonds',
      ],
      message: '{VALUE} is not supported',
    },
  },
  delivery: {
    type: Boolean,
    default: false,
  },
  organic: {
    type: Boolean,
    default: false,
  },
  transaction: {
    type: Boolean,
    default: false,
  },
  cashOnDelivery: {
    type: Boolean,
    default: false,
  },
  returnableChoice: {
    type: Boolean,
    default: false,
  },
  onSiteShopping: {
    type: Boolean,
    default: false,
  },
  farmerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Farmer',
  },
  productRating: {
    rating: {
      type: Number,
      default: 0,
      min: 0.0,
      max: 5.0,
    },
    voteCount: {
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
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer',
      },
      userName: {
        type: String,
      },
      rating: {
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
        default: Date.now,
      },
    },
  ],
})

module.exports = mongoose.model('Product', productSchema)
