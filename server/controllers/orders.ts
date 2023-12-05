import { Request, Response } from 'express'
const Order = require('../models/Order')

const addOrder = async (req: Request, res: Response) => {
  const order = await Order.create(req.body)
  res.status(201).json({ order })
}

const updateOrder = async (req: Request, res: Response) => {}

const deleteOrder = async (req: Request, res: Response) => {
  const { orderID } = req.params
  const order = await Order.findOneAndDelete({ _id: orderID })
  res.status(200).json({ order })
}

module.exports = {
  addOrder,
  updateOrder,
  deleteOrder,
}
