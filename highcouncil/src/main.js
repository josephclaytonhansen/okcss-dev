
import {
    createPinia
} from 'pinia'

import axios from 'axios'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

export {
    pinia
}

import {createApp} from "vue"
import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap
import "./style.css"
import App from "./App.vue"
import {
    createRouter,
    createWebHistory
} from 'vue-router'
const routes = [
  { path: '/', component: Home },
]

const router = createRouter({
    history: createWebHistory(),
    routes: []
})

app.use(router)

createApp(App).mount("#app")
