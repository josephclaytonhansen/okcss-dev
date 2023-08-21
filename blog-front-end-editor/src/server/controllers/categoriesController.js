import asyncHandler from '../middleware/asyncHandler.min.js'
import Category from '../models/categoriesModel.min.js'

const getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({})
    res.json(categories)
})

const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (category) {
        res.json(category)
    } else {
        res.status(404)
        throw new Error('category not found')
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    const {name} = req.body
    const category = await Category.findById(req.params.id)
    if (category) {
        category.name = name
        const updatedCategory = await category.save()
        res.json(updatedCategory)
    } else {
        res.status(404)
        throw new Error('category not found')
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (category) {
        await category.remove()
        res.json({ message: 'category removed' })
    } else {
        res.status(404)
        throw new Error('category not found')
    }
})

const createCategory = asyncHandler(async (req, res) => {
    const {name} = req.body
    const category = await Category.create({
        name
    })
    if (category) {
        res.status(201).json({
            _id: category._id,
            name: category.name})} else { 
                res.status(400)
                throw new Error('Invalid category data')
            }
        })

export {
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    createCategory
}