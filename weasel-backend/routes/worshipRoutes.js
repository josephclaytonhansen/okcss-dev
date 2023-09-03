import express from 'express'
const router = express.Router()

import {
    getWorships,
    getWorshipById,
    getWorshipsByWard,
    createWorship,
    updateWorship,
    deleteWorship
} from '../controllers/worshipController.js'

router.route('/').get(getWorships).post(createWorship)
router.route('/:id').get(getWorshipById).put(updateWorship).delete(deleteWorship)
router.route('/ward/:ward').get(getWorshipsByWard)

export default router