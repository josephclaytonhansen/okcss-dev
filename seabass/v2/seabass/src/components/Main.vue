<script setup>

</script>

<script>

import { QuillEditor } from '@vueup/vue-quill'
import ImageCompress from 'quill-image-compress'
import MagicUrl from 'quill-magic-url'
import MarkdownShortcuts from 'quill-markdown-shortcuts'
import BlotFormatter from 'quill-blot-formatter'
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
    }, {
      name: 'markdownShortcuts',
      module: MarkdownShortcuts,
    }, {
      name: 'blotFormatter',
      module: BlotFormatter
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