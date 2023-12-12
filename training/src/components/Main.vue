<script setup>
    import { ref, watch } from 'vue'
    import Header from './Header.vue'
    import Footer from './Footer.vue'
    import Sidebar from './Sidebar.vue'
    import Article from './Article.vue'

    import { onMounted, computed } from 'vue'
    import axios from 'axios'
    const articles = ref([])

    const currentArticle = ref('Introduction')

    const getArticles = async () => {
        const response = await axios.get('https://weasel.okcsouthstake.org/api/training/')
        return response.data
    }

    onMounted(async () => {
        articles.value = await getArticles()
        currentArticle.value = articles.value[0]
    })

    watch(() => currentArticle.value, (newVal, oldVal) => {
        console.log(oldVal, newVal)
        const foundArticle = articles.value.find(article => article.title === newVal)
        currentArticle.value = foundArticle
    })

</script>

<template>
    <div>
        <Header/>
        <div class = "container-fluid">
            <div class = "row">
                <Article :currentArticle="currentArticle"/>
                <Sidebar :articles="articles" :currentArticle="currentArticle" @response="(title) => currentArticle.value = title"/>
            </div>
        </div>
        <Footer/>
    </div>

</template>

<style scoped>

</style>
