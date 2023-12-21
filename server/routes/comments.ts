import express from 'express'
const router = express.Router()
import {
  getCommentsOfFarmer,
  getCommentsOfProduct,
  getNoOfCommentsOfFarmer,
  getNoOfCommentsOfProduct,
} from '../controllers/comments'

router.get('/farmer/:farmerID/count', getNoOfCommentsOfFarmer)
router.get('/farmer/:farmerID', getCommentsOfFarmer)
router.get('/product/:productID/count', getNoOfCommentsOfProduct)
router.get('/product/:productID', getCommentsOfProduct)

export default router
