<script setup>
    import Dashboard from './Dashboard.vue'

    import { ref } from 'vue'

    const username = ref('')
    const password = ref('')
    const seabassData = ref([])
    const currentComponent = ref('login')
    const loginCorrect = ref(false)

    const getLoginFromApi = async () => {
        const response = await axios.post('https://weasel.okcsouthstake.org/api/seabass-login-check', {username: username.value, password: password.value})
        if (response.status === 200 && response.data['message'] === 'Valid login') {
            loginCorrect.value = true
        } else {
            loginCorrect.value = false
    }}

    const getDataFromApi = async () => {
        const response = await axios.get('https://weasel.okcsouthstake.org/api/seabass/data')
        return response.data
    }

    const checkLogin = async () => {
        let login = await getLoginFromApi()
        if (loginCorrect.value) {
            currentComponent.value = 'dashboard'
            seabassData.value = await getDataFromApi()
        }
    }

    import { useToast } from "vue-toastification"
    const toast = useToast()

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
            <Dashboard/>
        </div>

    </div>

</template>