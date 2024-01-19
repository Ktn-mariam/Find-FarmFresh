import bcrypt from 'bcryptjs'
import { Document, Schema, Types, model } from 'mongoose'
import jwt from 'jsonwebtoken'

interface ILocationCoordinates {
  latitude: {
    coordinate: number
    direction: 'N' | 'S'
  }
  longitude: {
    coordinate: number
    direction: 'E' | 'W'
  }
}

interface ICartProduct {
  productID: Types.ObjectId
  quantity: number
}

interface ICart {
  farmerID: Types.ObjectId
  totalPrice: number
  products: ICartProduct[]
}

export interface IConsumer extends Document {
  image: string
  name: string
  email: string
  password: string
  mobileNo: string
  location: string
  locationCoordinates: ILocationCoordinates
  following: Types.ObjectId[]
  cart: ICart[]

  getConsumerDetails(): {
    name: string
    image: string
    mobileNo: string
    location: string
    locationCoordinates: ILocationCoordinates
  }

  createJWT(): string

  comparePasswords(candidatePassword: string): boolean
}

const ConsumerSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    immutable: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
    unique: true,
    immutable: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    maxlength: 12,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
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
      farmerID: { type: Schema.Types.ObjectId, ref: 'Farmer' },
      name: { type: String },
    },
  ],
  cart: [
    {
      farmerID: {
        type: Schema.Types.ObjectId,
        ref: 'Farmer',
      },
      farmerName: {
        type: String,
      },
      totalPrice: {
        type: Number,
      },
      products: [
        {
          productID: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
          },
          quantity: {
            type: Number,
          },
        },
      ],
    },
  ],
})

ConsumerSchema.pre('save', async function (this: IConsumer, next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

ConsumerSchema.methods.getConsumerDetails = function () {
  return {
    name: this.name,
    image: this.image,
    mobileNo: this.mobileNo,
    location: this.location,
    locationCoordinates: this.locationCoordinates,
  }
}

ConsumerSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      consumerID: this._id,
      image: this.image,
      name: this.name,
      mobileNo: this.mobileNo,
      location: this.location,
      locationCoordinates: this.locationCoordinates,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_LIFETIME,
    },
  )
}

ConsumerSchema.methods.comparePasswords = async function (
  candidatePassword: string,
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export default model('Consumer', ConsumerSchema)
