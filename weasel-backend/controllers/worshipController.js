import e from 'express'
import asyncHandler from '../middleware/asyncHandler.min.js'
import Worship from '../models/worship.js'

const getWorships = asyncHandler(async (req, res) => {
    const worships = await Worship.find()
    res.json(worships)
})

const getWorshipById = asyncHandler(async (req, res) => {
    const worship = await Worship.findById(req.params.id)
    res.json(worship)
})

const createWorship = asyncHandler(async (req, res) => {
    const worship = await Worship.create(req.body)
    res.json(worship)
})

const updateWorship = asyncHandler(async (req, res) => {
    const worship = await Worship.findById(req.params.id)
    if (worship) {
        worship.ward = req.body.ward || worship.ward
        worship.location = req.body.location || worship.location
        worship.time = req.body.time || worship.time
        worship.googleMapsLink = req.body.googleMapsLink || worship.googleMapsLink
        worship.image = req.body.image || worship.image
        const updatedWorship = await worship.save()
        res.json(updatedWorship)
    } else {
        res.status(404)
        throw new Error('Worship not found')
    }
})

const deleteWorship = asyncHandler(async (req, res) => {
    const worship = await Worship.findById(req.params.id)
    if (worship) {
        await worship.remove()
        res.json({ message: 'Worship removed' })
    } else {
        res.status(404)
        throw new Error('Worship not found')
    }
})

export {
    getWorships,
    getWorshipById,
    createWorship,
    updateWorship,
    deleteWorship
}