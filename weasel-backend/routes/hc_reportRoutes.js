import express from 'express'
const router = express.Router()

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

export default router
