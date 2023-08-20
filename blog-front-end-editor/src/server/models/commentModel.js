import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    content: {type: String, index: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    is_visible: {
        type: Boolean,
        default: false
    },
})

const Comment = mongoose.model('Comment', commentSchema)
Comment.createIndexes()
export default Comment