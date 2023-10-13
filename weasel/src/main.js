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

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
    // You can set your default options here
};

app.use(Toast, options);

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/weasel',
            component: () => import('./views/Weasel.vue'),
            props: (route) => {
                return {
                    ward: 'Choctaw'
                }
            }
        },
        {
            path: '/',
            component: () => import('./views/Weasel.vue'),
            props: (route) => {
                return {
                    ward: 'Choctaw'
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
            let url = 'https://weasel.okcsouthstake.org/api/users/verify'
            let params = {
                token: token,
                user: user
            }
            try{let response = await axios.post(url, params, config)
                if (response.status === 200) {
                    next()
                } else {
                    localStorage.clear()
                    next('/weasel/login')
                }}
            catch(err){
                localStorage.clear()
                next('/weasel/login')
            }
            
        } else {
            localStorage.clear()
            next('/weasel/login')
        }
    } else {
        next()
    }
})

app.use(router)
app.use(pinia)
app.mount('#app')