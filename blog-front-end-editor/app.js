import express from 'express'
const app = express()
import nunjucks from 'nunjucks'

nunjucks.configure(['src/views', 'src/includes', 'src/assets'] , {
    autoescape: true,
    express: app,
    watch: true
})

app.get('/editor', (req, res) => {
    res.render('editor.html', { root: '.' })})

app.get('/editor.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/editor.min.js", { root: '.' })
})

app.get('/editor.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/editor.min.css", { root: '.' })
})

app.get('/login', (req, res) => {
    res.render('login.html', { root: '.' })
})

app.get('/login.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/login.min.css", { root: '.' })
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard.html', { root: '.' })
})

app.get('/dashboard.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/dashboard.min.css", { root: '.' })
})

app.get('/calendar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/calendar.min.css", { root: '.' })
})

app.get('/calendar.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/calendar.min.js", { root: '.' })
})

app.get('/dashboard.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/dashboard.min.js", { root: '.' })
})

app.get('/app.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/app.min.css", { root: '.' })
})

app.get('/admin_toolbar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/admin_toolbar.min.css", { root: '.' })
})

app.get('/admin_toolbar.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/admin_toolbar.min.js", { root: '.' })
})

app.get('/sidebar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/sidebar.min.css", { root: '.' })
})

app.get('/word_count.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/word_count.min.css", { root: '.' })
})

app.get('/header.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/header.min.css", { root: '.' })
})

app.get('/icons/style.css', (req, res) => {
    res.type('text/css')
    res.sendFile('src/assets/lucide/css/l.min.css', {root: '.'})
})

app.get('/icons/:icon', (req, res) => {
    res.type('image/svg+xml')
    const icon = req.params.icon
    res.sendFile('src/assets/lucide/used/'+icon+'.svg', {root: '.'})
})

app.listen(5920, () => {
    console.log('Server is running on port 5920')
})

