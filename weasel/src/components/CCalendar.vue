<script setup>
    import {  ref } from 'vue'
    import VCalendar from './VCalendar.vue'
    import Agenda from './Agenda.vue'
    const props = defineProps({
        events: Object,
        config: Object,
        ward: String,
    })
    const currentOrganization = ref('ward')

    const changeOrganization = (org) => {
        currentOrganization.value = org
    }
</script>

<template>
    <div>
        <div class = "row stretch wrap">
            <div class = "col-4 fwc">
                <Agenda :events="events.ward" :ward="ward"/>
            </div>
            <div class = "col-8 fwc">
                <VCalendar :events="events.ward" :config="config"/>
            </div>
        </div>
    </div>
</template>

<style>
</style>