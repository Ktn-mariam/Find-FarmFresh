import React, { useContext, useState } from 'react'
import StoreNavbar from '../../components/StoreNavbar'
import CartItemForFarmer from './CartItemForFarmer'
import AuthenticationContext from '../../context/authentication'

const ShoppingCartPage = () => {
  const { logInData, checkOutAllHandler } = useContext(AuthenticationContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItems, setTotalItems] = useState(0)
  const [displayNoProducts, setDisplayNoProducts] = useState(true)

  const findTotalPriceAndItems = () => {
    const sumPrice =
      logInData.cart?.reduce((sum, cartItem) => sum + cartItem.totalPrice, 0) ||
      0
    setTotalPrice(sumPrice)

    const sumItems =
      logInData.cart?.reduce(
        (sum, cartItem) => sum + cartItem.products.length,
        0,
      ) || 0
    setTotalItems(sumItems)
  }

  return (
    <div className="font-workSans">
      <StoreNavbar />
      <div className="md:px-36 px-14 py-5 text-xs md:text-sm mb-40">
        <h1 className="text-2xl font-bold mb-6 mt-3">Shopping Cart</h1>
        <div className="flex gap-10">
          {displayNoProducts ? (
            <div className="flex flex-col gap-10 w-2/3">
              {logInData.cart ? (
                logInData.cart.map((cartItem) => {
                  return (
                    <CartItemForFarmer
                      cartItem={cartItem}
                      findTotalPriceAndItems={findTotalPriceAndItems}
                    />
                  )
                })
              ) : (
                <div>Please sign in/up to add items</div>
              )}
            </div>
          ) : (
            <div className="w-2/3"></div>
          )}
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
                  setDisplayNoProducts(false)
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
