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
  getDiscountedProducts,
  getProductDetailForOrder,
  getProductsLast30Days,
} from '../controllers/products'
import authenticateMiddleware from '../middleware/authentication'
import authorizeFarmer from '../middleware/authorizationFarmer'
import upload from '../middleware/uploadFile'

router.route('/').get(getAllProducts).post(
  authenticateMiddleware,
  authorizeFarmer,
  upload.single('images'),
  // upload.array('productImage', 3),
  createProduct,
)
router.route('/topRatedProducts').get(getTopRatedProducts)
router.route('/discountedProducts').get(getDiscountedProducts)
router.route('/lastThirtyDayProducts/:farmerID').get(getProductsLast30Days)
router
  .route('/:productID')
  .get(getProductDetail)
  .delete(authenticateMiddleware, authorizeFarmer, deleteProduct)
  .patch(authenticateMiddleware, updateProduct)
router.route('/category/:parentCategory').get(getProductsOfCategory)
router.route('/orderDetail/:productID').get(getProductDetailForOrder)

export default router
