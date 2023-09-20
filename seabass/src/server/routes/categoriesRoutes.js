import Router from 'express'
const router = Router()

import {
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    createCategory
} from '../controllers/categoriesController.min.js'

import Category from '../models/categoriesModel.min.js'

router.route('/').get(getCategories).post(createCategory)
router.route('/id/:id').get(getCategoryById).put(updateCategory).delete(deleteCategory)
router.route('/delete/:id').get(deleteCategory)

export default router