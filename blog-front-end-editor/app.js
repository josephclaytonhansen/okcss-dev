import express from 'express'
const app = express()
import nunjucks from 'nunjucks'
import rate_limit from 'express-rate-limit'

import db from './src/server/mongo.js'

import base_routes from './src/server/base_routes.js'

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

app.listen(5920, () => {
    console.log('Server is running on port 5920')
})

