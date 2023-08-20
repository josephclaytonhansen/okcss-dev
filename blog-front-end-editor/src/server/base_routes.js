import express from 'express'
const router = express.Router()

router.get('/editor.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/editor.min.js", { root: '.' })
})

router.get('/editor.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/editor.min.css", { root: '.' })
})

router.get('/login', (req, res) => {
    res.render('login.html', { root: '.' })
})

router.get('/login.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/login.min.css", { root: '.' })
})

router.get('/dashboard', (req, res) => {
        //eventually, get this from the database
        const user = {
            email: 'served_from@express.app',
            username: 'served_from_express',
        }

        const all_categories = ["blog", "test", "uncategorized"]
    res.render('dashboard.html', { root: '.', date: {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        monthName: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear()
    }, user:user, all_categories:all_categories })
})

router.get('/account', (req, res) => {
    //eventually, get this from the database
    const user = {
        email: 'served_from@express.app',
        username: 'served_from_express',
        password: 'password',
        picture: 'https://unsplash.it/1000/450/?random?',
        bio: 'I am a user served from express. This is my bio. As a placeholder, I have little else to say.',
        display_name: 'Served F. Express',
    }
    const date = {
        day: new Date().getDate(),
        month: new Date().getMonth(),
        monthName: new Date().toLocaleString('default', { month: 'long' }),
        year: new Date().getFullYear()
    }
    
    res.render('account.html', { root: '.', user:user, date:date })

})

router.get('/account.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/account.min.css", { root: '.' })
})

router.get('/dashboard.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/dashboard.min.css", { root: '.' })
})

router.get('/calendar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/calendar.min.css", { root: '.' })
})

router.get('/calendar.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/calendar.min.js", { root: '.' })
})

router.get('/dashboard.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/dashboard.min.js", { root: '.' })
})

router.get('/img/gallery.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/utils/imgs/gallery.min.js", { root: '.' })
})
router.get('/img/list.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/utils/imgs/img_list.min.js", { root: '.' })
})

router.get('/app.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/app.min.css", { root: '.' })
})

router.get('/lightbox-modal.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/lightbox-modal.min.css", { root: '.' })
})

router.get('/image/gallery.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/img-gallery-list-view.min.css", { root: '.' })
})

router.get('/admin_toolbar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/admin_toolbar.min.css", { root: '.' })
})

router.get('/admin_toolbar.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/admin_toolbar.min.js", { root: '.' })
})

router.get('/post_list.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/post_list.min.js", { root: '.' })
})

router.get('/post_list.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/post_list.min.css", { root: '.' })
})

router.get('/sidebar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/sidebar.min.css", { root: '.' })
})

router.get('/word_count.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/word_count.min.css", { root: '.' })
})

router.get('/header.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/header.min.css", { root: '.' })
})

router.get('/icons/style.css', (req, res) => {
    res.type('text/css')
    res.sendFile('src/assets/lucide/css/l.min.css', {root: '.'})
})

router.get('/icons/:icon', (req, res) => {
    res.type('image/svg+xml')
    const icon = req.params.icon
    res.sendFile('src/assets/lucide/used/'+icon+'.svg', {root: '.'})
})

export default router