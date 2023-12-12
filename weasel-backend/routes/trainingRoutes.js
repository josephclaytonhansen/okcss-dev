import express from 'express'
const router = express.Router()

import {
    getTrainings,
    getTrainingById,
} from '../controllers/trainingController.js'

router.route('/').get(getTrainings)
router.route('/:id').get(getTrainingById)

export default router
