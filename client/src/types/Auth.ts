import { Comment } from './Comment'

export enum Role {
  Farmer = 'Farmer',
  Consumer = 'Consumer',
}

export interface ProfileSidebarInformationType {
  locationCoordinates: {
    latitude: {
      coordinate: number
      direction: 'N' | 'S'
    }
    longitude: {
      coordinate: number
      direction: 'W' | 'E'
    }
  }
  rating?: {
    voteCount: {
      five: number
      four: number
      three: number
      two: number
      one: number
    }
    rating: number
  }
  image: string | File
  name: string
  description?: string
  mobileNo: string
  location: string
  ID?: string
}

export interface UserProfileType {
  locationCoordinates?: {
    latitude: {
      coordinate: number
      direction: 'N' | 'S'
    }
    longitude: {
      coordinate: number
      direction: 'E' | 'W'
    }
  }
  farmerRating?: {
    voteCount: {
      five: number
      four: number
      three: number
      two: number
      one: number
    }
    rating: number
  }
  userID?: string
  image?: string
  name?: string
  description?: string
  mobileNo?: string
  location?: string
  comments?: Comment[]
  role?: 'Farmer' | 'Consumer'
  loggedIn: boolean
  following?: {
    farmerID: string
    name: string
  }[]
}
