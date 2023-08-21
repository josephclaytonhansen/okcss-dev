import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {type:String, index: true},
})

const Category = mongoose.model('Category', categorySchema)
Category.createIndexes()
export default Category
