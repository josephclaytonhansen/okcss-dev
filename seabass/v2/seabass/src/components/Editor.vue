<script>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { QuillEditor, Delta } from '@vueup/vue-quill'
import ImageCompress from 'quill-image-compress'
import MagicUrl from 'quill-magic-url'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
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
    const blog = ref({
      content: Delta()
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
      blog.value = foundBlog
      if (blog.value.content === null || blog.value.content == "" || blog.value.content == undefined ) {
        blog.value.content = Delta()
      }
    })

    const internalContent = ref(props.content)

    watch(internalContent, (newContent) => {
      console.log('Content changed:', newContent)
      emit('update:modelValue', newContent)
    })

    const updateContent = (newContent) => {
      internalContent.value = newContent
    }

    const modules = [
      {
        name: 'quillImageCompress',
        module: ImageCompress,
      },
      {
        name: 'magicUrl',
        module: MagicUrl,
      }
    ]

    const updateCurrentComponent = () => {
      emit('updateCurrentComponent', 'dashboard')
    }


    return { blog, modules, updateCurrentComponent, saveBlog, toast, updateContent }
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
        <QuillEditor theme="snow" toolbar="full" :modules="modules" v-model:content="internalContent" @update:modelValue="updateContent"
    content-type="delta" />
      </div>
    </div>
  </div>
</template>