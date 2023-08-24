import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema({
    title: {type:String, index: true},
    meta_title: {type:String, index: true},
    meta_description: {type:String, index: true},
    meta_keywords: {type:String, index: true},
    content: {type:String, index: true},
    slug: {type:String, unique: true},
    status: {type:String, default: "draft"},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {type: Number, default: 0}
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