import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import _get from './dataController.js'
import './style.css'

const pinia = createPinia()
const app = createApp(App)

import { ToastPlugin } from './plugins/toast'
app.use(ToastPlugin)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('./views/Home.vue'), props: (route) => {
            return {}
        } },

        {path: '/:ward', component: () => import('./components/Ward.vue'), props: (route) => {
            let ward = route.params.ward.toLowerCase()
            ward = ward.replace(/\b\w/g, l => l.toUpperCase())
            tools = _get(ward, 'tools').then(res => {return res})
            events = _get(ward, 'events').then(res => {return res})
            worship = _get(ward, 'worships').then(res => {return res})
            contacts = _get(ward, 'persons').then(res => {return res})
            return {
            ward: ward,
            tools: tools,
            events: events,
            worship: {
                location: {
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                    phone: ''
                },
                time: '',
                googleMapsLink: '',
                image: {
                    src: '',
                    alt: '',
                    width: '',
                    class: ''
                }
            },
            organizations: ['Bishopric', 'Elder\'s Quorum', 'Relief Society', 'Primary', 'Young Women\'s', 'Young Men\'s'],
            contacts: []
        }
        }},

        { path: '/weasel/login', component: () => import('./views/Login.vue') },
        { path: '/weasel/events', component: () => import('./views/Events.vue') },
        {path: '/weasel/contacts', component: () => import('./views/Contacts.vue')},
        {path: '/weasel/worship', component: () => import('./views/Worship.vue')},
        {path: '/weasel/tools', component: () => import('./views/Tools.vue')},
    ],
})

app.use(router)
app.use(pinia)
app.mount('#app')