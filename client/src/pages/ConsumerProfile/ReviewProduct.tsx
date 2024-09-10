import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating'

interface ReviewProductProps {
  isProduct: boolean
  ID: string
  index: number
  handleInputChange: (
    index: number,
    field: 'title' | 'description' | 'rating' | 'productID' | 'farmerID',
    value: string | number,
  ) => void
}

interface ReviewItemDetails {
  name: string
  image: string
}

const ReviewProduct: React.FC<ReviewProductProps> = ({
  isProduct,
  ID,
  index,
  handleInputChange,
}) => {
  const [details, setDetails] = useState<ReviewItemDetails | null>()

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetailResponse = await fetch(
          `http://localhost:5000/api/v1/products/orderDetail/${ID}`,
        )
        const productDetailData = await productDetailResponse.json()
        const reviewItemDetails = {
          name: productDetailData.product.title,
          image: productDetailData.product.images[0],
        }
        setDetails(reviewItemDetails)
      } catch (error) {
        console.log('Failed to fetch productDetails: ', error)
      }
    }

    const fetchFarmerDetails = async () => {
      try {
        const farmerResponse = await fetch(
          `http://localhost:5000/api/v1/farmers/${ID}`,
        )
        const farmerData = await farmerResponse.json()
        const reviewItemDetails = {
          name: farmerData.farmer[0].name,
          image: farmerData.farmer[0].image,
        }
        setDetails(reviewItemDetails)
      } catch (error) {
        console.log('Failed to fetch farmer details: ', error)
      }
    }

    if (isProduct) {
      fetchProductDetails()
    } else {
      fetchFarmerDetails()
    }
  }, [])
  return (
    <div className="mx-1">
      {details && (
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={`http://localhost:5000/uploads/${details.image}`}
              alt=""
            />
          </div>
          <h4 className="font-bold mt-2 text-center w-72 px-3 truncate">
            {details.name}
          </h4>
          <div className="font-thin -mt-1 text-sm">
            {isProduct ? 'Product' : 'Farmer'}
          </div>
          <div className="mt-2">
            <Rating
              defaultValue={4}
              onChange={(event, newValue) => {
                handleInputChange(index, 'rating', newValue || 4)
              }}
              precision={1}
              size="large"
            />
          </div>
          <div>
            <input
              title="title"
              placeholder="Title"
              className="mt-2 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
              type="text"
              onChange={(e) =>
                handleInputChange(index, 'title', e.target.value)
              }
            />
            <textarea
              title="description"
              placeholder="Description"
              className="mt-2 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
              onChange={(e) =>
                handleInputChange(index, 'description', e.target.value)
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewProduct
