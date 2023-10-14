<script setup>
    import axios from 'axios'
    import { ref, onBeforeMount } from 'vue'
    const internal_missionaries = ref([])
    const external_missionaries = ref([])

    onBeforeMount(async () => {
        const internal_missionaries_response = await axios.get('https://weasel.okcsouthstake.org/api/missionaries/internal')
        internal_missionaries.value = internal_missionaries_response.data
        const external_missionaries_response = await axios.get('https://weasel.okcsouthstake.org/api/missionaries/external')
        external_missionaries.value = external_missionaries_response.data
    })

    const createInternalMissionary = async () => {
        const response = await axios.post('https://weasel.okcsouthstake.org/api/missionaries/internal', {
            phone: '',
            ward: ''
        })
        internal_missionaries.value.push(response.data)
    }

    const updateInternalMissionary = async (missionary) => {
        await axios.put(`https://weasel.okcsouthstake.org/api/missionaries/internal/${missionary.id}`, {
            phone: missionary.phone,
            ward: missionary.ward
        })
    }

</script>

<template>
    <div class = 'container py-5'>
        <div class = 'card my-4 p-5'>
        <h1 class = 'text-center m-0'>Internal Missionaries</h1>
        <hr/>
        <form>
            <h2 class = 'text-center'>Edit Missionary Companionships</h2>
            <div v-for = '(missionary, index) in internal_missionaries' :key = 'index' class = 'row'>
                <div class = 'col-12 col-sm-12 col-md-5'>
                    <label for = 'phone'>Phone Number</label>
                    <input type = 'text' class = 'form-control' placeholder = 'Phone Number' :value="missionary.phone" :id="'phone-'+missionary._id" />
                </div>
                <div class = 'col-12 col-sm-12 col-md-6'>
                    <label for = 'ward'>Ward</label>
                    <input type = 'text' class = 'form-control' placeholder = 'Ward' :value="missionary.ward" :id="'ward-'+missionary._id"/>
                </div>
                <div class = 'col-12 col-sm-12 col-md-1'>
                    <a id = 'delete' href = '#' class = 'btn btn-primary btn-block mt-4'>Delete</a>
                </div>
            </div>
            <div class = "row">
                <div class = 'col-sm-auto'>
                    <a @click="updateInternalMissionary(missionary._id)" class = 'btn btn-primary btn-block mt-4'>Update</a>
                </div>
                <div class = 'col-sm-auto'>
                    <a href = '#' class = 'btn btn-secondary btn-block mt-4'>Add</a>
                </div>
            </div>
        </form>
        </div>
        <div class = 'card my-4 p-5'>
            <h1 class = 'text-center m-0'>External Missionaries</h1>
            <hr/>
            <form>

            </form>
        </div>
    </div>
</template>

<style scoped>
</style>