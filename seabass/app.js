import db from './src/server/mongo.js'

import express from 'express'

import cors from 'cors'
import fs from 'fs'
import dotenv from 'dotenv'

import nunjucks from 'nunjucks'
import rate_limit from 'express-rate-limit'

import axios from 'axios'
import upload from './src/server/multerStorage.js'
import User from './src/server/models/userModel.min.js'

import page_routes from './src/server/routes/pageRoutes.min.js'
import post_routes from './src/server/routes/postRoutes.min.js'
import user_routes from './src/server/routes/userRoutes.min.js'
import comment_routes from './src/server/routes/commentRoutes.min.js'
import category_routes from './src/server/routes/categoriesRoutes.min.js'
import static_routes from './src/server/routes/staticRoutes.min.js'

import session from 'express-session'
import passport from 'passport'
import Strategy from 'passport-google-oauth20'
import authMiddleware from './src/server/middleware/authMiddleware.js'
import {default as totp} from 'totp-generator'
import QRCode from 'qrcode'
import {default as base32} from 'base32'

import {default as connectMongoDBSession} from 'connect-mongodb-session'

import cookieParser from 'cookie-parser'

const app = express()
const router = express.Router()

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))

const MongoDBStore = connectMongoDBSession(session)

const store = new MongoDBStore({
    uri: process.env.MONGO_STRING,
    databaseName: 'development',
    collection: 'sessions'
})

app.use(session({
    maxAge: 1000 * 60 * 60,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.ENV == 'production',
        maxAge: 1000 * 60 * 60,
    },
    store: store
}))

app.use(passport.session())

app.use(passport.initialize())

router.post('/upload-image', upload.single('streamfile'), (req, res) => {
    let authenticated = authMiddleware(req, User)
    if (authenticated === false) {
        res.redirect('/login')
    } else {
        if (req.fileValidationError) {
            return res.status(400).json({
                message: req.fileValidationError,
            })
        }
        // get the file from the request
        const file = req.file
        if (!file) {
            return res.status(400).json({
                message: 'Please upload a file',
            })
        }
        return res.status(201).json({
            name: file.filename,
            path: file.path,
            size: file.size,
            type: file.type,
            width: file.width,
            height: file.height,
            createdAt: file.createdAt,
            updatedAt: file.updatedAt,
            alt: file.alt_text
        })

    }
})

passport.use(new Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/oauth2/redirect/google',
    scope: ['profile', 'email'],
}, async (accessToken, refreshToken, profile, cb) => {
    const user = await User.findOne({
        googleId: profile.id
    })
    if (user) {
        return cb(null, user)
    } else {
        const newUser = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
            email: profile.emails[0].value,
            permissions: 'worm'
        })
        return cb(null, newUser)
    }

}))

passport.serializeUser(async function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

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
    origin: process.env.ORIGIN,
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

if (process.env.ENV == 'production') {
    app.use(limiter)
}

app.use("/page", page_routes)
app.use("/post", post_routes)
app.use("/user", user_routes)
app.use("/comment", comment_routes)
app.use("/category", category_routes)
app.use("/", static_routes)

router.get('/login/federated/google', passport.authenticate('google', {
    scope: ['profile email']
}))

router.get('/logout', async (req, res, next) => {
    req.session.destroy()
    await req.logout(function error(err) {
        if (err) {
            return next(err)
        }
    })
    res.redirect('/login')
})

router.get('/', passport.authenticate('google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}))

router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successRedirect: '/totp-challenge',
    failureRedirect: '/login',
}))

router.get('/totp-challenge', (req, res) => {
    if (req.session.passport.user) {
        let user = req.session.passport.user
        let totp_enabled = false
        let totp_secret = ''
        User.findById(user).then((user) => {
            console.log(user)
            totp_enabled = user.totp
            totp_secret = user.totpSecret
            req.session.passport.email = user.email
            req.session.passport.display_name = user.display_name
            req.session.passport.username = user.username
            req.session.passport.picture = user.picture
            req.session.passport.bio = user.bio

            if (totp_enabled == true) {
                let token = totp(totp_secret)
                res.render('totp-challenge.html', {
                    root: '.',
                })
            } else {
                let secret = (user._id + process.env.TOTP_SECRET)
                //encode secret as base32
                secret = base32.encode(secret).toString().replace(/0/g, 'O').replace(/1/g, 'I').replace(/8/g, 'B').replace(/9/g, 'P').toUpperCase().replace(/[^A-Z2-7=]/g, '')
                //remove any characters that don't match A-Z, 2-7, or =
                let message = "otpauth://totp/" + user.email + "?secret=" + secret
                console.log(message)
                let qr = QRCode.toDataURL(message, {
                    errorCorrectionLevel: 'L',
                    type: 'image/png',

                }).then((url) => {
                    url = url.slice(0, -1)
                    res.render('totp.html', {
                        qr: url,
                        root: '.'
                    })
                })
    
            }
        })
    }
})

router.post('/totp-verify', (req, res) => {
    let user = req.session.passport.user
    let secret = (user + process.env.TOTP_SECRET)
    secret = base32.encode(secret).toString().replace(/0/g, 'O').replace(/1/g, 'I').replace(/8/g, 'B').replace(/9/g, 'P').toUpperCase().replace(/[^A-Z2-7=]/g, '')
    let submitted_token = req.body.code
    let token = totp(secret)
    console.log(submitted_token, token)
    if (submitted_token == token) {
        User.findByIdAndUpdate(user, {
            totp: true,
            totpSecret: secret
        }).then((user) => {
            res.redirect('/dashboard')
        })
    } else {
        res.redirect('/totp-challenge')
    }

})

router.get('/edit/post/:id', async (req, res) => {
    let authenticated = authMiddleware(req, User)
    if (authenticated === false) {
        res.redirect('/login')
    } else {
        const id = req.params.id
        let all_categories = []
        const categories = await axios.get('http://localhost:5920/category/').then((response) => {
            return response.data
        })
        for (let i = 0; i < categories.length; i++) {
            all_categories.push(categories[i].name)
        }
        let all_posts = await axios.get('http://localhost:5920/post/').then((response) => {
            return response.data
        })
        let all_post_ids = []
        for (let i = 0; i < all_posts.length; i++) {
            all_post_ids.push(all_posts[i]._id)
        }
        let id_index = all_post_ids.indexOf(id)
        if (id_index == -1) {
            res.redirect('/dashboard')

        } else {
            res.render('editor.html', {
                root: '.',
                post: await axios.get('http://localhost:5920/post/id/' + all_post_ids[id_index]).then((response) => {
                    return response.data
                }),
                type: 'post',
                user: {
                    email: req.session.passport.email,
                    username: req.session.passport.username,
                    displayName: req.session.passport.displayName,
                }, username: 'served_from_express',
                all_categories: all_categories
            })
        }
    }
})

router.get('/edit/page/:id', async (req, res) => {
    let authenticated = authMiddleware(req, User)
    if (authenticated === false) {
        res.redirect('/login')
    } else {
        const id = req.params.id
        let all_categories = []
        const categories = await axios.get('http://localhost:5920/category/').then((response) => {
            return response.data
        })
        for (let i = 0; i < categories.length; i++) {
            all_categories.push(categories[i].name)
        }
        let all_pages = await axios.get('http://localhost:5920/page/').then((response) => {
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
                post: await axios.get('http://localhost:5920/page/id/' + all_page_ids[id_index]).then((response) => {
                    return response.data
                }),
                type: 'page',
                user: {
                    email: req.session.passport.email,
                    username: req.session.passport.username,
                    displayName: req.session.passport.displayName,
                },
                all_categories: all_categories
            })
        }
    }
})

router.get('/login', (req, res) => {
    res.render('login.html', {
        root: '.'
    })
})

router.get('/dashboard', async (req, res) => {
    let authenticated = authMiddleware(req, User)
    console.log(authenticated)
    if (authenticated === false) {
        console.log('redirecting')
        res.redirect('/login')
    } else {
        const user = {
            email: req.session.passport.email,
            username: req.session.passport.username,
            display_name: req.session.passport.display_name,
        }
        const categories = await axios.get('http://localhost:5920/category/').then((response) => {
            return response.data
        })
        let all_categories = []
        for (let i = 0; i < categories.length; i++) {
            all_categories.push(categories[i].name)
        }

        const authors = await axios.get('http://localhost:5920/user/').then((response) => {
            return response.data
        })
        let all_authors = []
        for (let i = 0; i < authors.length; i++) {
            all_authors.push({
                name: authors[i].display_name,
                id: authors[i]._id
            })
        }

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
            all_authors: all_authors,
            all_categories: categories,
            current_categories: all_categories,
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
    }
})

router.get('/account', (req, res) => {
    let authenticated = authMiddleware(req, User)
    if (authenticated === false) {
        res.redirect('/login')
    } else {
        //eventually, get this from the database
        User.findById(req.session.passport.user).then((user) => {
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
        }).catch((error) => {
            res.redirect('/login')
        })
        

    }
})

router.get('/new-post', async (req, res) => {
    let authenticated = authMiddleware(req, User)
    if (authenticated === false) {
        res.redirect('/login')
    } else {
        let all_categories = []
        const categories = await axios.get('http://localhost:5920/category/').then((response) => {
            return response.data
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
            user: {
                email: 'served_from@express.app',
                username: 'served_from_express',
            },
            all_categories: all_categories
        })
    }
})

router.get('/new-page', async (req, res) => {
    let authenticated = authMiddleware(req, User)
    if (authenticated === false) {
        res.redirect('/login')
    } else {

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
            user: {
                email: 'served_from@express.app',
                username: 'served_from_express',
            }
        })
    }
})

app.use('/', router)

app.listen(5920, () => {
    console.log('Server is running on port 5920')
})