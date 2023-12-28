import { createContext, useEffect, useState } from 'react'
import { CartItem } from '../types/Order'

interface UpdateQuantityItemType {
  farmerID: string
  productID: string
  quantity: number
}

interface AddToCartItemType {
  farmerID: string
  farmerName: string
  productID: string
  quantity: number
  productPrice: number
}

interface ShoppingCartContextType {
  cart: CartItem[] | []
  setRefetchCart: React.Dispatch<React.SetStateAction<boolean>>
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

const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cart: [],
  setRefetchCart: () => {},
  handleAddToCart: () => {},
  updateQuantityInCart: () => {},
  updateTotalPrice: () => {},
  deleteItemFromCart: () => {},
  deleteAllItemsFromCartofFarmer: () => {},
  checkOutAllHandler: async () => {},
})

interface ShoppingCartContextProviderPropsType {
  children: string | JSX.Element | JSX.Element[]
}

export const ShoppingCartContextProvider: React.FC<ShoppingCartContextProviderPropsType> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[] | []>([])
  const [refetchCart, setRefetchCart] = useState(false)

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token')
      const parsedToken = JSON.parse(token!)

      const cartResponse = await fetch(
        `http://localhost:5000/api/v1/consumers/shoppingCart`,
        {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${parsedToken}`,
          },
        },
      )

      const cartData = await cartResponse.json()

      setCart(cartData.cart[0].cart)
    }

    fetchCart()
  }, [])

  const handleAddToCart = (addToCartItem: AddToCartItemType) => {
    const cartPrev = [...cart]
    const existingFarmerIndex = cartPrev.findIndex((farmer) => {
      return farmer.farmerID === addToCartItem.farmerID
    })!
    if (existingFarmerIndex !== -1) {
      const existingProductIndex = cartPrev[
        existingFarmerIndex
      ].products.findIndex((product) => {
        return product.productID === addToCartItem.productID
      })

      if (existingProductIndex !== -1) {
        cartPrev[existingFarmerIndex].products[existingProductIndex].quantity +=
          addToCartItem.quantity
      } else {
        cartPrev[existingFarmerIndex].products.unshift({
          productID: addToCartItem.productID,
          quantity: addToCartItem.quantity,
        })
      }
      cartPrev[existingFarmerIndex].totalPrice =
        cartPrev[existingFarmerIndex].totalPrice +
        addToCartItem.productPrice * addToCartItem.quantity
      setCart(cartPrev)
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

      cartPrev.unshift(cartItem)
      setCart(cartPrev)
      updateCartForConsumer()
    }
  }

  const updateCartForConsumer = async () => {
    const token = localStorage.getItem('token')
    const parsedToken = JSON.parse(token!)
    console.log(cart)

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
    const cartPrev = cart
    const existingFarmerIndex = cartPrev.findIndex((farmer) => {
      return farmer.farmerID === updateQuantityItem.farmerID
    })!

    const existingProductIndex = cartPrev[
      existingFarmerIndex
    ].products.findIndex((product) => {
      return product.productID === updateQuantityItem.productID
    })

    cartPrev[existingFarmerIndex].products[existingProductIndex].quantity =
      updateQuantityItem.quantity

    setCart(cartPrev)
    updateCartForConsumer()
  }

  const updateTotalPrice = (updatePrice: {
    farmerID: string
    totalPrice: number
  }) => {
    const cartPrev = cart
    const existingFarmerIndex = cartPrev.findIndex((farmer) => {
      return farmer.farmerID === updatePrice.farmerID
    })

    cartPrev[existingFarmerIndex].totalPrice = updatePrice.totalPrice

    setCart(cartPrev)
    updateCartForConsumer()
  }

  const deleteItemFromCart = (deleteItem: {
    farmerID: string
    productID: string
  }) => {
    const cartPrev = [...cart]
    const existingFarmerIndex = cartPrev.findIndex((farmer) => {
      return farmer.farmerID === deleteItem.farmerID
    })

    const existingProductIndex = cartPrev[
      existingFarmerIndex
    ].products.findIndex((product) => {
      return product.productID === deleteItem.productID
    })

    cartPrev[existingFarmerIndex].products.splice(existingProductIndex, 1)

    if (cartPrev[existingFarmerIndex].products.length === 0) {
      cartPrev.splice(existingFarmerIndex, 1)
    }
    setCart(cartPrev)
    updateCartForConsumer()
  }

  const deleteAllItemsFromCartofFarmer = (farmerID: string) => {
    const cartPrev = [...cart]
    const existingFarmerIndex = cartPrev.findIndex((farmer) => {
      return farmer.farmerID === farmerID
    })
    cartPrev.splice(existingFarmerIndex, 1)

    setCart(cartPrev)
    updateCartForConsumer()
  }

  const checkOutAllHandler = async () => {
    const token = localStorage.getItem('token')
    const parsedToken = JSON.parse(token!)

    const orders = await Promise.all(
      cart.map(async (cartItem) => {
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
    const cartPrev: CartItem[] = []
    setCart(cartPrev)
    updateCartForConsumer()
  }

  const contextValue = {
    cart,
    setRefetchCart,
    handleAddToCart,
    updateQuantityInCart,
    updateTotalPrice,
    deleteItemFromCart,
    deleteAllItemsFromCartofFarmer,
    checkOutAllHandler,
  }
  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export default ShoppingCartContext
