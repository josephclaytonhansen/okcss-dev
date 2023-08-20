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
} from '../controllers/postController.js'

import Post from '../models/postModel.min.js'

router.route('/').get(getPosts).post(createPost)
router.route('/id/:id').get(getPostById).put(updatePost).delete(deletePost)
router.route('/:slug').get(getPostBySlug)
router.route('/author/:author').get(getPostsByAuthor)
router.route('/status/:status').get(getPostsByStatus)
router.route('/category/:category').get(getPostsByCategory)
router.route('/upcoming').get(getUpcomingPosts)





export default router

