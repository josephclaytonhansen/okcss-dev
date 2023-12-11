import mongoose from 'mongoose'

const trainingSchema = new mongoose.Schema({
    title: String,
    md_content: String,
})

const Training = mongoose.model('Training', trainingSchema)
export default Training