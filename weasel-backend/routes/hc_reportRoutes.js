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

router.route('/').get(getHighCouncilReports).post(createHighCouncilReport)
router.route('/:id').get(getHighCouncilReportById)
router.route('/counselor/:counselor').get(getHighCouncilReportsByCounselor)
router.route('/date/:date').get(getHighCouncilReportsByDate)
const hc_pin = process.env.HC_PIN
router.route('/pin/get').get((req, res) => {
    res.json(hc_pin)
})

export default router
