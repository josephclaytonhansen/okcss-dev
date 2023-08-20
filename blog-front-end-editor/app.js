import express from 'express'
const app = express()
import nunjucks from 'nunjucks'
import rate_limit from 'express-rate-limit'

import db from './src/server/mongo.js'

import base_routes from './src/server/base_routes.js'
import page_routes from './src/server/routes/pageRoutes.js'

import cors from 'cors'

import fs from 'fs'

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

/* var privateKey  = fs.readFileSync('/etc/ssl/key.pem', 'utf8')
var certificate = fs.readFileSync('/etc/ssl/cert.pem', 'utf8')

var credentials = {key: privateKey, cert: certificate} */

const corsOptions = {
    origin:process.env.ORIGIN || "http://localhost:5920",
    credentials: true,
    optionSuccessStatus: 200
  }
  
  app.use(cors(corsOptions))
  app.options('*', cors(corsOptions))


nunjucks.configure(['src/views', 'src/includes', 'src/assets'] , {
    autoescape: true,
    express: app,
    watch: true
})

const limiter = rate_limit({
    windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})

app.use(limiter)
app.use("", base_routes)

app.use("/page", page_routes)

app.listen(5920, () => {
    console.log('Server is running on port 5920')
})

