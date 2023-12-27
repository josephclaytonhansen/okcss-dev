<script setup>
import { ref, onMounted } from 'vue'
import Quill from 'quill/dist/quill'
import { Delta } from 'quill'
import BubbleTheme from 'quill/themes/bubble'

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

  Quill.register('themes/bubble', BubbleTheme)

  const quillContent = new Quill('#quill-content', {
    readOnly: true,
    theme: 'bubble',
    modules: {
      toolbar: false,
      clipboard: {
        matchVisual: true
      }
    }
  })
  quillContent.setContents(blog.value.content)
})
</script>

<template>
  <main class="container py-4">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">{{ blog.title }}</h1>
        <div id="quill-content"></div>
      </div>
    </div>
  </main>
</template>