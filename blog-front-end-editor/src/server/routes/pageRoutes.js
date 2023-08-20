import express from 'express'
const router = express.Router()

import {
    getPages,
    getPageById,
    getPageBySlug,
    createPage,
    getPagesByAuthor,
    getPagesByStatus,
    updatePageById,
    deletePageById
} from '../controllers/pageController.js'

import Page from '../models/pageModel.min.js'

//TODO: add auth middleware
router.route('/').get(getPages).post(createPage)
router.route('/id/:id').get(getPageById).put(updatePageById).delete(deletePageById)
router.route('/:slug').get(getPageBySlug)
router.route('/author/:author').get(getPagesByAuthor)
router.route('/status/:status').get(getPagesByStatus)




export default router

