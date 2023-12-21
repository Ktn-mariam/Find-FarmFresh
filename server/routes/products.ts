import { Router } from 'express'
const router = Router()

import {
  createProduct,
  getAllProducts,
  getProductsOfCategory,
  getProductDetail,
  deleteProduct,
  updateProduct,
  getTopRatedProducts,
} from '../controllers/products'
import authenticateMiddleware from '../middleware/authentication'
import authorizeFarmer from '../middleware/authorizationFarmer'

router
  .route('/')
  .get(getAllProducts)
  .post(authenticateMiddleware, authorizeFarmer, createProduct)
router.route('/topRatedProducts').get(getTopRatedProducts)
router
  .route('/:productID')
  .get(getProductDetail)
  .delete(authenticateMiddleware, authorizeFarmer, deleteProduct)
  .patch(authenticateMiddleware, updateProduct)
router.route('/category/:parentCategory').get(getProductsOfCategory)

export default router
