import express from 'express'
const router = express.Router()

import {
    getWorships,
    getWorshipById,
    createWorship,
    updateWorship,
    deleteWorship
} from '../controllers/worshipController.js'

router.route('/').get(getWorships).post(createWorship)
router.route('/:id').get(getWorshipById).put(updateWorship).delete(deleteWorship)

export default router