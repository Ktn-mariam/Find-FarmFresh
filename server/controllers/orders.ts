import { Request, Response } from 'express'
import Order from '../models/order'
import { StatusCodes } from 'http-status-codes'
import { Role } from '../middleware/authentication'
import UnAuthorizedError from '../errors/unauthorized'
import moment from 'moment'

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

const getOrderByDate = async (req: Request, res: Response) => {
  const { date } = req.params

  const startDate = new Date(date)
  startDate.setHours(0, 0, 0, 0)

  const endDate = new Date(date)
  endDate.setHours(23, 59, 59, 999)

  const query = {
    orderDate: {
      $gte: startDate,
      $lt: endDate,
    },
    farmerID: req.user.userID,
  }

  const results = await Order.find(query)
  const totalAmount = results.reduce((sum, order) => sum + order.totalPrice, 0)
  res.status(StatusCodes.OK).json({ totalAmount })
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
  getOrderByDate,
  getOrderToReview,
}
