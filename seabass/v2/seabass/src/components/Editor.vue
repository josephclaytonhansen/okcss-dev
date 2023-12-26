<script setup>

import { ref, onMounted, defineEmits } from 'vue'
import axios from 'axios'

const props = defineProps({
    username: String,
    password: String,
    blogId: String,
    blogs: Array,
    currentComponent: String
})

const emits = defineEmits(['updateCurrentComponent'])

const blog = ref({})

onMounted( () => {
    blog.value = props.blogs.find( (blog) => blog.id === props.blogId)
})

</script>

<script>

import { QuillEditor } from '@vueup/vue-quill'
import ImageCompress from 'quill-image-compress'
import MagicUrl from 'quill-magic-url'

import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  components: {
    QuillEditor
  },
  setup: (props, { emit }) => {
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

    return { modules, updateCurrentComponent }
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