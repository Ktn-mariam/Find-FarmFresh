import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Rating from '@mui/material/Rating'
import { ProductDetailTypeForDisplay } from '../types/Product'
import AuthenticationContext from '../context/authentication'
import getParentCategoryRoute from '../utils/getParentCategoryRoute'

interface ProductCardProps {
  height: number
  editable: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  product: ProductDetailTypeForDisplay
  setRefetchProducts?: React.Dispatch<React.SetStateAction<boolean>>
  setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>
  setEditProduct: React.Dispatch<
    React.SetStateAction<ProductDetailTypeForDisplay | null>
  >
}

const ProductCard: React.FC<ProductCardProps> = ({
  height,
  editable,
  setOpenModal,
  product,
  setRefetchProducts,
  setIsEditModal,
  setEditProduct,
}) => {
  const { token } = useContext(AuthenticationContext)
  const {
    parentCategory,
    category,
    images,
    _id,
    farmerID,
    price,
    productRating,
    farmerName,
    title,
    isVisible,
    hasDiscount,
    discountPercentage,
  } = product

  const handleProductUpdate = async (): Promise<void> => {
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateDisplay),
      },
    )

    const updateData = await updateResponse.json()
    if (setRefetchProducts) setRefetchProducts(true)
  }

  const handleProductDelete = async (): Promise<void> => {
    const updateResponse = await fetch(
      `http://localhost:5000/api/v1/products/${product._id}`,
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const updateData = await updateResponse.json()
    if (setRefetchProducts) setRefetchProducts(true)
  }

  const parentCategoryRoute = getParentCategoryRoute(parentCategory)
  return (
    <div className="mx-1">
      <div
        className={
          isVisible
            ? 'py-5 flex flex-col items-start rounded-md font-noto'
            : 'py-5 flex flex-col items-start rounded-md font-noto bg-white opacity-50'
        }
      >
        {/* 4:5 ratio */}
        <NavLink to={`/store/${parentCategoryRoute}/${category}/${_id}`}>
          <div
            className={
              height === 64
                ? 'h-64 w-56 flex items-center justify-center overflow-hidden hover:cursor-pointer'
                : 'h-52 w-48 flex items-center justify-center overflow-hidden hover:cursor-pointer'
            }
          >
            <img
              className="object-cover w-full h-full"
              src={`http://localhost:5000/uploads/${images[0]}`}
              alt=""
            />
          </div>
        </NavLink>
        <div>
          <NavLink to={`/store/${parentCategoryRoute}/${category}/${_id}`}>
            <h4
              className={
                height === 64
                  ? 'truncate w-56 hover:cursor-pointer'
                  : 'truncate w-48 hover:cursor-pointer'
              }
            >
              {title}
            </h4>
          </NavLink>
          <NavLink to={`/farmer-profile/${farmerID}`}>
            <h6 className="text-xs hover:underline">{farmerName}</h6>
          </NavLink>
          <div className="flex justify-between items-end">
            <div className="w-full">
              <div className="flex justify-between">
                <div className="flex">
                  <p className="text-xs py-0.5 pr-1">AED</p>
                  <p>
                    {hasDiscount ? (
                      <span className="font-bold">
                        <span className="line-through">{price}</span>
                        <span className="ml-1 text-neonYellow">
                          {Math.round(
                            (price - price * (discountPercentage / 100)) * 100,
                          ) / 100}
                        </span>
                      </span>
                    ) : (
                      <span className="font-bold">{price}</span>
                    )}
                    <span
                      className={`${
                        hasDiscount ? 'text-neonYellow' : 'text-black'
                      } text-xs`}
                    >
                      /kg
                    </span>
                  </p>
                </div>
                {hasDiscount && (
                  <div className="text-white bg-neonYellow text-xs m-1 px-1 rounded-sm">
                    -
                    <span className="font-bold">
                      {`${discountPercentage}%`}
                    </span>
                  </div>
                )}
              </div>
              <Rating
                defaultValue={productRating.rating}
                precision={0.1}
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
                    setIsEditModal(true)
                    setEditProduct(product)
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
      </div>
    </div>
  )
}

export default ProductCard
