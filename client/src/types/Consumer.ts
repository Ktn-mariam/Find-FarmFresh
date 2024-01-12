export interface ConsumerType {
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
  _id: string
  image: string
  name: string
  mobileNo: string
  location: string
}

export interface ConsumerTypeForOrder {
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
  _id: string
  name: string
  mobileNo: string
  location: string
}
