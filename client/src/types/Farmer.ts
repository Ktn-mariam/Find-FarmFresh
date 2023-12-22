import { Comment } from './Comment'

export interface FarmerType {
  locationCoordinates: {
    latitude: {
      coordinate: number
      direction: 'N' | 'S'
    }
    longitude: {
      coordinate: number
      direction: 'E' | 'W'
    }
  }
  farmerRating: {
    voteCount: {
      five: number
      four: number
      three: number
      two: number
      one: number
    }
    rating: number
  }
  _id: string
  image: string
  name: string
  description: string
  mobileNo: string
  location: string
  comments: Comment[] | []
}
