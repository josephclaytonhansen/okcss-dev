import axios from 'axios'
import User from '../models/userModel.min.js'
import Post from '../models/postModel.min.js'
import fs from 'fs'
import {populate, populateNew} from './utils/populate.min.js'
import express from 'express'
const router = express.Router()

router.get('/dashboard', async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {
        let data = await populate(req, res).then((data) => {return data})
        let thumbnails = []
        if (!req.session.thumbnails) {
            let thumbnails_slugs = []


            await axios.get('http://localhost:5920/uploaded-media-thumbnails').then((response) => {
                thumbnails_slugs = response.data.slugs
            })

            for (let i = 0; i < thumbnails_slugs.length; i++) {
                await axios.get('http://localhost:5920/uploaded-media/' + thumbnails_slugs[i]).then((response) => {
                    thumbnails.push(response.data)
                })
            }

            req.session.thumbnails = thumbnails
        } else {
            thumbnails = req.session.thumbnails
        }

        res.render('dashboard.html', {
            root: '.',
            user: data.user,
            posts: data.posts,
            pages: data.pages,
            comments: data.comments,
            all_authors: data.all_authors,
            all_categories: data.all_categories,
            cached_media: thumbnails,
            date: {
                day: new Date().getDate(),
                month: new Date().getMonth(),
                monthName: new Date().toLocaleString('default', {
                    month: 'long'
                }),
                year: new Date().getFullYear()
            }
        })

    }
})


router.get('/account', async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {
        let data = await populate(req, res).then((data) => {return data})
        let pages = []
        let posts = []

        User.findById(data.user).then((user) => {
            const date = {
                day: new Date().getDate(),
                month: new Date().getMonth(),
                monthName: new Date().toLocaleString('default', {
                    month: 'long'
                }),
                year: new Date().getFullYear(),
            }

            posts = data.posts.filter((post) => {
                return post.author == user._id
            })

            pages = data.pages.filter((page) => {
                return page.author == user._id
            })

            res.render('account.html', {
                root: '.',
                user: data.user,
                date: date,
                posts: posts,
                pages: pages,
                all_authors: data.all_authors,
                all_categories: data.all_categories
            })
        })
    }
})

router.get('/new-post', async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {
        let user = req.session.passport.user
        User.findById(user).then((user) => {
            let all_categories = []
            const categories = axios.get('http://localhost:5920/category/').then((response) => {
                return response.data
            })
            let all_authors = axios.get('http://localhost:5920/user/').then((response) => {
                let data = response.data
                return data.map((author) => {
                    return {
                        name: author.display_name,
                        id: author._id
                    }
                })
            })
            for (let i = 0; i < categories.length; i++) {
                all_categories.push(categories[i].name)
            }
            res.render('editor.html', {
                root: '.',
                post: {
                    title: 'Untitled Post',
                    meta_title: '',
                    meta_description: '',
                    meta_keywords: [],
                    author: '',
                    slug: '',
                    content: '',
                    categories: [],
                    tags: [],
                    scheduled_date: '',
                    status: 'draft',
                    featured_image: ''
                },
                type: 'post',
                user: user,
                all_categories: all_categories,
                all_authors: all_authors
            })
        }).catch((error) => {
            res.redirect('/login')
        })
    }
})

router.get('/new-page', async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {}
})

router.get('/edit/post/:id', async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {}
})


router.get('/edit/page/:id', async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {}
        
})

export default router