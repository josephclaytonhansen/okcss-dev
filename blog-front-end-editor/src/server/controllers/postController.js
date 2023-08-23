import asyncHandler from '../middleware/asyncHandler.min.js'
import Post from '../models/postModel.min.js'

const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({})
    res.json(posts)
})

const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        res.json(post)
    } else {
        res.status(404)
        throw new Error('post not found')
    }
})

const deletePostHistory = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        post.history = []
        const updatedPost = await Post.findByIdAndUpdate({ _id: req.params.id }, { history: post.history })
        if (updatedPost) {
            res.json({ message: 'post history deleted' })
        }
        else {
            res.status(400).json({ message: 'invalid data' })
        }
    } else {
        res.status(404)
        throw new Error('post not found')
    }
})

const updatePostHistory = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        post.history.push(post.content)
        const updatedPost = await Post.findByIdAndUpdate({ _id: req.params.id }, { history: post.history})
        if (updatedPost) {
        res.json({message: 'post history updated'})}
        else {
            res.status(400).json({ message: 'invalid data' })
        }
    } else {
        res.status(404)
        throw new Error('post not found')
    }
})

const updatePost = asyncHandler(async (req, res) => {
    const {title, slug, author, categories, tags, status, content, featuredImage, metaTitle, metaDescription, metaKeywords} = req.body
    const post = await Post.findById(req.params.id)
    if (post) {
        post.title = title
        //TODO: author
        //TODO: categories
        //TODO: tags
        //TODO: scheduled date
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            title: title,
            slug: slug,
            status: status,
            content: content,
            featured_image: featuredImage,
            meta_title: metaTitle,
            meta_description: metaDescription,
            meta_keywords: metaKeywords
        })
        if (updatedPost) {
            res.json({ message: 'post updated' })
        }
        else {
            res.status(400).json({ message: 'invalid data' })
        }
    }
    else {
        res.status(404).json({ message: 'post not found' })
        throw new Error('post not found')
    }
})

const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        await post.remove()
        res.json({ message: 'post removed' })
    } else {
        res.status(404)
        throw new Error('post not found')
    }
})

const createPost = asyncHandler(async (req, res) => {
    const { title, slug, author, categories, status, content, featuredImage, metaTitle, metaDescription, metaKeywords, scheduledDate } = req.body
    const post = await Post.create({
        title: title,
        slug: slug,
        author: author,
        categories: categories,
        status: status,
        content: content,
        featured_image: featuredImage,
        meta_title: metaTitle,
        meta_description: metaDescription,
        meta_keywords: metaKeywords,
        scheduled_date: scheduledDate
    })
    if (post) {
        res.json(post)
    } else {
        res.status(404)
        throw new Error('post not found')
    }
})

const getPostBySlug = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug })
    if (post) {
        res.json(post)
    } else {
        res.status(404)
        throw new Error('post not found')
    }
})

const getPostsByAuthor = asyncHandler(async (req, res) => {
    const posts = await Post.find({ author: req.params.author })
    if (posts) {
        res.json(posts)
    } else {
        res.status(404)
        throw new Error('posts not found')
    }
})

const getPostsByStatus = asyncHandler(async (req, res) => {
    const posts = await Post.find({ status: req.params.status })
    if (posts) {
        res.json(posts)
    } else {
        res.status(404)
        throw new Error('posts not found')
    }
})

const getPostsByCategory = asyncHandler(async (req, res) => {
    const posts = await Post.find({ category: req.params.category })
    if (posts) {
        res.json(posts)
    } else {
        res.status(404)
        throw new Error('posts not found')
    }
})

const getUpcomingPosts = asyncHandler(async (req, res) => {
    let currentDate = new Date()
    const posts = await Post.find({ status: 'scheduled', scheduledDate: { $gte: currentDate }, limit: 3 })
    if (posts) {
        res.json(posts)
    }
    else {
        res.status(404)
        throw new Error('posts not found')
    }
})

export {
    getPosts,
    getPostById,
    updatePost,
    updatePostHistory,
    deletePostHistory,
    deletePost,
    createPost,
    getPostBySlug,
    getPostsByAuthor,
    getPostsByStatus,
    getPostsByCategory,
    getUpcomingPosts
}