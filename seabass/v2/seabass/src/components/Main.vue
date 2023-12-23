<script setup>
    import Dashboard from './Dashboard.vue'

    import { useToast } from "vue-toastification"
    const toast = useToast()

    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    const username = ref('')
    const password = ref('')
    const seabassData = ref([])
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

    const getDataFromApi = async () => {
        try {
            
        const response = await axios.post('https://weasel.okcsouthstake.org/api/seabass/', 
        {username: username.value, password: password.value})
        return response.data
    } catch (error) {
        toast.error("Error getting data")
    }}

    const checkLogin = async () => {
        try{
        let login = await getLoginFromApi()
        if (loginCorrect.value) {
            currentComponent.value = 'dashboard'
            seabassData.value = await getDataFromApi()
        }} catch (error) {
            toast.error("Login failed")
        }
    }



</script>

<template>
    <div>
        <div v-if = "currentComponent === 'login'">
            <form @submit.prevent = "checkLogin">
                <label for = "username">Username</label>
                <input type = "text" id = "username" v-model = "username">
                <label for = "password">Password</label>
                <input type = "password" id = "password" v-model = "password">
                <button type = "submit">Login</button>
            </form>
        </div>
        <div v-if = "currentComponent === 'dashboard'">
            <Dashboard :blogs="getDataFromApi()"/>
        </div>

    </div>

</template>