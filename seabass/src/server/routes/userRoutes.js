import express from 'express'
const router = express.Router()

import {
    getUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    updateUserById,
    deleteUserById,
    createUser
} from '../controllers/userController.min.js'

import User from '../models/userModel.min.js'

router.route('/').get(getUsers).post(createUser)
router.route('/id/:id').get(getUserById).put(updateUserById).delete(deleteUserById)
router.route('/username/:username').get(getUserByUsername)
router.route('/email/:email').get(getUserByEmail)


export default router

