<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { QuillEditor, Delta } from '@vueup/vue-quill'
import ImageCompress from 'quill-image-compress'
import MagicUrl from 'quill-magic-url'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useToast } from "vue-toastification"
import { Save, ListTree, CalendarClock, Check, PencilLine } from 'lucide-vue-next'


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
    QuillEditor,
    Save,
    ListTree,
    CalendarClock,
    Check,
    PencilLine
  },
  setup(props, { emit }) {
    const content = ref(new Delta())
    const title = ref('')
    const toast = useToast()
    const categories = ref([
      { id: 1, name: 'Category 1' },
      { id: 2, name: 'Category 2' },
    ])
    const category = ref('Category 1')

    const status = ref([
      { id: 1, name: 'draft' },
      { id: 2, name: 'published' },
      { id: 3, name: 'scheduled'}
    ])

    onMounted(() => {
      const foundBlog = props.blogs.find((blog) => blog._id === props.blogId)
      if (foundBlog) {
        title.value = foundBlog.title
        content.value = new Delta(foundBlog.content)
        status.value = foundBlog.status
        category.value = foundBlog.category
      }
    })

    const updateContent = (newContent) => {
      content.value = newContent
    }

    const selectStatus = (selectedStatus) => {
      status.value = selectedStatus.name
    }

    const saveBlog = async () => {
  try {
    let id = props.blogId
    let date = new Date().toISOString()
    let response = await axios.put('https://weasel.okcsouthstake.org/api/seabass/' + id, {
      username: props.username,
      password: props.password,
      content: props.content,
      title: title.value,
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

    const updateCurrentComponent = (component) => {
      emit('updateCurrentComponent', component)
    }

    const selectCategory = (selectedCategory) => {
  category.value = selectedCategory.name
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

    return { content, title, modules, updateContent, saveBlog, toast, updateCurrentComponent, categories, category, status, selectCategory, selectStatus }
  },
}
</script>

<template>
  <div class="container-fluid">
    <div class="row align-items-center">
      <div class="col-auto">
        <button class="btn btn-dark" @click="updateCurrentComponent('dashboard')">Back <ListTree/></button>
      </div>
      <div class="col-auto">
        <input type="text" v-model="title" class="fs-2" />
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="saveBlog"><Save/></button>
      </div>
      <div class="col-auto">
        <div class="dropdown">
          <button class="btn btn-dark dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            {{ category }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="categoryDropdown">
            <li v-for="category in categories" :key="category.id">
              <a class="dropdown-item" @click="selectCategory(category)">{{ category.name }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class = "col-auto">
        <div class = "dropdown" id = "status">
          <button class="btn btn-dark dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-expanded="false">{{ status }}</button>
          <ul class="dropdown-menu" aria-labelledby="statusDropdown">
            <li v-for="status in status" :key="status.id">
              <a class="dropdown-item" @click="selectStatus(status)">{{ status.name }}
                <CalendarClock v-if="status.name === 'scheduled'"/>
                <Check v-if="status.name === 'published'"/>
                <PencilLine v-if="status.name === 'draft'"/>
              </a>
            </li>
          </ul>

        </div>
      </div>
      
    </div>
    <div class="row">
      <div class="col-12">
        <QuillEditor theme="snow" toolbar="full" :modules="modules" v-model:content="content" @update:modelValue="updateContent"
    content-type="delta" />
      </div>
    </div>
  </div>
</template>