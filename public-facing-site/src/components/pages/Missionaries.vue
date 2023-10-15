<script setup>
const internal_missionaries = ref([])
const external_missionaries = ref([])
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
onBeforeMount(async () => {
    const internal_missionaries_response = await axios.get('https://weasel.okcsouthstake.org/api/missionaries/internal')
    internal_missionaries.value = internal_missionaries_response.data
    const external_missionaries_response = await axios.get('https://weasel.okcsouthstake.org/api/missionaries/external')
    external_missionaries.value = external_missionaries_response.data
})
</script>

<template>
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

    <div class = "row align-items-center py-5 gy-3">
        <h2 id = "title" class = "text-center">Missionaries in the Stake</h2>
        <p class = "text-center">We have missionaries from around the country and the world serving in our area.</p>
        
            <div class = "row gy-3" id = "bios">
                <div v-for = "missionary in internal_missionaries" class = "col-6 col-sm-6 col-md-3">
                    <h4 id = "title-small" class = "text-center">{{missionary.ward}}</h4>
                    <p class = "text-center">{{missionary.phone}}</p>
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