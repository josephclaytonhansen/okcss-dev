import express from 'express'
const router = express.Router()

import {
    getInternalMissionaries,
    getInternalMissionaryById,
    getInternalMissionaryByWard,
    createInternalMissionary,
    updateInternalMissionary,
    deleteInternalMissionary
} from '../controllers/internalMissionaryController.js'

router.route('/').get(getInternalMissionaries).post(createInternalMissionary)
router.route('/:id').get(getInternalMissionaryById).put(updateInternalMissionary).delete(deleteInternalMissionary)
router.route('/ward/:ward').get(getInternalMissionaryByWard)

export default router
