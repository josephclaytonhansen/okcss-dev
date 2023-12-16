import './style.css'
import { createApp } from 'vue'

import App from './App.vue'
const app = createApp(
    App
)

app.mount('#app')
import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap

app.component('Quill', QuillEditor)