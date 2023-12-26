<template>
  <div>
    <QuillEditor v-model:content="internalContent" @update:modelValue="updateContent" />
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { QuillEditor, Delta } from '@vueup/vue-quill'

export default {
  components: {
    QuillEditor
  },
  props: {
    content: {
      type: Object,
      default: () => new Delta()
    }
  },
  setup(props, { emit }) {
    const internalContent = ref(props.content)

    watch(internalContent, (newContent) => {
      console.log('Content changed:', newContent)
      emit('update:modelValue', newContent)
    })

    const updateContent = (newContent) => {
      internalContent.value = newContent
    }

    return { internalContent, updateContent }
  }
}
</script>