<script setup>
import {ref, reactive} from 'vue'
const events = ref(["Stake events", "Classes"])
const events_links = reactive({'Stake events':"/events", 'Classes':"/classes"})
const temples = ref(["Temple info", "Schedule appointment", "What are temples?"])
const temples_links = reactive({'Temple info':"/okc-temple", 'Schedule appointment':"/schedule-temple-appointment", 'What are temples?':"/what-are-temples"})

const props = defineProps({
    wards: Array,
    weaselLoc: String,
})

function slugifyWard(ward){
    return ward.toLowerCase().replace(/ /g, "-").replace(/'/g, "")
}

function wardURL(weaselLoc, ward){
    return weaselLoc + slugifyWard(ward)
}

</script>

<template>
    <nav class="navbar border-2 border d-md-flex d-lg-none d-flex">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><h3 class = "mt-2">OKC South Stake<br><span class='text-small small text-muted'>of The Church of Jesus Christ of Latter-Day Saints</span></h3></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Navigation</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">

                <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">

                    <li class="nav-item">
                        <a class="nav-link" href="/">Home</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="">Wards</a>
                        <ul class="dropdown-menu">
                                <li v-for = "ward in wards"><a class="dropdown-item" :href = "wardURL(weaselLoc, ward)">{{ward}}</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="">OKC Temple</a>
                        <ul class="dropdown-menu">
                                <li v-for = "temple in temples"><a class="dropdown-item" :href = "temples_links[temple]">{{temple}}</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="">Events</a>
                        <ul class="dropdown-menu">
                                <li v-for = "event in events"><a class="dropdown-item" :href = "events_links[event]">{{event}}</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/beliefs">Our Beliefs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/missionaries">Missionaries</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/service">Service</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="/news">News</a>
                    </li>


                    <li class="nav-item">
                        <a class="nav-link" href="/contact-us">Contact</a>
                    </li>
                    
                </ul>


            </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
</style>