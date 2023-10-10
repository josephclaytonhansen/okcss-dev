import express from 'express'
const router = express.Router()
import dotenv from 'dotenv'
dotenv.config()

import {
    getHcReports,
    getHcReportById,
    createHcReport,
    updateHcReport
} from '../controllers/hc_reportController.js'

router.route('/').get(getHcReports).post(createHcReport)
router.route('/:id').get(getHcReportById).put(updateHcReport).delete(deleteHcReport)
router.route('/counselor/:counselor').get(getHcReportsByCounselor)
router.route('/date/:date').get(getHcReportsByDate)
const hc_pin = process.env.HC_PIN
router.route('/pin/get').get((req, res) => {
    res.json(hc_pin)
})

export default router
