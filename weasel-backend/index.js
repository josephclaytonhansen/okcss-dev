import db from './mongo.js'

import express from 'express'

import cors from 'cors'
import dotenv from 'dotenv'
import rate_limit from 'express-rate-limit'

import passport from 'passport'

import cookieParser from 'cookie-parser'

import event_routes from './routes/eventRoutes.js'
import person_routes from './routes/personRoutes.js'
import worship_routes from './routes/worshipRoutes.js'
import tool_routes from './routes/toolRoutes.js'
import user_routes from './routes/userRoutes.js'
import outgoing_missionary_routes from './routes/outgoingMissionaryRoutes.js'
import internal_missionary_routes from './routes/internalMissionaryRoutes.js'
import hc_report_routes from './routes/hc_reportRoutes.js'

const app = express()

app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET))


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

app.use("/api/events",cors({origin: 'https://wards.okcsouthstake.org',credentials: true}))
app.use("/api/persons",cors({origin: 'https://wards.okcsouthstake.org',credentials: true}))
app.use("/api/worships",cors({origin: 'https://wards.okcsouthstake.org',credentials: true}))
app.use("/api/tools",cors({origin: 'https://wards.okcsouthstake.org',credentials: true}))
app.use("/api/users",cors({origin: 'https://wards.okcsouthstake.org',credentials: true}))
app.use("/api/missionaries/outgoing",cors({origin: 'https://missionaries.okcsouthstake.org',credentials: true}))
app.use("/api/missionaries/internal",cors({origin: 'https://missionaries.okcsouthstake.org',credentials: true}))
app.use("/api/hc-reports",cors({origin: 'https://highcouncil.okcsouthstake.org',credentials: true}))

const limiter = rate_limit({
    windowMs: 15 * 60 * 1000,
    max: 400,
    standardHeaders: true,
    legacyHeaders: false,
})


app.use(limiter)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/events', event_routes)
app.use('/api/persons', person_routes)
app.use('/api/worships', worship_routes)
app.use('/api/tools', tool_routes)
app.use('/api/users', user_routes)
app.use('/api/outgoing-missionaries', outgoing_missionary_routes)
app.use('/api/internal-missionaries', internal_missionary_routes)

app.use('/api/hc-reports', (req, res, next) => {
    if (req.headers.origin === 'https://highcouncil.okcsouthstake.org') {
        next()
    } else {
        res.status(403).send('Forbidden')
    }
})

if (process.env.NODE_ENV === 'production') {
    app.use('/api', (req, res, next) => {
        let validOriginPatternSubdomain = /^https:\/\/[a-z0-9]+\.okcsouthstake\.org$/
        let validOriginPattern = /^https:\/\/okcsouthstake\.org$/
        if (validOriginPattern.test(req.headers.origin) || validOriginPatternSubdomain.test(req.headers.origin)) {
            next()
        } else {
            res.status(403).send('Forbidden')
        }
    })
}

app.use('/api/hc-reports', hc_report_routes)

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT)
})