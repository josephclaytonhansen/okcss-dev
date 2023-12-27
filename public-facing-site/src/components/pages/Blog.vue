<script setup>
import { ref, onMounted } from 'vue'
import { Quill } from '@vueup/vue-quill'

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

  const quill = new Quill('#quill-content', {
    readOnly: true,
    theme: 'snow',
  })

  quill.clipboard.dangerouslyPasteHTML(blog.value.content)
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