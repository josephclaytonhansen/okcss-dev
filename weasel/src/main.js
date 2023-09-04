import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedState from "pinia-plugin-persistedstate"

import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from './userStore'
import App from './App.vue'
import './style.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

export { pinia}

const app = createApp(App)

import { ToastPlugin } from './plugins/toast'
app.use(ToastPlugin)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/weasel', component: () => import('./views/Weasel.vue'), props: (route) => {
            return {ward: 'Moore'}
        } },

        {path: '/:ward', component: () => import('./views/WardWrapper.vue'), props: (route) => {
            let ward = route.params.ward.toLowerCase()
        
            return {ward: ward}
        }},

        { path: '/weasel/login', component: () => import('./views/Login.vue') },
        { path: '/weasel/events', component: () => import('./views/Events.vue') },
        {path: '/weasel/contacts', component: () => import('./views/Contacts.vue')},
        {path: '/weasel/worship', component: () => import('./views/Worship.vue')},
        {path: '/weasel/tools', component: () => import('./views/Tools.vue')},
    ],
})

router.beforeEach(async(to, from, next) => {
    console.log(userStore.user)
    if (to.path.startsWith('/weasel') && !to.path.startsWith('/weasel/login')) {
        if (userStore.user === null || userStore.user === undefined) {
            next('/weasel/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

app.use(router)
app.use(pinia)
app.mount('#app')