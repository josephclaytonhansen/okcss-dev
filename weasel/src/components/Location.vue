<script setup>

import Image from './Image.vue'

const props = defineProps({
    ward: String,
    location: {
            address: String,
            city: String,
            state: String,
            zip: String,
            phone: String
        },
        time: String,
        googleMapsLink: String,
        image: {
            src: String,
            alt: String,
            width: String,
            class: String
        }
})

</script>

<template>
    <div class = "row parent wrap">
        <div class = "left column flex-evenly col-4 fwc">
            <div class = "img-cw">
                <Image :src="image.src" :alt="image.alt" :width="image.width" :class="image.class"/>
            </div>
            <div class = "loc-text">
                <h2 id = "time">We meet at {{ time }} on Sundays</h2>
                <hr style = "margin-bottom:1rem;" />
                <p id = "address"> {{ location.address }} </p>
                <p id = "cs"> {{ location.city }}, {{ location.state }} </p>
                <p id = "zip"> {{ location.zip }} </p>
                <p>Questions? Call or text a representative of this building at {{ location.phone }}</p>
            </div>
        </div>
        <div class = "right col-8 fwc">
            <div class = 'google-maps'>
                <iframe
                    width="100%"
                    height="100%"
                    frameborder="0" style="border:0"
                    :src="googleMapsLink" allowfullscreen>
                </iframe>
            </div>
        </div>
    </div>
</template>

<style>

.parent {
min-height:78vh;
padding-bottom:2vh;
height:100%;
gap:2rem!important;
align-items: stretch!important;

}

.left {
    background-color: var(--active-color);
    width:100%;
    min-height:80%;
    border-radius:5px;
 }

.img-cw{
    border-radius:5px;
    height: 50%;
    width: auto;
}

.img-cw img{
    border-radius:5px;
}

.loc-text{
    text-align:center;
    color: var(--off-white)
}

#time, #address, #cs, #zip{
    font-size:200%;
    color: white;
    margin: 0;
}

#address, #cs, #zip{
    font-size:125%;
}

.google-maps{
    height:100%;
    border-radius:5px;
    min-height:500px;
}


</style>