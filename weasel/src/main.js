import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

const pinia = createPinia()
const app = createApp(App)

app.use(Toast, {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: true,
    draggable: false,
    showCloseButtonOnHover: true,
    hideProgressBar: false,
})

const router = createRouter({
    history: createWebHistory(),
    routes: [],
})

app.use(router)
app.use(pinia)
app.mount('#app')