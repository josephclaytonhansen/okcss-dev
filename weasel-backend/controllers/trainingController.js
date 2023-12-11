import asyncHandler from '../middleware/asyncHandler.min.js'
import Training from '../models/training.js'

const getTrainings = asyncHandler(async (req, res) => {
    const trainings = await Training.find()
    res.json(trainings)
})

const getTrainingById = asyncHandler(async (req, res) => {
    const training = await Training.findById(req.params.id)
    res.json(training)
})

const createTraining = asyncHandler(async (req, res) => {
    const training = await Training.create(req.body)
    res.json(training)
})

export { getTrainings, getTrainingById, createTraining }