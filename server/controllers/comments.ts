import { Request, Response } from 'express'
import Comment from '../models/comment'
import { StatusCodes } from 'http-status-codes'

const getCommentsOfFarmer = async (req: Request, res: Response) => {
  const { farmerID } = req.params

  const limit = 3
  const page = Number(req.query.page) - 2 || 1
  const skip = (page - 1) * limit

  let result = Comment.find({ farmerID }).skip(skip).limit(limit)
  const comments = await result.exec()
  res.status(StatusCodes.OK).json({ comments })
}

const getNoOfCommentsOfFarmer = async (req: Request, res: Response) => {
  const { farmerID } = req.params
  let result = Comment.find({ farmerID })
  const noOfComments = (await result.exec()).length
  res.status(StatusCodes.OK).json({ count: noOfComments })
}

const getCommentsOfProduct = async (req: Request, res: Response) => {
  const { productID } = req.params

  const limit = 3
  const page = Number(req.query.page) - 2 || 1
  const skip = (page - 1) * limit

  let result = Comment.find({ productID }).skip(skip).limit(limit)
  const comments = await result.exec()
  res.status(StatusCodes.OK).json({ comments })
}

const getNoOfCommentsOfProduct = async (req: Request, res: Response) => {
  const { productID } = req.params
  let result = Comment.find({ productID })
  const noOfComments = (await result.exec()).length
  res.status(StatusCodes.OK).json({ count: noOfComments })
}

export {
  getCommentsOfFarmer,
  getNoOfCommentsOfFarmer,
  getCommentsOfProduct,
  getNoOfCommentsOfProduct,
}
