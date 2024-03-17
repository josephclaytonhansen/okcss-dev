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
        await HighCouncilReport.deleteOne({ _id: req.params.id })
        res.json({ message: 'Report removed' })
    } else {
        res.status(404).json({ message: 'Report not found' })
    }
})

const updateHighCouncilReport = asyncHandler(async (req, res) => {
    const highCouncilReport = await HighCouncilReport.findById(req.params.id)
    if (highCouncilReport) {
        highCouncilReport.counselor = req.body.counselor || highCouncilReport.counselor
        highCouncilReport.week = req.body.week || highCouncilReport.week
        highCouncilReport.unit_attended = req.body.unit_attended || highCouncilReport.unit_attended
        highCouncilReport.releases_issued = req.body.releases_issued || highCouncilReport.releases_issued
        highCouncilReport.callings_extended = req.body.callings_extended || highCouncilReport.callings_extended
        highCouncilReport.pulpit_business_releases = req.body.pulpit_business_releases || highCouncilReport.pulpit_business_releases
        highCouncilReport.pulpit_business_sustainings = req.body.pulpit_business_sustainings || highCouncilReport.pulpit_business_sustainings
        highCouncilReport.ordainings_and_settings_apart = req.body.ordainings_and_settings_apart || highCouncilReport.ordainings_and_settings_apart
        highCouncilReport.meeting_information = req.body.meeting_information || highCouncilReport.meeting_information
        highCouncilReport.save()
        res.json({ message: 'Report updated' })
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
    deleteHighCouncilReport,
    updateHighCouncilReport
}


