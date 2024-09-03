import express from 'express'
const router = express.Router()

import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  getOrderByDate,
} from '../controllers/orders'
import authenticateMiddleware from '../middleware/authentication'
import authorizeConsumer from '../middleware/authorizationConsumer'
import authorizeFarmer from '../middleware/authorizationFarmer'

router
  .route('/')
  .get(authenticateMiddleware, getOrders)
  .post(authenticateMiddleware, authorizeConsumer, addOrder)
router
  .route('/date/:date')
  .get(authenticateMiddleware, authorizeFarmer, getOrderByDate)
router
  .route('/:orderID')
  .patch(authenticateMiddleware, updateOrder)
  .delete(authenticateMiddleware, authorizeFarmer, deleteOrder)
export default router
