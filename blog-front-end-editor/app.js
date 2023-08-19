import express from 'express'
const app = express()
import nunjucks from 'nunjucks'

import db from './src/server/mongo.js'

import base_routes from './src/server/base_routes.js'

nunjucks.configure(['src/views', 'src/includes', 'src/assets'] , {
    autoescape: true,
    express: app,
    watch: true
})

app.use("", base_routes)

app.listen(5920, () => {
    console.log('Server is running on port 5920')
})

