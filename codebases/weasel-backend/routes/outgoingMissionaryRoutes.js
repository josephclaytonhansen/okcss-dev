import express from 'express'
const router = express.Router()

import {
    getOutgoingMissionaries,
    getOutgoingMissionaryById,
    createOutgoingMissionary,
    updateOutgoingMissionary,
    deleteOutgoingMissionary
} from '../controllers/outgoingMissionaryController.js'

router.route('/').get(getOutgoingMissionaries).post(createOutgoingMissionary)
router.route('/:id').get(getOutgoingMissionaryById).put(updateOutgoingMissionary).delete(deleteOutgoingMissionary)

export default router
