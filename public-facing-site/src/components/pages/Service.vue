<script setup>
import { Head } from '@vueuse/head'
</script>

<template>
    <Head>
        <title>Service Opportunities | OKC South Stake</title>
        <meta name="description" content="Loving God and loving our neighbor are the two great commandments (Matthew 22:37-40). Loving and serving our neighbor is how we can follow the example of Jesus Christ. There are always opportunities to serve—in our homes, our communities, and our world. As we serve those around us, we brighten hearts and lift burdens.">
        <meta property="og:title" content="Service Opportunities | OKC South Stake">
        <meta property="og:description" content="Loving God and loving our neighbor are the two great commandments (Matthew 22:37-40). Loving and serving our neighbor is how we can follow the example of Jesus Christ. There are always opportunities to serve—in our homes, our communities, and our world. As we serve those around us, we brighten hearts and lift burdens.">
        <meta property="og:image" content="https://okcsouthstake.org/assets/Pictures/Service/service.jpg">
        <meta property="twitter:title" content="Service Opportunities | OKC South Stake">
        <meta property="twitter:description" content="Loving God and loving our neighbor are the two great commandments (Matthew 22:37-40). Loving and serving our neighbor is how we can follow the example of Jesus Christ. There are always opportunities to serve—in our homes, our communities, and our world. As we serve those around us, we brighten hearts and lift burdens.">
        <meta property="twitter:image" content="https://okcsouthstake.org/assets/Pictures/Service/service.jpg">
        <meta property="og:url" content="https://okcsouthstake.org/service">
        <meta property="twitter:url" content="https://okcsouthstake.org/service">
        <meta property="og:type" content="article">
        <meta property="keywords" content="service, service opportunities, service opportunities in oklahoma, service opportunities in oklahoma city, christian service opportunities, oklahoma christian service opportunities, just serve, oklahoma just serve">
    </Head>
<div class = "row align-items-center py-5 gy-3" id = 'hero-row'>
        <div class = "col-12 col-md-6 col-sm-12">
            <div class = "square-img-container">
                <img class = "square-img" src = "/assets/Pictures/Service/christ.png"/>
            </div>

        </div>
        <div class = "col-12 col-md-6 col-sm-12">
            <div  class ='content'>
                <h1 id = "">Service Opportunities</h1>
                <p class = "py-2 hero-text">
                    Loving God and loving our neighbor are the two great commandments (Matthew 22:37-40). Loving and serving our neighbor is how we can follow the example of Jesus Christ. There are always opportunities to serve—in our homes, our communities, and our world. As we serve those around us, we brighten hearts and lift burdens.
                </p>
            </div>
        </div>
    </div>

    <hr class = "w-50 mx-auto"/>

    <div class="row align-items-center py-5" id="beliefs-row">

<div class="col col-md-6 col-sm-12 col-12">
    <h2 id="beliefs-row-title" class="mb-0 py-0 row-title">
        JustServe: Our Tool for Local Service
    </h2>
    <p class="mt-5 hero-text">
        <a href = "https://justserve.org">JustServe</a> is a tool that brings together volunteers and organizations that need help. Faith-based organizations, government, nonprofits, and community organizations all need people willing to help. You can make a difference wherever you are.
        <br/><br/>
        Organizations can request volunteers and supplies they need right on JustServe. The community can sign up and show up on their own schedule.
        <br/><br/>
        The Church of Jesus Christ of Latter-Day Saints provides JustServe as a tool to help people follow the example of Jesus Christ and love their neighbor. It provides opportunities to relieve suffering, care for the poor and needy, and improve the quality of life for their community. JustServe is not a tool for proselyting or preaching the gospel. Its only goal is making service accessible for every community.
    </p>
    <a id="hero-button" class="btn btn-primary" href="https://www.justserve.org/signin">Register for JustServe</a>
</div>

<div class="col col-1 col-sm-12 col-md-1" id="hero-spacer"></div>

<div class="col col-md-5 col-12 col-sm-12" id="hero-image">
    <div class = "square-img-container">
                <img class = "square-img" src = "/assets/Pictures/Service/service.jpg"/>
            </div>
</div>

</div>
</template>

<style scoped>
.img-container {
    position: relative;
    height: 100%;
    width: 100%;
}

.img-container:has(.square)::after {
    content: "";
    display: block;
    padding-bottom: 100%;
}

.img-container img.square {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.img-container img {
    object-fit: cover;
    height: 100%;
}

.img-container:has(img.rounded) {
    border-radius: 8px;
}

img.rounded {
    border-radius: 8px;
}

.square-img-container {
    position: relative;
}

.hd-img-container {
    position: relative;
}

.square-img-container::after {
    content: "";
    display: block;
    padding-bottom: 100%;
}

.tall-img-container::after {
    content: "";
    display: block;
    padding-bottom: 150%;
}

.hd-img-container::after {
    content: "";
    display: block;
    padding-bottom: 56%;
}

.square-img {
    position: absolute;
    left: 0%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.img-container {
    position: relative;
    height: 100%;
    width: 100%
}


.img-container img {
    object-fit: cover;
    height: 100%
}

.img-container:has(img.rounded) {
    border-radius: 8px
}
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

</style>