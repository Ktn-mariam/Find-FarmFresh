import { Request, Response } from 'express'
import Comment from '../models/comment'
import { StatusCodes } from 'http-status-codes'

const getCommentsOfFarmer = async (req: Request, res: Response) => {
  const { farmerID } = req.params
  let result = Comment.find({ farmerID })

  const limit = 3
  const page = Number(req.query.page) - 3 || 1
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)
  const comments = await result
  res.status(StatusCodes.OK).json({ comments })
}

const getCommentsOfProduct = async (req: Request, res: Response) => {
  const { productID } = req.params
  let result = Comment.find({ productID })

  const limit = 3
  const page = Number(req.query.page) - 3 || 1
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)
  const comments = await result
  res.status(StatusCodes.OK).json({ comments })
}

export { getCommentsOfFarmer, getCommentsOfProduct }
