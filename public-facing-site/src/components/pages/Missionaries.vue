<script setup>
const internal_missionaries = ref([])
const external_missionaries = ref([])
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import { Head } from '@vueuse/head'
onBeforeMount(async () => {
    const internal_missionaries_response = await axios.get('https://weasel.okcsouthstake.org/api/missionaries/internal')
    internal_missionaries.value = internal_missionaries_response.data
    const external_missionaries_response = await axios.get('https://weasel.okcsouthstake.org/api/missionaries/external')
    external_missionaries.value = external_missionaries_response.data
})
</script>

<template>
    <Head>
        <title>Meet the Missionaries | OKC South Stake</title>
        <meta name="description" content="Meet the missionaries serving in the Oklahoma City South Stake of The Church of Jesus Christ of Latter-Day Saints.">
        <meta property="og:title" content="Meet the Missionaries | OKC South Stake">
        <meta property="og:description" content="Meet the missionaries serving in the Oklahoma City South Stake of The Church of Jesus Christ of Latter-Day Saints.">
        <meta property="og:image" content="https://okcsouthstake.org/assets/Pictures/Missionaries/hero.png">
        <meta property="og:url" content="https://okcsouthstake.org/missionaries">
        <meta property="og:type" content="website">
        <meta property="twitter:title" content="Meet the Missionaries | OKC South Stake">
        <meta property="twitter:description" content="Meet the missionaries serving in the Oklahoma City South Stake of The Church of Jesus Christ of Latter-Day Saints.">
        <meta property="twitter:image" content="https://okcsouthstake.org/assets/Pictures/Missionaries/hero.png">
        <meta property="twitter:url" content="https://okcsouthstake.org/missionaries">
        <meta property="twitter:card" content="summary_large_image">
        <meta property="keywords" content="missionaries, missionaries in oklahoma, missionaries in oklahoma city, christian missionaries, oklahoma christian missionaries">
    </Head>
    <div class = "row align-items-center py-5 gy-3" id = 'hero-row'>
        <div class = "col-12 col-md-6 col-sm-12">
            <div class = "square-img-container">
                <img class = "square-img" src = "/assets/Pictures/Missionaries/hero.png"/>
            </div>
        </div>
        <div class = "col-12 col-md-6 col-sm-12">
            <div  class ='content'>
                <h1 id = "title-small"><a href = 'https://www.churchofjesuschrist.org/comeuntochrist/requests/missionary-visit'>Meet the Missionaries</a></h1>
                <p class = "py-2 hero-text">
                    Just as Christ and his apostles spread the gospel in their time, we spread the gospel now. The Church of Jesus Christ of Latter-Day Saints has over 72,000 volunteer missionaries serving around the world. Each missionary sets aside their personal life, work, and school for up to two years to preach the gospel. 

                </p>
            </div>
        </div>
    </div>

    <hr class = "w-50 mx-auto"/>

    <div class = "row align-items-center py-5 ">
        <h2 id = "title" class = "text-center">Missionaries in the Stake</h2>
        <p class = "text-center">We have missionaries from around the country and the world serving in our area.</p>
        
            <div class = "row" id = "bios justify-content-center">
                <div v-for = "missionary in internal_missionaries" class = "col-6 col-sm-6 col-md-3">
                    <h4 id = "title-small" class = "text-center">{{missionary.ward}}</h4>
                    <p class = "text-center"><a
                    :href = "'tel:' + missionary.phone">{{missionary.phone}}</a></p>
                </div>
            </div>

    </div>

    <hr class = "w-50 mx-auto"/>

    <div class = "row align-items-center py-5 ">
        <h2 id = "title" class = "text-center">Missionaries from the Stake</h2>
        <p class = "text-center">Missionaries serving from the Oklahoma City area have been sent around the world.<br> They have limited communication with their family and friends, so email is always appreciated.</p>
        
            <div class = "row" id = "bios justify-content-center">
                <div v-for = "missionary in external_missionaries" class = "col-12 col-sm-6 col-md-3">
                    <h4 id = "title-small" class = "text-center">{{missionary.name}}</h4>
                    <h5 class = "text-muted text-center">{{missionary.location.city}} {{missionary.location.state}} {{ missionary.location.country }} </h5>
                    <p class = "text-center"><a
                    :href = "'mailto:' + missionary.email">{{missionary.email}}</a></p>
                </div>
            </div>
            
    </div>

</template>

<style scoped>
    #bios{
        gap:1rem;
        justify-content: stretch;
    }
    .content{
        padding-left:2rem;
        width: calc(100% - 2rem);

    }
    #title{
        font-size:3.2rem;
    }
    #title-small{
        font-size:1.6rem!important;
    }

    @media screen and (max-width: 768px) {
        #title{
            line-height:1;
        }
    }
    .square-img-container {
    position: relative;
    }

    .hd-img-container{
        position:relative;
    }

    .square-img-container::after {
    content: "";
    display: block;
    padding-bottom: 100%;
    }

    .hd-img-container::after{
        content: "";
        display: block;
        padding-bottom: 56%;
    }

    .square-img {
    position: absolute;
    left:0%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius:8px;
    }
</style>