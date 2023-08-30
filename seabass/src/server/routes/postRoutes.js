import express from 'express'
const router = express.Router()

import {
    getPosts,
    getPostById,
    getPostBySlug,
    createPost,
    updatePost,
    publishPost,
    publishPostSchedule,
    unpublishPost,
    schedulePost,
    updatePostHistory,
    deletePostHistory,
    deletePost
} from '../controllers/postController.js'

router.route('/').get(getPosts).post(createPost)
router.route('/id/:id').get(getPostById).put(updatePost).delete(deletePost)
router.route('/update/:id').post(updatePost)
router.route('/update_history/:id').get(updatePostHistory)
router.route('/delete_history/:id').get(deletePostHistory)
router.route('/publish/:id').get(publishPost)
router.route('/publish-util').get(publishPostSchedule)
router.route('/:slug').get(getPostBySlug)
router.route('/unpublish/:id').get(unpublishPost)
router.route('/schedule/:id').post(schedulePost)





export default router

