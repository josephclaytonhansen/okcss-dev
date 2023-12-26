<script setup>
    import Editor from './Editor.vue'
    import {FilePlus, Pencil, Trash} from 'lucide-vue-next'
    import axios from 'axios'

    const props = defineProps({
        username: String,
        password: String
    })

    const blogs = ref([])

    import { ref, onMounted } from 'vue'

    const statusOptions = ref(['published', 'scheduled', 'draft'])
    const categories = ref(['Category 1', 'Category 2', 'Category 3'])

    import { useToast } from "vue-toastification"
    const toast = useToast()

    const getDataFromApi = async () => {
        try {
            
        const response = await axios.post('https://weasel.okcsouthstake.org/api/seabass/', 
        {username: props.username, password: props.password})
        if (response.status === 200) {
            return response.data
        } else {
            toast.error("Error getting data")
        }
    } catch (error) {
        toast.error("Error getting data")
    }}


    const newBlog = async() => {
        try {
            const response = await axios.post('https://weasel.okcsouthstake.org/api/seabass/create', 
            {username: props.username, password: props.password})
            if (response.status === 200) {
                toast.success("New blog created")
                blogs.value = await getDataFromApi()
            } else {
                toast.error("Error creating new blog")
            }
        } catch (error) {
            toast.error("Error creating new blog")
        }
    }

    const editBlog = (id) => {
        toast.success("Edit blog " + id)
    }

    const deleteBlog = async(id) => {
        try {
            const response = await axios.delete('https://weasel.okcsouthstake.org/api/seabass/' + id, 
            {data: {username: props.username, password: props.password, id: id}})
            if (response.status === 200) {
                toast.success("Blog " + id + " deleted")
                blogs.value = await getDataFromApi()
            } else {
                toast.error("Error deleting blog " + id)
            }
        } catch (error) {
            toast.error("Error deleting blog " + id)
        }
    }

    const updateBlogStatus = async(id) => {
        try {
            let status = blogs.value.find(blog => blog._id === id).status
            const response = await axios.put(idRoute,
            {username: props.username, password: props.password, status: status}).then(
                blogs.value = await getDataFromApi()
            )
        } catch (error) {
            toast.error("Error updating blog " + id + " status")
        }
    }

    onMounted(async () => {
        blogs.value = await getDataFromApi().then(console.log("Blogs loaded"))
    })
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
                            <tr v-for = "blog in blogs" :key = "blog._id" class = "row">
                                <td  class = "col-5">{{blog.title}}</td>
                                <td class = "col-2">
                                    {{blog.category}}
                                </td>
                                <td class = "col-1">{{blog.created}}</td>
                                <td class = "col-2">
                                    <select class="form-select" :class="{'text-bg-success': blog.status === 'published', 'text-bg-primary': blog.status === 'scheduled'}" v-model="blog.status" @change = "updateBlogStatus(blog._id)">
                                        <option v-for="option in statusOptions" :value="option" :key="option">{{ option }}</option>
                                    </select>
                                </td>
                                <td class = "col-2">
                                    <button class = "btn btn-primary mx-1" @click = "editBlog(blog._id)"><Pencil/></button>
                                    <button class = "btn btn-danger" @click = "deleteBlog(blog._id)"><Trash/></button>
                                </td>
                                
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>


</template>