<script setup>
    import { ref, computed } from 'vue'
    const props = defineProps(['currentArticle'])
    import {marked} from 'marked'
    const markedArticle = computed(() => {
        return marked(currentArticle.value.md_content)
    })

</script>

<template>
    <div id = "article">
        <h1>{{currentArticle.title}}</h1>
        <div v-html="markedArticle"></div>
    </div>
</template>

<style scoped>

    #article{
        padding: 1rem;
        width: 400px;
        margin-left: calc(30vw + (70vw - 400px)/2);
    }

</style>