import axios from 'axios'
import User from '../models/userModel.min.js'
import Post from '../models/postModel.min.js'
import fs from 'fs'
import express from 'express'
const router = express.Router()

router.get('/dashboard', async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {

        let user_id = req.session.passport.user
        let user = null
        if (!req.session.user) {
            let user = await User.findById(user_id).then((user) => {
                return user
            })
            req.session.user = user
        } else {
            user = req.session.user
        }
        let categories = null
        let all_categories = null
        if (!req.session.categories) {
            categories = await axios.get('http://localhost:5920/category/')
            req.session.categories = categories.data
            all_categories = categories.data.map((category) => {
                return {
                    name: category.name,
                    id: category._id
                }
            })
        } else {
            categories = req.session.categories
            all_categories = categories.map((category) => {
                return {
                    name: category.name,
                    id: category._id
                }
            })
        }
        let posts = null
        if (!req.session.posts) {
            posts = await axios.get('http://localhost:5920/post/')
            req.session.posts = posts.data
        } else {
            posts = req.session.posts
        }
        let pages = null
        if (!req.session.pages) {
            pages = await axios.get('http://localhost:5920/page/')
            req.session.pages = pages.data
        } else {
            pages = req.session.pages
        }
        let comments = null
        if (!req.session.comments) {
            comments = await axios.get('http://localhost:5920/comment/')
            req.session.comments = comments.data
        } else {
            comments = req.session.comments
        }
        let users = null
        let all_authors = null
        if (!req.session.users) {
            users = await axios.get('http://localhost:5920/user/')
            req.session.users = users.data
            all_authors = users.data.map((author) => {
                return {
                    name: author.display_name,
                    id: author._id
                }
            })
        } else {
            users = req.session.users
            all_authors = users.map((author) => {
                return {
                    name: author.display_name,
                    id: author._id
                }
            })
        }
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
            user: user,
            posts: posts,
            pages: pages,
            comments: comments,
            all_authors: all_authors,
            all_categories: all_categories,
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


router.get('/account',async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {
        let posts = await axios.get('http://localhost:5920/post/').then((response) => {
            return response.data
        })
        let pages = await axios.get('http://localhost:5920/page/').then((response) => {
            return response.data
        })
        let user = req.session.passport.user

        //eventually, get this from the database
        User.findById(req.session.passport.user).then((user) => {
            const date = {
                day: new Date().getDate(),
                month: new Date().getMonth(),
                monthName: new Date().toLocaleString('default', {
                    month: 'long'
                }),
                year: new Date().getFullYear(),
            }

            posts = posts.filter((post) => {
                return post.author == user._id
            })

            pages = pages.filter((page) => {
                return page.author == user._id
            })

            res.render('account.html', {
                root: '.',
                user: user,
                date: date,
                posts: posts,
                pages: pages
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
    } else {
        let user = req.session.passport.user
        let all_authors = axios.get('http://localhost:5920/user/').then((response) => {
            let data = response.data
            return data.map((author) => {
                return {
                    name: author.display_name,
                    id: author._id
                }
            })
        })
        User.findById(user).then((user) => {

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
                    status: 'draft',
                },
                type: 'page',
                user: user,
                all_authors: all_authors
            })
        }).catch((error) => {
            res.redirect('/login')
        })
    }
})

router.get('/edit/post/:id', async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {
        let user = req.session.passport.user

        const id = req.params.id
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
        let all_posts = null
        let all_post_ids = []
        all_posts = await axios.get('http://localhost:5920/post/')
        all_posts = all_posts.data

        for (let i = 0; i < all_posts.length; i++) {
            all_post_ids.push(all_posts[i]._id)
        }
        console.log(all_post_ids)

        let id_index = all_post_ids.indexOf(id)
        if (id_index == -1) {
            res.redirect('/dashboard')

        } else {
            res.render('editor.html', {
                root: '.',
                post: axios.get('http://localhost:5920/post/id/' + all_post_ids[id_index]).then((response) => {
                    return response.data
                }),
                type: 'post',
                user: user,
                username: 'served_from_express',
                all_categories: all_categories,
                all_authors: all_authors
            })
        }
    }
})


router.get('/edit/page/:id', async (req, res) => {
    if (!req.session.passport || req.session.passport.permissions == 'worm') {
        res.redirect('/login-na')
    } else {
        let user = req.session.passport.user
        User.findById(user).then((user) => {
            const id = req.params.id
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
            let all_pages = axios.get('http://localhost:5920/page/').then((response) => {
                return response.data
            })
            let all_page_ids = []
            for (let i = 0; i < all_pages.length; i++) {
                all_page_ids.push(all_pages[i]._id)
            }
            let id_index = all_page_ids.indexOf(id)
            if (id_index == -1) {
                res.redirect('/dashboard')
            } else {
                res.render('editor.html', {
                    root: '.',
                    post: axios.get('http://localhost:5920/page/id/' + all_page_ids[id_index]).then((response) => {
                        return response.data
                    }),
                    type: 'page',
                    user: user,
                    all_categories: all_categories,
                    all_authors: all_authors
                })
            }
        }).catch((error) => {
            res.redirect('/login')
        })
    }
})

export default router