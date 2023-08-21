import asyncHandler from '../middleware/asyncHandler.min.js'
import Page from '../models/pageModel.min.js'

const getPages = asyncHandler(async (req, res) => {
    const pages = await Page.find({})
    res.json(pages)
})

const getPageById = asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id)
    if (page) {
        res.json(page)
    } else {
        res.status(404)
        throw new Error('Page not found')
    }
})

const updatePageById = asyncHandler(async (req, res) => {
    const {title, content, author, slug, status, views } = req.body
    const page = await Page.findById(req.params.id)
    if (page) {
        page.title = title
        page.content = content
        page.author = author
        page.slug = slug
        page.status = status
        page.views = views
        const updatedPage = await page.save()
        res.json(updatedPage)
    }
    else {
        res.status(404)
        throw new Error('Page not found')
    }
})

const deletePageById = asyncHandler(async (req, res) => {
    const page = await Page.findById(req.params.id)
    if (page) {
        await page.remove()
        res.json({ message: 'Page removed' })
    } else {
        res.status(404)
        throw new Error('Page not found')
    }
})

const createPage = asyncHandler(async (req, res) => {
    const { title, content, author, slug, status, views } = req.body
    const page = await Page.create({
        title,
        content,
        author,
        slug,
        status,
        views
    })
    if (page) {
        res.status(201).json({
            _id: page._id,
            title: page.title,
            content: page.content,
            author: page.author,
            slug: page.slug,
            status: page.status,
            views: page.views
        })
    } else {
        res.status(400)
        throw new Error('Invalid page data')
    }

})

const getPageBySlug = asyncHandler(async (req, res) => {
    const page = await Page.findOne({ slug: req.params.slug })
    if (page) {
        page.views = page.views + 1
        await page.save()
        res.json(page)
    } else {
        res.status(404)
        throw new Error('Page not found')
    }
})

const getPagesByAuthor = asyncHandler(async (req, res) => {
    const pages = await Page.find({ author: req.params.author })
    if (pages) {
        res.json(pages)
    } else {
        res.status(404)
        throw new Error('Pages not found')
    }
})

const getPagesByStatus = asyncHandler(async (req, res) => {
    const pages = await Page.find({ status: req.params.status })
    if (pages) {
        res.json(pages)
    } else {
        res.status(404)
        throw new Error('Pages not found')
    }
})


export {
    getPages,
    getPageById,
    updatePageById,
    deletePageById,
    createPage,
    getPageBySlug,
    getPagesByAuthor,
    getPagesByStatus
}