import React, { useContext, useEffect, useState } from 'react'
import Order from './Order'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AuthenticationContext from '../../context/authentication'
import { OrderType } from '../../types/Order'

const OrdersPage = () => {
  const { logInData } = useContext(AuthenticationContext)
  const [orders, setOrders] = useState<OrderType[] | null>(null)
  const [refetchOrders, setRefetchOrders] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      const parsedToken = JSON.parse(token!)
      const orderResponse = await fetch('http://localhost:5000/api/v1/orders', {
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${parsedToken}`,
        },
      })
      const orderData = await orderResponse.json()
      console.log(orderData)

      setOrders(orderData.orders)
      setRefetchOrders(false)
    }

    fetchData()
  }, [refetchOrders])

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
          orders.map((order) => {
            return <Order setRefetchOrders={setRefetchOrders} order={order} />
          })}
      </div>
    </div>
  )
}

export default OrdersPage
