import { Request, Response } from 'express'
const Farmer = require('../models/farmer')
const Product = require('../models/product')
const Order = require('../models/orders')

const addFarmer = async (req: Request, res: Response) => {
  const farmer = await Farmer.create(req.body)
  res.status(201).json({ farmer })
}

const getFarmer = async (req: Request, res: Response) => {
  const { farmerID } = req.params
  const farmer = await Farmer.find({ _id: farmerID })
  res.status(200).json({ farmer })
}

const getProductsOfFarmer = async (req: Request, res: Response) => {
  const { farmerID } = req.params

  const products = await Product.find({ farmer_ID: farmerID })
  res.status(200).json({ products, nbHits: products.length })
}

const getOrdersOfFarmer = async (req: Request, res: Response) => {
  const { farmerID } = req.params
  const orders = await Order.find({ farmer_ID: farmerID })

  res.status(200).json({ orders })
}

const updateFarmer = async (req: Request, res: Response) => {
  const { farmerID } = req.params

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
  }

  const updateQuery =
    Object.keys(updateFields).length > 0 ? { $set: updateFields } : {}

  const updatedFarmer = await Farmer.findOneAndUpdate(
    { _id: farmerID },
    {
      ...updateQuery,
      $push: {
        comments: req.body.comment
          ? {
              UserID: req.body.comment.userID,
              UserName: req.body.comment.userName,
              Rating: req.body.comment.rating,
              title: req.body.comment.title,
              description: req.body.comment.description,
              date: new Date(),
            }
          : undefined,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  )

  if (!updatedFarmer) {
    return res.status(404).json({ error: 'Farmer not found' })
  }

  res.json({ message: 'Farmer updated successfully', farmer: updatedFarmer })
}

module.exports = {
  addFarmer,
  getFarmer,
  getProductsOfFarmer,
  getOrdersOfFarmer,
  updateFarmer,
}
