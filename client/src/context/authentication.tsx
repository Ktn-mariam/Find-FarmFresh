import React, { createContext, useEffect, useState } from 'react'
import { Comment } from '../types/Comment'
import { Role } from '../types/Auth'
import { CartItem } from '../types/Order'

interface AddToCartItemType {
  farmerID: string
  farmerName: string
  productID: string
  quantity: number
  productPrice: number
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
  comments?: Comment[] | undefined
  role?: 'Farmer' | 'Consumer'
  loggedIn: boolean
  // ORDERS
  cart?: CartItem[]
}

interface UpdateQuantityItemType {
  farmerID: string
  productID: string
  quantity: number
}

interface AuthenticationContextType {
  logInData: UserProfileType
  loadingLogInData: boolean
  setLogInData: React.Dispatch<React.SetStateAction<UserProfileType>>
  logInError: boolean
  handleAddToCart: (addToCartItem: AddToCartItemType) => void
  updateQuantityInCart: (updateQuantityItem: UpdateQuantityItemType) => void
  updateTotalPrice: (updateTotalPrice: {
    farmerID: string
    totalPrice: number
  }) => void
  deleteItemFromCart: (deleteItem: {
    farmerID: string
    productID: string
  }) => void
  deleteAllItemsFromCartofFarmer: (farmerID: string) => void
  checkOutAllHandler: () => Promise<void>
}

const AuthenticationContext = createContext<AuthenticationContextType>({
  logInData: {
    loggedIn: false,
  },
  loadingLogInData: true,
  setLogInData: () => {},
  logInError: false,
  handleAddToCart: () => {},
  updateQuantityInCart: () => {},
  updateTotalPrice: () => {},
  deleteItemFromCart: () => {},
  deleteAllItemsFromCartofFarmer: () => {},
  checkOutAllHandler: async () => {},
})

interface AuthenticationContextProviderPropsType {
  children: string | JSX.Element | JSX.Element[]
}

export const AuthenticationContextProvider: React.FC<AuthenticationContextProviderPropsType> = ({
  children,
}) => {
  const token = localStorage.getItem('token')

  const [loadingLogInData, setLoadingLogInData] = useState(true)
  const [logInData, setLogInData] = useState<UserProfileType>({
    loggedIn: false,
  })
  const [logInError, setLogInError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoadingLogInData(false)
        return
      }
      const parsedToken = JSON.parse(token)
      const userResponse = await fetch('http://localhost:5000/api/v1/auth', {
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      })
      const userData = await userResponse.json()

      if (userResponse.ok) {
        const loginInfo: UserProfileType = {
          loggedIn: true,
          userID: userData.user.userID,
          role: userData.user.role,
          name: userData.user.userDetail[0].name,
          image: userData.user.userDetail[0].image,
          location: userData.user.userDetail[0].location,
          locationCoordinates: userData.user.userDetail[0].locationCoordinates,
          mobileNo: userData.user.userDetail[0].mobileNo,
        }

        if (userData.user.role === Role.Farmer) {
          loginInfo.comments = userData.user.userDetail[0].comments
          loginInfo.farmerRating = userData.user.userDetail[0].farmerRating
          loginInfo.description = userData.user.userDetail[0].description
        } else {
          loginInfo.cart = userData.user.userDetail[0].cart
        }
        setLogInData(loginInfo)
      } else {
        setLogInError(true)
      }

      setLoadingLogInData(false)
    }

    fetchData()
  }, [token])

  const handleAddToCart = (addToCartItem: AddToCartItemType) => {
    const logInDataPrev = logInData
    const existingFarmerIndex = logInData.cart?.findIndex((farmer) => {
      return farmer.farmerID === addToCartItem.farmerID
    })!
    if (logInDataPrev.cart) {
      if (existingFarmerIndex !== -1 && logInDataPrev.cart) {
        const existingProductIndex = logInDataPrev.cart[
          existingFarmerIndex
        ].products.findIndex((product) => {
          return product.productID === addToCartItem.productID
        })

        if (existingProductIndex !== -1) {
          logInDataPrev.cart[existingFarmerIndex].products[
            existingProductIndex
          ].quantity += addToCartItem.quantity
        } else {
          logInDataPrev.cart[existingFarmerIndex].products.unshift({
            productID: addToCartItem.productID,
            quantity: addToCartItem.quantity,
          })
        }
        logInDataPrev.cart[existingFarmerIndex].totalPrice =
          logInDataPrev.cart[existingFarmerIndex].totalPrice +
          addToCartItem.productPrice * addToCartItem.quantity
        setLogInData(logInDataPrev)
      } else {
        const cartItem = {
          farmerID: addToCartItem.farmerID,
          farmerName: addToCartItem.farmerName,
          totalPrice: addToCartItem.productPrice,
          products: [
            {
              productID: addToCartItem.productID,
              quantity: addToCartItem.quantity,
            },
          ],
        }

        logInDataPrev.cart.unshift(cartItem)
        setLogInData(logInDataPrev)
        updateCartForConsumer()
      }
    }
  }

  const updateCartForConsumer = async () => {
    const token = localStorage.getItem('token')
    const parsedToken = JSON.parse(token!)

    const cart = logInData.cart
    const consumerResponse = await fetch(
      `http://localhost:5000/api/v1/consumers`,
      {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedToken}`,
        },
        body: JSON.stringify({ cart }),
      },
    )

    const consumerData = await consumerResponse.json()
    console.log(consumerData)
  }

  const updateQuantityInCart = (updateQuantityItem: UpdateQuantityItemType) => {
    console.log(updateQuantityItem.quantity)

    const logInDataPrev = logInData
    if (logInDataPrev.cart) {
      const existingFarmerIndex = logInDataPrev.cart?.findIndex((farmer) => {
        return farmer.farmerID === updateQuantityItem.farmerID
      })!

      const existingProductIndex = logInDataPrev.cart[
        existingFarmerIndex
      ].products.findIndex((product) => {
        return product.productID === updateQuantityItem.productID
      })

      logInDataPrev.cart[existingFarmerIndex].products[
        existingProductIndex
      ].quantity = updateQuantityItem.quantity

      setLogInData(logInDataPrev)
      updateCartForConsumer()
    }
  }

  const updateTotalPrice = (updatePrice: {
    farmerID: string
    totalPrice: number
  }) => {
    const logInDataPrev = logInData
    if (logInDataPrev.cart) {
      const existingFarmerIndex = logInDataPrev.cart?.findIndex((farmer) => {
        return farmer.farmerID === updatePrice.farmerID
      })

      logInDataPrev.cart[existingFarmerIndex].totalPrice =
        updatePrice.totalPrice

      setLogInData(logInDataPrev)
      updateCartForConsumer()
    }
  }

  const deleteItemFromCart = (deleteItem: {
    farmerID: string
    productID: string
  }) => {
    const logInDataPrev = logInData
    if (logInDataPrev.cart) {
      const existingFarmerIndex = logInDataPrev.cart?.findIndex((farmer) => {
        return farmer.farmerID === deleteItem.farmerID
      })

      const existingProductIndex = logInDataPrev.cart[
        existingFarmerIndex
      ].products.findIndex((product) => {
        return product.productID === deleteItem.productID
      })

      logInDataPrev.cart[existingFarmerIndex].products.splice(
        existingProductIndex,
        1,
      )

      if (logInDataPrev.cart[existingFarmerIndex].products.length === 0) {
        logInDataPrev.cart.splice(existingFarmerIndex, 1)
      }

      setLogInData(logInDataPrev)
      updateCartForConsumer()
    }
  }

  const deleteAllItemsFromCartofFarmer = (farmerID: string) => {
    const logInDataPrev = logInData
    if (logInDataPrev.cart) {
      const existingFarmerIndex = logInDataPrev.cart?.findIndex((farmer) => {
        return farmer.farmerID === farmerID
      })
      logInDataPrev.cart.splice(existingFarmerIndex, 1)
      setLogInData(logInDataPrev)
      updateCartForConsumer()
    }
  }

  const checkOutAllHandler = async () => {
    const token = localStorage.getItem('token')
    const parsedToken = JSON.parse(token!)

    if (logInData.cart) {
      const orders = await Promise.all(
        logInData.cart.map(async (cartItem) => {
          const orderResponse = await fetch(
            'http://localhost:5000/api/v1/orders',
            {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${parsedToken}`,
              },
              body: JSON.stringify(cartItem),
            },
          )

          const orderData = await orderResponse.json()
          console.log(orderData)
        }),
      )
      console.log(orders)
      const logInDataPrev = logInData
      logInDataPrev.cart = []
      setLogInData(logInDataPrev)
      updateCartForConsumer()
    }
  }

  let contextValue = {
    logInData,
    loadingLogInData,
    setLogInData,
    logInError,
    handleAddToCart,
    updateQuantityInCart,
    updateTotalPrice,
    deleteItemFromCart,
    deleteAllItemsFromCartofFarmer,
    checkOutAllHandler,
  }

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContext
