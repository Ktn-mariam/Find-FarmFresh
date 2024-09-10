import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
        required: true,
      },
    ],
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    parentCategory: {
      type: String,
      enum: {
        values: [
          'Fruits',
          'Vegetables',
          'Coffee & Tea',
          'Dairy & eggs',
          'Meat',
          'Honey & Bee Products',
          'Flowers',
          'Dried Fruits & Nuts',
        ],
        message: '{VALUE} is not supported',
      },
    },
    category: {
      type: String,
      enum: {
        values: [
          'Bananas',
          'Oranges',
          'Apples',
          'Mangoes',
          'Pinapples',
          'Strawberries',
          'Potatoes',
          'Onions',
          'Tomatoes',
          'Brinjals',
          'Cauliflower',
          'Spinach',
          'Carrots',
          'Tea',
          'Coffee',
          'Milk',
          'Butter',
          'Cheese',
          'Eggs',
          'Goat',
          'Sheep',
          'Chicken',
          'Fish',
          'Honey',
          'Beewax',
          'Pollen',
          'Rose',
          'Orchids',
          'Sunflowers',
          'Lillies',
          'Tulips',
          'Dahlia',
          'Pistachios',
          'Apricot',
          'Dates',
          'Cashew',
          'Almonds',
        ],
        message: '{VALUE} is not supported',
      },
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      required: true,
    },
    organic: {
      type: Boolean,
      required: true,
    },
    transaction: {
      type: Boolean,
      required: true,
    },
    cashOnDelivery: {
      type: Boolean,
      required: true,
    },
    returnableChoice: {
      type: Boolean,
      required: true,
    },
    onSiteShopping: {
      type: Boolean,
      required: true,
    },
    hasDiscount: {
      type: Boolean,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    farmerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmer',
      required: true,
    },
    farmerName: {
      type: String,
      required: true,
    },
    productRating: {
      rating: {
        type: Number,
        default: 5,
        min: 0.0,
        max: 5.0,
      },
      voteCount: {
        five: {
          type: Number,
          default: 1,
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
        userID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Consumer',
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
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true },
)

export default mongoose.model('Product', ProductSchema)
