import { UnauthenticatedError } from '../errors'
import { Request, Response, NextFunction } from 'express'
import { Role } from './authentication'

const authorizeConsumer = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role === Role.Consumer) {
    next()
  } else {
    throw new UnauthenticatedError('Access Forbidden for Farmers')
  }
}

export default authorizeConsumer
