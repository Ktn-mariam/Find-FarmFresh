import 'dotenv/config'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
// import helmet from 'helmet'
// import { rateLimit as rateLimiter } from 'express-rate-limit'

import connectDB from '../db/connect'

import authRouter from '../routes/auth'
import farmerRouter from '../routes/farmers'
import productRouter from '../routes/products'
import commentsRouter from '../routes/comments'
import ordersRouter from '../routes/orders'
import consumerRouter from '../routes/consumers'

import errorHandlerMiddleware from '../middleware/error-handler'
import notFoundMiddleware from '../middleware/not-found'

const app = express()

// app.use(helmet())
// app.set('trust proxy', 1)
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     limit: 1000,
//     standardHeaders: 'draft-7',
//     legacyHeaders: false,
//   }),
// )
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/farmers', farmerRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/comments', commentsRouter)
app.use('/api/v1/consumers', consumerRouter)
app.use('/api/v1/orders', ordersRouter)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI as string)
    app.listen(PORT, () => {
      console.log(`Server is listening at port ${PORT}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()

module.exports = app
