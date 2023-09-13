<script setup>
    import {Instagram, Facebook, Phone, Mail} from 'lucide-vue-next'
    import {ref, reactive} from 'vue'
    const year = ref(new Date().getFullYear())

    const props = defineProps({
        wards: Array,
        ig_link: String,
        fb_link: String,
        phone: String,
        email: String,
        blurb: String,
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
    <div class = "container">
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 mt-5 my-4 border-top row mx-3 pb-0 mb-0" style = 'overflow:hidden;width:100%'>

        <div class="col col-lg-6 col-md-12 col-sm-12 text-align-left align-items-start py-3 px-5 mt-1" style = "padding-left:0!important;margin-left:0;">
            <h1 class = "" style = "line-height:0.5;"><span class="text-center" style = "font-size:84px;line-height:1">OKC</span><br><span style = "font-size:32px">South Stake</span></h1>
            <ul class="nav list-unstyled d-flex pt-3">
                <li class="ms-2"><a class="link" :href="ig_link"><Instagram/></a></li>
                <li class="ms-2"><a class="link" :href="fb_link"><Facebook/></a></li>
                <li class="ms-2"><a class="link" href="#"><Phone/></a></li>
                <li class="ms-2"><a class="link" href="#"><Mail/></a></li>
            </ul>
            <p class = "text mt-3 small">
                {{blurb}}
            </p>
        </div>

        <div class = "col col-lg-4 col-md-12 col-sm-12 py-3 px-5 mt-1" style = "margin-right:0;padding-right:0!important;">
            <div class = "row align-items-start justify-content-start">
                <div class = "col-6">
                    <h5 class = "w-100 text-muted">Navigation</h5>
                    <menu>
                        <ul class="nav list-unstyled d-flex flex-column w-100" style = "margin-left:-3rem;">
                            <li class="ms-2"><a class="link" href="/">Home</a></li>
                            <li class="ms-2"><a class="link" href="/contact-us">About Us</a></li>
                            <li class="ms-2"><a class="link" href="/beliefs">Our Beliefs</a></li>
                            <li class="ms-2"><a class="link" href="/missionaries">Missionaries</a></li>
                            <li class="ms-2"><a class="link" href="/service">Service</a></li>
                            <li class="ms-2"><a class="link" href="/news">News</a></li>
                            <li class="ms-2"><a class="link" href="/contact-us">Contact Us</a></li>
                        </ul>
                    </menu>
                </div>
                <div class = "col-lg-6 col-md-12 col-sm-12">
                    <h5 class = "w-100 text-muted">Wards</h5>
                    <menu>
                        <ul class="nav list-unstyled d-flex flex-column w-100" style = "margin-left:-3rem;">
                            <li v-for = "ward in wards" class="ms-2"><a class="link" :href="wardURL(weaselLoc, ward)">{{ward}}</a></li>
                        </ul>
                    </menu>
                </div>
            </div>
        </div>

        <div class = "w-100 text-align-center d-flex flex-wrap justify-content-center align-items-center mt-3 mb-2">
            <span class="mb-3 mb-md-0 me-2 ms-2 text-muted small border-top py-1" style = "margin-top:.125rem;">
                ©{{year}} Oklahoma City South Stake | OKCSouthStake.org is not edited, reviewed, or maintained by <a href = "https://churchofjesuschrist.org">The Church of Jesus Christ of Latter Day Saints.</a></span>
        </div>
  </footer>
</div>
</template>

<style scoped>
</style>