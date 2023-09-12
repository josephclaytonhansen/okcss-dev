<script setup>
    import {Instagram, Facebook, Phone, Mail} from 'lucide-vue-next'
    import {ref, reactive} from 'vue'
    const ig_link = ref("https://www.instagram.com/okcsouthstake/")
    const fb_link = ref("https://www.facebook.com/okcsouthstake")
    const year = ref(new Date().getFullYear())

</script>

<template>
    <footer class="d-flex flex-wrap justify-content-center align-items-start py-3 mt-5 my-4 border-top row mx-3 pb-0 mb-0" style = 'overflow:hidden;'>
        <div class="col col-3 text-align-left align-items-start py-3 px-5 mt-1">
            <h1 class = "" style = "line-height:0.5;"><span class="text-center" style = "font-size:84px;line-height:1">OKC</span><br><span style = "font-size:32px">South Stake</span></h1>
            
            <ul class="nav list-unstyled d-flex pt-3">
                <li class="ms-2"><a class="link" href="#"><Instagram/></a></li>
                <li class="ms-2"><a class="link" href="#"><Facebook/></a></li>
                <li class="ms-2"><a class="link" href="#"><Phone/></a></li>
                <li class="ms-2"><a class="link" href="#"><Mail/></a></li>
            </ul>
            <p class = "text mt-3 small">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis tincidunt aliquam, nunc nisl ultrices nunc, quis aliquam nisl nunc vel nisl. Sed euismod, nisl quis tincidunt aliquam, nunc nisl ultrices nunc, quis aliquam nisl nunc vel nisl. 
            </p>
        </div>

        <div class = " col col-4 text-center ">
            <img class = "img-fluid mt-2"  style = "max-height:320px;" src = "https://assets.churchofjesuschrist.org/29/80/2980fa992b83004a4dbe5b471d800452c466ea99/church_jesus_christ_lowfidelity_symbol.png">
            
        </div>

        <div class = "col col-3 py-3 px-5 mt-1">
            <div class = "row align-items-start justify-content-start">
                <div class = "col-6">
                    <h5 class = "w-100 text-muted">Navigation</h5>
                    <menu>
                        <ul class="nav list-unstyled d-flex flex-column w-100" style = "margin-left:-3rem;">
                            <li class="ms-2"><a class="link" href="#">Home</a></li>
                            <li class="ms-2"><a class="link" href="#">About Us</a></li>
                            <li class="ms-2"><a class="link" href="#">Our Beliefs</a></li>
                            <li class="ms-2"><a class="link" href="#">Missionaries</a></li>
                            <li class="ms-2"><a class="link" href="#">Service</a></li>
                            <li class="ms-2"><a class="link" href="#">Contact Us</a></li>
                            <li class="ms-2"><a class="link" href="#">Blog</a></li>
                        </ul>
                    </menu>
                </div>
                <div class = "col-6">
                    <h5 class = "w-100 text-muted">Wards</h5>
                    <menu>
                        <ul class="nav list-unstyled d-flex flex-column w-100" style = "margin-left:-3rem;">
                            <li class="ms-2"><a class="link" href="#">Choctaw</a></li>
                            <li class="ms-2"><a class="link" href="#">Midwest City</a></li>
                            <li class="ms-2"><a class="link" href="#">OKC 2nd</a></li>
                            <li class="ms-2"><a class="link" href="#">Moore</a></li>
                            <li class="ms-2"><a class="link" href="#">OKC 6th Branch</a></li>
                            <li class="ms-2"><a class="link" href="#">Mustang 2nd</a></li>
                            <li class="ms-2"><a class="link" href="#">Mustang 1st</a></li>
                        </ul>
                    </menu>
                </div>
            </div>
        </div>

        <div class = "w-100 text-align-center d-flex flex-wrap justify-content-center align-items-center mt-3">
            <span class="mb-3 mb-md-0 me-2 ms-2 text-muted small border-top py-1" style = "margin-top:.125rem;">
                ©{{year}} Oklahoma City South Stake | OKCSouthStake.org is not edited, reviewed, or maintained by The Church of Jesus Christ of Latter Day Saints.</span>
        </div>
  </footer>
</template>

<style scoped>
</style>