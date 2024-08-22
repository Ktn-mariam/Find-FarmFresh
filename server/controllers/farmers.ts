import { Request, Response } from 'express'
import Farmer from '../models/farmer'
import Product from '../models/product'
import NotFoundError from '../errors/not-found'
import { RemovedCommentType } from './products'
import Comment from '../models/comment'
import { StatusCodes } from 'http-status-codes'

const getFarmer = async (req: Request, res: Response) => {
  const { farmerID } = req.params
  const farmer = await Farmer.find({ _id: farmerID }).select(
    'locationCoordinates farmerRating _id image name description mobileNo location comments',
  )
  res.status(StatusCodes.OK).json({ farmer })
}

const getProductsOfFarmer = async (req: Request, res: Response) => {
  const { farmerID } = req.params
  const products = await Product.find({ farmerID })
    .sort({ createdAt: -1 })
    .exec()
  res.status(StatusCodes.OK).json({ products, nbHits: products.length })
}

const updateFarmer = async (req: Request, res: Response) => {
  const { userID } = req.user
  const { locationCoordinates } = req.body
  const parsedLocationCoordinates = JSON.parse(locationCoordinates)

  const image = req.file?.filename || req.body.image

  const updateFields = {
    ...(req.body.mobileNo && { mobileNo: req.body.mobileNo }),
    ...(image && { image: image }),
    ...(req.body.description && { description: req.body.description }),
    ...(req.body.location && { location: req.body.location }),
    ...(req.body.locationCoordinates && {
      locationCoordinates: {
        latitude: {
          coordinate: parsedLocationCoordinates.latitude.coordinate,
          direction: parsedLocationCoordinates.latitude.direction,
        },
        longitude: {
          coordinate: parsedLocationCoordinates.longitude.coordinate,
          direction: parsedLocationCoordinates.longitude.direction,
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
    '_id locationCoordinates name location farmerRating image email comments mobileNo description',
  )

  if (!updatedFarmer) {
    throw new NotFoundError('Farmer not found')
  }

  res.json({ farmer: updatedFarmer })
}

const addCommentsToFarmer = async (req: Request, res: Response) => {
  const { userID, role, name } = req.user
  const { farmerID } = req.params

  const farmer = await Farmer.findOne({ _id: farmerID })
  let fiveNew = farmer?.farmerRating?.voteCount?.five!
  let fourNew = farmer?.farmerRating?.voteCount?.four!
  let threeNew = farmer?.farmerRating?.voteCount?.three!
  let twoNew = farmer?.farmerRating?.voteCount?.two!
  let oneNew = farmer?.farmerRating?.voteCount?.one!

  switch (req.body.comment.rating) {
    case 5:
      fiveNew++
      break
    case 4:
      fourNew++
      break
    case 3:
      threeNew++
      break
    case 2:
      twoNew++
      break
    case 5:
      oneNew++
      break
  }

  const totalRating =
    (fiveNew * 5 + fourNew * 4 + threeNew * 3 + twoNew * 2 + oneNew * 1) /
    (fiveNew + fourNew + threeNew + twoNew + oneNew)

  const farmerRating = {
    rating: totalRating,
    voteCount: {
      five: fiveNew,
      four: fourNew,
      three: threeNew,
      two: twoNew,
      one: oneNew,
    },
  }

  const newComment = req.body.comment
    ? {
        userID: userID,
        username: name,
        rating: req.body.comment.rating,
        title: req.body.comment.title,
        description: req.body.comment.description,
      }
    : undefined

  let updatedFarmer
  if (newComment) {
    updatedFarmer = await Farmer.findOneAndUpdate(
      { _id: farmerID },
      {
        $push: { comments: { $each: [newComment], $position: 0 } },
        $set: { farmerRating: farmerRating },
      },
      { new: true, runValidators: true },
    ).select(
      '_id locationCoordinates name location farmerRating image email comments mobileNo description',
    )

    if (!updatedFarmer)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Farmer not found' })

    if (updatedFarmer.comments.length > 6) {
      const leastRecentComment: RemovedCommentType = updatedFarmer
        .comments[6] as RemovedCommentType
      updatedFarmer = await Product.findByIdAndUpdate(
        { _id: farmerID },
        {
          $pull: {
            comments: updatedFarmer.comments[6],
          },
        },
        { new: true, runValidators: true },
      ).select(
        '_id locationCoordinates name location farmerRating image email comments mobileNo description',
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
  }

  if (!updateFarmer) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: 'Farmer not found' })
  }

  res.json({ farmer: updatedFarmer })
}

export { getFarmer, getProductsOfFarmer, updateFarmer, addCommentsToFarmer }
