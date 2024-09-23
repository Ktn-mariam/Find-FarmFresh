import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Rating from '@mui/material/Rating'
import { getFormattedDate } from '../utils/getFormattedDate'
import { Comment } from '../types/Comment'

interface CommentSectionPropsType {
  comments?: Comment[]
}

const CommentSection: React.FC<CommentSectionPropsType> = ({ comments }) => {
  if (!comments) {
    return <div>Loading</div>
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Reviews</h1>
      <div className="flex flex-col gap-10">
        {comments.map((comment, index) => {
          return (
            <div key={index}>
              <div className="flex items-center gap-1">
                <AccountCircleIcon fontSize="medium" />
                <h1>{comment.username}</h1>
              </div>
              <div className="flex items-center mt-0.5 gap-2">
                <Rating
                  defaultValue={comment.rating}
                  precision={0.1}
                  size="small"
                  readOnly
                />
                <h3 className="pt-0.5 text-sm">{comment.rating} out of 5</h3>
                <h1 className="text-gray-500 text-sm pt-0.5 ">
                  {`Reviewed on ${getFormattedDate(comment.createdAt)}`}
                </h1>
              </div>
              <div className="mt-2">
                <h1 className="font-bold">{comment.title}</h1>
                <h1 className="text-sm">{comment.description}</h1>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CommentSection
