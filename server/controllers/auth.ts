import { Request, Response } from 'express'
import Consumer from '../models/consumer'
import Farmer from '../models/farmer'
import { StatusCodes } from 'http-status-codes'
import { IFarmer } from '../models/farmer'
import { IConsumer } from '../models/consumer'
import { BadRequestError, UnauthenticatedError } from '../errors'
import { Role } from '../middleware/authentication'

const registerFarmer = async (req: Request, res: Response) => {
  const farmer = (await Farmer.create({ ...req.body })) as IFarmer
  const token = farmer.createJWT()
  const farmerDetails = farmer.getFarmerDetails()
  res.status(StatusCodes.CREATED).json({
    farmer: farmerDetails,
    token,
  })
}

const registerConsumer = async (req: Request, res: Response) => {
  const consumer = (await Consumer.create({ ...req.body })) as IConsumer
  const token = consumer.createJWT()
  const consumerDetails = consumer.getConsumerDetails()
  res.status(StatusCodes.CREATED).json({
    consumer: consumerDetails,
    token,
  })
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const farmer = (await Farmer.findOne({ email })) as IFarmer | null
  const consumer = (await Consumer.findOne({ email })) as IConsumer | null

  if (!consumer && !farmer) {
    throw new UnauthenticatedError('User is not registered')
  }

  const isPasswordCorrect = farmer
    ? await farmer.comparePasswords(password)
    : await consumer?.comparePasswords(password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid password')
  }

  let token = farmer ? farmer.createJWT() : consumer?.createJWT()
  let details = farmer
    ? farmer.getFarmerDetails()
    : consumer?.getConsumerDetails()

  return res.status(StatusCodes.OK).json({
    UserDetail: details,
    token,
    role: farmer ? 'Farmer' : 'Consumer',
  })
}

const getUserProfileInformation = async (req: Request, res: Response) => {
  const { userID, role, name } = req.user
  let userDetail
  if (role === Role.Farmer) {
    userDetail = await Farmer.find({ _id: userID }).select(
      'locationCoordinates farmerRating _id image name description mobileNo location comments',
    )
  } else {
    userDetail = await Consumer.find({ _id: userID }).select(
      'locationCoordinates name mobileNo location image following cart',
    )
  }

  const user = {
    userDetail,
    userID,
    role,
  }

  res.status(StatusCodes.OK).json({ user })
}

export { registerFarmer, registerConsumer, login, getUserProfileInformation }
