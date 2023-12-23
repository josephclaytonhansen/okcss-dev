<script setup>
    import Editor from './Editor.vue'
    import {FilePlus, Pencil, Trash} from 'lucide-vue-next'

    const props = defineProps({
        blogs: Array,
        username: String,
        password: String
    })

    import { ref } from 'vue'

    const statusOptions = ref(['published', 'scheduled', 'draft'])
    const categories = ref(['Category 1', 'Category 2', 'Category 3'])

    import { useToast } from "vue-toastification"
    const toast = useToast()

    const newBlog = () => {
        toast.success("New blog")
    }

    const editBlog = (id) => {
        toast.success("Edit blog " + id)
    }

    const deleteBlog = (id) => {
        toast.warning("Delete blog " + id)
    }

    const updateBlogStatus = (id) => {
        toast.success("Update blog " + id + " status")
    }

    const updateBlogCategory = (id) => {
        toast.success("Update blog " + id + " category")
    }
</script>

<template>

        <main class = "container py-4">
            <div class = "row">
                <div class = "col-12">
                    <h1>Seabass</h1>
                </div>
                <hr/>
            </div>
            <div class = "row py-3" style = "align-items: center;">
                <div class = "col-auto"><h2>Blogs</h2></div>
                <div class = "col-auto" style = "margin-top:-.75rem;">
                    <button class = "btn btn-primary" @click = "newBlog"><FilePlus/></button>
                </div>
            </div>
            <div class = "row">
                <div class = "col-12">
                    <table class = "table table-striped table-hover" style = "width:68vw;min-width:fit-content;">
                        <thead>
                            <tr class = "row">
                                <th class = "col-5">Title</th>
                                <th class = "col-2">Category</th>
                                <th class = "col-1">Created</th>
                                <th class = "col-2">Status</th>
                                <th class = "col-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for = "blog in props.blogs" :key = "blog.id" class = "row">
                                <td  class = "col-5">{{blog.title}}</td>
                                <td class = "col-2">
                                    <select class="form-select" v-model="blog.category" @change="updateBlogCategory(blog.id)">
                                        <option v-for="option in categories" :value="option" :key="option">{{ option }}</option>
                                    </select>
                                </td>
                                <td class = "col-1">{{blog.created}}</td>
                                <td class = "col-2">
                                    <select class="form-select" :class="{'text-bg-success': blog.status === 'published', 'text-bg-primary': blog.status === 'scheduled'}" v-model="blog.status" @change = "updateBlogStatus(blog.id)">
                                        <option v-for="option in statusOptions" :value="option" :key="option">{{ option }}</option>
                                    </select>
                                </td>
                                <td class = "col-2">
                                    <button class = "btn btn-primary mx-1" @click = "editBlog(blog.id)"><Pencil/></button>
                                    <button class = "btn btn-danger" @click = "deleteBlog(blog.id)"><Trash/></button>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>


</template>