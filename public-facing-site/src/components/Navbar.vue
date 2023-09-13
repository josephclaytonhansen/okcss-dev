<script setup>
import {ref, reactive} from 'vue'
const events = ref(["Stake events", "Classes"])
const events_links = reactive({'Stake events':"/events", 'Classes':"/classes"})
const temples = ref(["Temple info", "Schedule appointment", "What are temples?"])
const temples_links = reactive({'Temple info':"/okc-temple", 'Schedule appointment':"/schedule-temple-appointment", 'What are temples?':"/what-are-temples"})

const props = defineProps({
    wards: Array,
})

function slugifyWard(ward){
    return ward.toLowerCase().replace(/ /g, "-").replace(/'/g, "")
}

</script>

<template>
    <nav class="navbar border-2 border d-sm-none d-lg-flex d-none">
        <div class="container-fluid align-middle py-0 mt-3 row" style = "flex-direction: row!important;">
            <ul class="navbar-nav me-auto row col-5 mb-3" style = "flex-direction: row!important;">
                <li class="nav-item col-3 text-center">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="">Events</a>
                    <ul class="dropdown-menu"  style = "left:1vw">
                            <li v-for = "event in events"><a class="dropdown-item" :href = "events_links[event]">{{event}}</a></li>
                    </ul>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link" href="/beliefs">Our Beliefs</a>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link" href="/missionaries">Missionaries</a>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link" href="/service">Service</a>
                </li>
            </ul>
            <a class ="navbar-brand col-2" href="/">
                <h1 class = "text-center" style = "line-height:0.5;"><span>OKC</span><br><span class = "fs-6">South Stake</span></h1>
            </a>
            <ul class="navbar-nav me-auto row col-5 mb-3" style = "flex-direction: row!important;">
                <li class="nav-item col-3 text-center">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="">Wards</a>
                    <ul class="dropdown-menu"  style = "left:58.3vw">
                            <li v-for = "ward in wards"><a class="dropdown-item" :href = "slugifyWard(ward)">{{ward}}</a></li>
                            <div class = "dropdown-divider"/>
                            <li class="ms-2"><a class="dropdown-item" href="#">Stake</a></li>
                    </ul>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="">OKC Temple</a>
                    <ul class="dropdown-menu"  style = "left:66.8vw">
                            <li v-for = "temple in temples"><a class="dropdown-item" :href="temples_links[temple]">{{temple}}</a></li>
                    </ul>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link" href="/news">News</a>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link" href="/contact-us">Contact Us</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>

</style>