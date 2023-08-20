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
} from '../controllers/pageController.min.js'

import Page from '../models/pageModel.min.js'

export default router

