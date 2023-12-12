<script setup>
    import { ref, onMounted, defineProps } from 'vue'
    import Header from './Header.vue'
    import Footer from './Footer.vue'
    import Sidebar from './Sidebar.vue'
    import Article from './Article.vue'
    import axios from 'axios'

    const props = defineProps(['currentArticle'])
    const articles = ref([])
    const currentArticle = ref(props.currentArticle)

    const getArticles = async () => {
        const response = await axios.get('https://weasel.okcsouthstake.org/api/training/')
        return response.data
    }

    onMounted(async () => {
        articles.value = await getArticles()
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