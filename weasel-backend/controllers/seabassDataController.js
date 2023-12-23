import asyncHandler from "../middleware/asyncHandler.min.js"
import dotenv from 'dotenv'
import seabassData from '../models/seabassData.js'
dotenv.config()
const getSeabassData = asyncHandler(async (req, res) => {
    try{
    if (req.body.username === process.env.SEABASS_USERNAME && req.body.password === process.env.SEABASS_PASSWORD) {
        const data = await seabassData.find()
        res.json(data)
    } else {
        res.status(403).send({ message: 'Forbidden' })
    }} catch (err) {
        res.status(500).send({ message: err.message })
    }
})
const getSeabassDataById = asyncHandler(async (req, res) => {
    try {
    if (req.body.username === process.env.SEABASS_USERNAME && req.body.password === process.env.SEABASS_PASSWORD) {
        const data = await seabassData.findById(req.params.id)
        res.json(data)
    } else {
        res.status(403).send({ message: 'Forbidden' })
    }} catch (err) {
        res.status(500).send({ message: err.message })
    }
})
const createSeabassData = asyncHandler(async (req, res) => {
    try {
    if (req.body.username === process.env.SEABASS_USERNAME && req.body.password === process.env.SEABASS_PASSWORD) {
        let data = await seabassData.create({
            content: "",
            title: "New Post",
            status: "draft",
            category: "",
            date: new Date().toISOString()
        })
        res.json(data)
    } else {
        res.status(403).send({ message: 'Forbidden' })
    }} catch (err) {
        res.status(500).send({ message: err.message })
    
    }
})
const deleteSeabassData = asyncHandler(async (req, res) => {
    try {
    if (req.body.username === process.env.SEABASS_USERNAME && req.body.password === process.env.SEABASS_PASSWORD) {
        const data = await seabassData.findById(req.params.id)
        if (data) {
            await data.deleteOne({ _id: req.params.id })
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
        const data = await seabassData.findById(req.params.id)
        if (data) {
            data.content = req.body.content || data.content
            data.title = req.body.title || data.title
            data.status = req.body.status || data.status
            data.category = req.body.category || data.category
            data.date = req.body.date || data.date
            const updatedSeabassData = await data.save()
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