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
    <div class = "tab-row row flex-between wrap">
        <div class = "tab-row-tabs row tab-row-tabs-calendar wrap">
            <div class = "tab calendar-tab" :class = "{activeTab: currentOrganization === 'ward'}" @click = "currentOrganization = 'ward'">
                <div class="tab-overlay calendar-tab-overlay" :class="{active: currentOrganization === 'ward'}"/>
                <h3>Ward</h3>
            </div>
            <div class = "tab calendar-tab" :class = "{activeTab: currentOrganization === 'primary'}" @click = "currentOrganization = 'primary'">
                <div class="tab-overlay calendar-tab-overlay" :class="{active: currentOrganization === 'primary'}"/>
                <h3>Primary</h3>
            </div>
            <div class = "tab calendar-tab" :class = "{activeTab: currentOrganization === 'ywym'}" @click = "currentOrganization = 'ywym'">
                <div class="tab-overlay calendar-tab-overlay" :class="{active: currentOrganization === 'ywym'}"/>
                <h3>YW/YM</h3>
            </div>
            <div class = "tab calendar-tab" :class = "{activeTab: currentOrganization === 'relief society'}" @click = "currentOrganization = 'relief society'">
                <div class="tab-overlay calendar-tab-overlay" :class="{active: currentOrganization === 'relief society'}"/>
                <h3>Relief Society</h3>
            </div>
            <div class = "tab calendar-tab" :class = "{activeTab: currentOrganization === 'elder\'s quorum'}" @click = "currentOrganization = 'elder\'s quorum'">
                <div class="tab-overlay calendar-tab-overlay" :class="{active: currentOrganization === 'elder\'s quorum'}"/>
                <h3>Elder's Quorum</h3>
            </div>
        </div>

    </div>
    <div>
        <div class = "row stretch wrap" id = "calendar-container">
            <div class = "col-4 fwc">
                <Agenda :events="events.ward" :ward="ward"/>
            </div>
            <div class = "col-8 fwc">
                <VCalendar :events="events.ward" :config="config"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
#calendar-container{
    height:auto;
}
</style>