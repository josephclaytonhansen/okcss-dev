import express from 'express'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()

import {
    getHighCouncilReports,
    getHighCouncilReportById,
    getHighCouncilReportsByCounselor,
    getHighCouncilReportsByDate,
    createHighCouncilReport
} from '../controllers/hc_reportController.js'

router.route('/').post(getHighCouncilReports)
router.route('/:id').get(getHighCouncilReportById)
router.route('/counselor/:counselor').get(getHighCouncilReportsByCounselor)
router.route('/date/:date').get(getHighCouncilReportsByDate)
const hc_pin = process.env.HC_PIN
router.route('/pin/check').post((req, res) => {
    if (req.body.pin === hc_pin) {
        res.status(200).send({ message: 'Valid PIN' })
    } else {
        res.status(401).send({ message: 'Invalid PIN' })
    }
})
router.route('/create/new').post(createHighCouncilReport)

export default router
