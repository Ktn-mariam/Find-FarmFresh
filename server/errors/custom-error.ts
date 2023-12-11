class CustomAPI extends Error {
  constructor(message: string) {
    super(message)
  }
}

module.exports = CustomAPI
