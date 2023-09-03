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
    routes: [
        { path: '/', component: () => import('./App.vue') },
        { path: '/login', component: () => import('./views/Login.vue') },
        { path: '/events', component: () => import('./views/Events.vue') },
        {path: '/contacts', component: () => import('./views/Contacts.vue')},
        {path: '/worship', component: () => import('./views/Worship.vue')},
        {path: '/tools', component: () => import('./views/Tools.vue')},
    ],
})

app.use(router)
app.use(pinia)
app.mount('#app')