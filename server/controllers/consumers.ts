import { Request, Response } from 'express'
import Consumer from '../models/consumer'
import { StatusCodes } from 'http-status-codes'
import NotFoundError from '../errors/not-found'

const getMyDetails = async (req: Request, res: Response) => {
  const { userID } = req.user
  const consumer = await Consumer.find({ _id: userID }).select(
    'locationCoordinates name mobileNo location image following cart',
  )
  res.status(StatusCodes.OK).json({ consumer })
}

const getConsumer = async (req: Request, res: Response) => {
  const { consumerID } = req.params

  const consumer = await Consumer.find({ _id: consumerID }).select(
    'locationCoordinates name mobileNo location',
  )
  res.status(StatusCodes.OK).json({ consumer })
}

const updateConsumer = async (req: Request, res: Response) => {
  const { userID } = req.user

  let updateFields: any = {}

  if (req.body.image) updateFields.image = req.body.image
  if (req.body.location) updateFields.location = req.body.location
  if (req.body.mobileNo) updateFields.mobileNo = req.body.mobileNo
  if (req.body.locationCoordinates) {
    updateFields.locationCoordinates = {
      latitude: {
        coordinate: req.body.locationCoordinates.latitude.coordinate,
        direction: req.body.locationCoordinates.latitude.direction,
      },
      longitude: {
        coordinate: req.body.locationCoordinates.longitude.coordinate,
        direction: req.body.locationCoordinates.longitude.direction,
      },
    }
  }
  const consumer = await Consumer.findOneAndUpdate({ _id: userID }, req.body, {
    new: true,
    runValidators: true,
  }).select(
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
  getMyDetails,
  getConsumer,
  updateConsumer,
  followFarmer,
  unFollowFarmer,
}
