import { Request, Response } from 'express'
const Comment = require('../models/comment')

const getCommentsOfFarmer = async (req: Request, res: Response) => {
  const { farmerID } = req.params
  const comments = await Comment.find({ farmer_ID: farmerID })
  res.status(200).json({ comments })
}

const getCommentsOfProduct = async (req: Request, res: Response) => {
  const { productID } = req.params
  const comments = await Comment.find({ product_ID: productID })
  res.status(200).json({ comments })
}

module.exports = {
  getCommentsOfFarmer,
  getCommentsOfProduct,
}
