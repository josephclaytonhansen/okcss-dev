import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema({
    title: {String, index: true},
    content: {String, index: true},
    slug: {String, unique: true},
    status: {String, default: "draft"},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {Number, default: 0}
})

pageSchema.pre('validate', function (next) {
    if (!this.slug){
    this.slug = this.name.toLowerCase().replace(/ /g, '-')}
    next()
})

pageSchema.post('save', function (next) {
    if (!this.slug){
    this.slug = this.name.toLowerCase().replace(/ /g, '-')
    this.save()}
})

const Page = mongoose.model('Page', pageSchema)
Page.createIndexes()
export default Page