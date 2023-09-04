import express from 'express'
const router = express.Router()

import {
    userLoginByEmail
} from '../controllers/userController.js'

router.post('/login', userLoginByEmail)

export default router
