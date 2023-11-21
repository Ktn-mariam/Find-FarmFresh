import React from 'react'
import Order from '../components/Order'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'

const OrdersPage = () => {
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
        <Order />
        <Order />
        <Order />
        <Order />
      </div>
    </div>
  )
}

export default OrdersPage
