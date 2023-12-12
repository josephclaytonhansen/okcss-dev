<script setup>
    import { ref } from 'vue'
    import Header from './Header.vue'
    import Footer from './Footer.vue'
    import Sidebar from './Sidebar.vue'
    import Article from './Article.vue'

    import { onMounted, computed } from 'vue'
    import axios from 'axios'
    const articles = ref([])

    const currentArticle = ref('')
    const articlePos = ref(0)

    const getArticles = async () => {
        const response = await axios.get('https://weasel.okcsouthstake.org/api/training/')
        return response.data
    }

    onMounted(async () => {
        articles.value = await getArticles()
        currentArticle.value = articles.value[0]
    })

</script>

<template>
    <div>
        <Header/>
        <div class = "container-fluid">
            <div class = "row">
                <Sidebar :articles="articles" :currentArticle="currentArticle" :articlePos="articlePos"/>
                <Article :currentArticle="currentArticle"/>
            </div>
        </div>
        <Footer/>
    </div>

</template>

<style scoped>

</style>
