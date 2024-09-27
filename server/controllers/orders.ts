import { Request, Response } from 'express'
import Order from '../models/order'
import { StatusCodes } from 'http-status-codes'
import { Role } from '../middleware/authentication'
import UnAuthorizedError from '../errors/unauthorized'
import moment from 'moment'
import { getFormattedDateWithoutYear } from '../utils/getFormattedDate'

const getOrders = async (req: Request, res: Response) => {
  const { userID, role } = req.user
  const page = parseInt(req.query.page as string, 10) || 1
  const limit = parseInt(req.query.limit as string, 10) || 5
  const skip = (page - 1) * limit

  let query

  if (role === Role.Farmer) {
    query = Order.find({ farmerID: userID }).sort({ orderDate: -1 })
  } else {
    query = Order.find({ consumerID: userID }).sort({ orderDate: -1 })
  }

  const orders = await query.skip(skip).limit(limit)

  res.status(StatusCodes.OK).json({ orders })
}

const addOrder = async (req: Request, res: Response) => {
  const { userID } = req.user

  const order = await Order.create({ ...req.body, consumerID: userID })
  res.status(StatusCodes.CREATED).json({ order })
}

const updateOrder = async (req: Request, res: Response) => {
  const { userID, role } = req.user
  const { orderID } = req.params

  let updateFields: any = {}
  if (req.body.deliveryStatus) {
    updateFields.deliveryStatus = req.body.deliveryStatus
  }

  if (req.body.paymentStatus && role === Role.Farmer) {
    updateFields.paymentStatus = req.body.paymentStatus
  }

  if (
    Object.prototype.hasOwnProperty.call(req.body, 'notifyConsumer') &&
    role === Role.Consumer
  ) {
    updateFields.notifyConsumer = req.body.notifyConsumer
  }

  let updatedOrder
  if (role === Role.Farmer) {
    updatedOrder = await Order.findOneAndUpdate(
      { _id: orderID, farmerID: userID },
      {
        $set: updateFields,
      },
      { new: true, runValidators: true },
    )
  }

  if (role === Role.Consumer && updateFields !== null) {
    updatedOrder = await Order.findOneAndUpdate(
      { _id: orderID, consumerID: userID },
      {
        $set: updateFields,
      },
      { new: true, runValidators: true },
    )
  }

  if (!updatedOrder) {
    throw new UnAuthorizedError('You cannot make those changes')
  }

  res.status(StatusCodes.OK).json({ updatedOrder })
}

const deleteOrder = async (req: Request, res: Response) => {
  const { orderID } = req.params

  const order = await Order.findOne({
    _id: orderID,
    farmerID: req.user.userID,
  })

  const thirtyDaysAgo = moment().subtract(30, 'days').toDate()
  if (order!.orderDate > thirtyDaysAgo) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: 'Cannot delete an order from the last 30 days' })
  }

  await Order.findOneAndDelete({
    _id: orderID,
    farmerID: req.user.userID,
  })

  res.status(StatusCodes.OK).json({ order })
}

const getEarningsForLast30Days = async (req: Request, res: Response) => {
  const dateArray = []
  const totalAmountArray = []
  const today = new Date()
  const farmerID = req.user.userID

  // Loop for the last 30 days
  for (let i = 0; i < 30; i++) {
    // Create start and end dates for each day
    const currentDate = new Date()
    currentDate.setDate(today.getDate() - 30 + i + 1)
    currentDate.setHours(0, 0, 0, 0)

    const startDate = new Date(currentDate)
    const endDate = new Date(currentDate)
    endDate.setHours(23, 59, 59, 999)

    // Query for orders on that day
    const query = {
      orderDate: {
        $gte: startDate,
        $lt: endDate,
      },
      farmerID,
    }

    const results = await Order.find(query)
    const totalAmount = results.reduce(
      (sum, order) => sum + order.totalPrice,
      0,
    )

    // Push date and total amount into array
    dateArray.push(getFormattedDateWithoutYear(currentDate))
    totalAmountArray.push(totalAmount)
  }

  res.status(StatusCodes.OK).json({ data: [dateArray, totalAmountArray] })
}

const getOrderToReview = async (req: Request, res: Response) => {
  const { userID } = req.user
  const orders = await Order.find({
    consumerID: userID,
    notifyConsumer: true,
    deliveryStatus: 'Delivered',
  })
  res.status(StatusCodes.OK).json({ orders })
}

export {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getEarningsForLast30Days,
  getOrderToReview,
}
