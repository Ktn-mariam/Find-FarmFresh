import { Router } from 'express'
import {
  login,
  registerConsumer,
  registerFarmer,
  getUserProfileInformation,
} from '../controllers/auth'
import authenticateMiddleware from '../middleware/authentication'
const router = Router()

router.route('/register/farmer').post(registerFarmer)
router.route('/register/consumer').post(registerConsumer)
router.route('/login').post(login)
router.route('/').get(authenticateMiddleware, getUserProfileInformation)

export default router
