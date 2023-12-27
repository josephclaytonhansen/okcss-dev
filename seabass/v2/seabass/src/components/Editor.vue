<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { QuillEditor, Delta } from '@vueup/vue-quill'
import ImageCompress from 'quill-image-compress'
import MagicUrl from 'quill-magic-url'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useToast } from "vue-toastification"
import { Save, ListTree, CalendarClock, Check, PencilLine, Info } from 'lucide-vue-next'
import MetadataModal from './MetadataModal.vue'


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
    PencilLine,
    Info,
    MetadataModal
  },

  setup(props, { emit }) {
    const content = ref(new Delta())
    const title = ref('')
    const toast = useToast()
    const categories = ref([
      { id: 1, name: 'Stake Events' },
      { id: 2, name: 'Meet a Member' },
      { id: 3, name: 'Inspiring Stories' },
      { id: 11, name: 'Graduations' },
      { id: 12, name: 'Weddings' },
      { id: 13, name: 'Funerals' },
      { id: 14, name: 'Births' },
    ])
    const category = ref('Stake Events')

    const status = ref([
      { id: 1, name: 'draft' },
      { id: 2, name: 'published' },
      { id: 3, name: 'scheduled'}
    ])

    const currentStatus = ref('draft')

    const scheduledDate = ref('')

    onMounted(() => {
      const foundBlog = props.blogs.find((blog) => blog._id === props.blogId)
      if (foundBlog) {
        title.value = foundBlog.title
        content.value = new Delta(foundBlog.content)
        currentStatus.value = foundBlog.status
        category.value = foundBlog.category
        if (foundBlog.scheduledDate) {
      let date = new Date(foundBlog.scheduledDate)
      scheduledDate.value = date.toISOString().split('T')[0]
    }
      }
    })

    const updateContent = (newContent) => {
      content.value = newContent
    }

    const selectStatus = (selectedStatus) => {
      currentStatus.value = selectedStatus.name
    }

    const saveBlog = async () => {
  try {
    let id = props.blogId
    let date = new Date().toISOString()
    let response = await axios.put('https://weasel.okcsouthstake.org/api/seabass/' + id, {
      username: props.username,
      password: props.password,
      content: content.value,
      title: title.value,
      date: date,
      status: currentStatus.value,
      category: category.value,
      scheduledDate: scheduledDate.value
    })

    if (response.status === 200) {
      toast.success("Blog saved")
    } else {
      toast.error("Error saving blog- " + response.status)
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

const createCategory =  () => {
  let newCategory = prompt("Enter new category name")
  if (newCategory) {
    categories.value.push({id: categories.value.length + 1, name: newCategory})
    category.value = newCategory
    saveBlog()
  }
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

    return { content, title, modules, updateContent, saveBlog, toast, updateCurrentComponent, blogs: props.blogs, blogId: props.blogId, categories, category, currentStatus, selectCategory, selectStatus, status, scheduledDate, createCategory }
  },
}
</script>

<template>
  <MetadataModal :blogId = "blogId" :blogs = "blogs" :username="username" :password="password" />

  <div class="container-fluid">
    <div class="row align-items-center justify-content-between py-3">
      <div class = "row col-auto align-items-center ">
      <div class="col-auto">
        <button class="btn btn-light" @click="updateCurrentComponent('dashboard')">Back <ListTree/></button>
      </div>
      <div class="col-auto">
        <input type="text" v-model="title" class="fs-2" />
      </div>
      
      <div class="col-auto">
        <div class="dropdown">
          <button class="btn btn-light dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            {{ category }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="categoryDropdown">
            <li v-for="category in categories" :key="category.id">
              <a class="dropdown-item" @click="selectCategory(category)">{{ category.name }}</a>
            </li>
            <li class="dropdown-divider"></li>
            <li><a class="dropdown-item" @click="createCategory()">Create category</a></li>
          </ul>
        </div>
      </div>
      

      <div class = "col-auto">
        <div class = "dropdown" id = "status">
          <button class="btn btn-light dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <CalendarClock v-if="currentStatus === 'scheduled'"/>
                <Check v-if="currentStatus === 'published'"/>
                <PencilLine v-if="currentStatus === 'draft'"/>
          </button>
          <ul class="dropdown-menu" aria-labelledby="statusDropdown">
            <li v-for="status in status" :key="status.id">
              <a class="dropdown-item" @click="selectStatus(status)">{{ status.name }}
                
              </a>
            </li>
          </ul>

        </div>
      </div>

      <div class = "col-auto" v-if="currentStatus == 'scheduled'">
        <input type="date" v-model="scheduledDate">
      </div>

      <div class = "col-auto">
        <button class="btn btn-light"  data-bs-toggle="modal" data-bs-target="#metadataModal"><Info/>Metadata</button>
      </div>

    </div>

    <div class = "row col-auto align-items-center ">
      <div class="col-auto">
        <button class="btn btn-primary" @click="saveBlog"><Save/></button>
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