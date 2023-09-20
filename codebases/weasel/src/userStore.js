import { defineStore } from 'pinia'

const userStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        async login(data) {
            this.user = {email: data.email, organization: data.organization, ward: data.ward}
            localStorage.setItem('token', data.auth_token)
        },
        async logout() {
            this.user = null
        }
    },
    persist: true
})

export {userStore}