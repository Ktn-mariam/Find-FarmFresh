const CustomAPIErrorClass = require('./custom-error')
const { StatusCodes } = require('http-status-codes')
class BadRequest extends CustomAPIErrorClass {
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

module.exports = BadRequest
