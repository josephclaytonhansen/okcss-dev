<script setup>
    import { ref, computed } from 'vue'
    const props = defineProps(['currentArticle'])
    import {marked} from 'marked'
    const markedArticle = computed((c) => {
        return marked(c)
    })

</script>

<template>
    <div id = "article">
        <h1>{{currentArticle.title}}</h1>
        <div>{{markedArticle(currentArticle.md_content)}}</div>
    </div>
</template>

<style scoped>

    #article{
        padding: 1rem;
        width: 400px;
        margin-left: calc(30vw + (70vw - 400px)/2);
    }

</style>