<script setup>
import { computed } from 'vue'

const props = defineProps({
    border: Boolean,
    size: Number,
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
</script>

<template>

        <div v-if="border" class="col card event-card" :class="sizeIs">
            <div class="square-img-container d-none d-md-block d-sm-none">
                <img class="card-img-top square-img placeholder" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk
                    of
                    the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>


        <div v-else :class="sizeIs">

        <div class="square-img-container d-none d-md-block d-sm-none">
            <img class="card-img-top square-img placeholder">
        </div>
            <div class="card-body py-2">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                    the card's content.</p>
                <a href="#" class="link">Go somewhere</a>
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
  padding-bottom: 100%;
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