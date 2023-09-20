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
        if (!data){
            data = await populate(req, res).then((data) => {return data})
        }
        let thumbnails = []
        if (!req.session.thumbnails) {
            let thumbnails_slugs = []


            await axios.get('https://178.128.224.147:5920/uploaded-media-thumbnails').then((response) => {
                thumbnails_slugs = response.data.slugs
            })

            for (let i = 0; i < thumbnails_slugs.length; i++) {
                await axios.get('https://178.128.224.147:5920/uploaded-media/' + thumbnails_slugs[i]).then((response) => {
                    thumbnails.push(response.data)
                })
            }

            req.session.thumbnails = thumbnails
        } else {
            thumbnails = req.session.thumbnails
        }

        let upcoming_posts = []
        try{
        data.posts.forEach((post) => {
            if (post.status == 'scheduled' && new Date(post.scheduled_date) > new Date()) {
                upcoming_posts.push(post)
            }
        })
    } catch (err) {}

        res.render('dashboard.html', {
            root: '.',
            user: data.user,
            posts: data.posts,
            pages: data.pages,
            comments: data.comments,
            upcoming_posts: upcoming_posts,
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
        
        let data = await populateNew(req, res).then((data) => {return data})
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
                    featured_image: '',
                    history: [],
                },
                type: 'post',
                user: data.user,
                all_categories: data.all_categories,
                all_authors: data.all_authors
            })
    }
})

router.get('/new-page', async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {
        
        let data = await populateNew(req, res).then((data) => {return data})
            res.render('editor.html', {
                root: '.',
                post: {
                    title: 'Untitled Page',
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
                    featured_image: '',
                    history: [],
                },
                type: 'page',
                user: data.user,
                all_categories: data.all_categories,
                all_authors: data.all_authors
            })
    }
})

router.get('/edit/post/:id', async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {
        let data = await populate(req, res).then((data) => {return data})
        let post = data.posts.filter((post) => {
            return post._id == req.params.id
        })
        let thumbnails = []
        if (!req.session.thumbnails) {
            let thumbnails_slugs = []
            await axios.get('https://178.128.224.147:5920/uploaded-media-thumbnails').then((response) => {
                thumbnails_slugs = response.data.slugs
            })

            for (let i = 0; i < thumbnails_slugs.length; i++) {
                await axios.get('https://178.128.224.147:5920/uploaded-media/' + thumbnails_slugs[i]).then((response) => {
                    thumbnails.push(response.data)
                })
            }

            req.session.thumbnails = thumbnails
        } else {
            thumbnails = req.session.thumbnails
        }

        res.render('editor.html', {
            root: '.',
            post: post,
            type: 'post',
            images: thumbnails,
            all_categories: data.all_categories,
            all_authors: data.all_authors,
        })

    }
})


router.get('/edit/page/:id', async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {
        let data = await populate(req, res).then((data) => {return data})
        let page = data.pages.filter((page) => {
            return page._id == req.params.id
        })
        let thumbnails = []
        if (!req.session.thumbnails) {
            let thumbnails_slugs = []

            await axios.get('https://178.128.224.147:5920/uploaded-media-thumbnails').then((response) => {
                thumbnails_slugs = response.data.slugs
            })

            for (let i = 0; i < thumbnails_slugs.length; i++) {
                await axios.get('https://178.128.224.147:5920/uploaded-media/' + thumbnails_slugs[i]).then((response) => {
                    thumbnails.push(response.data)
                })
            }

            req.session.thumbnails = thumbnails
        } else {
            thumbnails = req.session.thumbnails
        }

        res.render('editor.html', {
            root: '.',
            post: page,
            type: 'page',
            images: thumbnails,
            all_categories: data.all_categories,
            all_authors: data.all_authors,
        })
    }
        
})

router.get('/refresh-session', async (req, res) => {
    //get users, posts, pages, comments, categories from the database, replacing existing req.session values
    let users = await axios.get('https://178.128.224.147:5920/user/').then((response) => {
        return response.data
    })
    req.session.users = users
    let posts = await axios.get('https://178.128.224.147:5920/post/').then((response) => {
        return response.data
    })
    req.session.posts = posts
    let pages = await axios.get('https://178.128.224.147:5920/page/').then((response) => {
        return response.data
    })
    req.session.pages = pages
    let comments = await axios.get('https://178.128.224.147:5920/comment/').then((response) => {
        return response.data
    })
    req.session.comments = comments

    let user = await User.findById(req.session.passport.user).then((user) => {
        return user
    })

    req.session.user = user
    req.session.passport.user = user

    res.send('session refreshed')
})

export default router