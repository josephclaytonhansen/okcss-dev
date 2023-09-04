import express from 'express'
const router = express.Router()

import {
    userLoginByEmail,
    verifyTokenUser
} from '../controllers/userController.js'

router.post('/login', userLoginByEmail)
router.post('/verify', verifyTokenUser)

export default router
