import db from './mongo.js'

import express from 'express'

import cors from 'cors'
import dotenv from 'dotenv'
import rate_limit from 'express-rate-limit'

import nodemailer from 'nodemailer'
import cron from 'node-cron'

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
import training_routes from './routes/trainingRoutes.js'
import seabass_routes from './routes/seabassRoutes.js'
import comment_routes from './routes/newsCommentRoutes.js'

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FROM_USERNAME,
      pass: process.env.EMAIL_FROM_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

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

app.use("/api/events",cors({origin: '*'}))
app.use("/api/persons",cors({origin: 'https://wards.okcsouthstake.org',credentials: true}))
app.use("/api/worships",cors({origin: 'https://wards.okcsouthstake.org',credentials: true}))
app.use("/api/tools",cors({origin: 'https://wards.okcsouthstake.org',credentials: true}))
app.use("/api/users",cors({origin: 'https://wards.okcsouthstake.org',credentials: true}))
app.use("/api/missionaries/external",cors({origin: '*'}))
app.use("/api/missionaries/internal",cors({origin: '*'}))
app.use("/api/hc-reports",cors({origin: 'https://highcouncil.okcsouthstake.org',credentials: true}))
app.use("/api/training",cors({origin: 'https://training.okcsouthstake.org',credentials: true}))
app.use("/api/seabass/",cors({origin: '*'}))
app.use("/api/comments/",cors({origin: '*'}))

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
app.use('/api/missionaries/external', outgoing_missionary_routes)
app.use('/api/missionaries/internal', internal_missionary_routes)
app.use('/api/training', training_routes)
app.use('/api/comments', comment_routes)

app.use('/api/hc-reports', (req, res, next) => {
    if (req.headers.origin === 'https://highcouncil.okcsouthstake.org') {
        next()
    } else {
        res.status(403).send('Forbidden')
    }
})

app.use('/api/seabass/login-check', (req, res, next) => {
    if (req.headers.origin === 'https://seabass.okcsouthstake.org') {
        next()
    } else {
        res.status(403).send('Forbidden')
    }
})

app.use('/api/comments/create', (req, res, next) => {
    if (req.headers.origin === 'https://okcsouthstake.org') {
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
app.use('/api/seabass', seabass_routes)


cron.schedule('0 0 * * SAT', function() {

      
  
    transporter.sendMail({
        from: 'no-reply@okcsouthstake.org',
      to: 'joseph@josephhansen.dev', 
      subject: 'Please enter your high council report for the week',
      text: 'Please enter your high council report for the week at https://highcouncil.okcsouthstake.org/. The current access PIN is 398504. Thank you!\nDO NOT REPLY TO THIS EMAIL'
    }, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })
  })


  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT)
})