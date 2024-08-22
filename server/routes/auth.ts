import { Router } from 'express'
import {
  login,
  registerConsumer,
  registerFarmer,
  getUserProfileInformation,
} from '../controllers/auth'
import authenticateMiddleware from '../middleware/authentication'
import uploadFileMiddleware from '../middleware/uploadFile'
const router = Router()

router
  .route('/register/farmer')
  .post(uploadFileMiddleware.single('image'), registerFarmer)
router
  .route('/register/consumer')
  .post(uploadFileMiddleware.single('image'), registerConsumer)
router.route('/login').post(login)
router.route('/').get(authenticateMiddleware, getUserProfileInformation)

export default router
