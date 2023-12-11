<script setup>

    const props = defineProps(['articles', 'currentArticle', 'articlePos'])


</script>

<template>
    <div id = "sidebar">
        <div class = "list-group">
            <a v-for = "(article, index) in articles" :key = "index" class = "list-group-item list-group-item-action" :class = "{active: index === articlePos}" @click = "currentArticle = article; articlePos = index">
                {{article.title}}
            </a>
        </div>
    </div>
</template>

<style scoped>

    #sidebar{
        height: 100vh;
        overflow-y: scroll;
        position: sticky;
        top: 0;
        left: 0;
        background-color: #f8f9fa;
        width: 30vw;
        padding: 1rem;
        margin: 0;
    }

</style>
