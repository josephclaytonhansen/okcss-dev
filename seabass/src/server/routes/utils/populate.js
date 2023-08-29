import axios from 'axios'
import User from '../../models/userModel.min.js'
import Post from '../../models/postModel.min.js'
import fs from 'fs'

const populate = async(req, res) => {
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
    return {
        user: user,
        categories: categories,
        all_categories: all_categories,
        posts: posts,
        pages: pages,
        comments: comments,
        users: users,
        all_authors: all_authors
    }
}

export default populate