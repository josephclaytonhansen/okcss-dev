<script setup>

    import Toast from './components/Toast.vue'
    import Navbar from './components/Navbar.vue'
    import Footer from './components/Footer.vue'
    import Main from './components/Main.vue'

    import Home from './components/pages/Home.vue'
    import News from './components/pages/News.vue'
    import ContactUs from './components/pages/ContactUs.vue'
    import Events from './components/pages/Events.vue'
    import Classes from './components/pages/Classes.vue'
    import Beliefs from './components/pages/Beliefs.vue'
    import Missionaries from './components/pages/Missionaries.vue'
    import Service from './components/pages/Service.vue'
    import OKCTemple from './components/pages/OKCTemple.vue'
    import WhatAreTemples from './components/pages/WhatAreTemples.vue'

    import { ref, reactive } from 'vue'

    const ig_link = ref("https://www.instagram.com/okcsouthstake/")
    const fb_link = ref("https://www.facebook.com/okcsouthstake")
    const phone = ref("405-555-5555")
    const email = ref("contact@okcsouthstake.org")
    const blurb = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis tincidunt aliquam, nunc nisl ultrices nunc, quis aliquam nisl nunc vel nisl. Sed euismod, nisl quis tincidunt aliquam, nunc nisl ultrices nunc, quis aliquam nisl nunc vel nisl.')

    const wards = ref(["Choctaw", "Midwest City", "OKC 2nd", "Moore", "OKC 6th Branch", "Mustang 2nd", "Mustang 1st"])

    const toast = reactive({
        duration: 2000,
        class: "text-bg-info",
        message: "",
    })

    const currentURL = ref(window.location.pathname)

    const contentURLMappings = {
        "/": "home",
        "/home": "home",
        "/blog": "news",
        "/news": "news",
        "/about": "contact-us",
        "/contact": "contact-us",
        "contact-us": "contact-us",
        "/calendar": "events",
        "/events": "events",
        "/classes": "classes",
        "/temple-prep": "classes",
        "/self-reliance": "classes",
        "/beliefs": "beliefs",
        "/our-beliefs": "beliefs",
        "/what-we-believe": "beliefs",
        "missionaries": "missionaries",
        "/service": "service",
        "/service-oppurtunities": "service",
        "/temple": "okc-temple",
        "/temple-info": "okc-temple",
        "/okc-temple": "okc-temple",
        "/what-are-temples": "what-are-temples",
        "/what-is-a-temple": "what-are-temples",
        "/what-is-the-temple": "what-are-temples",
    }

const getCurrentPage = () => {
    currentURL.value = window.location.pathname
    return contentURLMappings[currentURL.value]
}


</script>

<template>
    <div id = "app">
        <Navbar :wards="wards"/>
        <Main>
            <Home v-if = "getCurrentPage() === 'home'"/>
            <News v-else-if = "getCurrentPage() === 'news'"/>
            <ContactUs v-else-if = "getCurrentPage() === 'contact-us'"/>
            <Events v-else-if = "getCurrentPage() === 'events'"/>
            <Classes v-else-if = "getCurrentPage() === 'classes'"/>
            <Beliefs v-else-if = "getCurrentPage() === 'beliefs'"/>
            <Missionaries v-else-if = "getCurrentPage() === 'missionaries'"/>
            <Service v-else-if = "getCurrentPage() === 'service'"/>
            <OKCTemple v-else-if = "getCurrentPage() === 'okc-temple'"/>
            <WhatAreTemples v-else-if = "getCurrentPage() === 'what-are-temples'"/>
            <Home v-else/>
        </Main>
        <Toast :toast="toast"/>
        <Footer :wards="wards" :ig_link="ig_link" :fb_link="fb_link" :phone="phone" :email="email" :blurb="blurb"/>
    </div>

</template>

<style scoped>

</style>
