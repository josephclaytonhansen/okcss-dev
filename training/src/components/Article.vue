<script setup>
    import { ref, computed, onMounted } from 'vue'
    const props = defineProps(['currentArticle'])
    import {marked} from 'marked'

    const parsed_content = ref('')

    const getMarkdown = (content) => {
        return marked(content)
    }

    onMounted(() => {
        parsed_content.value = getMarkdown(props.currentArticle.md_content)
    })

</script>

<template>
    <div id = "article">
        <h1>{{currentArticle.title}}</h1>
        <div>{{parsed_content}}</div>
    </div>
</template>

<style scoped>

    #article{
        padding: 1rem;
        width: 400px;
        margin-left: calc(30vw + (70vw - 400px)/2);
    }

</style>