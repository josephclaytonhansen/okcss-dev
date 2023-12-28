import './style.css'
import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import App from './App.vue'
const app = createApp(
    App
)
app.use(createMetaManager())
app.mount('#app')
import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap