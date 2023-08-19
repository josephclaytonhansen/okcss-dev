import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {String, index: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    slug: {
        type: String,
        unique: true
    },
    content: {String, index: true},
    category: [
        {
            type: String
        }
    ],
    tags: [
        {
            type: String
        }
    ],
    scheduled_date: {
        type: Date,
    },
    status: {
        type: String,
        default: "draft"
    },

})

postSchema.pre('validate', function (next) {
    if (!this.slug){
    this.slug = this.name.toLowerCase().replace(/ /g, '-')}
    next()
})

postSchema.post('save', function (next) {
    if (!this.slug){
    this.slug = this.name.toLowerCase().replace(/ /g, '-')
    this.save()}
})

const Post = mongoose.model('Post', postSchema)
Post.createIndexes()
export default Post