<script setup>
    import { ref, onMounted, defineProps } from 'vue'
    import Header from './Header.vue'
    import Footer from './Footer.vue'
    import Sidebar from './Sidebar.vue'
    import Article from './Article.vue'
    import axios from 'axios'

    const props = defineProps(['currentArticle'])
    const articles = ref([])
    const currentArticle = ref(null)

    const getArticles = async () => {
        const response = await axios.get('https://weasel.okcsouthstake.org/api/training/')
        return response.data
    }

    const slugify = (text) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '')             // Trim - from end of text
    }

    onMounted(async () => {
        articles.value = await getArticles()
        currentArticle.value = articles.value.find(article => article.title === 'Introduction')
        if (window.location.search) {
            let slug = window.location.search.split('=')[1]
            let articleSlug = slugify(currentArticle.title)
            currentArticle.value = articles.value.find(article => articleSlug === slug)
        }
    })
</script>

<template>
    <div>
        <Header/>
        <div class="container-fluid">
            <div class="row">
                <Article :currentArticle="currentArticle"/>
                <Sidebar :articles="articles" :currentArticle="currentArticle" @response="currentArticle = $event"/>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<style scoped>

</style>