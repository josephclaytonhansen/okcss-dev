<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
    username: String,
    password: String,
    blogId: String,
    blogs: Array
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
  setup: () => {
    const modules = [{
      name: 'quillImageCompress',  
      module: ImageCompress, 
    }, {
      name: 'magicUrl',
      module: MagicUrl,
    }]
    return { modules }
  },
}

</script>

<template>
  <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <h1>Quill Editor</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <QuillEditor theme="snow" toolbar="full" :modules="modules" />
                </div>
            </div>
        </div>
</template>