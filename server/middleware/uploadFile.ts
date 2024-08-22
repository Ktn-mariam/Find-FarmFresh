import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    return cb(
      null,
      `${Date.now()}-${Math.random()}-${file.originalname.replace(' ', '-')}`,
    )
  },
})

const uploadFileMiddleware = multer({ storage })

export default uploadFileMiddleware
