import mongoose from 'mongoose'

const newsCommentSchema = new mongoose.Schema({
    post: String,
    content: String,
    date: String,
    name: String,
    visible: {
        type: Boolean,
        default: false,
    }
})

const NewsComment = mongoose.model('NewsComment', newsCommentSchema)

export default NewsComment