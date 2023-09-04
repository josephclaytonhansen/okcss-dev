import { defineStore } from 'pinia'

const userStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        async login(data) {
            this.user = data
            sessionStorage.setItem('token', data.auth_token)
        },
        async logout() {
            this.user = null
        }
    },
    persist: true
})

export {userStore}