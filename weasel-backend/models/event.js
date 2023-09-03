import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    time: {
        start: String,
        end: String,
    },
    title: String,
    description: String,
    color: String,
    category: {type: String, default: "ward"},
})

const Event = mongoose.model('Event', eventSchema)
export default Event