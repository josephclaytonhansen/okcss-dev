<script setup>
    import { ref } from 'vue'
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'
    import Sidebar from './components/Sidebar.vue'
    import Article from './components/Article.vue'

    import { onMounted, computed } from 'vue'
    import axios from 'axios'
    const articles = ref([])

    const currentArticle = ref('')
    const articlePos = ref(0)

    const getArticles = async () => {
        const response = await axios.post('https://weasel.okcsouthstake.org/api/trainings/')
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
