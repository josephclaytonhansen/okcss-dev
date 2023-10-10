<script setup>

import PinEntry from "./PinEntry.vue";
import Reports from "./Reports.vue";

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
            <PinEntry :enteredPin="enteredPin" :comparePin="comparePin"/>
        </div>
        <div v-if = "currentComponent === 'reports'">
            <Reports/>
        </div>
    </div>

</template>
