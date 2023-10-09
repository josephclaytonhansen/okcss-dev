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
            <div class = "tab calendar-tab" :class = "{activeTab: currentOrganization === 'yw'}" @click = "currentOrganization = 'yw'">
                <div class="tab-overlay calendar-tab-overlay" :class="{active: currentOrganization === 'yw'}"/>
                <h3>Young Women's</h3>
            </div>
            <div class = "tab calendar-tab" :class = "{activeTab: currentOrganization === 'ym'}" @click = "currentOrganization = 'ym'">
                <div class="tab-overlay calendar-tab-overlay" :class="{active: currentOrganization === 'ym'}"/>
                <h3>Young Men's</h3>
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
                <div v-if = "currentOrganization === 'ward'">
                    <Agenda :events="events.Ward" :ward="ward"/>
                </div>
                <div v-if = "currentOrganization === 'primary'">
                    <Agenda :events="events.Primary" :ward="ward"/>
                </div>
                <div v-if = "currentOrganization === 'yw'">
                    <Agenda :events="events.yw" :ward="ward"/>
                </div>
                <div v-if = "currentOrganization === 'ym'">
                    <Agenda :events="events.ym" :ward="ward"/>
                </div>
                <div v-if = "currentOrganization === 'relief society'">
                    <Agenda :events="events.rs" :ward="ward"/>
                </div>
                <div v-if = "currentOrganization === 'elder\'s quorum'">
                    <Agenda :events="events.eq" :ward="ward"/>
                </div>

                
                
            </div>
            <div class = "col-8 fwc">
                <VCalendar v-if = "currentOrganization === 'ward'" :events="events.Ward" :config="config"/>
                <VCalendar v-if = "currentOrganization === 'primary'" :events="events.Primary" :config="config"/>
                <VCalendar v-if = "currentOrganization === 'yw'" :events="events.yw" :config="config"/>
                <VCalendar v-if = "currentOrganization === 'ym'" :events="events.ym" :config="config"/>
                <VCalendar v-if = "currentOrganization === 'relief society'" :events="events.rs" :config="config"/>
                <VCalendar v-if = "currentOrganization === 'elder\'s quorum'" :events="events.eq" :config="config"/>
                
            </div>
        </div>
    </div>
</template>

<style scoped>
#calendar-container{
    height:auto;
}
</style>