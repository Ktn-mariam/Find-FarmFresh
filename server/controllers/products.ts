import { Request, Response } from 'express'
import { UnauthenticatedError } from '../errors'
import Product from '../models/product'
import Comment from '../models/comment'
import { Role } from '../middleware/authentication'
import UnAuthorizedError from '../errors/unauthorized'
import { StatusCodes } from 'http-status-codes'
import NotFoundError from '../errors/not-found'
import getCategory from '../utils/getCategory'
import { Types } from 'mongoose'

interface QueryObjectType {
  category?: string
  parentCategory: string
  title?: { $regex: string; $options: string }
  [key: string]: any
}

export type RemovedCommentType =
  | {
      title: string
      rating: number
      username: string
      description: string
      createdAt: Date
      userID?: Types.ObjectId | null | undefined
      _id: Types.ObjectId
    }
  | undefined

const createProduct = async (req: Request, res: Response) => {
  if (req.user.role !== Role.Farmer) {
    throw new UnAuthorizedError('You are not authorized to create products')
  }

  const { userID } = req.user
  const product = await Product.create({ ...req.body, farmerID: userID })
  res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({})
  res.status(StatusCodes.OK).json({ products, nbHits: products.length })
}

const getProductsOfCategory = async (req: Request, res: Response) => {
  let { parentCategory } = req.params
  parentCategory = getCategory(parentCategory)

  // // api/v1/products/category/fruits?category=Apples&rating=4
  const { category, search, rating, sort } = req.query

  let queryObject: QueryObjectType = {
    parentCategory,
  }
  if (category) {
    queryObject.category = category as string
  }

  if (search) {
    queryObject.title = { $regex: search as string, $options: 'i' }
  }

  if (rating) {
    queryObject['productRating.rating'] = { $gte: parseFloat(rating as string) }
  }

  console.log(queryObject)

  let result = Product.find(queryObject).select(
    '_id title price farmerID images parentCategory category productRating',
  )

  if (sort) {
    const sortList = (sort as string).split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  const page = parseInt(req.query.page as string, 10) || 1
  const limit = parseInt(req.query.limit as string, 10) || 9
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)
  const products = await result

  res.status(StatusCodes.OK).json({ products, nbHits: products.length })
}

const getProductDetail = async (req: Request, res: Response) => {
  const { productID } = req.params
  const product = await Product.findOne({ _id: productID })
  res.status(StatusCodes.OK).json({ product })
}

const updateProduct = async (req: Request, res: Response) => {
  const { userID, name, role } = req.user
  const { productID } = req.params

  let updateFields: any = {}

  if (req.body.images) updateFields.images = req.body.images
  if (req.body.title) updateFields.title = req.body.title
  if (req.body.price) updateFields.price = req.body.price
  if (req.body.parentCategory)
    updateFields.parentCategory = req.body.parentCategory
  if (req.body.category) updateFields.category = req.body.category
  if (req.body.hasOwnProperty('isVisible'))
    updateFields.isVisible = req.body.isVisible
  if (req.body.hasOwnProperty('delivery'))
    updateFields.delivery = req.body.delivery
  if (req.body.hasOwnProperty('organic'))
    updateFields.organic = req.body.organic
  if (req.body.hasOwnProperty('transaction'))
    updateFields.transaction = req.body.transaction
  if (req.body.hasOwnProperty('cashOnDelivery'))
    updateFields.cashOnDelivery = req.body.cashOnDelivery
  if (req.body.hasOwnProperty('returnableChoice'))
    updateFields.returnableChoice = req.body.returnableChoice
  if (req.body.hasOwnProperty('onSiteShopping'))
    updateFields.onSiteShopping = req.body.onSiteShopping
  if (req.body.productRating) {
    updateFields.productRating = {
      rating: req.body.productRating.rating,
      voteCount: {
        five: req.body.productRating.voteCount.five,
        four: req.body.productRating.voteCount.four,
        three: req.body.productRating.voteCount.three,
        two: req.body.productRating.voteCount.two,
        one: req.body.productRating.voteCount.one,
      },
    }
  }

  const newComment = req.body.comment
    ? {
        userID: userID,
        username: name,
        rating: req.body.comment.rating,
        title: req.body.comment.title,
        description: req.body.comment.description,
      }
    : undefined

  let updatedProduct
  if (role === Role.Farmer) {
    updatedProduct = await Product.findOneAndUpdate(
      { _id: productID, farmerID: userID },
      {
        $set: updateFields,
      },
      { new: true, runValidators: true },
    )
  }

  if (newComment && role === Role.Consumer) {
    updatedProduct = await Product.findOneAndUpdate(
      { _id: productID },
      {
        $push: { comments: newComment },
      },
      { new: true, runValidators: true },
    )

    if (!updatedProduct)
      return res.status(404).json({ error: 'Product not found' })

    if (updatedProduct.comments.length > 6) {
      const leastRecentComment: RemovedCommentType = updatedProduct
        .comments[0] as RemovedCommentType
      updatedProduct = await Product.findByIdAndUpdate(
        { _id: productID },
        {
          $pull: {
            comments: updatedProduct.comments[0],
          },
        },
        { new: true, runValidators: true },
      )

      const comment = await Comment.create({
        userID: leastRecentComment?.userID,
        rating: leastRecentComment?.rating,
        description: leastRecentComment?.description,
        title: leastRecentComment?.title,
        createdAt: leastRecentComment?.createdAt,
        username: leastRecentComment?.username,
        _id: leastRecentComment?._id,
        productID,
      })

      return res.status(StatusCodes.CREATED).json({ comment })
    }
  } else if (newComment && role !== Role.Consumer) {
    throw new UnAuthorizedError('You cannot add comments as a Farmer')
  }

  if (!updatedProduct) {
    return res.status(404).json({ error: 'Product not found' })
  }

  res.json({ product: updatedProduct })
}

// What abt the consumers who have added it to cart??
const deleteProduct = async (req: Request, res: Response) => {
  const { productID } = req.params
  const { userID } = req.user

  const product = await Product.findOneAndDelete({
    _id: productID,
    farmerID: userID,
  })

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  res.status(StatusCodes.GONE).json({ product })
}

export {
  createProduct,
  getAllProducts,
  getProductsOfCategory,
  getProductDetail,
  deleteProduct,
  updateProduct,
}
