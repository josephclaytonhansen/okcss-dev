import './style.css'
import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
const app = createApp()
const head = createHead()
app.use(head)
app.mount('#app')
import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap