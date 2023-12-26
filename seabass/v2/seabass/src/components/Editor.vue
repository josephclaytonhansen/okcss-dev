<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { QuillEditor } from '@vueup/vue-quill'
import ImageCompress from 'quill-image-compress'
import MagicUrl from 'quill-magic-url'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  props: {
    username: String,
    password: String,
    blogId: String,
    blogs: Array,
    currentComponent: String
  },
  emits: ['updateCurrentComponent'],
  components: {
    QuillEditor
  },
  setup: (props, { emit }) => {
    const blog = ref({})

    onMounted( async() => {
      blog.value = await props.blogs.find( (blog) => blog.id === props.blogId)
    })

    const modules = [{
      name: 'quillImageCompress',  
      module: ImageCompress, 
    }, {
      name: 'magicUrl',
      module: MagicUrl,
    }]

    const updateCurrentComponent = () => {
      emit('updateCurrentComponent', 'dashboard')
    }

    return { blog, modules, updateCurrentComponent }
  },
}
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-auto">
        <button class="btn btn-primary" @click="updateCurrentComponent">Back</button>
      </div>
      <div class="col-auto">
        <h1><input type="text" v-model="blog.title" /></h1>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <QuillEditor theme="snow" toolbar="full" :modules="modules" @input="updateCurrentComponent" />
      </div>
    </div>
  </div>
</template>