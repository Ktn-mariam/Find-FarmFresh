import { createContext, useContext, useEffect, useState } from 'react'
import { CartItem } from '../types/Order'
import AuthenticationContext from './authentication'
import { Role } from '../types/Auth'

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

interface ShoppingCartItem {
  farmerID: string
  farmerName: string
  totalPrice: number
  products: {
    productID: string
    quantity: number
    _id: string
  }[]
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
  const { logInData } = useContext(AuthenticationContext)
  const [cart, setCart] = useState<CartItem[] | []>([])
  const [refetchCart, setRefetchCart] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)

  useEffect(() => {
    const fetchCart = async () => {
      try {
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

        const modifiedCartData = await Promise.all(
          cartData.cart[0].cart.map(async (cartItem: ShoppingCartItem) => {
            const productsWithPrice = await Promise.all(
              cartItem.products.map(
                async (product: {
                  productID: string
                  quantity: number
                  _id: string
                }) => {
                  const productResponse = await fetch(
                    `http://localhost:5000/api/v1/products/${product.productID}`,
                  )
                  const productData = await productResponse.json()

                  const price = productData.product.hasDiscount
                    ? Math.round(
                        (productData.product.price -
                          productData.product.price *
                            (productData.product.discountPercentage / 100)) *
                          100,
                      ) / 100
                    : productData.product.price!
                  return {
                    ...product,
                    productPrice: price,
                  }
                },
              ),
            )
            return {
              ...cartItem,
              products: productsWithPrice,
            }
          }),
        )

        setCart(modifiedCartData)
      } catch (error) {
        console.log('Failed to fetch cart: ', error)
      } finally {
        setFirstLoad(false)
      }
    }

    if (logInData.role === Role.Consumer) {
      fetchCart()
    }
    if (refetchCart) setRefetchCart(false)
  }, [refetchCart, logInData.role])

  useEffect(() => {
    const updateCartForConsumer = async () => {
      console.log('updateCartForConsumer')

      console.log(cart)

      const token = localStorage.getItem('token')
      const parsedToken = JSON.parse(token!)

      try {
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
      } catch (error) {
        console.log('Failed to update cart for the consumer: ', error)
      }
    }

    if (!firstLoad) {
      updateCartForConsumer()
    }
  }, [cart])

  const handleAddToCart = (addToCartItem: AddToCartItemType) => {
    console.log('handleAddToCart')

    setCart((cartPrev: CartItem[]) => {
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
          cartPrev[existingFarmerIndex].products[
            existingProductIndex
          ].quantity += addToCartItem.quantity
        } else {
          cartPrev[existingFarmerIndex].products.unshift({
            productID: addToCartItem.productID,
            productPrice: addToCartItem.productPrice,
            quantity: addToCartItem.quantity,
          })
        }
        cartPrev[existingFarmerIndex].totalPrice =
          cartPrev[existingFarmerIndex].totalPrice +
          addToCartItem.productPrice * addToCartItem.quantity
        return [...cartPrev]
      } else {
        const cartItem = {
          farmerID: addToCartItem.farmerID,
          farmerName: addToCartItem.farmerName,
          totalPrice: addToCartItem.productPrice,
          products: [
            {
              productID: addToCartItem.productID,
              productPrice: addToCartItem.productPrice,
              quantity: addToCartItem.quantity,
            },
          ],
        }

        cartPrev.unshift(cartItem)
        return [...cartPrev]
      }
    })
    // updateCartForConsumer()
  }

  const updateQuantityInCart = (updateQuantityItem: UpdateQuantityItemType) => {
    console.log('updateQuantityInCart')

    setCart((cartPrev) => {
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

      return [...cartPrev]
    })

    // updateCartForConsumer()
  }

  const updateTotalPrice = (updatePrice: {
    farmerID: string
    totalPrice: number
  }) => {
    console.log('updateTotalPrice')

    setCart((cartPrev) => {
      if (cartPrev.length === 0) {
        setRefetchCart(true)
        return cartPrev
      }

      const existingFarmerIndex = cartPrev.findIndex((farmer) => {
        return farmer.farmerID === updatePrice.farmerID
      })

      // CANNOT SET PROPERTIES OF UNDEFINED
      cartPrev[existingFarmerIndex].totalPrice = updatePrice.totalPrice

      return [...cartPrev]
    })
    // updateCartForConsumer()
  }

  const deleteItemFromCart = (deleteItem: {
    farmerID: string
    productID: string
  }) => {
    console.log('deleteItemFromCart')

    setCart((cartPrev) => {
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

      return [...cartPrev]
    })

    // updateCartForConsumer()
    setRefetchCart(true)
  }

  const deleteAllItemsFromCartofFarmer = (farmerID: string) => {
    console.log('deleteAllItemsFromCartofFarmer')

    setCart((cartPrev) => {
      const existingFarmerIndex = cartPrev.findIndex((farmer) => {
        return farmer.farmerID === farmerID
      })
      cartPrev.splice(existingFarmerIndex, 1)
      return [...cartPrev]
    })

    // updateCartForConsumer()
  }

  const checkOutAllHandler = async () => {
    console.log('checkOutAllHandler')

    const token = localStorage.getItem('token')
    const parsedToken = JSON.parse(token!)

    console.log(cart)

    try {
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
    } catch (error) {
      console.log('Failed to checkout all products: ', error)
    }

    setCart(() => {
      return []
    })
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
