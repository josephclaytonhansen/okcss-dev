<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from "vue-toastification"

const props = defineProps({
  blogId: String,
  blogs: Array,
})

const formData = ref({
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  metaImage: '',
})

const toast = useToast()

function handleSubmit() {
  emits.formSubmitted(formData.value);
}

onMounted(() => {
      const foundBlog = props.blogs.find((blog) => blog._id === props.blogId)
        if (foundBlog) {
            formData.value.metaTitle = foundBlog.metaTitle
            formData.value.metaDescription = foundBlog.metaDescription
            formData.value.metaKeywords = foundBlog.metaKeywords
            formData.value.metaImage = foundBlog.metaImage
        } else {
            toast.error('Blog not found')
        }
})


const saveBlog = async () => {
    try {
        const response = await axios.put(
        `https://weasel.okcsouthstake.org/api/seabass/${props.blogId}`,
        {
            metaTitle: formData.value.metaTitle,
            metaDescription: formData.value.metaDescription,
            metaKeywords: formData.value.metaKeywords,
            metaImage: formData.value.metaImage,
        }
        )
        toast.success(response.data.message)
    } catch (error) {
        toast.error(error.response.data.message)
    }
    
}

</script>

<template>

    <div class="modal fade" id="metadataModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Metadata</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <form @submit.prevent="saveBlog">
                <div class = "row">
                    <div class = "col-12 col-sm-12 col-md-6">
                        <label for="metaTitle" class="col-form-label">Meta title</label>
                        <input type="text" class="form-control" id="metaTitle">
                    </div>
                    <div class = "col-12 col-sm-12 col-md-6">
                        <label for="metaDescription" class="col-form-label">Meta description</label>
                        <input type="text" class="form-control" id="metaDescription">
                    </div>
                    <div class = "col-12 col-sm-12 col-md-6">
                        <label for="metaKeywords" class="col-form-label">Meta keywords</label>
                        <input type="text" class="form-control" id="metaKeywords">
                    </div>
                    <div class = "col-12 col-sm-12 col-md-6">
                        <label for="metaImage" class="col-form-label">Featured image</label>
                        <input type="file" class="form-control" id="metaImage">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
        </div>
    </div>
    </div>

</template>