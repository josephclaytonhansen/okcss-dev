import asyncHandler from '../middleware/asyncHandler.min.js'
import post from '../models/postModel.min.js'

const getPosts = asyncHandler(async (req, res) => {
    const posts = await post.find({})
    res.json(posts)
})

const getPostById = asyncHandler(async (req, res) => {
    const post = await post.findById(req.params.id)
    if (post) {
        res.json(post)
    } else {
        res.status(404)
        throw new Error('post not found')
    }
})

const updatePost = asyncHandler(async (req, res) => {
    const { title, slug, author, category, status, content, excerpt, featuredImage, metaTitle, metaDescription, metaKeywords, scheduledDate } = req.body
    const post = await post.findById(req.params.id)
    if (post) {
        post.title = title
        post.slug = slug
        post.author = author
        post.category = category
        post.status = status
        post.content = content
        post.excerpt = excerpt
        post.featuredImage = featuredImage
        post.metaTitle = metaTitle
        post.metaDescription = metaDescription
        post.metaKeywords = metaKeywords
        post.scheduledDate = scheduledDate
        const updatedPost = await post.save()
        res.json(updatedPost)
    }
    else {
        res.status(404)
        throw new Error('post not found')
    }
})

const deletePost = asyncHandler(async (req, res) => {
    const post = await post.findById(req.params.id)
    if (post) {
        await post.remove()
        res.json({ message: 'post removed' })
    } else {
        res.status(404)
        throw new Error('post not found')
    }
})

const createPost = asyncHandler(async (req, res) => {
    const { title, slug, author, category, status, content, excerpt, featuredImage, metaTitle, metaDescription, metaKeywords, scheduledDate } = req.body
    const post = await post.create({
        title,
        slug,
        author,
        category,
        status,
        content,
        excerpt,
        featuredImage,
        metaTitle,
        metaDescription,
        metaKeywords,
        scheduledDate
    })
    if (post) {
        res.json(post)
    } else {
        res.status(404)
        throw new Error('post not found')
    }
})

const getPostBySlug = asyncHandler(async (req, res) => {
    const post = await post.findOne({ slug: req.params.slug })
    if (post) {
        res.json(post)
    } else {
        res.status(404)
        throw new Error('post not found')
    }
})

const getPostsByAuthor = asyncHandler(async (req, res) => {
    const posts = await post.find({ author: req.params.author })
    if (posts) {
        res.json(posts)
    } else {
        res.status(404)
        throw new Error('posts not found')
    }
})

const getPostsByStatus = asyncHandler(async (req, res) => {
    const posts = await post.find({ status: req.params.status })
    if (posts) {
        res.json(posts)
    } else {
        res.status(404)
        throw new Error('posts not found')
    }
})

const getPostsByCategory = asyncHandler(async (req, res) => {
    const posts = await posts.find({ category: req.params.category })
    if (posts) {
        res.json(posts)
    } else {
        res.status(404)
        throw new Error('posts not found')
    }
})

const getUpcomingPosts = asyncHandler(async (req, res) => {
    let currentDate = new Date()
    const posts = await post.find({ status: 'scheduled', scheduledDate: { $gte: currentDate }, limit: 3 })
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
    deletePost,
    createPost,
    getPostBySlug,
    getPostsByAuthor,
    getPostsByStatus,
    getPostsByCategory,
    getUpcomingPosts
}