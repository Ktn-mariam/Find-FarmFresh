import { Router } from 'express'
const router = Router()

import {
  createProduct,
  getAllProducts,
  getProductsOfCategory,
  getProductDetail,
  deleteProduct,
  updateProduct,
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

export default router
