import { Request, Response } from 'express'
import Farmer from '../models/farmer'
import Product from '../models/product'
import NotFoundError from '../errors/not-found'
import { RemovedCommentType } from './products'
import Comment from '../models/comment'
import { Role } from '../middleware/authentication'
import { StatusCodes } from 'http-status-codes'
import UnAuthorizedError from '../errors/unauthorized'

const getFarmer = async (req: Request, res: Response) => {
  const { farmerID } = req.params
  const farmer = await Farmer.find({ _id: farmerID })
  res.status(StatusCodes.OK).json({ farmer })
}

const getProductsOfFarmer = async (req: Request, res: Response) => {
  const { farmerID } = req.params
  const products = await Product.find({ farmerID })
  res.status(StatusCodes.OK).json({ products, nbHits: products.length })
}

const updateFarmer = async (req: Request, res: Response) => {
  const { userID } = req.user

  const updateFields = {
    ...(req.body.name && { name: req.body.name }),
    ...(req.body.mobileNo && { mobileNo: req.body.mobileNo }),
    ...(req.body.image && { image: req.body.image }),
    ...(req.body.description && { description: req.body.description }),
    ...(req.body.location && { location: req.body.location }),
    ...(req.body.locationCoordinates && {
      locationCoordinates: {
        latitude: {
          coordinate: req.body.locationCoordinates.latitude.coordinate,
          direction: req.body.locationCoordinates.latitude.direction,
        },
        longitude: {
          coordinate: req.body.locationCoordinates.longitude.coordinate,
          direction: req.body.locationCoordinates.longitude.direction,
        },
      },
    }),
    ...(req.body.farmerRating && {
      farmerRating: {
        rating: req.body.farmerRating.rating,
        voteCount: {
          five: req.body.farmerRating.voteCount.five,
          four: req.body.farmerRating.voteCount.four,
          three: req.body.farmerRating.voteCount.three,
          two: req.body.farmerRating.voteCount.two,
          one: req.body.farmerRating.voteCount.one,
        },
      },
    }),
  }

  const updateQuery =
    Object.keys(updateFields).length > 0 ? { $set: updateFields } : {}

  const updatedFarmer = await Farmer.findOneAndUpdate(
    { _id: userID },
    {
      ...updateQuery,
    },
    {
      new: true,
      runValidators: true,
    },
  ).select(
    '_id locationCoordinates name location farmerRating image email comments mobileNo ',
  )

  if (!updatedFarmer) {
    throw new NotFoundError('Farmer not found')
  }

  res.json({ farmer: updatedFarmer })
}

const addCommentsToFarmer = async (req: Request, res: Response) => {
  const { userID, role, name } = req.user
  const { farmerID } = req.params

  const newComment = req.body.comment
    ? {
        userID: userID,
        username: name,
        rating: req.body.comment.rating,
        title: req.body.comment.title,
        description: req.body.comment.description,
      }
    : undefined

  console.log(newComment)

  let updatedFarmer
  if (newComment && role === Role.Consumer) {
    updatedFarmer = await Farmer.findOneAndUpdate(
      { _id: farmerID },
      {
        $push: { comments: newComment },
      },
      { new: true, runValidators: true },
    )

    console.log(updatedFarmer)

    if (!updatedFarmer)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Farmer not found' })

    if (updatedFarmer.comments.length > 6) {
      const leastRecentComment: RemovedCommentType = updatedFarmer
        .comments[0] as RemovedCommentType
      updatedFarmer = await Product.findByIdAndUpdate(
        { _id: farmerID },
        {
          $pull: {
            comments: updatedFarmer.comments[0],
          },
        },
        { new: true, runValidators: true },
      )

      const comment = await Comment.create({
        userID: leastRecentComment?.userID,
        rating: leastRecentComment?.rating,
        description: leastRecentComment?.description,
        title: leastRecentComment?.title,
        createdAt: leastRecentComment?.createdAt,
        username: leastRecentComment?.username,
        farmerID,
      })

      return res.status(StatusCodes.CREATED).json({ comment })
    }
  } else if (newComment && role !== Role.Consumer) {
    throw new UnAuthorizedError('You cannot add comments as a Farmer')
  }

  if (!updateFarmer) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Farmer not found' })
  }

  res.json({ farmer: updatedFarmer })
}

export { getFarmer, getProductsOfFarmer, updateFarmer, addCommentsToFarmer }
