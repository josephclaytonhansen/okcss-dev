import express from 'express'
const router = express.Router()

import {
    userLoginByEmail,
    verifyTokenUser,
    createUser
} from '../controllers/userController.js'

router.post('/login', userLoginByEmail)
router.post('/verify', verifyTokenUser)
router.post('/create', createUser)

export default router
