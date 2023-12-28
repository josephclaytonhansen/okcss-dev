<script setup>
import { ref, reactive, onMounted, watchEffect } from 'vue'
import Quill from 'quill/dist/quill'
import BubbleTheme from 'quill/themes/bubble'
import { formatRelative } from 'date-fns'
import axios from 'axios'

const blogs = ref([])
const blog = ref('')

const meta = reactive({
  title: '',
  meta: []
})

onMounted(async () => {
  blogs.value = await axios.post('https://weasel.okcsouthstake.org/api/seabass').then(response => response.data)
  let url = window.location.pathname
  let blogSlug = url.split('/')[2]
  console.log(blogSlug)
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

  meta.title = blog.value.title
  meta.meta = [
    {
      name: 'description',
      content: blog.value.description
    },
    {
      property: 'og:title',
      content: blog.value.title
    },
    {
      property: 'og:description',
      content: blog.value.description
    },
    {
      property: 'og:image',
      content: blog.value.featuredImage
    },
    {
      property: 'og:url',
      content: 'https://okcsouthstake.org/news/' + blog.value.slug
    },
    {
      property: 'og:type',
      content: 'article'
    },
    {
      property: 'twitter:title',
      content: blog.value.title
    },
    {
      property: 'twitter:description',
      content: blog.value.description
    },
    {
      property: 'twitter:image',
      content: blog.value.featuredImage
    },
    {
      property: 'twitter:url',
      content: 'https://okcsouthstake.org/news/' + blog.value.slug
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'keywords',
      content: blog.value.metaKeywords
    }
  ]

  watchEffect(() => {
    document.title = meta.title
    meta.meta.forEach(m => {
      let metaEl = document.querySelector(`meta[name="${m.name}"], meta[property="${m.property}"]`)
      if (metaEl) {
        metaEl.setAttribute('content', m.content)
      } else {
        metaEl = document.createElement('meta')
        if (m.name) {
          metaEl.setAttribute('name', m.name)
        }
        if (m.property) {
          metaEl.setAttribute('property', m.property)
        }
        metaEl.setAttribute('content', m.content)
        document.getElementsByTagName('head')[0].appendChild(metaEl)
      }
    })
  })
})
</script>

<template>
  <main class="container py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-7">
        <h1 class="text-center">{{ blog.title }}</h1>
        <p class="text-center text-small text-muted"><em>{{ blog.date }} – {{blog.category}}</em></p>
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