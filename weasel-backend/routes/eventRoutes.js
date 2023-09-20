import express from 'express'
const router = express.Router()

import {
    getEvents,
    getEventById,
    getEventsByWard,
    getEventsByWardandOrganization,
    createEvent,
    updateEvent,
    deleteEvent
} from '../controllers/eventController.js'

router.route('/').get(getEvents).post(createEvent)
router.route('/:id').get(getEventById).put(updateEvent).delete(deleteEvent)
router.route('/ward/:ward').get(getEventsByWard)
router.route('/ward/:ward/organization/:organization').get(getEventsByWardandOrganization)

export default router