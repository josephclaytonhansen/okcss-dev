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

router.route('/').get(getNewsComments)
router.route('/:id').delete(deleteNewsComment)
router.route('/post').post(getNewsCommentByPost)
router.route('/create').post(createNewsComment)
router.route('/toggle').post(toggleVisibilityNewsComment)

export default router