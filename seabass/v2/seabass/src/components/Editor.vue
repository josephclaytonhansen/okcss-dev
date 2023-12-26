<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-vue'
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
    ckeditor: CKEditor.component
  },
  setup: (props, { emit }) => {
    const blog = ref({
      content: ''
    })

    const saveBlog = async () => {
      try {
        let id = props.blogId
        let date = new Date().toISOString()
        let response = await axios.put('https://weasel.okcsouthstake.org/api/seabass/' + id, {
          username: props.username,
          password: props.password,
          content: blog.value.content,
          title: blog.value.title,
          status: blog.value.status,
          category: blog.value.category,
          date: date
        })

        if (response.status === 200) {
          toast.success("Blog saved")
        } else {
          toast.error("Error saving blog: " + response.status)
        }
      } catch (error) {
        toast.error("Error saving blog: " + error)
      }
    }

    onMounted(async () => {
      const foundBlog = props.blogs.find((blog) => blog._id === props.blogId)
      if (foundBlog) {
        blog.value.title = foundBlog.title
        blog.value.status = foundBlog.status
        blog.value.category = foundBlog.category
        blog.value.content = foundBlog.content
      }
    })

    const updateCurrentComponent = () => {
      emit('updateCurrentComponent', 'dashboard')
    }

    return { blog, updateCurrentComponent, saveBlog, toast, editor: ClassicEditor }
  },
}
</script>

<template>
  <div class="container-fluid">
    <div class="row align-items-center">
      <div class="col-auto">
        <button class="btn btn-secondary" @click="updateCurrentComponent">Back</button>
      </div>
      <div class="col-auto">
        <input type="text" v-model="blog.title" class="fs-2" />
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="saveBlog">Save</button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <ckeditor :editor="editor" v-model="blog.content"></ckeditor>
      </div>
    </div>
  </div>
</template>