import asyncHandler from '../middleware/asyncHandler.min.js'
import OutgoingMissionary from '../models/outgoing_missionary.js'

const getOutgoingMissionaries = asyncHandler(async (req, res) => {
    const outgoingMissionaries = await OutgoingMissionary.find()
    res.json(outgoingMissionaries)
})

const getOutgoingMissionaryById = asyncHandler(async (req, res) => {
    const outgoingMissionary = await OutgoingMissionary.findById(req.params.id)
    res.json(outgoingMissionary)
})

const createOutgoingMissionary = asyncHandler(async (req, res) => {
    const outgoingMissionary = await OutgoingMissionary.create(req.body)
    res.json(outgoingMissionary)
})

const updateOutgoingMissionary = asyncHandler(async (req, res) => {
    const outgoingMissionary = await OutgoingMissionary.findById(req.params.id)
    if (outgoingMissionary) {
        outgoingMissionary.name = req.body.name || outgoingMissionary.name
        outgoingMissionary.location = req.body.location || outgoingMissionary.location
        outgoingMissionary.email = req.body.email || outgoingMissionary.email
        const updatedOutgoingMissionary = await outgoingMissionary.save()
        res.json(updatedOutgoingMissionary)
    } else {
        res.status(404)
        throw new Error('Outgoing Missionary not found')
    }
})

const deleteOutgoingMissionary = asyncHandler(async (req, res) => {
    const outgoingMissionary = await OutgoingMissionary.findById(req.params.id)
    if (outgoingMissionary) {
        await OutgoingMissionary.deleteOne(outgoingMissionary)
        res.json({ message: 'Outgoing Missionary removed' })
    } else {
        res.status(404)
        throw new Error('Outgoing Missionary not found')
    }
})

export {
    getOutgoingMissionaries,
    getOutgoingMissionaryById,
    createOutgoingMissionary,
    updateOutgoingMissionary,
    deleteOutgoingMissionary
}