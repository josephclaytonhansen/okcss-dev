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
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '')
    }

    onMounted(async () => {
        articles.value = await getArticles()
        
        if (window.location.search) {
            let slug = window.location.search.split('=')[1]
            currentArticle.value = articles.value.find(article => slugify(article.title) === slug)
        } else {
            currentArticle.value = articles.value.find(article => article.title === 'Introduction')

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