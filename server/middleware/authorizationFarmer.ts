import { UnauthenticatedError } from '../errors'
import { Request, Response, NextFunction } from 'express'
import { Role } from './authentication'

const authorizeFarmer = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role === Role.Farmer) {
    next()
  } else {
    throw new UnauthenticatedError('Access Forbidden for Consumers')
  }
}

export default authorizeFarmer
