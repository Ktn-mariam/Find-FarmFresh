const CustomApiError = require('./custom-error')
const { Statuscodes } = require('http-status-codes')

class Unauthenticated extends CustomApiError {
  constructor(message: string) {
    super(message)
    this.statusCode = Statuscodes.UNAUTHORIZED
  }
}

module.exports = Unauthenticated
