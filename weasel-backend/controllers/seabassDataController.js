import asyncHandler from "../middleware/asyncHandler.min.js"
import dotenv from 'dotenv'
import seabassData from '../models/seabassData.js'
dotenv.config()
const getSeabassData = asyncHandler(async (req, res) => {
    try{
    if (req.body.username === process.env.SEABASS_USERNAME && req.body.password === process.env.SEABASS_PASSWORD) {
        const seabassData = await seabassData.find()
        res.json(seabassData)
    } else {
        res.status(403).send({ message: 'Forbidden' })
    }} catch (err) {
        res.status(500).send({ message: err.message })
    }
})
const getSeabassDataById = asyncHandler(async (req, res) => {
    try {
    if (req.body.username === process.env.SEABASS_USERNAME && req.body.password === process.env.SEABASS_PASSWORD) {
        const seabassData = await seabassData.findById(req.params.id)
        res.json(seabassData)
    } else {
        res.status(403).send({ message: 'Forbidden' })
    }} catch (err) {
        res.status(500).send({ message: err.message })
    }
})
const createSeabassData = asyncHandler(async (req, res) => {
    try {
    if (req.body.username === process.env.SEABASS_USERNAME && req.body.password === process.env.SEABASS_PASSWORD) {
        const seabassData = await seabassData.create(req.body)
        res.json(seabassData)
    } else {
        res.status(403).send({ message: 'Forbidden' })
    }} catch (err) {
        res.status(500).send({ message: err.message })
    
    }
})
const deleteSeabassData = asyncHandler(async (req, res) => {
    try {
    if (req.body.username === process.env.SEABASS_USERNAME && req.body.password === process.env.SEABASS_PASSWORD) {
        const seabassData = await seabassData.findById(req.params.id)
        if (seabassData) {
            await seabassData.deleteOne({ _id: req.params.id })
            res.json({ message: 'Data removed' })
        } else {
            res.status(404).json({ message: 'Data not found' })
        }
    } else {
        res.status(403).send({ message: 'Forbidden' })
    }} catch (err) {
        res.status(500).send({ message: err.message })
    
    }
})
const updateSeabassData = asyncHandler(async (req, res) => {
    try {
    if (req.body.username === process.env.SEABASS_USERNAME && req.body.password === process.env.SEABASS_PASSWORD) {
        const seabassData = await seabassData.findById(req.params.id)
        if (seabassData) {
            seabassData.delta = req.body.delta || seabassData.delta
            seabassData.html = req.body.html || seabassData.html
            seabassData.title = req.body.title || seabassData.title
            seabassData.published = req.body.published || seabassData.published
            seabassData.category = req.body.category || seabassData.category
            const updatedSeabassData = await seabassData.save()
            res.json(updatedSeabassData)
        } else {
            res.status(404).json({ message: 'Data not found' })
        }
    } else {
        res.status(403).send({ message: 'Forbidden' })
    }} catch (err) {
        res.status(500).send({ message: err.message })
    
    }
})
export {
    getSeabassData,
    getSeabassDataById,
    createSeabassData,
    deleteSeabassData,
    updateSeabassData
}