import express from 'express'
const app = express()
import nunjucks from 'nunjucks'

nunjucks.configure(['src/views', 'src/includes', 'src/assets'] , {
    autoescape: true,
    express: app,
    watch: true
})

app.get('/', (req, res) => {
    res.render('index.html', { root: '.' })})

app.get('/editor.js', (req, res) => {
    res.sendFile("/src/views/js/editor.js", { root: '.' })
})

app.get('/editor.css', (req, res) => {
    res.sendFile("/src/views/css/editor.css", { root: '.' })
})

app.listen(5920, () => {
    console.log('Server is running on port 5920')
})

