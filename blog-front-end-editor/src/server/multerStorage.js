import dotenv from 'dotenv'
import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
import crypto from 'crypto'
dotenv.config()

const storage = new GridFsStorage({
    url: process.env.MONGO_STRING+process.env.MONGO_DB_NAME,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err)
          }
          const filename = file.originalname
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          }
          resolve(fileInfo)
        })
      })
    },
  })
  

  const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      // Create an error message to be returned in case validation fails
      req.fileValidationError = 'Invalid image format. Only jpeg, jpg, png and gif images are allowed.'
      return cb(new Error('Invalid image format'), false)
    }
    cb(null, true)
  }

  const upload = multer({ storage, fileFilter: imageFilter})
  export default upload
  
  