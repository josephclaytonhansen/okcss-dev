import { defineStore } from 'pinia'

const userStore = defineStore('user', {
    state: () => ({
        user: null,
    }),
    actions: {
        async login(data) {
            this.user = {
                email: data.email,
                ward: data.ward,
                organization: data.organization
            }
            console.log(this.user)
        },
        async logout() {
            this.user = null
        }
    },
    persist: true
})

export {userStore}