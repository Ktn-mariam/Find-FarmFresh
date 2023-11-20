import React from 'react'
import Rating from '@mui/material/Rating'
import { NavLink } from 'react-router-dom'

function Product() {
  return (
    <NavLink to="/store/fruits/apples/1">
      <div className="w-48 md:w-72">
        <div className="px-2 py-4 flex flex-col items-center rounded-md font-workSans hover:cursor-pointer">
          {/* 4:5 ratio */}
          <div className="w-40 h-40 md:w-64 md:h-64 mb-3 flex items-center justify-center overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src="/apple.png"
              alt=""
            />
          </div>
          <div>
            <h4 className="truncate w-40 md:w-64 text-md md:text-lg">
              Apples, Silicon Oasiskm frkn kjjkey
            </h4>
            <NavLink to="/farmer-profile">
              <h6 className="text-sm hover:underline">Mariam Khatoon</h6>
            </NavLink>
            <div className="flex">
              <p className="text-xs md:text-sm py-0.5 pr-1">AED</p>
              <p className="text-red-600">
                <span className="font-bold text-md md:text-xl">35.50</span>/kg
              </p>
            </div>
            <div className="flex items-center">
              <Rating
                defaultValue={3.5}
                precision={0.5}
                size="small"
                readOnly
              />
              <p className="text-sm pl-1">5</p>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default Product
