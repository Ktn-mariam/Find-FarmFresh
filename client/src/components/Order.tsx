import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteIcon from '@mui/icons-material/Delete'

const Order = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        style={{ backgroundColor: '#F1F3F5' }}
      >
        <div className="grid grid-cols-14">
          <div className="col-span-1">1</div>
          <div className="col-span-1">11:23:00 13/11/2023</div>
          <div className="col-span-2 pl-2">Zainab Khatoon</div>
          <div className="col-span-2">+971 50 243 0978</div>
          <div className="col-span-3">
            Flat 503, Sapphire Building, Silicon Oasis, Dubai
          </div>
          <div className="col-span-1 text-center">3</div>
          <div className="col-span-1">AED 37.50</div>
          <div className="col-span-1 ml-1">
            <select className="p-1" title="delivery status" name="" id="">
              <option value="">Waiting</option>
              <option value="">Transported</option>
              <option value="">Delivered</option>
            </select>
          </div>
          <div className="ml-2 col-span-1">
            <select className="p-1" title="payment status" name="" id="">
              <option value="">UnPaid</option>
              <option value="">Paid</option>
            </select>
          </div>
          <div className="col-span-1 flex justify-center">
            <DeleteIcon />
          </div>
        </div>
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
          <div className="grid grid-cols-14">
            <div className="col-span-1"></div>
            <div className="col-span-8 grid grid-cols-8">
              <div className="col-span-1 flex items-center">1</div>
              <div className="col-span-4 flex items-center gap-2">
                <div className="h-10 w-8 flex items-center justify-center overflow-hidden rounded-md">
                  <img
                    className="object-cover w-full h-full"
                    src="/apple.png"
                    alt=""
                  />
                </div>
                <div>Apples, Silicon Oasis fnefij vnkfkldf</div>
              </div>
              <div className="col-span-1 flex items-center">x 2</div>
              <div className="col-span-2 flex items-center">AED 34.23</div>
            </div>
            <div className="col-span-5"></div>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default Order
