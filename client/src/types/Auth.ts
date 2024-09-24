import { Comment } from './Comment'

export enum Role {
  Farmer = 'Farmer',
  Consumer = 'Consumer',
}

export interface SignUpDetailsType {
  name: string
  image: string | File
  email: string
  password: string
  description?: string
  mobileNo: string
  location: string
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
}

export interface ProfileInformationType {
  name: string
  image: File | string
  description?: string
  mobileNo: string
  location: string
  latitudeCoordinate: number | undefined
  latitudeDirection: 'N' | 'S'
  longitudeCoordinate: number | undefined
  longitudeDirection: 'E' | 'W'
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

export interface LocationCoordinatesType {
  latitude: {
    coordinate: number
    direction: 'N' | 'S'
  }
  longitude: {
    coordinate: number
    direction: 'E' | 'W'
  }
}

export interface RatingStatType {
  voteCount: {
    five: number
    four: number
    three: number
    two: number
    one: number
  }
  rating: number
}
