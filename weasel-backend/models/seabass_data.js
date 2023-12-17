import mongoose from 'mongoose'
const seabassDataSchema = new mongoose.Schema({
    quillDelta: Object,
    html: String,
    title: String,
    published: Boolean,
    category: String
})

const SeabassData = mongoose.model('SeabassData', seabassDataSchema)
export default SeabassData