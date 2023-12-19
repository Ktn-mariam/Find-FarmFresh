import express from 'express'
const router = express.Router()

import {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orders'
import authenticationMiddleware from '../middleware/authentication'

router
  .route('/')
  .get(authenticationMiddleware, getOrders)
  .post(authenticationMiddleware, addOrder)
router
  .route('/:orderID')
  .patch(authenticationMiddleware, updateOrder)
  .delete(authenticationMiddleware, deleteOrder)

export default router
