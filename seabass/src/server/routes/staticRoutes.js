import express from 'express'
const router = express.Router()
import pkg from 'memory-cache'
const mcache = pkg

var cache = (duration) => {
    return (req, res, next) => {
      let key = '__express__' + req.originalUrl || req.url
      let cachedBody = mcache.get(key)
      if (cachedBody) {
        res.send(cachedBody)
        return
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          mcache.put(key, body, duration * 10000);
          res.sendResponse(body)
        }
        next()
      }
    }
  }

router.get('/account.css', cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/account.min.css", {
        root: '.'
    })
})

router.get('/dashboard.css',cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/dashboard.min.css", {
        root: '.'
    })
})

router.get('/calendar.css',cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/calendar.min.css", {
        root: '.'
    })
})

router.get('/history_compare.css',cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/history_compare.min.css", {
        root: '.'
    })
})

router.get('/image_upload.css',cache(60), (req, res) => {
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

router.get('/stats.js',cache(60), (req, res) => {
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

router.get('/blog_sidebar.js',cache(60), (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/blog_sidebar.min.js", {
        root: '.'
    })
})

router.get('/history_compare.js',cache(60), (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/history_compare.min.js", {
        root: '.'
    })
})

router.get('/dashboard.js',cache(60), (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/dashboard.min.js", {
        root: '.'
    })
})

router.get('/img/gallery_list_lightbox.js',cache(60), (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/utils/imgs/gallery_list_lightbox.min.js", {
        root: '.'
    })
})

router.get('/colors.js', cache(60),(req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/utils/colors/color.min.js", {
        root: '.'
    })
})

router.get('/img/list.js',cache(60), (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/utils/imgs/img_list.min.js", {
        root: '.'
    })
})

router.get('/img/upload.js',cache(60), (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/utils/imgs/upload.min.js", {
        root: '.'
    })
})

router.get('/app.css',cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/app.min.css", {
        root: '.'
    })
})

router.get('/lightbox-modal.css',cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/lightbox-modal.min.css", {
        root: '.'
    })
})

router.get('/image/gallery.css', cache(60),(req, res) => {
    res.type('css')
    res.sendFile("/src/assets/css/img-gallery-list-view.min.css", {
        root: '.'
    })
})

router.get('/admin_toolbar.css',cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/admin_toolbar.min.css", {
        root: '.'
    })
})

router.get('/admin_toolbar.js',cache(60), (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/admin_toolbar.min.js", {
        root: '.'
    })
})

router.get('/post_list.js',cache(60), (req, res) => {
    res.type('js')
    res.sendFile("/src/includes/js/post_list.min.js", {
        root: '.'
    })
})

router.get('/post_list.css',cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/post_list.min.css", {
        root: '.'
    })
})

router.get('/sidebar.css',cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/sidebar.min.css", {
        root: '.'
    })
})

router.get('/word_count.css',cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/word_count.min.css", {
        root: '.'
    })
})

router.get('/header.css',cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/includes/css/header.min.css", {
        root: '.'
    })
})

router.get('/icons/style.css',cache(60), (req, res) => {
    res.type('text/css')
    res.sendFile('src/assets/lucide/css/l.min.css', {
        root: '.'
    })
})

router.get('/icons/:icon',cache(60), (req, res) => {
    res.type('image/svg+xml')
    const icon = req.params.icon
    res.sendFile('src/assets/lucide/used/' + icon + '.svg', {
        root: '.'
    })
})

router.get('/login.css',cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/login.min.css", {
        root: '.'
    })
})

router.get('/editor.js',cache(60), (req, res) => {
    res.type('js')
    res.sendFile("/src/views/js/editor.min.js", {
        root: '.'
    })
})

router.get('/editor.css',cache(60), (req, res) => {
    res.type('css')
    res.sendFile("/src/views/css/editor.min.css", {
        root: '.'
    })
})

router.get('/postFunctions.js',cache(60), (req, res) => {
    res.type('js')
    res.sendFile("/src/assets/js/postFunctions.min.js", {
        root: '.'
    })
})

export default router