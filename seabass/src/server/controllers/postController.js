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
        const updatedPost = await Post.findByIdAndUpdate({
            _id: req.params.id
        }, {
            history: post.history
        })
        if (updatedPost) {
            res.json({
                message: 'post history deleted'
            })
        } else {
            res.status(400).json({
                message: 'invalid data'
            })
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
        const updatedPost = await Post.findByIdAndUpdate({
            _id: req.params.id
        }, {
            history: post.history
        })
        if (updatedPost) {
            res.json({
                message: 'post history updated'
            })
        } else {
            res.status(400).json({
                message: 'invalid data'
            })
        }
    } else {
        res.status(404)
        throw new Error('post not found')
    }
})

const updatePost = asyncHandler(async (req, res) => {
    const {
        title,
        slug,
        author,
        categories,
        tags,
        status,
        content,
        featuredImage,
        metaTitle,
        metaDescription,
        metaKeywords
    } = req.body
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
            res.json({
                message: 'post updated'
            })
        } else {
            res.status(400).json({
                message: 'invalid data'
            })
        }
    } else {
        res.status(404).json({
            message: 'post not found'
        })
        throw new Error('post not found')
    }
})

const publishPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        post.status = 'published'
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            status: 'published'
        })
        if (updatedPost) {
            res.json({
                message: 'post published'
            })
        } else {
            res.status(400).json({
                message: 'invalid data'
            })
        }
    } else {
        res.status(404).json({
            message: 'post not found'
        })
        throw new Error('post not found')
    }
})

const publishPostSchedule = asyncHandler(async (req, res) => {
    let date = new Date()
    await Post.find({}).then((posts) => {
        if (posts) {
            posts.forEach((post) => async () => {
                if (post.status == 'scheduled') {
                    if (post.scheduled_date <= date) {
                        post.status = 'published'
                        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                            status: 'published'
                        })
                    }
                } 
            })
        }
    })
    res.status(200).send()
})

const schedulePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        post.status = 'scheduled'
        let date = new Date()
        //req.body.scheduledDate is in format Weekday Month (short) Day Year
        let year = req.body.scheduled_date.split(' ')[3]
        let month_abbr = req.body.scheduled_date.split(' ')[1]
        let day = req.body.scheduled_date.split(' ')[2]
        //given month_abbr, get month number
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let month = months.indexOf(month_abbr)
        date.setFullYear(year)
        date.setMonth(month)
        date.setDate(day)
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        //add one full day
        date.setDate(date.getDate() + 1)
        date = date.toISOString()

        post.scheduled_date = date
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            status: 'scheduled',
            scheduled_date: date
        })
        if (updatedPost) {
            res.json({
                message: 'post scheduled' + post.scheduled_date
            })
        } else {
            res.status(400).json({
                message: 'invalid data'
            })
        }
    } else {
        res.status(404).json({
            message: 'post not found'
        })
        throw new Error('post not found')
    }
})

const unpublishPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        post.status = 'draft'
        post.scheduled_date = ''
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            status: 'draft',
            scheduled_date: ''
        })
        if (updatedPost) {
            res.json({
                message: 'post unpublished'
            })
        } else {
            res.status(400).json({
                message: 'invalid data'
            })
        }
    } else {
        res.status(404).json({
            message: 'post not found'
        })
        throw new Error('post not found')
    }
})

const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        await post.remove()
        res.json({
            message: 'post removed'
        })
    } else {
        res.status(404)
        throw new Error('post not found')
    }
})

const createPost = asyncHandler(async (req, res) => {
    const {
        title,
        slug,
        author,
        categories,
        status,
        content,
        featuredImage,
        metaTitle,
        metaDescription,
        metaKeywords,
        scheduledDate
    } = req.body
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
    const post = await Post.findOne({
        slug: req.params.slug
    })
    if (post) {
        res.json(post)
    } else {
        res.status(404)
        throw new Error('post not found')
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
    publishPost,
    publishPostSchedule,
    unpublishPost,
    schedulePost
}