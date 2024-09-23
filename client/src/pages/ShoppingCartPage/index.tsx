import React, { useContext, useEffect, useState } from 'react'
import StoreNavbar from '../../components/StoreNavbar'
import CartItemForFarmer from './CartItemForFarmer'
import ShoppingCartContext from '../../context/shoppingCart'
import AuthenticationContext from '../../context/authentication'
import { CartItem } from '../../types/Order'

const ShoppingCartPage = () => {
  const { cart, checkOutAllHandler } = useContext(ShoppingCartContext)
  const { logInData } = useContext(AuthenticationContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  const findTotalPriceAndItems = () => {
    const sumPrice =
      (cart as CartItem[]).reduce(
        (sum: number, cartItem: CartItem) => sum + cartItem.totalPrice,
        0,
      ) || 0
    setTotalPrice(sumPrice)

    const sumItems =
      (cart as CartItem[]).reduce(
        (sum: number, cartItem: CartItem) => sum + cartItem.products.length,
        0,
      ) || 0
    setTotalItems(sumItems)
  }

  useEffect(() => {
    findTotalPriceAndItems()
  }, [cart])

  return (
    <div className="font-workSans">
      <StoreNavbar />
      <div className="md:px-36 px-14 py-5 text-xs md:text-sm mb-40">
        <h1 className="text-2xl font-bold mb-6 mt-3">Shopping Cart</h1>
        <div className="flex gap-10">
          <div className="flex flex-col gap-10 w-2/3">
            {logInData.loggedIn ? (
              cart.map((cartItem) => {
                return (
                  <CartItemForFarmer
                    key={cartItem.farmerID}
                    cartItem={cartItem}
                    findTotalPriceAndItems={findTotalPriceAndItems}
                  />
                )
              })
            ) : (
              <div>Please sign in/up to add items</div>
            )}
          </div>
          <div className="w-1/3">
            <div className="px-10 py-10 border border-1 border-zinc-300 rounded-2xl">
              <div className="text-lg font-bold mb-5">Order Summary</div>
              <div className="flex items-center justify-between">
                <div>Total Item(s):</div>
                <div className="font-bold">{totalItems} Items</div>
              </div>
              <div className="border-t border-gray-300 flex items-center b justify-between mt-4">
                <div className="mt-4">Total Price:</div>
                <div className="font-bold mt-4 text-xl">AED {totalPrice}</div>
              </div>
              <button
                onClick={() => {
                  checkOutAllHandler()
                  setTotalItems(0)
                  setTotalPrice(0)
                }}
                className="w-full py-2 mt-8 bg-yellow-400 rounded-lg"
              >
                Checkout All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCartPage
