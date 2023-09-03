import asyncHandler from '../middleware/asyncHandler.min.js'
import Event from '../models/Event.js'

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find()
    res.json(events)
})

const getEventById = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)
    res.json(event)
})

const createEvent = asyncHandler(async (req, res) => {
    const event = await Event.create(req.body)
    res.json(event)
})

const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)
    if (event) {
        event.ward = req.body.ward || event.ward
        event.time = req.body.time || event.time
        event.title = req.body.title || event.title
        event.description = req.body.description || event.description
        event.color = req.body.color || event.color
        event.category = req.body.category || event.category
        const updatedEvent = await event.save()
        res.json(updatedEvent)
    } else {
        res.status(404)
        throw new Error('Event not found')
    }
})

const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id)
    if (event) {
        await event.remove()
        res.json({ message: 'Event removed' })
    } else {
        res.status(404)
        throw new Error('Event not found')
    }
})

export {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
}