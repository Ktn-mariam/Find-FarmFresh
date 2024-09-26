import { useContext, useEffect, useState } from 'react'
import Order from './Order'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import { OrderType } from '../../types/Order'
import AuthenticationContext from '../../context/authentication'
import { APIURL } from '../../App'

const OrdersPage = () => {
  const { logInData, token } = useContext(AuthenticationContext)
  const [orders, setOrders] = useState<OrderType[] | null>(null)
  const [refetchOrders, setRefetchOrders] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await fetch(`${APIURL}/api/v1/orders`, {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const orderData = await orderResponse.json()

        setOrders(orderData.orders)
        setRefetchOrders(false)
      } catch (error) {
        console.log('Failed to fetch the orders', error)
      }
    }

    if (logInData.loggedIn && logInData.role === 'Farmer') {
      fetchData()
    }
  }, [refetchOrders, logInData.loggedIn, logInData.role])

  return (
    <div className="md:px-36 px-14 pt-10 pb-52">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      <div>
        <Accordion>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ backgroundColor: '#b7e4c7' }}
            expandIcon={<div className="px-3" />}
          >
            <div className="grid grid-cols-14 font-semibold">
              <div className="col-span-1">Order#</div>
              <div className="col-span-1">Date & Time</div>
              <div className="col-span-2">Customer Name</div>
              <div className="col-span-2">Mobile No.</div>
              <div className="col-span-3">Location</div>
              <div className="col-span-1">
                Total <br /> Items
              </div>
              <div className="col-span-1">
                Total <br /> Price
              </div>
              <div className="col-span-1">Delivery Status</div>
              <div className="col-span-1">Payment Status</div>
              <div className="col-span-1 flex justify-center">Delete</div>
            </div>
          </AccordionSummary>
        </Accordion>
        {orders &&
          orders.map((order, key) => {
            return (
              <Order
                key={key}
                setRefetchOrders={setRefetchOrders}
                order={order}
              />
            )
          })}
      </div>
    </div>
  )
}

export default OrdersPage
