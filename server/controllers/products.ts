import { Request, Response } from 'express'
const Product = require('../models/product')

interface QueryObjectType {
  category?: string
  title?: { $regex: string; $options: string }
}

const addProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body)
  res.status(201).json({ product })
}

const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({})
  res.status(200).json({ products, nbHits: products.length })
}

const getProductsOfCategory = async (req: Request, res: Response) => {
  const { parentCategory } = req.params

  //   api/v1/fruits/products?category=apples&rating=4
  const { category, search, rating, sort } = req.query

  const queryObject: QueryObjectType = {}
  if (category) {
    queryObject.category = category as string
  }

  if (search) {
    queryObject.title = { $regex: search as string, $options: 'i' }
  }

  // only getting the title, price and rating of product and farmerID
  let result = Product.find(queryObject).select(
    'title price productRating farmerID images',
  )

  if (sort) {
    const sortList = (sort as string).split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 12
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)
  const products = await result
  res.status(200).json({ products, nbHits: products.length })
}

const getProductDetail = async (req: Request, res: Response) => {
  const { productID } = req.params
  const product = await Product.find({ _id: productID })
  res.status(200).json({ product })
}

const updateProduct = async (req: Request, res: Response) => {
  const { productID } = req.params

  const updateFields = {
    ...(req.body.images && { images: req.body.images }),
    ...(req.body.title && { title: req.body.title }),
    ...(req.body.price && { price: req.body.price }),
    ...(req.body.parentCategory && { parentCategory: req.body.parentCategory }),
    ...(req.body.category && { category: req.body.category }),
    ...(req.body.isVisible && { isVisible: req.body.isVisible }),
    ...(req.body.delivery && { delivery: req.body.delivery }),
    ...(req.body.organic && { organic: req.body.organic }),
    ...(req.body.transaction && { transaction: req.body.transaction }),
    ...(req.body.cashOnDelivery && { cashOnDelivery: req.body.cashOnDelivery }),
    ...(req.body.returnableChoice && {
      returnableChoice: req.body.returnableChoice,
    }),
    ...(req.body.onSiteShopping && { onSiteShopping: req.body.onSiteShopping }),
    ...(req.body.productRating && {
      rating: req.body.productRating.rating,
      voteCount: {
        five: req.body.productRating.voteCount.five,
        four: req.body.productRating.voteCount.four,
        three: req.body.productRating.voteCount.three,
        two: req.body.productRating.voteCount.two,
        one: req.body.productRating.voteCount.one,
      },
    }),
  }

  const updateQuery =
    Object.keys(updateFields).length > 0 ? { $set: updateFields } : {}

  const updatedFarmer = await Product.findOneAndUpdate(
    { _id: productID },
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

// What abt the consumers who have added it to cart??
const deleteProduct = async (req: Request, res: Response) => {
  const { productID } = req.params
  const product = await Product.findOneAndDelete({ _id: productID })
  res.status(200).json({ product })
}

module.exports = {
  addProduct,
  getAllProducts,
  getProductsOfCategory,
  getProductDetail,
  deleteProduct,
}
