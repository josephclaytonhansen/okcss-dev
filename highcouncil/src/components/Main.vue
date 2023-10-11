<script setup>

import Reports from "./Reports.vue"

import axios from "axios"
import { ref } from 'vue'
const enteredPin = ref('')
const currentComponent = ref('pin')

const getPinFromApi = async () => {
    const response = await axios.get('https://weasel.okcsouthstake.org/api/hc-reports/pin/get')
    return response.data
}

const comparePin = async () => {
    const pin = await getPinFromApi()
    if (enteredPin.value === pin) {
        currentComponent.value = 'reports'
    }
}

</script>

<template>
    <div>
        <div v-if = "currentComponent === 'pin'">
            <div class = "container d-flex justify-content-center align-items-center" style="height:100vh;">
                <div class = "card p-5" >
                    <div class = "card-body text-center">
                        <h1>High Council Reports</h1>
                        <p class = "fs-4 text-muted">Enter PIN</p>
                        <input type="password" v-model="enteredPin" @keyup="comparePin" class="input-group p-3 fs-2 text-center mx-auto" style = "width:9rem;">
                    </div>
            </div>
        </div>
        </div>
        <div v-if = "currentComponent === 'reports'">
            <Reports/>
        </div>
    </div>

</template>
