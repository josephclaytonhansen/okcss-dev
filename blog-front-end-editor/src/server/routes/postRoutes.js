import express from 'express'
const router = express.Router()

import {
    getPosts,
    getPostById,
    getPostBySlug,
    getPostsByAuthor,
    getPostsByStatus,
    getPostsByCategory,
    getUpcomingPosts,
    createPost,
    updatePost,
    deletePost
} from '../controllers/postController.min.js'

import Post from '../models/postModel.min.js'

export default router

