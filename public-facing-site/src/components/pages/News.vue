<script setup>
import {ref, reactive, onMounted} from 'vue'

const posts = reactive([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36])

const props = defineProps({
    seabassLoc: String,
    itemsPerPage: Number
})

onMounted(async () => {
    const response = await fetch(props.seabassLoc+'post')
    const data = await response.json()
    return data
})

const currentPage = ref(1);

</script>

<template>

    <div id="blog-gallery-header">
        <h1>News</h1>
    </div>

    <div id="blogs">
        <div v-for="(item, index) in posts.slice(((currentPage - 1) * itemsPerPage), ((currentPage - 1) * itemsPerPage) + itemsPerPage)" :key="`${item.id}--${index}`" :item="item">{{ item }}</div>
    </div>

    <div id = "pagination-container">
        <div id = "pagination" class = "row justify-content-evenly align-items-center">
            <a class = "btn col col-auto btn-primary pg-pn" :class = "{disabled: currentPage === 1}" @click = "currentPage--">Previous</a>
            <div class = "col row justify-content-center flex-wrap">
                <a class =  'btn pg-b border-bottom border-1 border-white' :class = "{'btn-primary': currentPage === page}" v-for="page in Math.ceil(posts.length / itemsPerPage)" :key="page" @click = "currentPage = page">{{page}}</a>
            </div>
            <a class = "btn col col-auto btn-primary pg-pn" :class = "{disabled: currentPage === Math.ceil(posts.length / itemsPerPage)}" @click = "currentPage++">Next</a>
        </div>
    </div>

</template>

<style scoped>
    .pg-pn{
        height:fit-content;
    }
    .pg-b{
        width: 50px;
        margin: 0 5px;
        transition: border-color 0.2s;
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