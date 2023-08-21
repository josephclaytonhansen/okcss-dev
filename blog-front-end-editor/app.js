import express from 'express'
const app = express()
import nunjucks from 'nunjucks'
import rate_limit from 'express-rate-limit'
const router = express.Router()
import axios from 'axios'

import db from './src/server/mongo.js'

import page_routes from './src/server/routes/pageRoutes.js'
import post_routes from './src/server/routes/postRoutes.js'
import user_routes from './src/server/routes/userRoutes.js'
import comment_routes from './src/server/routes/commentRoutes.js'
import category_routes from './src/server/routes/categoriesRoutes.js'

import cors from 'cors'

import fs from 'fs'

import dotenv from 'dotenv'
dotenv.config()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

/* var privateKey  = fs.readFileSync('/etc/ssl/key.pem', 'utf8')
var certificate = fs.readFileSync('/etc/ssl/cert.pem', 'utf8')

var credentials = {key: privateKey, cert: certificate} */

const corsOptions = {
    origin: process.env.ORIGIN || "http://localhost:5920",
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))


nunjucks.configure(['src/views', 'src/includes', 'src/assets'], {
    autoescape: true,
    express: app,
    watch: true
})

const limiter = rate_limit({
    windowMs: 15 * 60 * 1000,
    max: 400,
    standardHeaders: true,
    legacyHeaders: false,
})

app.use(limiter)

app.use("/page", page_routes)
app.use("/post", post_routes)
app.use("/user", user_routes)
app.use("/comment", comment_routes)
app.use("/category", category_routes)

// base routes

router.get('/', (req, res) => {
    // if user logged in, redirect to dashboard
    // else, redirect to login
    res.redirect('/login')
})

router.get('/edit/post/:id', async (req, res) => {
    const id = req.params.id
    res.render('editor.html', {
        root: '.',
        post: await axios.get('http://localhost:5920/post/id/'+id).then((response) => {
            return response.data
        }),
        type: 'page',
        user: {
            email: 'served_from@express.app',
            username: 'served_from_express',
        }
    })
})
router.get('/edit/page/:id', async (req, res) => {
    const id = req.params.id
    res.render('editor.html', {
        root: '.',
        post: await axios.get('http://localhost:5920/page/id/'+id).then((response) => {
            return response.data
        }),
        type: 'page',
        user: {
            email: 'served_from@express.app',
            username: 'served_from_express',
        }
    })
})

router.get('/editor.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/editor.min.js", {
        root: '.'
    })
})

router.get('/editor.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/editor.min.css", {
        root: '.'
    })
})

router.get('/login', (req, res) => {
    res.render('login.html', {
        root: '.'
    })
})

router.get('/login.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/login.min.css", {
        root: '.'
    })
})

router.get('/dashboard', async (req, res) => {
    //eventually, get this from the database
    const user = {
        email: 'served_from@express.app',
        username: 'served_from_express',
    }

    const all_categories = ["blog", "test", "uncategorized"]

    res.render('dashboard.html', {
        root: '.',
        date: {
            day: new Date().getDate(),
            month: new Date().getMonth(),
            monthName: new Date().toLocaleString('default', {
                month: 'long'
            }),
            year: new Date().getFullYear()
        },
        user: user,
        all_categories: all_categories,
        posts: await axios.get('http://localhost:5920/post').then((response) => {
            return response.data
        }),
        pages: await axios.get('http://localhost:5920/page').then((response) => {
            return response.data
        }),
        upcoming_posts: await axios.get('http://localhost:5920/post/upcoming').then((response) => {
            return response.data
        }).catch((error) => {
            return []
        })
    })
})

router.get('/account', (req, res) => {
    //eventually, get this from the database
    const user = {
        email: 'served_from@express.app',
        username: 'served_from_express',
        password: 'password',
        picture: 'https://unsplash.it/1000/450/?random?',
        bio: 'I am a user served from express. This is my bio. As a placeholder, I have little else to say.',
        display_name: 'Served F. Express',
    }
    const date = {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        monthName: new Date().toLocaleString('default', {
            month: 'long'
        }),
        year: new Date().getFullYear()
    }

    res.render('account.html', {
        root: '.',
        user: user,
        date: date
    })

})

router.get('/account.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/account.min.css", {
        root: '.'
    })
})

router.get('/dashboard.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/dashboard.min.css", {
        root: '.'
    })
})

router.get('/calendar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/calendar.min.css", {
        root: '.'
    })
})

router.get('/calendar.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/calendar.min.js", {
        root: '.'
    })
})

router.get('/dashboard.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/dashboard.min.js", {
        root: '.'
    })
})

router.get('/img/gallery.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/utils/imgs/gallery.min.js", {
        root: '.'
    })
})
router.get('/img/list.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/utils/imgs/img_list.min.js", {
        root: '.'
    })
})

router.get('/app.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/app.min.css", {
        root: '.'
    })
})

router.get('/lightbox-modal.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/lightbox-modal.min.css", {
        root: '.'
    })
})

router.get('/image/gallery.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/img-gallery-list-view.min.css", {
        root: '.'
    })
})

router.get('/admin_toolbar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/admin_toolbar.min.css", {
        root: '.'
    })
})

router.get('/admin_toolbar.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/admin_toolbar.min.js", {
        root: '.'
    })
})

router.get('/post_list.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/post_list.min.js", {
        root: '.'
    })
})

router.get('/post_list.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/post_list.min.css", {
        root: '.'
    })
})

router.get('/sidebar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/sidebar.min.css", {
        root: '.'
    })
})

router.get('/word_count.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/word_count.min.css", {
        root: '.'
    })
})

router.get('/header.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/header.min.css", {
        root: '.'
    })
})

router.get('/icons/style.css', (req, res) => {
    res.type('text/css')
    res.sendFile('src/assets/lucide/css/l.min.css', {
        root: '.'
    })
})

router.get('/icons/:icon', (req, res) => {
    res.type('image/svg+xml')
    const icon = req.params.icon
    res.sendFile('src/assets/lucide/used/' + icon + '.svg', {
        root: '.'
    })
})

app.use('/', router)

app.listen(5920, () => {
    console.log('Server is running on port 5920')
})