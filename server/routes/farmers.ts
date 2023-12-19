import express from 'express'
const router = express.Router()
import authenticationMiddleware from '../middleware/authentication'
import {
  getFarmer,
  getProductsOfFarmer,
  updateFarmer,
  addCommentsToFarmer,
} from '../controllers/farmers'

router.route('/:farmerID').get(getFarmer)
router.route('/:farmerID/products').get(getProductsOfFarmer)
router
  .route('/:farmerID/comments')
  .patch(authenticationMiddleware, addCommentsToFarmer)
router.route('/').patch(authenticationMiddleware, updateFarmer)

export default router
