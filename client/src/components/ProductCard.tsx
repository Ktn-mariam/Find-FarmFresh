import React from 'react'
import { NavLink } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Rating from '@mui/material/Rating'
import { ProductDetailType } from '../types/Product'

interface ProductCardProps {
  height: number
  editable: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  product: ProductDetailType
  setRefetchProducts: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductCard: React.FC<ProductCardProps> = ({
  height,
  editable,
  setOpenModal,
  product,
  setRefetchProducts,
}) => {
  const width = height - 8
  const {
    parentCategory,
    category,
    _id,
    farmerID,
    price,
    productRating,
    farmerName,
    title,
    isVisible,
  } = product
  console.log(width)

  const handleProductUpdate = async (): Promise<void> => {
    const token = localStorage.getItem('token')
    const parsedToken = JSON.parse(token!)
    const updateDisplay = {
      isVisible: !product.isVisible,
    }
    const updateResponse = await fetch(
      `http://localhost:5000/api/v1/products/${product._id}`,
      {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedToken}`,
        },
        body: JSON.stringify(updateDisplay),
      },
    )

    const updateData = await updateResponse.json()
    setRefetchProducts(true)
    console.log(updateData)
  }

  const handleProductDelete = async (): Promise<void> => {
    const token = localStorage.getItem('token')
    const parsedToken = JSON.parse(token!)
    const updateDisplay = {
      isVisible: !product.isVisible,
    }
    const updateResponse = await fetch(
      `http://localhost:5000/api/v1/products/${product._id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedToken}`,
        },
      },
    )

    const updateData = await updateResponse.json()
    setRefetchProducts(true)
    console.log(updateData)
  }

  return (
    <div className="mx-1">
      <div
        className={`py-5 flex flex-col items-center rounded-md font-noto ${
          isVisible ? null : 'bg-white opacity-50'
        }`}
      >
        {/* 4:5 ratio */}
        <NavLink to={`/store/${parentCategory}/${category}/${_id}`}>
          <div
            className={`h-${height} w-${width} flex items-center justify-center overflow-hidden hover:cursor-pointer`}
          >
            <img
              className="object-cover w-full h-full"
              src="/apple.png"
              alt=""
            />
          </div>
        </NavLink>
        <div>
          <NavLink to={`/store/${parentCategory}/${category}/${_id}`}>
            <h4 className={`truncate w-${width} hover:cursor-pointer`}>
              {title}
            </h4>
          </NavLink>
          <NavLink to={`/farmer-profile/${farmerID}`}>
            <h6 className="text-xs hover:underline">{farmerName}</h6>
          </NavLink>
          <div className="flex justify-between items-end">
            <div>
              <div className="flex">
                <p className="text-xs py-0.5 pr-1">AED</p>
                <p>
                  <span className="font-bold">{price}</span>/kg
                </p>
              </div>
              <Rating
                defaultValue={productRating.rating}
                precision={0.5}
                size="small"
                readOnly
              />
            </div>
            {editable && (
              <div className="float-right flex mb-2">
                <button
                  title="edit"
                  className="rounded-md py-0.5 px-1 hover:bg-gray-300"
                  onClick={() => {
                    setOpenModal(true)
                  }}
                >
                  <EditIcon fontSize="small" />
                </button>
                <button
                  title="delete"
                  className="rounded-md py-0.5 px-1 hover:bg-gray-300"
                  onClick={handleProductDelete}
                >
                  <DeleteIcon fontSize="small" />
                </button>
                <button
                  onClick={handleProductUpdate}
                  title="display"
                  className="rounded-md py-0.5 px-1 hover:bg-gray-300"
                >
                  {isVisible ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default ProductCard
