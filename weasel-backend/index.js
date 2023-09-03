import db from './mongo.js'

import express from 'express'

import cors from 'cors'
import dotenv from 'dotenv'
import rate_limit from 'express-rate-limit'

import session from 'express-session'
import passport from 'passport'

import {
    default as connectMongoDBSession
} from 'connect-mongodb-session'

import cookieParser from 'cookie-parser'

import event_routes from './routes/eventRoutes.js'
import person_routes from './routes/personRoutes.js'
import worship_routes from './routes/worshipRoutes.js'
import tool_routes from './routes/toolRoutes.js'

const app = express()

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

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

const limiter = rate_limit({
    windowMs: 15 * 60 * 1000,
    max: 400,
    standardHeaders: true,
    legacyHeaders: false,
})

if (process.env.ENV == 'production') {
    app.use(limiter)
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/events', event_routes)
app.use('/api/persons', person_routes)
app.use('/api/worships', worship_routes)
app.use('/api/tools', tool_routes)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT)
})