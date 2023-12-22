import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors'
import { Request, Response, NextFunction } from 'express'

export enum Role {
  Farmer = 'Farmer',
  Consumer = 'Consumer',
}

// Extend the Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user: {
        userID: string
        name: string
        role: Role
      }
    }
  }
}

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string)
    if (typeof payload === 'object') {
      const userID =
        payload.farmerID !== undefined ? payload.farmerID : payload.consumerID
      const role = payload.farmerID !== undefined ? Role.Farmer : Role.Consumer

      req.user = {
        userID,
        name: payload.name,
        role,
      }
    }
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid')
  }
}

export default auth
