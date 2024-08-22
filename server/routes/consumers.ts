import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware/authentication'
import authorizeConsumer from '../middleware/authorizationConsumer'
import authorizeFarmer from '../middleware/authorizationFarmer'
import {
  getConsumer,
  updateConsumer,
  followFarmer,
  unFollowFarmer,
  getShoppingCart,
} from '../controllers/consumers'
import uploadFileMiddleware from '../middleware/uploadFile'

router
  .route('/shoppingCart')
  .get(authMiddleware, authorizeConsumer, getShoppingCart)
router
  .route('/followFarmer')
  .patch(authMiddleware, authorizeConsumer, followFarmer)
router
  .route('/unFollowFarmer')
  .patch(authMiddleware, authorizeConsumer, unFollowFarmer)
router.route('/:consumerID').get(authMiddleware, authorizeFarmer, getConsumer)
router
  .route('/')
  .patch(
    authMiddleware,
    authorizeConsumer,
    uploadFileMiddleware.single('image'),
    updateConsumer,
  )

export default router
