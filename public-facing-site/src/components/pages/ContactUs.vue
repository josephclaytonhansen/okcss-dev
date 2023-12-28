<script setup>
    import {Mail, CalendarDays, Newspaper, MapPin, HeartHandshake } from 'lucide-vue-next'
    import { ref, reactive, onMounted, watchEffect } from 'vue'
    
    import bioCard from '../page_components/bioCard.vue'

    const meta = reactive({
        title: 'Contact Us | OKC South Stake',
        meta: [
            {
                name: 'description',
                content: 'Contact the Oklahoma City South Stake of The Church of Jesus Christ of Latter-Day Saints.'
            },
            {
                property: 'og:title',
                content: 'Contact Us | OKC South Stake'
            },
            {
                property: 'og:description',
                content: 'Contact the Oklahoma City South Stake of The Church of Jesus Christ of Latter-Day Saints.'
            },
            {
                property: 'og:image',
                content: 'https://okcsouthstake.org/assets/Pictures/ContactUs/hero.png'
            },
            {
                property: 'og:url',
                content: 'https://okcsouthstake.org/contact-us'
            },
            {
                property: 'og:type',
                content: 'website'
            },
            {
                property: 'twitter:title',
                content: 'Contact Us | OKC South Stake'
            },
            {
                property: 'twitter:description',
                content: 'Contact the Oklahoma City South Stake of The Church of Jesus Christ of Latter-Day Saints.'
            },
            {
                property: 'twitter:image',
                content: 'https://okcsouthstake.org/assets/Pictures/ContactUs/hero.png'
            },
            {
                property: 'twitter:url',
                content: 'https://okcsouthstake.org/contact-us'
            },
            {
                property: 'twitter:card',
                content: 'summary_large_image'
            },
        ]
    
    })


onBeforeMount(async () => {
    const internal_missionaries_response = await axios.get('https://weasel.okcsouthstake.org/api/missionaries/internal')
    internal_missionaries.value = internal_missionaries_response.data
    const external_missionaries_response = await axios.get('https://weasel.okcsouthstake.org/api/missionaries/external')
    external_missionaries.value = external_missionaries_response.data
})


watchEffect(() => {
  document.title = meta.title
  meta.meta.forEach(m => {
    let metaEl = document.querySelector(`meta[name="${m.name}"], meta[property="${m.property}"]`)
    if (metaEl) {
      metaEl.setAttribute('content', m.content)
    } else {
      metaEl = document.createElement('meta')
      if (m.name) {
        metaEl.setAttribute('name', m.name)
      }
      if (m.property) {
        metaEl.setAttribute('property', m.property)
      }
      metaEl.setAttribute('content', m.content)
      document.getElementsByTagName('head')[0].appendChild(metaEl)
    }
  })
})
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
                <h1 id = "title-small">We are a regional group of Christian congregations in the Church of Jesus Christ of Latter-Day Saints.</h1>
                <p class = "py-2 hero-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl eget nisl.
                </p>
                <a href = "mailto:communications@okcsouthstake.org" class = "btn btn-primary" aria-label="communications@okcsouthstake.org" data-balloon-pos="right"><Mail/> Email us</a>            
            </div>
        </div>
    </div>

    <hr class = "w-50 mx-auto"/>

    <div class = "row align-items-center py-5 " id = 'leadership-row'>
        <div class = "col-12">
            <h2 class = "text-center">Stake Leadership</h2>
            <div class = "row flex-wrap py-2" id = "bios">
                <bioCard :size="100"/>
                <bioCard :size = '0'/>
                <bioCard :size = '0'/>
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