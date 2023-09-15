<script setup>

const props = defineProps({
    border: Boolean,
})
</script>

<template>

        <div v-if="border" class="col col-4 card event-card">
            <div class="square-img-container">
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


        <div v-else class="col-4 col-md-4 col-sm-12">

        <div class="square-img-container">
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

.card{
    width: calc(1/3 * 100% - 2rem);
    min-width: 300px;
}

</style>