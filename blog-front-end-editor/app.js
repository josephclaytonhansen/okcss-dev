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
    res.type('js')
    res.sendFile("/src/views/js/editor.js", { root: '.' })
})

app.get('/editor.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/editor.css", { root: '.' })
})

app.get('/admin_toolbar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/admin_toolbar.css", { root: '.' })
})

app.get('/header.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/header.css", { root: '.' })
})

app.get('/icons/style.css', (req, res) => {
    res.type('text/css')
    res.sendFile('src/assets/lucide/css/l.min.css', {root: '.'})
})

app.get('/icons/:icon', (req, res) => {
    res.type('image/svg+xml')
    const icon = req.params.icon
    res.sendFile('src/assets/lucide/icons/'+icon+'.svg', {root: '.'})
})

app.listen(5920, () => {
    console.log('Server is running on port 5920')
})

