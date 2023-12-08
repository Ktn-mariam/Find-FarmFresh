import React from 'react'
import Rating from '@mui/material/Rating'

const ReviewProduct = () => {
  return (
    <div className="mx-1">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 flex items-center justify-center overflow-hidden">
          <img className="object-cover w-full h-full" src="/apple.png" alt="" />
        </div>
        <h4 className="font-bold mt-2 text-center w-72 px-3 truncate">
          Apples, Silicon Oasiskm frkn jilokkjl kjjhhj
        </h4>
        <div className="font-thin -mt-1 text-sm">Farmer</div>
        <div className="mt-2">
          <Rating defaultValue={3.5} precision={0.5} size="large" />
        </div>
        <div>
          <input
            title="title"
            placeholder="Title"
            className="mt-2 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
            type="text"
          />
          <textarea
            title="title"
            placeholder="Description"
            className="mt-2 bg-gray-200 text-sm border-2 border-gray-200 rounded-md w-full py-1 px-2 focus:outline-none focus:bg-white focus:border-gray-400"
          />
        </div>
      </div>
    </div>
  )
}

export default ReviewProduct
