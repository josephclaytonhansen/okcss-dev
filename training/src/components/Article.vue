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
        width: 400px;
        margin-left: calc(max(15vw, 150px) + 5vw);
    }

</style>