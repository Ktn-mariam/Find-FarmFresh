import { Router } from 'express'
import { login, registerConsumer, registerFarmer } from '../controllers/auth'

const router = Router()

router.post('/register/farmer', registerFarmer)
router.post('/register/consumer', registerConsumer)
router.post('/login', login)

export default router
