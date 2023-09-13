<script setup>
import {ref, reactive, onMounted} from 'vue'

const posts = reactive([1,2,3,4,5,6,7,8,9,10,11])

const props = defineProps({
    seabassLoc: String,
    itemsPerPage: Number
})

onMounted(async () => {
    const response = await fetch(props.seabassLoc+'post')
    const data = response.json()
    posts.value = data
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
            <a class = "btn col col-auto border-1 border border-light-gray pg-pn" :class = "{disabled: currentPage === 1}" @click = "currentPage--">Newer</a>
            <div class = "col row justify-content-center flex-wrap">
                <a class =  'btn pg-b border-bottom border-1 border-white' :class = "{'btn-primary': currentPage === page}" v-for="page in Math.ceil(posts.length / itemsPerPage)" :key="page" @click = "currentPage = page">{{page}}</a>
            </div>
            <a class = "btn col border-1 border border-light-gray col-auto pg-pn" :class = "{disabled: currentPage === Math.ceil(posts.length / itemsPerPage)}" @click = "currentPage++">Older</a>
        </div>
    </div>

</template>

<style scoped>
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