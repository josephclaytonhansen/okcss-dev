import db from './src/server/mongo.js'

import express from 'express'

import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'

import {default as totp} from 'totp-generator'
import QRCode from 'qrcode'
import {default as base32} from 'base32'

import nunjucks from 'nunjucks'
import {default as nunjuckDate} from 'nunjucks-date'
import rate_limit from 'express-rate-limit'

import axios from 'axios'
import User from './src/server/models/userModel.min.js'

import page_routes from './src/server/routes/pageRoutes.min.js'
import post_routes from './src/server/routes/postRoutes.min.js'
import user_routes from './src/server/routes/userRoutes.min.js'
import comment_routes from './src/server/routes/commentRoutes.min.js'
import category_routes from './src/server/routes/categoriesRoutes.min.js'
import static_routes from './src/server/routes/staticRoutes.min.js'
import upload_routes from './src/server/routes/uploadRoutes.min.js'
import base_routes from './src/server/routes/baseRoutes.min.js'

import session from 'express-session'
import passport from 'passport'
import Strategy from 'passport-google-oauth20'

import {
    default as connectMongoDBSession
} from 'connect-mongodb-session'

import cookieParser from 'cookie-parser'

const app = express()
const router = express.Router()

app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))

const MongoDBStore = connectMongoDBSession(session)

const store = new MongoDBStore({
    uri: process.env.MONGO_STRING,
    databaseName: 'development',
    collection: 'sessions'
})

app.use(session({
    maxAge: 1000 * 60 * 60 * 24 * 5,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.ENV == 'production',
        maxAge: 1000 * 60 * 60 * 24 * 5,
    },
    store: store
}))

app.use(passport.session())

app.use(passport.initialize())

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


const nenv = nunjucks.configure(['src/views', 'src/includes', 'src/assets'], {
    autoescape: true,
    express: app,
    watch: true,
})

nunjuckDate.setDefaultFormat('MMM Do, h:mm a')
nunjuckDate.install(nenv)

nenv.addFilter('fixed', function(num, length) {
    return num.toFixed(length || 2)
})

nenv.addFilter('reverse', function(items) {
    return items.reverse()
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
app.use("/", upload_routes)
app.use("/", base_routes)

/* ------------------------------- Auth routes ------------------------------ */

router.get('/login/federated/google', passport.authenticate('google', {
    scope: ['profile email']
}))

router.get('/login-na', (req, res) => {
    res.render('login.html', {
        root: '.',
        message: 'You are not authorized.\nContact the database admin to gain access'
    })
})

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
                let secret = (user.email + process.env.TOTP_SECRET)
                //encode secret as base32
                secret = base32.encode(secret).toString().replace(/0/g, 'O').replace(/1/g, 'I').replace(/8/g, 'B').replace(/9/g, 'P').toUpperCase().replace(/[^A-Z2-7=]/g, '')
                //remove any characters that don't match A-Z, 2-7, or =
                let message = "otpauth://totp/OklahomaCitySouthStake:" + user + "?secret=" + secret + "&issuer=OklahomaCitySouthStake"
                let qr = QRCode.toDataURL(message, {
                    errorCorrectionLevel: 'L',
                    type: 'image/png',
                }).then((url) => {
                    res.render('totp.html', {
                        qr: url,
                        root: '.',
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
    console.log("%s, %s", submitted_token, token)
    if (submitted_token == token) {
        User.findByIdAndUpdate(user, {
            totp: true,
            totpSecret: secret
        }).then((user) => {
            res.redirect('/logged-in')
        })
    } else {
        res.redirect('/totp-challenge')
    }

})

router.get('/logged-in', (req, res) => {
    let user = req.session.passport.user
    User.findById(user).then((user) => {
        req.session.passport.email = user.email
        req.session.passport.display_name = user.display_name
        req.session.passport.username = user.username
        req.session.passport.picture = user.picture
        req.session.passport.bio = user.bio
        req.session.passport.permissions = user.permissions
        let authenticated = req.session.passport.permissions !== "worm"
        if (authenticated === false) {
            res.redirect('/login')
        } else {
            res.redirect('/dashboard')
        }
    })

})

router.get('/login', (req, res) => {
    res.render('login.html', {
        root: '.'
    })
})

app.use('/', router)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT)
})