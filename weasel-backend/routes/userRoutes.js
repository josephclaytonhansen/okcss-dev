import express from 'express'
const router = express.Router()

import {
    userLoginByEmail,
    verifyToken
} from '../controllers/userController.js'

router.post('/login', userLoginByEmail)
router.post('/verify', verifyToken)

export default router
