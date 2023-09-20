<script setup>

const props = defineProps({
    size: Number,
})

const sizeToFlexGrow = (size) => {
    return "flex-basis:" + size + "%;"
}

</script>

<template>
    <div class = "card col-12 col-sm-12 col-md-6" :style="sizeToFlexGrow(size)">
        <div class = "row align-items-stretch" id = "bio">
            <div class="square-img-container d-none d-md-block d-sm-none col-3">
                <img class="card-img-top square-img placeholder" alt="...">
            </div>
            <div class = "col-9 p-3">

                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle text-muted small mb-2"><em>{{category}}</em></h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk
                        of the card's content.</p>

            </div></div>
        
    </div>
</template>

<style scoped>
#bio{
    margin:0;
    padding:0;
    gap:0;
}
.card{
    padding:1rem;
    flex-grow: 1;
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

.card.col-6, .card.col-md-6{
    width: calc(1/2 * 100% - 2rem);
    min-width:300px;
}

@media screen and (max-width:768px){.card.col-sm-12{
    width: 100%;
}}

</style>