import express from 'express'
const router = express.Router()

import {
    getTools,
    getToolById,
    createTool,
    updateTool,
    deleteTool
} from '../controllers/toolController.js'

router.route('/').get(getTools).post(createTool)
router.route('/:id').get(getToolById).put(updateTool).delete(deleteTool)

export default router