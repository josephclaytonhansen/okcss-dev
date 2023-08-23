import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: {type: String, index: true},
    meta_title: {type: String, index: true},
    meta_description: {type: String, index: true},
    meta_keywords: [
        {
            type: String,
        }
    ],
    
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    slug: {
        type: String,
        unique: true
    },
    content: {type: String, index: true},
    categories: [String],
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
    featured_image: {
        type: String
    },

    history: [
        {type: String}
    ],

}, {timestamps: true})

postSchema.pre('validate', function (next) {
    if (!this.slug){
    this.slug = this.name.toLowerCase().replace(/ /g, '-')}

    next()
})

postSchema.pre('save', function (next) {
    if (!this.slug){
        this.slug = this.name.toLowerCase().replace(/ /g, '-')}

})

postSchema.post('update', function (next) {
    if (!this.slug){
        this.slug = this.name.toLowerCase().replace(/ /g, '-')}

    next()
})

postSchema.pre('update', function (next) {
    if (!this.slug){
        this.slug = this.name.toLowerCase().replace(/ /g, '-')}

    next()
})

const Post = mongoose.model('Post', postSchema)
Post.createIndexes()
export default Post