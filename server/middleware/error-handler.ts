import { Request, Response, NextFunction } from 'express'
import { CustomAPIError } from '../errors'
import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomAPIError) {
    console.log(err.message)
    return res.status(err.statusCode).json({ msg: err.message })
  }
  console.log(err.message)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
}

export default errorHandlerMiddleware
