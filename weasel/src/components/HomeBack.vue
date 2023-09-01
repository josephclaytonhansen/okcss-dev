<script setup>

import {Home, ArrowBigLeftDash} from 'lucide-vue-next'

const props = defineProps({
    ward: String
})

function GoHome(){

}
function Back(){

}
</script>

<template>
    <button @click="GoHome" class = "lucide-button" id = "home">
        <Home />
    </button>
    <h4 id = "ward-header" :class="ward">{{ ward }}</h4>
</template>

<style>
#home, #back {
    position: fixed;
    top: .25rem;
    z-index: 100;
    transform: scale(75%);
}
#home{
    left: .25rem;
}
#back{
    left: 2.25rem;
}

#ward-header{
    position: fixed;
    top: -.5rem;
    left: 50vw;
    background-color: var(--active-color);
    padding:0.5rem 1rem;
    border-radius:5px;
}

</style>