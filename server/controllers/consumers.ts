import { Request, Response } from 'express'
import Consumer from '../models/consumer'
import { StatusCodes } from 'http-status-codes'
import NotFoundError from '../errors/not-found'

const getConsumer = async (req: Request, res: Response) => {
  const { consumerID } = req.params

  const consumer = await Consumer.find({ _id: consumerID }).select(
    'locationCoordinates name mobileNo location',
  )
  res.status(StatusCodes.OK).json({ consumer })
}

const updateConsumer = async (req: Request, res: Response) => {
  const { userID } = req.user
  const { locationCoordinates } = req.body
  const parsedLocationCoordinates = JSON.parse(locationCoordinates)

  const image = req.file?.filename || req.body.image

  let updateFields: any = {}

  if (image) updateFields.image = image
  if (req.body.location) updateFields.location = req.body.location
  if (req.body.mobileNo) updateFields.mobileNo = req.body.mobileNo
  if (req.body.locationCoordinates) {
    updateFields.locationCoordinates = {
      latitude: {
        coordinate: parsedLocationCoordinates.latitude.coordinate,
        direction: parsedLocationCoordinates.latitude.direction,
      },
      longitude: {
        coordinate: parsedLocationCoordinates.longitude.coordinate,
        direction: parsedLocationCoordinates.longitude.direction,
      },
    }
  }
  if (req.body.cart) {
    updateFields.cart = req.body.cart
  }
  const consumer = await Consumer.findOneAndUpdate(
    { _id: userID },
    updateFields,
    {
      new: true,
      runValidators: true,
    },
  ).select(
    'name image location mobileNo locationCoordinates following cart _id',
  )
  res.status(StatusCodes.OK).json({ consumer })
}

const followFarmer = async (req: Request, res: Response) => {
  const { userID } = req.user
  const { farmer } = req.body

  const updatedConsumer = await Consumer.findByIdAndUpdate(
    { _id: userID },
    { $addToSet: { following: farmer } },
    { new: true, runValidators: true },
  ).select('locationCoordinates name mobileNo location following cart')

  if (!updateConsumer) {
    throw new NotFoundError('Consumer not found')
  }

  res.status(StatusCodes.OK).json({ consumer: updatedConsumer })
}

const getShoppingCart = async (req: Request, res: Response) => {
  const { userID } = req.user
  const shoppingcart = await Consumer.find({ _id: userID }).select('cart')

  res.status(StatusCodes.OK).json({ cart: shoppingcart })
}

const unFollowFarmer = async (req: Request, res: Response) => {
  const { userID } = req.user

  const updatedConsumer = await Consumer.findByIdAndUpdate(
    { _id: userID },
    { $pull: { following: req.body.farmer } },
    { new: true, runValidators: true },
  ).select('locationCoordinates name mobileNo location following cart')

  if (!updateConsumer) {
    throw new NotFoundError('Consumer not found')
  }

  res.status(StatusCodes.GONE).json({ consumer: updatedConsumer })
}

export {
  getConsumer,
  updateConsumer,
  followFarmer,
  unFollowFarmer,
  getShoppingCart,
}
