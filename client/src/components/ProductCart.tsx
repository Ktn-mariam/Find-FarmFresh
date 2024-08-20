import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ProductDetailForOrder } from '../types/Product'
import ShoppingCartContext from '../context/shoppingCart'

interface ProductCartProps {
  isShoppingCart: boolean
  product: ProductDetailForOrder
  setRefetchProducts?: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductCart: React.FC<ProductCartProps> = ({
  isShoppingCart,
  product,
  setRefetchProducts,
}) => {
  const { updateQuantityInCart, deleteItemFromCart } = useContext(
    ShoppingCartContext,
  )
  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const {
    title,
    price,
    images,
    parentCategory,
    category,
    _id,
    quantity,
    farmerID,
    farmerName,
  } = product
  const [cartQuantity, setCartQuantity] = useState(quantity)

  const handleUpdateQuantity = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newQuantity = Number(event.target.value)

    setCartQuantity(newQuantity)
    const updateQuantityItem = {
      farmerID: farmerID,
      productID: _id,
      quantity: newQuantity,
    }

    updateQuantityInCart(updateQuantityItem)
    if (setRefetchProducts) setRefetchProducts(true)
  }

  const handleDeleteItem = () => {
    deleteItemFromCart({ farmerID, productID: _id })
    if (setRefetchProducts) setRefetchProducts(true)
  }

  return (
    <div className="mx-1">
      <div className="flex font-workSans">
        <NavLink to={`/store/${parentCategory}/${category}/${_id}`}>
          <div className="h-40 mb-3 md:h-40 md:w-32 flex items-center justify-center overflow-hidden hover:cursor-pointer">
            <img
              className="object-cover w-full h-full"
              src={`http://localhost:5000/uploads/${images[0]}`}
              alt=""
            />
          </div>
        </NavLink>
        <div className="py-1 px-3 flex flex-col justify-between">
          <div className="">
            <NavLink to={`/store/${parentCategory}/${category}/${_id}`}>
              <h4 className="truncate w-98 text-lg hover:cursor-pointer hover:underline">
                {title}
              </h4>
            </NavLink>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="text-sm py-0.5 pr-1">AED</p>
                <p>
                  <span className="font-bold text-lg">{price}</span>/kg
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pb-4">
            {isShoppingCart ? (
              <div className="flex gap-1 items-center">
                <label className="text-md font-semibold" htmlFor="quantity">
                  Qty in kg:
                </label>
                <select
                  defaultValue={cartQuantity}
                  className="rounded-md border border-gray-200 px-1 py-1"
                  title="quantity"
                  name="quantity"
                  onChange={handleUpdateQuantity}
                >
                  {quantityOptions.map((option) => {
                    return <option value={option}>{option}</option>
                  })}
                </select>
              </div>
            ) : (
              <div>{quantity} kgs</div>
            )}
            {isShoppingCart && (
              <button
                onClick={handleDeleteItem}
                className="hover:bg-gray-300 hover:cursor-pointer bg-gray-200 rounded-full flex items-center max-w-fit px-2"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default ProductCart
