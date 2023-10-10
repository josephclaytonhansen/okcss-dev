import asyncHandler from '../middleware/asyncHandler.min.js'
import HighCouncilReport from '../models/high_council_report.js'

const getHighCouncilReports = asyncHandler(async (req, res) => {
    const highCouncilReports = await HighCouncilReport.find()
    res.json(highCouncilReports)
})

const getHighCouncilReportById = asyncHandler(async (req, res) => {
    const highCouncilReport = await HighCouncilReport.findById(req.params.id)
    res.json(highCouncilReport)
})

const getHighCouncilReportsByCounselor = asyncHandler(async (req, res) => {
    const highCouncilReports = await HighCouncilReport.find({ counselor: req.params.counselor })
    res.json(highCouncilReports)
})

const getHighCouncilReportsByDate = asyncHandler(async (req, res) => {
    const highCouncilReports = await HighCouncilReport.find({ date: req.params.date })
    res.json(highCouncilReports)
})

const createHighCouncilReport = asyncHandler(async (req, res) => {
    const highCouncilReport = await HighCouncilReport.create(req.body)
    res.json(highCouncilReport)
})

export {
    getHighCouncilReports,
    getHighCouncilReportById,
    getHighCouncilReportsByCounselor,
    getHighCouncilReportsByDate,
    createHighCouncilReport
}


