<script setup>
import { ref, onMounted } from 'vue'
import Quill from 'quill/dist/quill'
import { Delta } from 'quill'
import BubbleTheme from 'quill/themes/bubble'
import { formatRelative } from 'date-fns'
import { Head } from '@vueuse/head'

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
  blog.value.date = formatRelative(new Date(blog.value.date), new Date())

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
  <Head>
    <title v-if="blog.title">{{ blog.title }} | OKC South Stake</title>
    <meta v-if="blog.description" name="description" content="{{ blog.description }}">
    <meta v-if="blog.title" property="og:title" content="{{ blog.title }} | OKC South Stake">
    <meta v-if="blog.description" property="og:description" content="{{ blog.description }}">
    <meta v-if="blog.featuredImage" property="og:image" content="{{ blog.image }}">
    <meta v-if="blog.title" property="twitter:title" content="{{ blog.title }} | OKC South Stake">
    <meta v-if="blog.description" property="twitter:description" content="{{ blog.description }}">
    <meta v-if="blog.featuredImage" property="twitter:image" content="{{ blog.image }}">
    <meta property="og:url" content="https://okcsouthstake.org/news/{{ blog.slug }}">
    <meta property="twitter:url" content="https://okcsouthstake.org/news/{{ blog.slug }}">
    <meta v-if="blog.metaKeywords" name="keywords" content="blog.metaKeywords">
    <meta property="og:type" content="article">
  </Head>
  <main class="container py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-7">
        <h1 class="text-center">{{ blog.title }}</h1>
        <p class="text-center text-small text-muted"><em>{{ blog.date }} | {{blog.category}}</em></p>
        <hr/>
        <div id="quill-content"></div>
      </div>
    </div>
  </main>
</template>

<style>
  .ql-size-small {
    font-size: 0.75em;
  }
  .ql-size-large {
    font-size: 1.5em;
  }
  .ql-size-huge {
    font-size: 2.5em;
  }
  .ql-align-center {
    text-align: center;
  }
  .ql-align-right {
    text-align: right;
  }
  .ql-align-justify {
    text-align: justify;
  }
  .ql-indent-1 {
    padding-left: 3em;
  }
  .ql-indent-2 {
    padding-left: 6em;
  }
  .ql-indent-3 {
    padding-left: 9em;
  }
  .ql-editor h1 {
    font-size: 2em;
    font-weight: bold;
  }
  .ql-editor h2 {
    font-size: 1.5em;
    font-weight: bold;
  }
  .ql-editor h3 {
    font-size: 1.17em;
    font-weight: bold;
  }
  .ql-editor h4 {
    font-size: 1em;
    font-weight: bold;
  }
  .ql-editor h5 {
    font-size: 0.83em;
    font-weight: bold;
  }
  .ql-editor h6 {
    font-size: 0.67em;
    font-weight: bold;
  }
  .ql-editor a {
    color: var(--bs-primary);
    text-decoration: none;
    font-weight: bold;
  }
  .ql-syntax{
    background-color: #1d2a37;
    border-radius: 0.3em;
    padding: 0.5em;
    margin: 1em 0;
    color: whitesmoke;
  }
  blockquote {
    border-left: 0.25em solid #dfe2e5;
    padding: 1rem;
    color: #6a737d;
    font-size: 1.25em;
  }
</style>