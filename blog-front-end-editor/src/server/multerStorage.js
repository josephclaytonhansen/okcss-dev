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
    // Accept images and pdfs only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|webp)$/)) {
      req.fileValidationError = 'Invalid file format. Only jpeg, jpg, png, pdf, webp, and gif images are allowed.'
      return cb(new Error('Invalid file format'), false)
    }
    //check if the file is less than 5mb
    if (file.size > 5 * 1024 * 1024) {
      req.fileValidationError = 'File size exceeds 5MB.'
      return cb(new Error('File size exceeds 5MB.'), false)
    }
    if (file.originalname.includes(' ')) {
      req.fileValidationError = 'Filename cannot contain spaces.'
      return cb(new Error('Filename cannot contain spaces.'), false)
    }
    if (file.originalname.includes('\'')) {
      req.fileValidationError = 'Filename cannot contain apostrophes.'
      return cb(new Error('Filename cannot contain apostrophes.'), false)
    }
    if (file.originalname.includes('\"')) {
      req.fileValidationError = 'Filename cannot contain quotation marks.'
      return cb(new Error('Filename cannot contain quotation marks.'), false)
    }
    if (file.originalname.includes('/')) {
      req.fileValidationError = 'Filename cannot contain slashes.'
      return cb(new Error('Filename cannot contain slashes.'), false)
    }
    if (file.originalname.includes('\\')) {
      req.fileValidationError = 'Filename cannot contain backslashes.'
      return cb(new Error('Filename cannot contain backslashes.'), false)
    }
    if (file.originalname.includes(':')) {
      req.fileValidationError = 'Filename cannot contain colons.'
      return cb(new Error('Filename cannot contain colons.'), false)
    }
    if (file.originalname.includes('*')) {
      req.fileValidationError = 'Filename cannot contain asterisks.'
      return cb(new Error('Filename cannot contain asterisks.'), false)
    }
    if (file.originalname.includes('?')) {
      req.fileValidationError = 'Filename cannot contain question marks.'
      return cb(new Error('Filename cannot contain question marks.'), false)
    }
    if (file.originalname.includes('<')) {
      req.fileValidationError = 'Filename cannot contain less than signs.'
      return cb(new Error('Filename cannot contain less than signs.'), false)
    }
    if (file.originalname.includes('>')) {
      req.fileValidationError = 'Filename cannot contain greater than signs.'
      return cb(new Error('Filename cannot contain greater than signs.'), false)
    }
    if (file.originalname.includes('|')) {
      req.fileValidationError = 'Filename cannot contain pipes.'
      return cb(new Error('Filename cannot contain pipes.'), false)
    }
    if (file.originalname.includes('%')) {
      req.fileValidationError = 'Filename cannot contain percent signs.'
      return cb(new Error('Filename cannot contain percent signs.'), false)
    }
    if (file.originalname.includes('#')) {
      req.fileValidationError = 'Filename cannot contain hash signs.'
      return cb(new Error('Filename cannot contain hash signs.'), false)
    }
    if (file.originalname.includes('@')) {
      req.fileValidationError = 'Filename cannot contain at signs.'
      return cb(new Error('Filename cannot contain at signs.'), false)
    }
    if (file.originalname.includes('+')) {
      req.fileValidationError = 'Filename cannot contain plus signs.'
      return cb(new Error('Filename cannot contain plus signs.'), false)
    }
    if (file.originalname.includes('=')) {
      req.fileValidationError = 'Filename cannot contain equal signs.'
      return cb(new Error('Filename cannot contain equal signs.'), false)
    }
    cb(null, true)
  }

  const upload = multer({ storage, fileFilter: imageFilter})
  export default upload
  
  