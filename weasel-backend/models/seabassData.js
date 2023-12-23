import mongoose from 'mongoose'
const seabassDataSchema = new mongoose.Schema({
    content: Object,
    title: String,
    status: String,
    category: String,
    date: String
})
const SeabassData = mongoose.model('SeabassData', seabassDataSchema)
export default SeabassData