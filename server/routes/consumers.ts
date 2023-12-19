import express from 'express'
const router = express.Router()
import authenticationMiddleware from '../middleware/authentication'
import {
  getConsumer,
  updateConsumer,
  followFarmer,
  unFollowFarmer,
} from '../controllers/consumers'

router.route('/:consumerID').get(authenticationMiddleware, getConsumer)
router.route('/').patch(authenticationMiddleware, updateConsumer)
router.route('/followFarmer').patch(authenticationMiddleware, followFarmer)
router.route('/unFollowFarmer').patch(authenticationMiddleware, unFollowFarmer)

export default router
