<script setup>
const props = defineProps({
    src: String,
    alt: String,
    width: String,
    class: String
})
</script>

<template>
    <div class = 'img-container'>
        <img v-if="width === 100" :src="src" :alt="alt" style="width:100%" :class="class">
        <img v-else :src="src" :alt="alt" :class="class">
    </div>
</template>