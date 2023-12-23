import express from 'express'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()
import {
    getSeabassData,
    getSeabassDataById,
    createSeabassData,
    deleteSeabassData,
    updateSeabassData
} from '../controllers/seabassDataController.js'
import { get } from 'mongoose'
const seabassUsername = process.env.SEABASS_USERNAME
const seabassPassword = process.env.SEABASS_PASSWORD
router.route('/').post((req, res) => {
    try {
        if (req.body.username === seabassUsername && req.body.password === seabassPassword) {
            let data = getSeabassData()
            res.status(200).send({ message: 'Valid login', data: data })
        } else {
            res.status(401).send({ message: 'Invalid login'  })
        }} catch (err) {
            res.status(500).send({ message: err.message })
        }
    }
)
router.route('/:id').get(getSeabassDataById).delete(deleteSeabassData).put(updateSeabassData)
router.route('/login-check').post((req, res) => {
    try {
    if (req.body.username === seabassUsername && req.body.password === seabassPassword) {
        res.status(200).send({ message: 'Valid login' })
    } else {
        res.status(401).send({ message: 'Invalid login'  })
    }} catch (err) {
        res.status(500).send({ message: err.message })
    }
})

export default router