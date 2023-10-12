import asyncHandler from '../middleware/asyncHandler.min.js'
import HighCouncilReport from '../models/high_council_report.js'
import dotenv from 'dotenv'
dotenv.config()

const getHighCouncilReports = asyncHandler(async (req, res) => {
        if (req.body.pin === process.env.HC_PIN) {
        const highCouncilReports = await HighCouncilReport.find()
        res.json(highCouncilReports)
    } else {
        res.status(403).send({ message: 'Forbidden' })
    }
})

const getHighCouncilReportById = asyncHandler(async (req, res) => {
    const highCouncilReport = await HighCouncilReport.findById(req.params.id)
    res.json(highCouncilReport)
})

const getHighCouncilReportsByCounselor = asyncHandler(async (req, res) => {
    const highCouncilReports = await HighCouncilReport.find({ counselor: req.params.counselor })
    res.json(highCouncilReports)
})

const getHighCouncilReportsByWeek = asyncHandler(async (req, res) => {
    const highCouncilReports = await HighCouncilReport.find({ week: req.params.week })
    res.json(highCouncilReports)
})

const createHighCouncilReport = asyncHandler(async (req, res) => {
    const highCouncilReport = await HighCouncilReport.create(req.body)
    res.json(highCouncilReport)
})

const deleteHighCouncilReport = asyncHandler(async (req, res) => {
    const highCouncilReport = await HighCouncilReport.findById(req.params.id)
    if (highCouncilReport) {
        await highCouncilReport.remove()
        res.json({ message: 'Report removed' })
    } else {
        res.status(404).json({ message: 'Report not found' })
    }
})

export {
    getHighCouncilReports,
    getHighCouncilReportById,
    getHighCouncilReportsByCounselor,
    getHighCouncilReportsByWeek,
    createHighCouncilReport,
    deleteHighCouncilReport
}


