import express from 'express'
const router = express.Router()

router.get('/account.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/account.min.css", {
        root: '.'
    })
})

router.get('/dashboard.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/dashboard.min.css", {
        root: '.'
    })
})

router.get('/calendar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/calendar.min.css", {
        root: '.'
    })
})

router.get('/history_compare.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/history_compare.min.css", {
        root: '.'
    })
})

router.get('/image_upload.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/image_upload.min.css", {
        root: '.'
    })
})

router.get('/stats.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/stats.min.css", {
        root: '.'
    })
})

router.get('/stats.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/stats.min.js", {
        root: '.'
    })
})

router.get('/calendar.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/calendar.min.js", {
        root: '.'
    })
})

router.get('/blog_sidebar.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/blog_sidebar.min.js", {
        root: '.'
    })
})

router.get('/history_compare.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/history_compare.min.js", {
        root: '.'
    })
})

router.get('/dashboard.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/dashboard.min.js", {
        root: '.'
    })
})

router.get('/img/gallery.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/utils/imgs/gallery.min.js", {
        root: '.'
    })
})

router.get('/colors.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/utils/colors/color.min.js", {
        root: '.'
    })
})

router.get('/img/list.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/utils/imgs/img_list.min.js", {
        root: '.'
    })
})

router.get('/img/upload.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/utils/imgs/upload.min.js", {
        root: '.'
    })
})

router.get('/app.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/app.min.css", {
        root: '.'
    })
})

router.get('/lightbox-modal.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/lightbox-modal.min.css", {
        root: '.'
    })
})

router.get('/image/gallery.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/img-gallery-list-view.min.css", {
        root: '.'
    })
})

router.get('/admin_toolbar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/admin_toolbar.min.css", {
        root: '.'
    })
})

router.get('/admin_toolbar.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/admin_toolbar.min.js", {
        root: '.'
    })
})

router.get('/post_list.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/post_list.min.js", {
        root: '.'
    })
})

router.get('/post_list.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/post_list.min.css", {
        root: '.'
    })
})

router.get('/sidebar.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/sidebar.min.css", {
        root: '.'
    })
})

router.get('/word_count.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/word_count.min.css", {
        root: '.'
    })
})

router.get('/header.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/header.min.css", {
        root: '.'
    })
})

router.get('/icons/style.css', (req, res) => {
    res.type('text/css')
    res.sendFile('src/assets/lucide/css/l.min.css', {
        root: '.'
    })
})

router.get('/icons/:icon', (req, res) => {
    res.type('image/svg+xml')
    const icon = req.params.icon
    res.sendFile('src/assets/lucide/used/' + icon + '.svg', {
        root: '.'
    })
})

router.get('/login.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/login.min.css", {
        root: '.'
    })
})

router.get('/editor.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/editor.min.js", {
        root: '.'
    })
})

router.get('/editor.css', (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/editor.min.css", {
        root: '.'
    })
})

router.get('/postFunctions.js', (req, res) => {
    res.type('js')
    res.sendFile("/src/assets/js/postFunctions.min.js", {
        root: '.'
    })
})

export default router