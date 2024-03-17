import asyncHandler from '../middleware/asyncHandler.min.js'
import HighCouncilEmail from '../models/high_council_email.js'

const getHighCouncilEmails = asyncHandler(async (req, res) => {
    const emails = await HighCouncilEmail.find()
    res.json(emails)
})

const deleteHighCouncilEmail = asyncHandler(async (req, res) => {
    const email = await HighCouncilEmail.findById(req.params.id)
    if (email) {
        await JighCouncilEmail.deleteOne(email)
        res.json({
            message: 'Email removed'
        })
    } else {
        res.status(404)
        throw new Error('Email not found')
    }
})

const createHighCouncilEmail = asyncHandler(async (req, res) => {
    const email = await HighCouncilEmail.create(req.body)
    res.json(email)
})

export {
    getHighCouncilEmails,
    deleteHighCouncilEmail,
    createHighCouncilEmail
}