import React, { useContext, useEffect, useState } from 'react'
import TimelapseIcon from '@mui/icons-material/Timelapse'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt'
import ProductCart from '../../components/ProductCart'
import { OrderType } from '../../types/Order'
import { getFormattedDate } from '../../utils/getFormattedDate'
import { ProductDetailForOrder } from '../../types/Product'
import AuthenticationContext from '../../context/authentication'
import { APIURL } from '../../App'

enum Status {
  Waiting = 'Waiting',
  Transported = 'Transported',
  Delivered = 'Delivered',
  Cancelled = 'Cancelled',
}

interface OrderPropsType {
  order: OrderType
}

const Order: React.FC<OrderPropsType> = ({ order }) => {
  const {
    _id,
    farmerID,
    farmerName,
    orderDate,
    totalPrice,
    deliveryStatus,
    notifyConsumer,
  } = order

  const { token } = useContext(AuthenticationContext)
  const [products, setProducts] = useState<ProductDetailForOrder[] | null>(null)
  const [showCancelOrderOption, setShowCancelOrderOption] = useState(true)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await Promise.all(
          order.products.map(async (product) => {
            const productDetailResponse = await fetch(
              `${APIURL}/api/v1/products/orderDetail/${product.productID}`,
            )
            const productDetailData = await productDetailResponse.json()
            return {
              ...productDetailData.product,
              quantity: product.quantity,
            }
          }),
        )

        setProducts(productDetails)
      } catch (error) {
        console.log(
          'Failed to fetch productDetails of products in cart: ',
          error,
        )
      }
    }

    fetchProductDetails()
  })

  const cancelOrder = async () => {
    try {
      await fetch(`${APIURL}/api/v1/orders/${_id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deliveryStatus: 'Cancelled' }),
      })
    } catch (error) {
      console.log('Failed to update Order: ', error)
    } finally {
      setShowCancelOrderOption(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="text-md font-bold">{farmerName}</div>
          <div className="flex items-center gap-1">
            <div className="text-md font-bold">
              {showCancelOrderOption ? deliveryStatus : 'Cancelled'}
            </div>
            {showCancelOrderOption && deliveryStatus === Status.Waiting && (
              <TimelapseIcon style={{ color: '#848c91' }} />
            )}
            {deliveryStatus === Status.Transported && (
              <LocalShippingIcon style={{ color: '#1E88E5' }} />
            )}
            {deliveryStatus === Status.Delivered && (
              <TaskAltIcon style={{ color: '#4CAF50' }} />
            )}
            {(!showCancelOrderOption ||
              deliveryStatus === Status.Cancelled) && (
              <DoDisturbAltIcon style={{ color: '#F44336' }} />
            )}
          </div>
        </div>
        <div className="p-5 flex gap-5 rounded-lg border border-gray-300">
          <div className="w-3/4">
            {products && (
              <div className="flex flex-col gap-1">
                {products.map((product, index) => {
                  return (
                    <ProductCart
                      key={index}
                      isShoppingCart={false}
                      product={product}
                    />
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
              {showCancelOrderOption && deliveryStatus === Status.Waiting && (
                <button
                  onClick={() => {
                    cancelOrder()
                  }}
                  className="mt-3 px-3 py-1 bg-yellow-300 rounded-lg"
                >
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
