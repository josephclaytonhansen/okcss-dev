import db from './mongo.js'
import Post from './models/postModel.min.js'
import Page from './models/pageModel.min.js'
import User from './models/userModel.min.js'

const createTestPages = async () => {
    const pages = [
        {
            title: "Home",
            content: "This is the home page",
            slug: "home",
            status: "published",
            author: "5f9d3b3b9b0b7e1b1c3b0b7e"
        },
        {
            title: "About",
            content: "This is the about page",
            slug: "about",
            status: "published",
            author: "5f9d3b3b9b0b7e1b1c3b0b7e"
        },
        {
            title: "Contact",
            content: "This is the contact page",
            slug: "contact",
            status: "draft",
            author: "5f9d3b3b9b0b7e1b1c3b0b7e"
        }
    ]

    try {
        await Page.deleteMany({})
        await Page.insertMany(pages)
        console.log("Pages Created")
    } catch (error) {
        console.log(error)
    }
}

const createTestPosts = async () => {
    const posts = [
        {
            title: "Post 1",
            meta_title: "Post 1",
            content: "This is the first post",
            slug: "post-1",
            meta_description: "This is the first post",
            meta_keywords: ["post", "1"],
            tags: ["post", "1"],
            categories: ["blog"],
            status: "scheduled",
            scheduled_date: new Date(),
            author: "5f9d3b3b9b0b7e1b1c3b0b7e",
            featured_image: "https://picsum.photos/200/300"
        },
    {
        title: "Post 2",
        meta_title: "Post 2",
        content: "This is the second post",
        slug: "post-2",
        meta_description: "This is the second post",
        meta_keywords: ["post", "2"],
        tags: ["post", "2"],
        categories: ["blog", "test"],
        status: "published",
        author: "5f9d3b3b9b0b7e1b1c3b0b7e",
        featured_image: "https://picsum.photos/200/300"
    }
]
    try {
        await Post.deleteMany({})
        await Post.insertMany(posts)
        console.log("Posts Created")
    }
    catch (error) {
        console.log(error)
    }
}

const createTestUser = async () => {
    const user = {
        username: "johndoe",
        email: "john@email.com",
        password: "password",
        permissions: "admin",
        picture: "https://picsum.photos/200/300",
        bio: "This is a test user",
        display_name: "Test User"
}
    try {
        await User.deleteMany({})
        await User.create(user)
        console.log("User Created")
    } catch (error) {
        console.log(error)
    }
}

createTestPages()
createTestPosts()
createTestUser()