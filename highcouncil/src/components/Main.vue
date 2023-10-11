<script setup>

import Reports from "./Reports.vue"

import axios from "axios"
import { ref } from 'vue'
const enteredPin = ref('')
const currentComponent = ref('pin')

const reportsData = ref([])

const getPinFromApi = async () => {
    const response = await axios.get('https://weasel.okcsouthstake.org/api/hc-reports/pin/get')
    return response.data
}

const getReportsFromApi = async () => {
    const response = await axios.get('https://weasel.okcsouthstake.org/api/hc-reports/')
    return response.data
}

const comparePin = async () => {
    enteredPinLength.value = enteredPin.value.length
    const pin = await getPinFromApi()
    if (enteredPin.value === pin) {
        currentComponent.value = 'reports'
        reportsData.value = await getReportsFromApi()
    }
}

const enteredPinLength = ref(0)

</script>

<template>
    <div>
        <div v-if = "currentComponent === 'pin'">
            <div class = "container d-flex justify-content-center align-items-center" style="height:100vh;">
                <div class = "card p-4" >
                    <div class = "card-body text-center">
                        <h1>High Council Reports</h1>
                        <p class = "fs-4 text-muted">Enter PIN</p>
                        <input v-model="enteredPin" @keyup="comparePin" class="input-group py-2 fs-5 text-center mx-auto" style = "width:7rem;">
                        <p class = "text-muted text-small mt-2">{{enteredPinLength.valueOf()}}/6</p>
                    </div>
            </div>
        </div>
        </div>
        <div v-if = "currentComponent === 'reports'">
            <Reports :reports="reportsData"/>
        </div>
    </div>

</template>
