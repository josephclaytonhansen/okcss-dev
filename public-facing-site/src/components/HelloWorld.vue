<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="row g-1 row-cols-6">
    <div class = "col"><a class="btn btn-primary" type="button" @click="count++">count is {{ count }}</a></div>
    <div class = "col"><a class="btn btn-secondary" type="button" @click="count++">count is {{ count }}</a></div>
    <div class = "col"><a class="btn btn-success" type="button" @click="count++">count is {{ count }}</a></div>
    <div class = "col"><a class="btn btn-danger" type="button" @click="count++">count is {{ count }}</a></div>
    <div class = "col"><a class="btn btn-warning" type="button" @click="count++">count is {{ count }}</a></div>
    <div class = "col"><a class="btn btn-info" type="button" @click="count++">count is {{ count }}</a></div>
    <div class = "col"><a class="btn btn-light" type="button" @click="count++">count is {{ count }}</a></div>
    <div class = "col"><a  aria-label="What's up!" data-balloon-pos="down" class="btn btn-dark" type="button" @click="count++">count is {{ count }}</a></div>
    <div class = "col-12">
    <h1>
      Edit
      <a href="">components/HelloWorld.vue</a> to test HMR
    </h1>


  <h2>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </h2>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p>Click on the Vite and Vue logos to learn more</p>
  </div>
</div>
</template>

<style scoped>

</style>
