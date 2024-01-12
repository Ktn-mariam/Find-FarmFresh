export interface OrderType {
  _id: string
  farmerID: string
  farmerName: string
  consumerID: string
  orderDate: Date
  totalPrice: number
  products: {
    productID: string
    quantity: number
  }[]

  deliveryStatus: 'Waiting' | 'Cancelled' | 'Delivered' | 'Transported'
  paymentStatus: 'UnPaid' | 'Paid'
  notifyConsumer: boolean
}

export interface CartItem {
  farmerID: string
  farmerName: string
  totalPrice: number
  products: {
    productID: string
    quantity: number
  }[]
}
