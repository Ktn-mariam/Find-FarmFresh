import React, { useContext, useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'
import { OrderType } from '../../types/Order'
import { ConsumerTypeForOrder } from '../../types/Consumer'
import { ProductDetailForOrder } from '../../types/Product'
import { getFormattedDateAndTime } from '../../utils/getFormattedDate'
import AuthenticationContext from '../../context/authentication'
import { Role } from '../../types/Auth'
import { APIURL } from '../../App'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

interface OrderPropsType {
  order: OrderType
}

enum deliveryStatusesType {
  Waiting = 'Waiting',
  Transported = 'Transported',
  Delivered = 'Delivered',
}

enum paymentStatusesType {
  UnPaid = 'UnPaid',
  Paid = 'Paid',
}

const Order: React.FC<OrderPropsType> = ({ order }) => {
  const [
    consumerDetail,
    setConsumerDetail,
  ] = useState<ConsumerTypeForOrder | null>(null)
  const [productDetails, setProductDetails] = useState<
    ProductDetailForOrder[] | null
  >(null)
  const [deliveryStatus, setDeliveryStatus] = useState(order.deliveryStatus)
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus)
  const { logInData, token, setOrders } = useContext(AuthenticationContext)
  const [openToast, setOpenToast] = useState(false)

  useEffect(() => {
    if (logInData.role !== Role.Farmer) return
    const fetchConsumerDetail = async () => {
      try {
        console.log('Fetch consumer details API')

        const consumerResponse = await fetch(
          `${APIURL}/api/v1/consumers/${order.consumerID}`,
          {
            mode: 'cors',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )

        if (!consumerResponse.ok) {
          throw new Error(
            `Error: ${consumerResponse.status} ${consumerResponse.statusText}`,
          )
        }

        const consumerData = await consumerResponse.json()
        setConsumerDetail(consumerData.consumer[0])
      } catch (error) {
        console.error('Error fetching consumer details:', error)
      }
    }

    const fetchProductDetails = async () => {
      try {
        const productDetails = await Promise.all(
          order.products.map(async (product) => {
            try {
              console.log('Fetch product details API', product)

              const productDetailResponse = await fetch(
                `${APIURL}/api/v1/products/orderDetail/${product.productID}`,
              )

              if (!productDetailResponse.ok) {
                throw new Error(
                  `Error: ${productDetailResponse.status} ${productDetailResponse.statusText}`,
                )
              }

              const productDetailData = await productDetailResponse.json()
              return {
                ...productDetailData.product,
                quantity: product.quantity,
              }
            } catch (error) {
              console.error(
                `Error fetching details for product ${product.productID}:`,
                error,
              )
              return null
            }
          }),
        )

        const validProductDetails = productDetails.filter(
          (detail) => detail !== null,
        )
        setProductDetails(validProductDetails)
      } catch (error) {
        console.error('Error fetching product details:', error)
      }
    }

    fetchConsumerDetail()
    fetchProductDetails()
  }, [order, token])

  useEffect(() => {
    const updateOrder = async () => {
      const updateOrderBody = {
        deliveryStatus,
        paymentStatus,
      }
      console.log('Update order API')

      await fetch(`${APIURL}/api/v1/orders/${order._id}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateOrderBody),
      })
    }

    updateOrder()
  }, [deliveryStatus, paymentStatus])

  const handleDeleteOrder = async () => {
    console.log('Delete order API')

    const orderResponse = await fetch(`${APIURL}/api/v1/orders/${order._id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (orderResponse.ok) {
      setOrders((prevOrders) => {
        if (prevOrders) {
          console.log('Setting new state')

          const newOrders = prevOrders?.filter((orderState) => {
            return order._id !== orderState._id
          })

          return newOrders
        } else {
          return prevOrders
        }
      })
    } else {
      setOpenToast(true)
    }
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ backgroundColor: '#F1F3F5' }}
      >
        {consumerDetail && productDetails ? (
          <div className="grid grid-cols-14">
            <div className="col-span-1">1</div>
            <div className="col-span-1">
              {getFormattedDateAndTime(order.orderDate)}
            </div>
            <div className="col-span-2 pl-2">{consumerDetail.name}</div>
            <div className="col-span-2">{consumerDetail.mobileNo}</div>
            <div className="col-span-3">{consumerDetail.location}</div>
            <div className="col-span-1 text-center">
              {order.products.length}
            </div>
            <div className="col-span-1">AED {order.totalPrice}</div>
            <div className="col-span-1 ml-1">
              <select
                className="p-1"
                title="delivery status"
                onChange={(e) => {
                  setDeliveryStatus(e.target.value as deliveryStatusesType)
                }}
                defaultValue={order.deliveryStatus}
              >
                <option value="Waiting">Waiting</option>
                <option value="Transported">Transported</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="ml-2 col-span-1">
              <select
                className="p-1"
                title="payment status"
                onChange={(e) => {
                  setPaymentStatus(e.target.value as paymentStatusesType)
                }}
                defaultValue={order.paymentStatus}
              >
                <option value="UnPaid">UnPaid</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            <button
              title="delete"
              onClick={handleDeleteOrder}
              className="col-span-1 flex justify-center"
            >
              <DeleteIcon />
            </button>
            <Snackbar
              open={openToast}
              autoHideDuration={6000}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={() => {
                setOpenToast(false)
              }}
            >
              <MuiAlert
                onClose={() => {
                  setOpenToast(false)
                }}
                severity="warning"
                sx={{ width: '100%' }}
                elevation={6}
                variant="filled"
              >
                You cannot delete orders that are less than 30 days old!
              </MuiAlert>
            </Snackbar>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-14 font-semibold">
            <div className="col-span-1"></div>
            <div className="col-span-8 grid grid-cols-8">
              <div className="col-span-1">SL No.</div>
              <div className="col-span-4 flex gap-2">Product Name</div>
              <div className="col-span-1">Qty</div>
              <div className="col-span-2">Total Price</div>
            </div>
            <div className="col-span-5"></div>
          </div>
          {productDetails &&
            productDetails.map((product, index) => {
              return (
                <div className="grid grid-cols-14" key={index}>
                  <div className="col-span-1"></div>
                  <div className="col-span-8 grid grid-cols-8">
                    <div className="col-span-1 flex items-center">
                      {index + 1}
                    </div>
                    <div className="col-span-4 flex items-center gap-2">
                      <div className="h-14 w-12 flex items-center justify-center overflow-hidden rounded-md">
                        <img
                          className="object-cover w-full h-full"
                          src={`${APIURL}/uploads/${product.images[0]}`}
                          alt=""
                        />
                      </div>
                      <div>{product.title}</div>
                    </div>
                    <div className="col-span-1 flex items-center">
                      x {product.quantity}
                    </div>
                    <div className="col-span-2 flex items-center">
                      AED{' '}
                      {`${
                        order.products[index].productPrice * product.quantity
                      }`}
                    </div>
                  </div>
                  <div className="col-span-5"></div>
                </div>
              )
            })}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default Order
