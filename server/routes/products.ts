import { Router } from 'express'
const router = Router()

import {
  createProduct,
  getAllProducts,
  getProductsOfCategory,
  getProductDetail,
  deleteProduct,
  updateProduct,
  // getFollowedFarmerProducts,
} from '../controllers/products'
import authenticationMiddleware from '../middleware/authentication'

router
  .route('/')
  .get(getAllProducts)
  .post(authenticationMiddleware, createProduct)
router
  .route('/:productID')
  .get(getProductDetail)
  .delete(authenticationMiddleware, deleteProduct)
  .patch(authenticationMiddleware, updateProduct)
router.route('/category/:parentCategory').get(getProductsOfCategory)
// router
//   .route('/followingProducts')
//   .get(authenticationMiddleware, getFollowedFarmerProducts)

export default router
