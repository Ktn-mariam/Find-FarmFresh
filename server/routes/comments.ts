import express from 'express'
const router = express.Router()
import {
  getCommentsOfFarmer,
  getCommentsOfProduct,
} from '../controllers/comments'

router.get('/farmer/:farmerID', getCommentsOfFarmer)
router.get('/product/:productID', getCommentsOfProduct)

export default router
