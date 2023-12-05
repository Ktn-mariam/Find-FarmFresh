import { Request, Response } from 'express'
const Consumer = require('../models/consumer')
const Order = require('../models/order')

const addConsumer = async (req: Request, res: Response) => {
  const consumer = await Consumer.create(req.body)
  res.status(201).json({ consumer })
}

const getConsumer = async (req: Request, res: Response) => {
  const { consumer_ID } = req.params
  const consumer = await Consumer.find({ _id: consumer_ID })
  res.status(200).json({ consumer })
}

const updateConsumer = async (req: Request, res: Response) => {
  const { consumer_ID } = req.params
  const task = await Consumer.findOneAndUpdate({ _id: consumer_ID }, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({ task })
}

const getOrdersOfConsumer = async (req: Request, res: Response) => {
  const { consumerID } = req.params
  const orders = await Order.find({ consumer_ID: consumerID })

  res.status(200).json({ orders })
}

module.exports = {
  addConsumer,
  getConsumer,
  updateConsumer,
  getOrdersOfConsumer,
}
