<script setup>
import {ref, reactive} from 'vue'
const wards = ref(["Choctaw", "Midwest City", "OKC 2nd", "Moore", "OKC 6th Branch", "Mustang 2nd", "Mustang 1st"])
const events = ref(["Stake events", "Classes"])
const temples = ref(["Temple info", "Schedule appointment", "What are temples?"])
</script>

<template>
    <nav class="navbar border-2 border d-sm-none d-lg-flex d-none">
        <div class="container-fluid align-middle py-0 mt-3 row" style = "flex-direction: row!important;">
            <ul class="navbar-nav me-auto row col-5 mb-3" style = "flex-direction: row!important;">
                <li class="nav-item col-3 text-center">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="#">Events</a>
                    <ul class="dropdown-menu"  style = "left:1vw">
                            <li v-for = "event in events"><a class="dropdown-item" href="#">{{event}}</a></li>
                    </ul>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link" href="#">Our Beliefs</a>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link" href="#">Missionaries</a>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link" href="#">Service</a>
                </li>
            </ul>
            <a class ="navbar-brand col-2" href="#">
                <h1 class = "text-center" style = "line-height:0.5;"><span>OKC</span><br><span class = "fs-6">South Stake</span></h1>
            </a>
            <ul class="navbar-nav me-auto row col-5 mb-3" style = "flex-direction: row!important;">
                <li class="nav-item col-3 text-center">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="#">Wards</a>
                    <ul class="dropdown-menu"  style = "left:58.3vw">
                            <li v-for = "ward in wards"><a class="dropdown-item" href="#">{{ward}}</a></li>
                    </ul>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link" href="#">Contact Us</a>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" href="#">OKC Temple</a>
                    <ul class="dropdown-menu"  style = "left:78.3vw">
                            <li v-for = "temple in temples"><a class="dropdown-item" href="#">{{temple}}</a></li>
                    </ul>
                </li>
                <li class="nav-item col-3 text-center">
                    <a class="nav-link" href="#">Blog</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>

</style>