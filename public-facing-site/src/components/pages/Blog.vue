<script setup>
import { ref, onMounted } from 'vue'
import { Quill, Delta } from '@vueup/vue-quill'

import axios from 'axios'

const blogs = ref([])
const blog = ref('')

onMounted(async () => {
  blogs.value = await axios.post('https://weasel.okcsouthstake.org/api/seabass').then(response => response.data)
  let url = window.location.pathname
  let blogSlug = url.split('/')[2]
  blog.value = blogs.value.find(blog => blog.slug === blogSlug)
  if (blog.value.status !== 'published') {
    window.location.href = '/'
  }

  const delta = new Delta(blog.value.content)
  const htmlContent = delta.reduce((html, op) => {
    if (op.insert) {
      if (typeof op.insert === 'string') {
        return html + op.insert
      } else if (typeof op.insert === 'object' && op.insert.image) {
        return html + `<img src="${op.insert.image}" alt="Quill Delta Image">`
      }
    }
    return html
  }, '')

  const quillContent = document.getElementById('quill-content')
  quillContent.innerHTML = htmlContent
})
</script>

<template>
  <main class="container py-2">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">{{ blog.title }}</h1>
        <div id="quill-content"></div>
      </div>
    </div>
  </main>
</template>