import {createApp} from "vue"
import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap
import "./style.css"
import App from "./App.vue"
import 'vue-router'
const routes = [
  { path: '/', component: Home },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

app.use(router)

createApp(App).mount("#app")
