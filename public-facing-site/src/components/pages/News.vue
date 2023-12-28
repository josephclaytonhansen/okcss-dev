<script setup>
import {ref, reactive, onMounted} from 'vue'
import BlogCard from '../page_components/blogCard.vue'
import axios from 'axios'

const posts = ref([])

const working_posts = ref([])

const props = defineProps({
    seabassLoc: String,
    itemsPerPage: Number
})

const getDataFromApi = async () => {
        try {
            
        const response = await axios.post('https://weasel.okcsouthstake.org/api/seabass/')
        if (response.status === 200) {
            return response.data
        } else {
            console.log("Error getting data")
        }
    } catch (error) {
        console.log("Error getting data")
    }}

const currentPage = ref(1);

const allCategories = reactive([])

onMounted(() => {
    try {
    getDataFromApi().then(data => {
        posts.value = data
        working_posts.value = data
        working_posts.value = working_posts.value.filter(post => post.status === "published")
        posts.value = posts.value.filter(post => post.status === "published")
    posts.value.forEach(post => {
        if (!allCategories.includes(post.category)){
            allCategories.push(post.category)
        }
    })
    })
    } catch (error) {
        console.log(error)
    }
})

const filterPosts = (category) => {
    if (!posts.value || !Array.isArray(posts.value)) return
    try{
    currentPage.value = 1
    let categoryButtons = document.querySelectorAll('.cat-btn')
    categoryButtons.forEach(button => {
        button.classList.remove('btn-primary')
    })
    let thisButton = document.getElementById('cat-'+category)
    thisButton.classList.add('btn-primary')
    if (category === "All"){
        working_posts.value = posts.value
    } else {
        working_posts.value = posts.value.filter(post => post.category === category)
    }} catch (error) {
        console.log(error)
    }
}

</script>

<template>

    <div id="blog-gallery-header" class = "text-center py-3 mt-3">
        <h1>News</h1>
        <hr class = "w-25 mx-auto">
        <div class = "row justify-content-center flex-wrap">
            <a class = "btn btn-primary pg-b m-1 col small cat-btn" key="All" id = "cat-All" @click = 'filterPosts("All")'>All</a>
            <a class = "btn m-1 pg-b col small cat-btn" v-for="category in allCategories" :id = "'cat-'+category" @click = 'filterPosts(category)' :key="category">{{category}}</a>
        </div>
    </div>

    <div id="blogs" class = "row justify-content-evenly flex-wrap mb-5 py-3 gy-3">
        <TransitionGroup name = "list">
        <BlogCard v-for="(item, index) in working_posts.slice(((currentPage - 1) * itemsPerPage), ((currentPage - 1) * itemsPerPage) + itemsPerPage)" :key="`${item.id}--${index}`"  :border="true" :title = "item.title" :link="item.slug" :fimg = "item.featuredImage" :category = "item.category" :excerpt="item.excerpt" :size="3" :date="item.date">
            <template #content>{{ item }}</template>
        </BlogCard>
        </TransitionGroup>
    </div>

    <div id = "pagination-container">
        <div id = "pagination" class = "row justify-content-start align-items-center">
            <a class = "btn col col-auto border-1 border border-light-gray pg-pn" :class = "{disabled: currentPage === 1}" @click = "currentPage--">Newer</a>
            <div class = "col row justify-content-center flex-wrap">
                <a class =  'btn pg-b w50px border-bottom border-1 border-white' :class = "{'btn-primary': currentPage === page}" v-for="page in Math.ceil(working_posts.length / itemsPerPage)" :key="page" @click = "currentPage = page">{{page}}</a>
            </div>
            <a class = "btn col border-1 border border-light-gray col-auto pg-pn" :class = "{disabled: currentPage === Math.ceil(working_posts.length / itemsPerPage)}" @click = "currentPage++">Older</a>
        </div>
    </div>

</template>

<style scoped>
.list-move, .list-enter-active,
.list-leave-active {
  transition: transform 0.7s ease, opacity 0.2s ease-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

.list-leave-active {
  position: absolute;
}

    .cat-btn{
        flex-grow:0;
        width:fit-content;
        white-space: nowrap;
    }
    .cat-btn a{
        white-space: nowrap;
    }
    .pg-pn{
        height:fit-content;
    }
    .pg-pn:hover, .pg-pn:focus{
        border:solid 1px hsl(198, 54%, 47%)!important;
    }
    .pg-pn.disabled{
        border:none!important;
        pointer-events:none;
        color:white!important;
    }
    .pg-b{
        margin: 0 5px;
        transition: border-color 0.2s;
    }

    .w50px{
        width: 50px;
    }

    .pg-b:hover, .pg-b:focus{
        border-color: #ddd!important;
    }

    #blogs{
        min-height:50vh;
    }

    #pagination{
        max-width:800px;
        width: max(80vw, 400px);
    }

    #pagination-container{
        display:flex;
        justify-content:center;
        align-items:center;
    }
</style>