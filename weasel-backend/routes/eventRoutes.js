import express from 'express'
const router = express.Router()

import {
    getEvents,
    getEventById,
    getEventsByWard,
    createEvent,
    updateEvent,
    deleteEvent
} from '../controllers/eventController.js'

router.route('/').get(getEvents).post(createEvent)
router.route('/:id').get(getEventById).put(updateEvent).delete(deleteEvent)
router.route('/ward/:ward').get(getEventsByWard)

export default router