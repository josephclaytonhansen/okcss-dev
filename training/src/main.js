import './style.css'
import { createApp } from 'vue'
import VueHead from 'vue-head'
import App from './App.vue'
const app = createApp(
    App
)
app.use(VueHead)
app.mount('#app')
import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap