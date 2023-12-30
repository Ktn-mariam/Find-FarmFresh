import React, { useContext, useEffect, useState } from 'react'
import ProductCart from '../../components/ProductCart'
import DeleteIcon from '@mui/icons-material/Delete'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CartItem } from '../../types/Order'
import { NavLink } from 'react-router-dom'
import { ProductDetailForOrder } from '../../types/Product'
import ShoppingCartContext from '../../context/shoppingCart'

interface CartItemForFarmerPropsType {
  cartItem: CartItem
  findTotalPriceAndItems: () => void
}

const CartItemForFarmer: React.FC<CartItemForFarmerPropsType> = ({
  cartItem,
  findTotalPriceAndItems,
}) => {
  const { updateTotalPrice, deleteAllItemsFromCartofFarmer } = useContext(
    ShoppingCartContext,
  )
  const [products, setProducts] = useState<ProductDetailForOrder[] | null>()
  const [refetchProducts, setRefetchProducts] = useState(false)
  const [displayCartItem, setDisplayCartItem] = useState(true)

  useEffect(() => {
    let totalPrice = 0
    const fetchProductDetails = async () => {
      const productDetails = await Promise.all(
        cartItem.products.map(async (product) => {
          const productDetailResponse = await fetch(
            `http://localhost:5000/api/v1/products/orderDetail/${product.productID}`,
          )
          const productDetailData = await productDetailResponse.json()

          console.log(productDetailData.product.price)

          totalPrice += productDetailData.product.price * product.quantity

          return {
            ...productDetailData.product,
            quantity: product.quantity,
          }
        }),
      )

      setProducts(productDetails)
      updateTotalPrice({ farmerID: cartItem.farmerID, totalPrice })
      findTotalPriceAndItems()
    }

    fetchProductDetails()

    if (refetchProducts) {
      fetchProductDetails()
      setRefetchProducts(false)
    }
  }, [
    cartItem.products,
    cartItem.farmerID,
    updateTotalPrice,
    refetchProducts,
    findTotalPriceAndItems,
    cartItem,
  ])

  const addOrderHandler = async () => {
    if (!cartItem) {
      return
    }
    const token = localStorage.getItem('token')
    const parsedToken = JSON.parse(token!)

    const orderResponse = await fetch(`http://localhost:5000/api/v1/orders`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${parsedToken}`,
      },
      body: JSON.stringify(cartItem),
    })

    const orderData = await orderResponse.json()
    console.log(orderData)

    deleteAllItemsFromCartofFarmer(cartItem.farmerID)
    setRefetchProducts(true)
  }

  if (!displayCartItem) {
    return null
  }

  return (
    <div className="flex font-workSans flex-col gap-2">
      <div className="flex items-center justify-between">
        <NavLink to={`farmer=profile/${cartItem.farmerID}`}>
          <div className="text-xl font-bold">{cartItem.farmerName}</div>
        </NavLink>
        <button
          className="flex items-center gap-1"
          onClick={() => {
            deleteAllItemsFromCartofFarmer(cartItem.farmerID)
            findTotalPriceAndItems()
            setDisplayCartItem(false)
          }}
        >
          <DeleteIcon fontSize="small" />
          <div className="text-md font-bold">Delete Items</div>
        </button>
      </div>
      <div className="flex gap-5 p-5 rounded-lg border border-gray-300">
        <div className="w-3/4">
          {products && products.length < 4 && (
            <div className="flex flex-col gap-1">
              {products.map((product) => {
                return (
                  <ProductCart
                    isShoppingCart={true}
                    product={product}
                    setRefetchProducts={setRefetchProducts}
                  />
                )
              })}
            </div>
          )}
        </div>
        <div className="w-1/4 pr-2 pb-3 flex my-3 items-end justify-between flex-col">
          <div className="flex flex-col items-end">
            <h1 className="text-lg font-bold">Total:</h1>
            <div className="flex items-center text-xl">
              <p className="text-md pr-1">AED</p>
              <p className="font-bold text-red-700">{cartItem.totalPrice}</p>
            </div>
          </div>
          <button
            onClick={addOrderHandler}
            className="px-3 py-1 bg-yellow-400 rounded-lg"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItemForFarmer
