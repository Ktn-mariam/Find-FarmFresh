import React from 'react'
import { Progress } from '@material-tailwind/react'
import Rating from '@mui/material/Rating'

const RatingStats = () => {
  return (
    <div>
      <h1 className="text-lg font-bold">Product's Rating</h1>
      <div className="flex items-center mt-1 gap-2">
        <Rating defaultValue={3.5} precision={0.5} readOnly />
        <h3>3.5 out of 5</h3>
      </div>
      <p className="mt-3 text-sm text-gray-800">3,44 ratings overall</p>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-sm whitespace-nowrap">5 stars</h1>
          <Progress value={75} size="lg" color="amber" />
          <h1 className="text-sm">75</h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-sm whitespace-nowrap">4 stars</h1>
          <Progress value={15} size="lg" color="amber" />
          <h1 className="text-sm">15</h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-sm whitespace-nowrap">3 stars</h1>
          <Progress value={2} size="lg" color="amber" />
          <h1 className="text-sm">02</h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-sm whitespace-nowrap">2 stars</h1>
          <Progress value={2} size="lg" color="amber" />
          <h1 className="text-sm">02</h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-sm whitespace-nowrap">1 stars</h1>
          <Progress value={1} size="lg" color="amber" />
          <h1 className="text-sm">01</h1>
        </div>
      </div>
    </div>
  )
}

export default RatingStats
