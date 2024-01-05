import asyncHandler from "../middleware/asyncHandler.min.js"
import newsComment from '../models/newsComment.js'

const getNewsComments = asyncHandler(async (req, res) => {
    try{
    
        const data = await newsComment.find()
        res.json(data)

    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

const getNewsCommentById = asyncHandler(async (req, res) => {
    try {
        const data = await newsComment.findById(req.params.id)
        res.json(data)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

const getNewsCommentByPost = asyncHandler(async (req, res) => {
    try {
        const data = await newsComment.find({ post: req.params.post })
        res.json(data)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

const createNewsComment = asyncHandler(async (req, res) => {
    try {
        let data = await newsComment.create({
            post: req.body.post,
            content: req.body.content,
            date: new Date().toISOString(),
            name: req.body.name,
            visible: false
        })
        res.json(data)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

const deleteNewsComment = asyncHandler(async (req, res) => {
    try {
        const data = await newsComment.findById(req.params.id)
        if (data) {
            await data.deleteOne({ _id: req.params.id })
            res.json({ message: 'Data removed' })
        } else {
            res.status(404).json({ message: 'Data not found' })
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

const toggleVisibilityNewsComment = asyncHandler(async (req, res) => {
    try {
        const data = await newsComment.findById(req.params.id)
        if (data) {
            data.visible = !data.visible
            await data.save()
            res.json({ message: data.visible ? 'Comment visible' : 'Comment hidden'})
        } else {
            res.status(404).json({ message: 'Data not found' })
        }
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
})

export {
    getNewsComments,
    getNewsCommentById,
    getNewsCommentByPost,
    createNewsComment,
    deleteNewsComment,
    toggleVisibilityNewsComment
}