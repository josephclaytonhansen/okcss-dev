import { createApp } from 'vue'
import { createPinia, defineStore } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

const pinia = createPinia()

export const userStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: (self) => ({
        async login(data) {
            self.user = data.user
        },
        async logout() {

        },
    }),
})

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
    if (to.path.startsWith('/weasel')) {
        try{
        let user = await pinia.state.user.user}
        catch(err){
            if (to.path != '/weasel/login'){
            next('/weasel/login')} else {
                next()
            }
        }
        if (!user) {
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