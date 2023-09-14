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
    <nav class="navbar border-2 border d-sm-none d-lg-flex d-none" id = 'navbar'>
        <div class="container-fluid align-middle py-0 mt-3 row fd-row">
            <ul class="navbar-nav me-auto row col-5 mb-3 fd-row">
                <li class="nav-item col-3 text-center">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="">Events</a>
                    <ul class="dropdown-menu" id = "dd1">
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
                <h1 class = "text-center" style = "line-height:0.5;"><span>OKC</span><br><span class = "fs-6">South Stake</span><br><span style = "font-size: 25%;text-align: center;" class="text-muted">The Church of Jesus Christ of Latter-Day Saints</span></h1>
            </a>
            <ul class="navbar-nav me-auto row col-5 mb-3 fd-row">
                <li class="nav-item col-3 text-center">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="">Wards</a>
                    <ul class="dropdown-menu" id = "dd2">
                            <li v-for = "ward in wards"><a class="dropdown-item" :href = "wardURL(weaselLoc, ward)">{{ward}}</a></li>
                            <div class = "dropdown-divider"/>
                            <li class="ms-2"><a class="dropdown-item" href="/stake">Stake</a></li>
                    </ul>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="">OKC Temple</a>
                    <ul class="dropdown-menu" id = "dd3">
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
#navbar{
    width:100.5%;
}
.dropdown-menu.show{
  position:fixed;
  top: 7%;
}
.fd-row{
    flex-direction: row!important;
}

#dd1{
    left: 1vw!important;
}

#dd2{
    left: 58.3vw!important;
}

#dd3{
    left: 66.8vw!important;
}

</style>