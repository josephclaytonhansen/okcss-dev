<script setup>

const props = defineProps(['currentArticle'])

</script>

<template>
    <div id = "article">
        <h1>{{currentArticle.title}}</h1>
    </div>
</template>

<style scoped>

    #article{
        padding: 1rem;
        width: 400px;
        margin-left: calc(30vw + (70vw - 400px)/2);
    }

</style>