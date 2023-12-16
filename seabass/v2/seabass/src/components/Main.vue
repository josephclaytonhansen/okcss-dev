<script setup>

</script>

<script>

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  components: {
    QuillEditor
  }
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
                    <QuillEditor theme="snow" toolbar="essential" />
                </div>
            </div>
        </div>
</template>