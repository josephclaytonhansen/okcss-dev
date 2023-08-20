import asyncHandler from '../middleware/asyncHandler.min.js'
import Comment from '../models/commentModel.min.js'

const getComments = asyncHandler(async (req, res) => {
    const comments = await Comment.find({})
    res.json(comments)
})

const getCommentById = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    if (comment) {
        res.json(comment)
    } else {
        res.status(404)
        throw new Error('comment not found')
    }
})

const updateComment = asyncHandler(async (req, res) => {
    const {post, content, author, is_visible} = req.body
    const comment = await Comment.findById(req.params.id)
    if (comment) {
        comment.post = post
        comment.content = content
        comment.author = author
        comment.is_visible = is_visible
        const updatedComment = await comment.save()
        res.json(updatedComment)
    } else {
        res.status(404)
        throw new Error('comment not found')
    }
})

const deleteComment = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id)
    if (comment) {
        await comment.remove()
        res.json({ message: 'comment removed' })
    } else {
        res.status(404)
        throw new Error('comment not found')
    }
})

const createComment = asyncHandler(async (req, res) => {
    const {post, content, author, is_visible} = req.body
    const comment = await Comment.create({
        post,
        content,
        author,
        is_visible
    })
    if (comment) {
        res.status(201).json({
            _id: comment._id,
            post: comment.post,
            content: comment.content,
            is_visible: comment.is_visible,
            author: comment.author})} else { 
        res.status(400)
        throw new Error('invalid comment data')
            }
})

export {
    getComments,
    getCommentById,
    updateComment,
    deleteComment,
    createComment
}