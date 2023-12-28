import './style.css'
import { createApp } from 'vue'
import Main from './components/Main.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@unhead/vue'

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


import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
    // You can set your default options here
};

app.use(Toast, options)

app.use(router)

const head = createHead()
app.use(head)

app.mount('#app')

