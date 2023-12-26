<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { QuillEditor } from '@vueup/vue-quill'
import ImageCompress from 'quill-image-compress'
import MagicUrl from 'quill-magic-url'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import {Save, ListTree} from 'lucide-vue-next'
import { useToast } from "vue-toastification"
const toast = useToast()

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

    const saveBlog = async() => {
      try {
        let id =props.blogId
        let date = new Date().toISOString()
        let response = await axios.put('https://weasel.okcsouthstake.org/api/seabass/' + id, {username: props.username, password: props.password, content: blog.value.content, title: blog.value.title, status: blog.value.status, category: blog.value.category, date: date})
        
        if (response.status === 200) {
          toast.success("Blog saved")
        } else {
          toast.error("Error saving blog - " + response.status)
        }
      } catch (error) {
        toast.error("Error saving blog - " + error)
      }
    }

    onMounted( async() => {
      blog.value = await props.blogs.find( (blog) => blog._id === props.blogId)
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

    return { blog, modules, updateCurrentComponent, saveBlog, toast, Save, ListTree }
  },
}
</script>

<template>
  <div class="container-fluid">
    <div class="row align-content-center">
      <div class="col-auto">
        <button class="btn btn-secondary" @click="updateCurrentComponent">Back<ListTree/></button>
      </div>
      <div class="col-auto">
        <h1><input type="text" v-model="blog.title" /></h1>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="saveBlog"><Save/></button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <QuillEditor theme="snow" toolbar="full" :modules="modules" @input="updateCurrentComponent" />
      </div>
    </div>
  </div>
</template>