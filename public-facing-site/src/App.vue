<script setup>
    import { ref, reactive, onMounted } from 'vue'

    /* -------------------- User set or import from database -------------------- */
    const ig_link = ref("https://www.instagram.com/okcsouthstake/")
    const fb_link = ref("https://www.facebook.com/okcsouthstake")
    const phone = ref("405-555-5555")
    const email = ref("contact@okcsouthstake.org")
    const blurb = ref('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl quis tincidunt aliquam, nunc nisl ultrices nunc, quis aliquam nisl nunc vel nisl. Sed euismod, nisl quis tincidunt aliquam, nunc nisl ultrices nunc, quis aliquam nisl nunc vel nisl.')

    const wards = ref(["Choctaw", "Midwest City", "OKC 2nd", "Moore", "OKC 6th Branch", "Mustang 2nd", "Mustang 1st"])

    const blogsPerPage = ref(5);

    const weaselLoc = ref("https://localhost:5186/")
    const seabassLoc = ref("https://localhost:5920/")
    /* -------------------- End user set or import from database -------------------- */

    import Toast from './components/Toast.vue'
    import Navbar from './components/Navbar.vue'
    import MobileNavbar from './components/MobileNavbar.vue'
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

    const toast = reactive({
        duration: 2000,
        class: "text-bg-info",
        message: "",
    })

    const currentURL = ref(window.location.pathname)
    const currentContent = ref("home")

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
        "/missionaries": "missionaries",
        "/service": "service",
        "/service-opportunities": "service",
        "/temple": "okc-temple",
        "/temple-info": "okc-temple",
        "/okc-temple": "okc-temple",
        "/what-are-temples": "what-are-temples",
        "/what-is-a-temple": "what-are-temples",
        "/what-is-the-temple": "what-are-temples",
    }

    const externalURLMappings = {
        "/weasel": weaselLoc.value,
        "/seabass": seabassLoc.value,
        "/instagram": ig_link.value,
        "/facebook": fb_link.value,
        "/phone": "tel:"+phone.value,
        "/email": "mailto:"+email.value,
        "/choctaw": weaselLoc.value+"/choctaw",
        "/midwest-city": weaselLoc.value+"/midwest-city",
        "/okc-2nd": weaselLoc.value+"/okc-2nd",
        "/moore": weaselLoc.value+"/moore",
        "/okc-6th-branch": weaselLoc.value+"/okc-6th-branch",
        "/mustang-2nd": weaselLoc.value+"/mustang-2nd",
        "/mustang-1st": weaselLoc.value+"/mustang-1st",
    }

const getCurrentPage = () => {
    currentURL.value = window.location.pathname.toLowerCase()
    let r = contentURLMappings[currentURL.value]
    if (r === undefined) {
        r = externalURLMappings[currentURL.value]
        window.location.href = r
        if (r === undefined) {
            window.location.href = "/"
        }
    }
    return r
}

onMounted(() => {
    currentContent.value = getCurrentPage()
})

</script>

<template>
    <div id = "app">
        <Navbar :wards="wards" :weaselLoc="weaselLoc"/>
        <MobileNavbar :wards="wards" :weaselLoc="weaselLoc"/>
        <Main>
            <Home v-if = "currentContent === 'home'"/>
            <News v-else-if = "currentContent === 'news'" :seabassLoc="seabassLoc" :itemsPerPage="blogsPerPage"/>
            <ContactUs v-else-if = "currentContent === 'contact-us'"/>
            <Events v-else-if = "currentContent === 'events'"/>
            <Classes v-else-if = "currentContent === 'classes'"/>
            <Beliefs v-else-if = "currentContent === 'beliefs'"/>
            <Missionaries v-else-if = "currentContent === 'missionaries'"/>
            <Service v-else-if = "currentContent === 'service'"/>
            <OKCTemple v-else-if = "currentContent === 'okc-temple'"/>
            <WhatAreTemples v-else-if = "currentContent === 'what-are-temples'"/>
            <Home v-else/>
        </Main>
        <Toast :toast="toast"/>
        <Footer :wards="wards" :ig_link="ig_link" :fb_link="fb_link" :phone="phone" :email="email" :blurb="blurb" :weaselLoc="weaselLoc"/>
    </div>
</template>
