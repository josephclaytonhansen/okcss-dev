<script setup>
    import { ref, watch } from 'vue'

    const props = defineProps(['currentArticle'])
    const currentArticle = ref(props.currentArticle)

    watch(() => props.currentArticle, (newVal) => {
        currentArticle.value = newVal
    })
    import {marked} from 'marked'

</script>

<template>
    <div id = "article">
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
            margin-left: 5vw;
            width: 90vw;
            height:59vh;
            overflow-y: auto;
        }
    }

</style>