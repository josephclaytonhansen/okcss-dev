import express from 'express'
const router = express.Router()

import {
    getTrainings,
    getTrainingById,
    createTraining,
    deleteTraining
} from '../controllers/trainingController.js'

router.route('/').get(getTrainings)
router.route('/:id').get(getTrainingById).delete(deleteTraining)
router.route('/create/new').post(createTraining)

export default router
