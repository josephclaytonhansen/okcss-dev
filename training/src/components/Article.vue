<script setup>
    import { ref, computed } from 'vue'
    const props = defineProps(['currentArticle'])
    import {marked} from 'marked'

</script>

<template>
    <div id = "article">
        <h1>{{currentArticle.title}}</h1>
        <div v-html = "marked(currentArticle.md_content)"></div>
    </div>
</template>

<style scoped>

    #article{
        padding: 1rem;
        width: max(300px, 60vw);
        margin-left: calc(max(15vw, 150px) + 7vw);
    }

    @media (max-width: 768px){
        #article{
            position: absolute;
            top: 5vh;
            left: 0;
            margin-left: 10vw;
            width: 80vw;
            height:50vh;
            overflow-y: auto;
        }
    }

</style>