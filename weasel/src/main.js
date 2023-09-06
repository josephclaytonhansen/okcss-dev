import {
    createApp
} from 'vue'
import {
    createPinia
} from 'pinia'

import piniaPluginPersistedState from "pinia-plugin-persistedstate"

import {
    createRouter,
    createWebHistory
} from 'vue-router'
import {
    userStore
} from './userStore'
import App from './App.vue'
import './style.css'
import axios from 'axios'

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

export {
    pinia
}

const app = createApp(App)

import {
    ToastPlugin
} from './plugins/toast'
app.use(ToastPlugin)

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/weasel',
            component: () => import('./views/Weasel.vue'),
            props: (route) => {
                return {
                    ward: 'Moore'
                }
            }
        },

        {
            path: '/:ward',
            component: () => import('./views/WardWrapper.vue'),
            props: (route) => {
                let ward = route.params.ward.toLowerCase()

                return {
                    ward: ward
                }
            }
        },

        {
            path: '/weasel/login',
            component: () => import('./views/Login.vue')
        },

    ],
})

router.beforeEach(async (to, from, next) => {
    let user = localStorage.getItem('user')
    if (to.path.startsWith('/weasel') && !to.path.startsWith('/weasel/login')) {

        let token = localStorage.getItem('token')
        
        if (token && user) {
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }
            let url = 'http://localhost:5220/api/users/verify'
            let params = {
                token: token,
                user: user
            }
            try{let response = await axios.post(url, params, config)
                if (response.status === 200) {
                    next()
                } else {
                    next('/weasel/login')
                }}
            catch(err){next('/weasel/login')}
            
        } else {
            next('/weasel/login')
        }
    } else {
        next()
    }
})

app.use(router)
app.use(pinia)
app.mount('#app')