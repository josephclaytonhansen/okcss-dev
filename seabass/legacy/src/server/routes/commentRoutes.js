import express from 'express'
const router = express.Router()

import {
    getComments,
    getCommentById,
    updateComment,
    deleteComment,
    createComment
} from '../controllers/commentController.min.js'

import Comment from '../models/commentModel.min.js'

router.route('/').get(getComments).post(createComment)
router.route('/id/:id').get(getCommentById).put(updateComment).delete(deleteComment)


export default router

