const mongoose = require('mongoose')

const connectDB = (url: String) => {
  return mongoose.connect(url)
}

module.exports = connectDB
