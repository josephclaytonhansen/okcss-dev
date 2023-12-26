import mongoose from 'mongoose'

const seabassDataSchema = new mongoose.Schema({
    content: Object,
    title: String,
    status: String,
    category: String,
    date: String,
    featuredImage: String,
    scheduledDate: String,
    slug: String
})

seabassDataSchema.pre('save', function(next) {
    this.slug = this.title.toLowerCase().split(' ').join('-')
    next()
})

const SeabassData = mongoose.model('SeabassData', seabassDataSchema)



export default SeabassData