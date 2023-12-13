import { StatusCodes } from 'http-status-codes'
import CustomApiError from './custom-error'

class UnauthenticatedError extends CustomApiError {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export default UnauthenticatedError
