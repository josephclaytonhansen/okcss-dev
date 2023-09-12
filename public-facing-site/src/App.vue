<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
    <div id = "app">
        <Navbar/>
        <div  class = "container">
            <HelloWorld/>
        </div>
    <Footer/>
    </div>
</template>

<style scoped>

</style>
