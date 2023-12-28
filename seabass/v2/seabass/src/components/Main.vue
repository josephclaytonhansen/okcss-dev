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
                    <div class = "col-10 col-sm-8 col-md-7 row justify-content-center align-items-center" style = "height:100vh;overflow-y: hidden;">
                    <div class = "card p-5">
                    <h1 class = "center text-center">Seabass</h1>
                    <hr/>
                    <form @submit.prevent = "checkLogin">
                        <div class = "form-group row align-items-center">
                            <label for = "username" class = "col-3">Username</label>
                            <input type = "text" class = "my-3 col-9" id = "username" v-model = "username">
                        </div>
                        <div class = "form-group row align-items-center">
                            <label for = "password" class = "col-3">Password</label>
                            <input type = "password" class = "form-control my-3 col-9" id = "password" v-model = "password">
                        </div>
                        <div class = "row">
                        <button type = "submit" class = "btn btn-primary my-3 col-12">Login</button>
                    </div>
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