import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

const pinia = createPinia()
const app = createApp(App)

import { ToastPlugin } from './plugins/toast'
app.use(ToastPlugin)

const router = createRouter({
    history: createWebHistory(),
    routes: [],
})

app.use(router)
app.use(pinia)
app.mount('#app')