<script setup>
    import Dashboard from './Dashboard.vue'

    import { useToast } from "vue-toastification"
    const toast = useToast()

    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const username = ref('')
    const password = ref('')
    const currentComponent = ref('login')
    const loginCorrect = ref(false)

    const getLoginFromApi = async () => {
        try {
        const response = await axios.post('https://weasel.okcsouthstake.org/api/seabass/login-check', {username: username.value, password: password.value})
        if (response.status === 200 && response.data['message'] === 'Valid login') {
            loginCorrect.value = true
        } else {
            loginCorrect.value = false
    }} catch (error) {
        toast.error("Login failed")
    }}



    const checkLogin = async () => {
        try{
        let login = await getLoginFromApi()
        if (loginCorrect.value) {
            currentComponent.value = 'dashboard'
        }} catch (error) {
            toast.error("Login failed")
        }
    }



</script>

<template>
    <div>
        <div v-if = "currentComponent === 'login'">
            <div class = "container">
                <div class = "row justify-content-center align-items-center">
                    <div class = "col-auto" style = "height:100vh;overflow-y: hidden;">
                    <div class = "card">
                    <h1>Seabass</h1>
                    <form @submit.prevent = "checkLogin">
                        <label for = "username">Username</label>
                        <input type = "text" id = "username" v-model = "username">
                        <label for = "password">Password</label>
                        <input type = "password" id = "password" v-model = "password">
                        <button type = "submit">Login</button>
                    </form>
                </div>
            </div>
                </div>
            </div>
        </div>
        <div v-if = "currentComponent === 'dashboard'">
            <Dashboard :username = "username" :password="password"/>
        </div>

    </div>

</template>