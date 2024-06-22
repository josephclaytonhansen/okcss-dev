import asyncHandler from '../middleware/asyncHandler.min.js'
import HighCouncilEmail from '../models/high_council_email.js'

const getHighCouncilEmails = asyncHandler(async (req, res) => {
    const emails = await HighCouncilEmail.find()
    res.json(emails)
})

const updateHighCouncilEmails = asyncHandler(async (req, res) => {
    const emails = await HighCouncilEmail.find()
    if (emails.length === 0) {
        const newEmails = await HighCouncilEmail.create(req.body)
        res.status(201).json(newEmails)
    } else {
        const updatedEmails = await HighCouncilEmail.findByIdAndUpdate(emails[0]._id, req.body, {
            new: true,
            runValidators: true
        })
        res.json(updatedEmails)
    }
})

export {
    getHighCouncilEmails,
    updateHighCouncilEmails,
}