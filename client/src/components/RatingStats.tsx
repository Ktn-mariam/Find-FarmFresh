import React from 'react'
import { Progress } from '@material-tailwind/react'
import Rating from '@mui/material/Rating'
import { RatingStatType } from '../types/Auth'

interface RatingStatsPropType {
  productRating?: RatingStatType
  farmerRating?: RatingStatType
}

const RatingStats: React.FC<RatingStatsPropType> = ({
  productRating,
  farmerRating,
}) => {
  let voteCount
  let rating
  if (productRating) {
    rating = productRating.rating
    voteCount = productRating.voteCount
  } else if (farmerRating) {
    rating = farmerRating.rating
    voteCount = farmerRating.voteCount
  }

  if (!voteCount) {
    return <div>Loading</div>
  }

  let totalCount =
    voteCount?.five +
    voteCount?.four +
    voteCount?.three +
    voteCount?.two +
    voteCount?.one

  const fiveVotePercentage = (voteCount.five / totalCount) * 100
  const fourVotePercentage = (voteCount.four / totalCount) * 100
  const threeVotePercentage = (voteCount.three / totalCount) * 100
  const twoVotePercentage = (voteCount.two / totalCount) * 100
  const oneVotePercentage = (voteCount.one / totalCount) * 100

  return (
    <div>
      <h1 className="text-lg font-bold">
        {productRating ? 'Product' : 'Farmer'}'s Rating
      </h1>
      <div className="flex items-center mt-1 gap-2">
        <Rating defaultValue={rating} precision={0.1} readOnly />
        <h3>{rating} out of 5</h3>
      </div>
      <p className="mt-3 text-sm text-gray-800">{totalCount} votes overall</p>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-sm whitespace-nowrap">5 stars</h1>
          <Progress value={fiveVotePercentage} size="lg" color="amber" />
          <h1 className="text-sm">{voteCount.five}</h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-sm whitespace-nowrap">4 stars</h1>
          <Progress value={fourVotePercentage} size="lg" color="amber" />
          <h1 className="text-sm">{voteCount.four}</h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-sm whitespace-nowrap">3 stars</h1>
          <Progress value={threeVotePercentage} size="lg" color="amber" />
          <h1 className="text-sm">{voteCount.three}</h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-sm whitespace-nowrap">2 stars</h1>
          <Progress value={twoVotePercentage} size="lg" color="amber" />
          <h1 className="text-sm">{voteCount.two}</h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-sm whitespace-nowrap">1 stars</h1>
          <Progress value={oneVotePercentage} size="lg" color="amber" />
          <h1 className="text-sm">{voteCount.one}</h1>
        </div>
      </div>
    </div>
  )
}

export default RatingStats
