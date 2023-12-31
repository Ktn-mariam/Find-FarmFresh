import React, { useEffect, useState } from 'react'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ProductCart from '../../components/ProductCart'
import { OrderType } from '../../types/Order'
import { getFormattedDate } from '../../utils/getFormattedDate'
import { ProductDetailForOrder } from '../../types/Product'

enum Status {
  Waiting = 'Waiting',
  Transported = 'Transported',
  Delivered = 'Delivered',
}

interface OrderPropsType {
  order: OrderType
}

const Order: React.FC<OrderPropsType> = ({ order }) => {
  const {
    farmerID,
    farmerName,
    orderDate,
    totalPrice,
    deliveryStatus,
    notifyConsumer,
  } = order

  const [products, setProducts] = useState<ProductDetailForOrder[] | null>(null)

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetails = await Promise.all(
        order.products.map(async (product) => {
          const productDetailResponse = await fetch(
            `http://localhost:5000/api/v1/products/orderDetail/${product.productID}`,
          )
          const productDetailData = await productDetailResponse.json()
          return {
            ...productDetailData.product,
            quantity: product.quantity,
          }
        }),
      )

      setProducts(productDetails)
    }

    fetchProductDetails()
  })

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="text-md font-bold">{farmerName}</div>
          <div className="flex items-center gap-1">
            <div className="text-md font-bold">{deliveryStatus}</div>
            {deliveryStatus === Status.Waiting && (
              <TimelapseIcon style={{ color: '#ffb703' }} />
            )}
            {deliveryStatus === Status.Transported && (
              <LocalShippingIcon style={{ color: '#dc2f02' }} />
            )}
            {deliveryStatus === Status.Delivered && (
              <TaskAltIcon style={{ color: '#29bf12' }} />
            )}
          </div>
        </div>
        <div className="p-5 flex gap-5 rounded-lg border border-gray-300">
          <div className="w-3/4">
            {products && (
              <div className="flex flex-col gap-1">
                {products.map((product) => {
                  return (
                    <ProductCart isShoppingCart={false} product={product} />
                  )
                })}
              </div>
            )}
          </div>
          <div className="w-1/4 pr-2 flex mt-1 mb-3 items-end justify-between flex-col">
            <div className="flex flex-col items-end">
              <div className="font-bold">Order date:</div>
              <div>{getFormattedDate(orderDate)}</div>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="font-bold">Total:</h1>
              <div className="flex items-center">
                <p className="text-md pr-1">AED</p>
                <p className="font-bold text-2xl text-red-700">{totalPrice}</p>
              </div>
              {deliveryStatus === Status.Waiting && (
                <button className="mt-3 px-3 py-1 bg-yellow-300 rounded-lg">
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
