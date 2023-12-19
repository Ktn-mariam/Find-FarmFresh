import { Request, Response } from 'express'
import Order from '../models/order'
import { StatusCodes } from 'http-status-codes'
import { Role } from '../middleware/authentication'
import UnAuthorizedError from '../errors/unauthorized'
import NotFoundError from '../errors/not-found'

const getOrders = async (req: Request, res: Response) => {
  const { userID, role } = req.user
  let orders
  if (role === Role.Farmer) {
    orders = await Order.find({ farmerID: userID })
  } else {
    orders = await Order.find({ consumerID: userID })
  }
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

  if (req.body.notifyConsumer && role === Role.Consumer) {
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
  const order = await Order.findOneAndDelete({
    _id: orderID,
    farmerID: req.user.userID,
  })
  if (!order) {
    throw new NotFoundError('Order not found')
  }
  res.status(StatusCodes.GONE).json({ order })
}

export { getOrders, addOrder, updateOrder, deleteOrder }
