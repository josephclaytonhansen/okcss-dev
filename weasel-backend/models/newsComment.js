import mongoose from 'mongoose'

const newsCommentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SeabassData',
    },
    content: String,
    date: String,
    name: String,
    visible: {
        type: Boolean,
        default: false,
    }
})