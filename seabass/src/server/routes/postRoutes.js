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
    updatePostHistory,
    deletePostHistory,
    deletePost
} from '../controllers/postController.js'

router.route('/').get(getPosts).post(createPost)
router.route('/id/:id').get(getPostById).put(updatePost).delete(deletePost)
router.route('/update/:id').post(updatePost)
router.route('/update_history/:id').get(updatePostHistory)
router.route('/delete_history/:id').get(deletePostHistory)
router.route('/:slug').get(getPostBySlug)
router.route('/author/:author').get(getPostsByAuthor)
router.route('/status/:status').get(getPostsByStatus)
router.route('/category/:category').get(getPostsByCategory)
router.route('/upcoming').get(getUpcomingPosts)





export default router

