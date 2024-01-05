import express from 'express'
const router = express.Router()

import {
    getNewsComments,
    getNewsCommentById,
    getNewsCommentByPost,
    createNewsComment,
    deleteNewsComment,
    toggleVisibilityNewsComment
} from '../controllers/newsCommentController.js'

router.route('/').post(getNewsComments)
router.route('/:id').post(getNewsCommentById).delete(deleteNewsComment)
router.route('/post/:post').post(getNewsCommentByPost)
router.route('/create').post(createNewsComment)
router.route('/toggle/:id').post(toggleVisibilityNewsComment)

export default router