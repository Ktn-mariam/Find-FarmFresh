import React from 'react'
import Pagination from '@mui/material/Pagination'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Rating from '@mui/material/Rating'

const CommentSection = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Reviews</h1>
      <div className="flex flex-col gap-10">
        <div>
          <div className="flex items-center gap-1">
            <AccountCircleIcon fontSize="medium" />
            <h1>Mariam Khatoon</h1>
          </div>
          <div className="flex items-center mt-0.5 gap-2">
            <Rating defaultValue={3.5} precision={0.5} size="small" readOnly />
            <h3 className="pt-0.5 text-sm">3.5 out of 5</h3>
            <h1 className="text-gray-500 text-sm pt-0.5 ">
              Reviewed on Nov 15, 2023
            </h1>
          </div>
          <div className="mt-2">
            <h1 className="font-bold">Fresh and tasty</h1>
            <h1 className="text-sm">
              good as described. doubt the weight as very few
            </h1>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <AccountCircleIcon fontSize="medium" />
            <h1>Mariam Khatoon</h1>
          </div>
          <div className="flex items-center mt-0.5 gap-2">
            <Rating defaultValue={3.5} precision={0.5} size="small" readOnly />
            <h3 className="pt-0.5 text-sm">3.5 out of 5</h3>
            <h1 className="text-gray-500 text-sm pt-0.5 ">
              Reviewed on Nov 15, 2023
            </h1>
          </div>
          <div className="mt-2">
            <h1 className="font-bold">Fresh and tasty</h1>
            <h1 className="text-sm">
              good as described. doubt the weight as very few organges arrived
            </h1>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-1">
            <AccountCircleIcon fontSize="medium" />
            <h1>Mariam Khatoon</h1>
          </div>
          <div className="flex items-center mt-0.5 gap-2">
            <Rating defaultValue={3.5} precision={0.5} size="small" readOnly />
            <h3 className="pt-0.5 text-sm">3.5 out of 5</h3>
            <h1 className="text-gray-500 text-sm pt-0.5 ">
              Reviewed on Nov 15, 2023
            </h1>
          </div>
          <div className="mt-2">
            <h1 className="font-bold">Fresh and tasty</h1>
            <h1 className="text-sm">
              good as described. doubt the weight as very few organges arrived
              fjhjef fekjfk dkjdfshkl dfjnjf kjdfsjkl
            </h1>
          </div>
        </div>
        <div className="mt-3">
          <Pagination count={4} />
        </div>
      </div>
    </div>
  )
}

export default CommentSection
