<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <a class="btn btn-primary" type="button" @click="count++">count is {{ count }}</a>
    <a class="btn btn-secondary" type="button" @click="count++">count is {{ count }}</a>
    <a class="btn btn-danger" type="button" @click="count++">count is {{ count }}</a>
    <a class="btn btn-warning" type="button" @click="count++">count is {{ count }}</a>
    <a class="btn btn-info" type="button" @click="count++">count is {{ count }}</a>
    <a class="btn btn-light" type="button" @click="count++">count is {{ count }}</a>
    <a class="btn btn-dark" type="button" @click="count++">count is {{ count }}</a>
    <a class="btn btn-success" type="button" @click="count++">count is {{ count }}</a>

    <h1>
      Edit
      <a href="">components/HelloWorld.vue</a> to test HMR
    </h1>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
