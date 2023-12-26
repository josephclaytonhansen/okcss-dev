<script setup>
    import { ref, reactive, onMounted } from 'vue'
    import {
        contentURLMappings,
        externalURLMappings,
        ig_link,
        fb_link,
        phone,
        email,
        weaselLoc,
        seabassLoc,
        wards,
        blurb,
        blogsPerPage
    } from './plugins/constants.js'

    /* ----------- constants.js should be changed directly or via API ----------- */
    /* ------------------------- Do not modify this file ------------------------ */

    import Toast from './components/Toast.vue'
    import Navbar from './components/Navbar.vue'
    import MobileNavbar from './components/MobileNavbar.vue'
    import Footer from './components/Footer.vue'
    import Main from './components/Main.vue'
    import ColorToggle from './components/ColorToggle.vue'

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
    import PrivacyPolicy from './components/pages/PrivacyPolicy.vue'
    import Blog from './components/pages/Blog.vue'

    const toast = reactive({
        duration: 2000,
        class: "text-bg-info",
        message: "",
    })

    const currentURL = ref(window.location.pathname)
    const currentContent = ref("home")

const getCurrentPage = () => {
    currentURL.value = window.location.pathname.toLowerCase()
    if (currentURL.value.startsWith('/news/')) {
        currentContent.value = 'news-' + r.split('/')[2] 
    } else {
    let r = contentURLMappings[currentURL.value]

    if (r === undefined) {
        r = externalURLMappings[currentURL.value]
        window.location.href = r
        if (r === undefined) {
            window.location.href = "/"
        }
    }} 
    return r
}

onMounted(() => {
    currentContent.value = getCurrentPage()
})

</script>

<template>
    <div id = "app">
        <ColorToggle/>
        <Navbar :wards="wards" :weaselLoc="weaselLoc"/>
        <MobileNavbar :wards="wards" :weaselLoc="weaselLoc"/>
        <Main>
            <Home v-if = "currentContent === 'home'" :wards="wards" :weaselLoc="weaselLoc"/>
            <News v-else-if = "currentContent === 'news'" :seabassLoc="seabassLoc" :itemsPerPage="blogsPerPage"/>
            <ContactUs v-else-if = "currentContent === 'contact-us'"/>
            <Events v-else-if = "currentContent === 'events'"/>
            <Classes v-else-if = "currentContent === 'classes'"/>
            <Beliefs v-else-if = "currentContent === 'beliefs'"/>
            <Missionaries v-else-if = "currentContent === 'missionaries'"/>
            <Service v-else-if = "currentContent === 'service'"/>
            <OKCTemple v-else-if = "currentContent === 'okc-temple'"/>
            <WhatAreTemples v-else-if = "currentContent === 'what-are-temples'"/>
            <PrivacyPolicy v-else-if = "currentContent === 'privacy-policy'"/>
            <Blog v-else-if = "currentContent.startsWith('news-')" :slug="currentContent.split('-')[1]"/>
            <Home v-else/>
        </Main>
        <Toast :toast="toast"/>
        <Footer :wards="wards" :ig_link="ig_link" :fb_link="fb_link" :phone="phone" :email="email" :blurb="blurb" :weaselLoc="weaselLoc"/>
    </div>
</template>

<style scoped>
#app{
    overflow-x:hidden;
}
</style>
