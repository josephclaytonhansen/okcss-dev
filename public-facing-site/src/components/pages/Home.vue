<script setup>
import { onMounted } from 'vue';


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

function filterWards(wards, filter){
    return wards.filter(ward => !ward.includes(filter))
}

function recentPosts(posts){
    let filteredPosts = posts.filter(post => post.date !== undefined)
    filteredPosts.sort((a,b) => new Date(b.date) - new Date(a.date))
    return filteredPosts.slice(0,3)
}

onMounted(async () => {
    let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', 'https://w.behold.so/widget.js')
      recaptchaScript.setAttribute('type', 'module')
      document.head.appendChild(recaptchaScript)
})

</script>

<template>
    <div class="row align-items-center py-5">
        <div class="col col-md-5 col-12 col-sm-12" id="hero-image">
            <div id="hero-image-inner" />
        </div>
        <div class="col col-1 col-sm-12 col-md-1" id="hero-spacer"></div>
        <div class="col col-md-6 col-sm-12 col-12">
            <h1 id="title" class="mb-0 py-0">
                Join Us to Worship<br /><span id='title-small'>Our Savior Jesus Christ</span>
            </h1>
            <p class="mt-5 hero-text">
                All are welcome. We invite you to join us for Christ-centered worship and study. Learn about the Savior
                in a
                loving community.
            </p>
            <div class="dropdown dropdown-center">
                <a class="btn btn-primary dropdown-toggle" id="hero-button" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Find Your Congregation
                </a>

                <ul class="dropdown-menu">
                    <li v-for = "ward in filterWards(wards, 'OKC 6th Branch')"><a class="dropdown-item" :href="wardURL(weaselLoc, ward)">{{ward}}</a></li>
                    <li><a class = "dropdown-item" :href = "wardURL(weaselLoc, 'OKC 6th Branch')">OKC 6th Branch (en español)</a></li>
                    
                </ul>
            </div>
        </div>
    </div>

    <div id="events-row">
        <div class="row align-items-center justify-content-center bg-dark py-5 mb-2">
            <div class="col col-12" id="events-row-inner">
                <h2 class="text-light py-1 mb-4 row-title">Upcoming Events</h2>
                <div class="row align-items-center justify-content-center flex-wrap" id="events-card-row">

                    <div class="col col-4 card event-card">
                        <div class="square-img-container">
                            <img class="card-img-top square-img placeholder" alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk
                                of
                                the card's content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>

                    <div class="col col-4 card event-card">
                        <div class="square-img-container">
                            <img class="card-img-top square-img placeholder" alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk
                                of
                                the card's content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>

                    <div class="col col-4 card event-card">
                        <div class="square-img-container">
                            <img class="card-img-top square-img placeholder" alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk
                                of
                                the card's content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="row align-items-center py-5" id="beliefs-row">

        <div class="col col-md-6 col-sm-12 col-12">
            <h2 id="beliefs-row-title" class="mb-0 py-0 row-title">
                What Do We Believe?
            </h2>
            <p class="mt-5 hero-text">
                <span class = "lead">Our beliefs are centered around God and Jesus Christ.</span><br><br>We strive to follow the words of God. Learn more
                about what we believe and how our beliefs can inspire you to live a Christ-centered life.
            </p>
            <a id="hero-button" class="btn btn-primary" href="/beliefs">Learn More</a>
        </div>

        <div class="col col-1 col-sm-12 col-md-1" id="hero-spacer"></div>

        <div class="col col-md-5 col-12 col-sm-12" id="hero-image">
            <div id="hero-image-inner" />
        </div>

    </div>

    <div class = "my-3 w-100 d-flex justify-content-center">
        <hr class = "w-50">
    </div>


    <div class="row align-items-center justify-content-center py-5">
        <div class="col col-12">
            <h2 class="text-center row-title mb-4">Follow Our Social Media</h2>
        </div>
        <div class="row align-items-stretch justify-content-center flex-wrap py-2" id="social-media-row">
            <div class="col-12 col-md-6 col-sm-12 socialmedia-card border border-1 border-light-gray" id = "instagram">
                    <figure data-behold-id="9ug8AII6JrLwdEToTRtv"></figure>
                    <a href = "https://www.instagram.com/okcsouthstake/" class = "link w-100 text-center mt-3 d-block">View More</a>
            </div>
            <div class="col-12 col-md-5 col-sm-12 socialmedia-card border border-1 border-light-gray" id = "facebook">
                <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fokcsouthstake&tabs=timeline&width=2200&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&lazy=true&appId" width = "2200" height="500" style="border:none;overflow:hidden;width:100%!important;min-width:100%!important;padding-right:0px;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
            </div>
        </div>
    </div>

    <div id="message-row">
        <div class="row align-items-center justify-content-center py-4" id="message-row-row">
            <div class="col col-12" id="message-row-inner">
                <div class="row">
                    <div class="col col-8 mt-1 col-md-8 col-sm-12">
                        <h4>Service Opportunities in Your Community</h4>
                    </div>
                    <div class="col col-4 col-md-4 col-sm-12">
                        <a class="btn btn-primary" href="/service">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row py-5" id="news-row">
        <div class="col col-12">
            <h2 class="text-center row-title mb-3">News</h2>
            <div class="row align-items-center justify-content-center">
                <div class="col-4 col-md-4 col-sm-12">

                    <div class="square-img-container">
                        <img class="card-img-top square-img placeholder">
                    </div>
                    <div class="card-body py-2">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <a href="#" class="link">Go somewhere</a>
                    </div>

                </div>
                <div class="col-4 col-md-4 col-sm-12">

                    <div class="square-img-container">
                        <img class="card-img-top square-img placeholder">
                    </div>
                    <div class="card-body py-2">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <a href="#" class="link">Go somewhere</a>
                    </div>

                </div>
                <div class="col-4 col-md-4 col-sm-12">

                    <div class="square-img-container">
                        <img class="card-img-top square-img placeholder">
                    </div>
                    <div class="card-body py-2">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's content.</p>
                        <a href="#" class="link">Go somewhere</a>
                    </div>

                    </div>
            </div>
            <a href = "/news" class = "btn btn-primary mt-4 col-3">View More</a>
        </div>
    </div>

</template>

<style scoped>

#instagram {
    height:500px;
    overflow-y:scroll;
}

.event-card{
    padding:1rem;
}

#news-row{
    text-align: center;
}

#message-row-row{
    background-color: #f5f5f5;
}

.row-title{
    font-size:2.4rem;
}

#beliefs-row{
    text-align: right;
}

.square-img-container {
  position: relative;
}

.square-img-container::after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.square-img {
  position: absolute;
  left:0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius:8px;
}

#events-card-row, #social-media-row{
    gap:2rem;
}
#social-media-row .col{
    width: calc(1/2 * 100% - 2rem);
    min-width: 300px;
    min-height:300px;
    border-radius:8px;
}
#events-card-row .card{
    width: calc(1/3 * 100% - 2rem);
    min-width: 300px;
}
#events-row-inner, #message-row-inner{
    width:80vw;
    max-width:1320px;
    margin:auto;
    text-align: center;
}
#events-row, #message-row{
    margin-left:-100vw;
    margin-right:-100vw;
}
.hero-spacer{
    height:100%;
    min-height:3rem;
}
#title{
    font-size:4.2rem;
    line-height:.8;
}
#title-small{
    font-size:2.5rem!important;
    line-height:.8;
}
#hero-image {
width: calc(5/12 * 100%);
display: inline-block;
position: relative;
}
@media screen and (max-width: 768px) {
    #hero-image{
        width:100%;
    }
    #title{
        line-height:1;
    }
}
#hero-image:after {
padding-top: calc(3/4 * 100%);
/* 16:9 ratio */
display: block;
content: '';
}
#hero-image-inner {
border-radius:8px;
position: absolute;
top: 0;
bottom: 0;
right: 0;
left: 0;
/* fill parent */
background-color: gray;
/* let's see it! */
color: white;
}

.hero-text:has(.lead){
    margin-top:1rem!important;
}
</style>