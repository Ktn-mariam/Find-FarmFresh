import express from 'express'
const router = express.Router()
import authenticateMiddleware from '../middleware/authentication'
import authorizeConsumer from '../middleware/authorizationConsumer'
import authorizeFarmer from '../middleware/authorizationFarmer'
import {
  getFarmer,
  getProductsOfFarmer,
  updateFarmer,
  addCommentsToFarmer,
} from '../controllers/farmers'
import uploadFileMiddleware from '../middleware/uploadFile'

router.route('/:farmerID/products').get(getProductsOfFarmer)
router
  .route('/:farmerID/comments')
  .patch(authenticateMiddleware, authorizeConsumer, addCommentsToFarmer)
router.route('/:farmerID').get(getFarmer)
router
  .route('/')
  .patch(
    authenticateMiddleware,
    authorizeFarmer,
    uploadFileMiddleware.single('image'),
    updateFarmer,
  )

export default router
