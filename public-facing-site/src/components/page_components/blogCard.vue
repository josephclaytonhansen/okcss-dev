<script setup>
import { computed } from 'vue'
import { formatRelative } from 'date-fns'

const props = defineProps({
    border: Boolean,
    size: Number,
    category: String,
    title: String,
    link: String,
    fimg: String,
    excerpt: String,
    date: String
})

const sizeIs = computed(() => {
    if (props.size === 4){
        return "col-4 col-md-4 col-sm-12"
    } else if (props.size === 3){
        return "col-3 col-md-3 col-sm-12"
    } else if(props.size === 2){
        return "col-2 col-md-2 col-sm-12"
    } else {
        return "col-4 col-md-4 col-sm-12"
    }
})

const link = computed(() => {
    return "/news/" + props.link
})

const date = computed(() => {
    return formatRelative(new Date(props.date), new Date())
})
</script>

<template>

        <div v-if="border" class="col card event-card" :class="sizeIs">
            <div class="square-img-container d-none d-md-block d-sm-none" v-if="fimg">
                <img class="card-img-top square-img placeholder" alt="..." :src="fimg">
            </div>
            <div class="card-body">
                <h5 class="card-title">{{ title }}</h5>
                <h6 class="card-subtitle text-muted small mb-2"><em>{{category}} – {{date}}</em></h6>
                <p class="card-text">{{excerpt}}</p>
                <a :href="link" class="btn btn-primary">Read more</a>
            </div>
        </div>


        <div v-else :class="sizeIs">

        <div class="square-img-container d-none d-md-block d-sm-none" v-if="fimg">
            <img class="card-img-top square-img placeholder" :src="fimg">
        </div>
            <div class="card-body py-2">
                <h5 class="card-title py-2">{{ title }}</h5>
                <p class="card-text">{{excerpt}}</p>
                <a :href="link" class="link">Read more</a>
            </div>
        </div>


</template>

<style scoped>

.event-card{
    padding:1rem;
}

.square-img-container {
  position: relative;
}

.square-img-container::after {
  content: "";
  display: block;
  padding-bottom: 75%;
}

.square-img {
  position: absolute;
  left:0%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius:8px;
}

.card.col-4, .card.col-md-4{
    width: calc(1/3 * 100% - 2rem);
    min-width:300px;
}
.card.col-3, .card.col-md-3{
    width: calc(1/4 * 100% - 2rem);
    min-width:300px;
}

.card.col-2, .card.col-md-2{
    width: calc(1/6 * 100% - 2rem);
    min-width:300px;
}

@media screen and (max-width:768px){.card.col-sm-12{
    width: 100%;
}}

</style>