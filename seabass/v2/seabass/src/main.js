import './style.css'
import { createApp } from 'vue'
import Main from './components/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
const app = createApp(
    App
)

import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap

const routes = [
    { path: '/', component: Main },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

app.use(router)

app.mount('#app')

