import { Request, Response } from 'express'
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
  isVisible: boolean
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
  const { userID, name } = req.user

  console.log(req.body)
  console.log(req.file)

  const product = await Product.create({
    ...req.body,
    farmerID: userID,
    farmerName: name,
    images: req.file?.filename,
  })
  res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({})
  res.status(StatusCodes.OK).json({ products, nbHits: products.length })
}

const getTopRatedProducts = async (req: Request, res: Response) => {
  const queryObject = { 'productRating.rating': { $gte: 4.5 }, isVisible: true }
  const topRatedProducts = await Product.find(queryObject).sort({
    createdAt: -1,
  })

  res.status(StatusCodes.OK).json({ products: topRatedProducts })
}

const getDiscountedProducts = async (req: Request, res: Response) => {
  const discountedProducts = await Product.find({
    hasDiscount: true,
    isVisible: true,
  }).sort({
    createdAt: -1,
  })

  res.status(StatusCodes.OK).json({ products: discountedProducts })
}

const getProductsLast30Days = async (req: Request, res: Response) => {
  const { farmerID } = req.params
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const products = await Product.find({
    farmerID: farmerID,
    isVisible: true,
    createdAt: {
      $gte: thirtyDaysAgo,
      $lt: new Date(),
    },
  })

  res.status(200).json({ products })
}

const getProductDetailForOrder = async (req: Request, res: Response) => {
  const { productID } = req.params
  const product = await Product.findOne({ _id: productID }).select(
    '_id title price images parentCategory category farmerID farmerName',
  )
  res.status(StatusCodes.OK).json({ product })
}

const getProductsOfCategory = async (req: Request, res: Response) => {
  let { parentCategory } = req.params
  parentCategory = getCategory(parentCategory)

  // // api/v1/products/category/fruits?category=Apples&rating=4
  const { category, search, rating, sortBy } = req.query
  let queryObject: QueryObjectType = {
    parentCategory,
    isVisible: true,
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

  let result = Product.find(queryObject).select(
    '_id title price farmerID farmerName images parentCategory category productRating hasDiscount discountPercentage isVisible',
  )

  const noOfTotalProducts = await Product.countDocuments(queryObject)

  if ((sortBy as string) === 'rating') {
    result = result.sort('productRating.rating')
  } else if ((sortBy as string) === 'lowToHigh') {
    result = result.sort('price')
  } else if ((sortBy as string) === 'highToLow') {
    result = result.sort('-price')
  } else {
    result = result.sort('createdAt')
  }

  const page = parseInt(req.query.page as string, 10) || 1
  const limit = parseInt(req.query.limit as string, 10) || 9
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)
  const products = await result

  res.status(StatusCodes.OK).json({ products, nbHits: noOfTotalProducts })
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
    const product = await Product.findOne({ _id: productID })
    let fiveNew = product?.productRating?.voteCount?.five!
    let fourNew = product?.productRating?.voteCount?.four!
    let threeNew = product?.productRating?.voteCount?.three!
    let twoNew = product?.productRating?.voteCount?.two!
    let oneNew = product?.productRating?.voteCount?.one!

    switch (req.body.comment.rating) {
      case 5:
        fiveNew++
        break
      case 4:
        fourNew++
        break
      case 3:
        threeNew++
        break
      case 2:
        twoNew++
        break
      case 5:
        oneNew++
        break
    }

    const totalRating =
      (fiveNew * 5 + fourNew * 4 + threeNew * 3 + twoNew * 2 + oneNew * 1) /
      (fiveNew + fourNew + threeNew + twoNew + oneNew)

    const productRating = {
      rating: totalRating,
      voteCount: {
        five: fiveNew,
        four: fourNew,
        three: threeNew,
        two: twoNew,
        one: oneNew,
      },
    }
    updatedProduct = await Product.findOneAndUpdate(
      { _id: productID },
      {
        $push: { comments: { $each: [newComment], $position: 0 } },
        $set: { productRating: productRating },
      },
      { new: true, runValidators: true },
    )

    if (!updatedProduct)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Product not found' })

    if (updatedProduct.comments.length > 6) {
      const leastRecentComment: RemovedCommentType = updatedProduct
        .comments[6] as RemovedCommentType
      updatedProduct = await Product.findByIdAndUpdate(
        { _id: productID },
        {
          $pull: {
            comments: updatedProduct.comments[6],
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
        productID,
      })

      return res.status(StatusCodes.CREATED).json({ comment })
    }
  } else if (newComment && role !== Role.Consumer) {
    throw new UnAuthorizedError('You cannot add comments as a Farmer')
  }

  if (!updatedProduct) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: 'Product not found' })
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
  getTopRatedProducts,
  getDiscountedProducts,
  getProductDetail,
  deleteProduct,
  updateProduct,
  getProductDetailForOrder,
  getProductsLast30Days,
}
