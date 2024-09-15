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

interface IFarmerRating {
  rating: number
  voteCount: {
    five: number
    four: number
    three: number
    two: number
    one: number
  }
}

interface IComment {
  userID: Types.ObjectId
  username: string
  rating: number
  title: string
  description: string
  createdAt: Date
}

export interface IFarmer extends Document {
  image: string
  name: string
  email: string
  password: string
  description: string
  mobileNo: string
  location: string
  locationCoordinates: ILocationCoordinates
  farmerRating: IFarmerRating
  comments: IComment[]

  getFarmerDetails(): {
    name: string
    image: string
    description: string
    mobileNo: string
    location: string
    locationCoordinates: ILocationCoordinates
  }

  createJWT(): string

  comparePasswords(candidatePassword: string): boolean
}

const FarmerSchema = new Schema({
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
  },
  description: {
    type: String,
    required: true,
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
  farmerRating: {
    rating: {
      type: Number,
      default: 5,
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
      userID: {
        type: Schema.Types.ObjectId,
        ref: 'Consumer',
      },
      username: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
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
})

FarmerSchema.pre('save', async function (this: IFarmer, next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

FarmerSchema.methods.getFarmerDetails = function () {
  return {
    name: this.name,
    image: this.image,
    description: this.description,
    mobileNo: this.mobileNo,
    location: this.location,
    locationCoordinates: this.locationCoordinates,
  }
}

FarmerSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      farmerID: this._id,
      image: this.image,
      name: this.name,
      description: this.description,
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

FarmerSchema.methods.comparePasswords = async function (
  candidatePassword: string,
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export default model('Farmer', FarmerSchema)
