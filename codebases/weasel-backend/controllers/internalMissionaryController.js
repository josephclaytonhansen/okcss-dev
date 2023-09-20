import asyncHandler from '../middleware/asyncHandler.min.js'
import InternalMissionary from '../models/internal_missionaries.js'

const getInternalMissionaries = asyncHandler(async (req, res) => {
    const internalMissionaries = await InternalMissionary.find()
    res.json(internalMissionaries)
})

const getInternalMissionaryById = asyncHandler(async (req, res) => {
    const internalMissionary = await InternalMissionary.findById(req.params.id)
    res.json(internalMissionary)
})

const getInternalMissionaryByWard = asyncHandler(async (req, res) => {
    const internalMissionary = await InternalMissionary.find({ ward: req.params.ward })
    res.json(internalMissionary)
})

const createInternalMissionary = asyncHandler(async (req, res) => {
    const internalMissionary = await InternalMissionary.create(req.body)
    res.json(internalMissionary)
})

const updateInternalMissionary = asyncHandler(async (req, res) => {
    const internalMissionary = await InternalMissionary.findById(req.params.id)
    if (internalMissionary) {
        internalMissionary.name1 = req.body.name1 || internalMissionary.name1
        internalMissionary.name2 = req.body.name2 || internalMissionary.name2
        internalMissionary.name3 = req.body.name3 || internalMissionary.name3
        internalMissionary.phone = req.body.phone || internalMissionary.phone
        internalMissionary.ward = req.body.ward || internalMissionary.ward
        const updatedInternalMissionary = await internalMissionary.save()
        res.json(updatedInternalMissionary)
    } else {
        res.status(404)
        throw new Error('Internal Missionary not found')
    }
})

const deleteInternalMissionary = asyncHandler(async (req, res) => {
    const internalMissionary = await InternalMissionary.findById(req.params.id)
    if (internalMissionary) {
        await InternalMissionary.deleteOne(internalMissionary)
        res.json({ message: 'Internal Missionary removed' })
    } else {
        res.status(404)
        throw new Error('Internal Missionary not found')
    }
})

export {
    getInternalMissionaries,
    getInternalMissionaryById,
    getInternalMissionaryByWard,
    createInternalMissionary,
    updateInternalMissionary,
    deleteInternalMissionary
}