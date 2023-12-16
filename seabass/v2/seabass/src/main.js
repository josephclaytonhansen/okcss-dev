import { createApp } from 'vue'
import './style.css'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const app = createApp()
app.mount('#app')
app.component('QuillEditor', QuillEditor)


import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap