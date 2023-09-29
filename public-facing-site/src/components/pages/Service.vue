<script setup>
</script>

<template>
<div class = "row align-items-center py-5 gy-3" id = 'hero-row'>
        <div class = "col-12 col-md-6 col-sm-12">
            <div class = "hd-img-container">
                <img class = "square-img" src = "https://picsum.photos/200/300"/>
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
    <div class = "hd-img-container">
                <img class = "square-img" src = "https://picsum.photos/200/300"/>
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