import express from 'express'
const router = express.Router()

import {
    getPages,
    getPageById,
    getPageBySlug,
    createPage,
    updatePageById,
    deletePageById
} from '../controllers/pageController.min.js'

import Page from '../models/pageModel.min.js'

//TODO: add auth middleware
router.route('/').get(getPages).post(createPage)
router.route('/id/:id').get(getPageById).put(updatePageById).delete(deletePageById)
router.route('/:slug').get(getPageBySlug)


export default router

