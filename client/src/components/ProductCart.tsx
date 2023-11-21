import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove'
import { NavLink } from 'react-router-dom'

interface ProductCartProps {
  isShoppingCart: boolean
}

const ProductCart: React.FC<ProductCartProps> = ({ isShoppingCart }) => {
  const quantityOptions = [1, 2, 3, 4, 5]
  return (
    <div className="mx-1">
      <NavLink to="/store/fruits/apples/1">
        <div className="py-5 flex flex-col items-center font-noto hover:cursor-pointer">
          <div className="h-40 mb-3 md:h-40 md:w-32 flex items-center justify-center overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src="/apple.png"
              alt=""
            />
          </div>
          <div>
            <h4 className={`truncate w-32`}>Apples, Silicon Oasiskm frkn</h4>
            <div className="flex gap-3 justify-between items-end">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-xs py-0.5 pr-1">AED</p>
                  <p>
                    <span className="font-bold">35.50</span>/kg
                  </p>
                </div>
                <div className="pl-7 text-blue-gray-600">x2</div>
              </div>
            </div>
            {isShoppingCart && (
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="quantity">Qty:</label>
                  <select
                    className="rounded-md bg-gray-100"
                    title="quantity"
                    name="quantity"
                    id=""
                  >
                    {quantityOptions.map((option) => {
                      return <option value={option}>{option}</option>
                    })}
                  </select>
                </div>
                <div className="bg-gray-300 rounded-full flex items-center justify-center">
                  <RemoveIcon fontSize="small" />
                </div>
              </div>
            )}
          </div>
          <div></div>
        </div>
      </NavLink>
    </div>
  )
}

export default ProductCart
