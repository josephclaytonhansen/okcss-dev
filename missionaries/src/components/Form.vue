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

    const createExternalMissionary = async () => {
        const response = await axios.post('https://weasel.okcsouthstake.org/api/missionaries/external', {
            email: '',
            name: '',
            location: {
                city: '',
                state: '',
                country: ''
            }
        })
        external_missionaries.value.push(response.data)
    }

    const deleteInternalMissionary = async (missionary) => {
        await axios.delete(`https://weasel.okcsouthstake.org/api/missionaries/internal/${missionary._id}`)
        internal_missionaries.value = internal_missionaries.value.filter((missionary) => {
            return missionary._id !== missionary._id
        })
    }

    const deleteExternalMissionary = async (missionary) => {
        await axios.delete(`https://weasel.okcsouthstake.org/api/missionaries/external/${missionary._id}`)
        external_missionaries.value = external_missionaries.value.filter((missionary) => {
            return missionary._id !== missionary._id
        })
    }

    const updateInternalMissionary = async (missionary) => {
        let phone = document.getElementById('phone-'+missionary._id).value
        let ward = document.getElementById('ward-'+missionary._id).value
        await axios.put(`https://weasel.okcsouthstake.org/api/missionaries/internal/${missionary._id}`, {
            phone: phone,
            ward: ward
        }).then((response) => {
            //update text of button to say "updated" and class to be btn-success
            let updateButton = document.getElementById('update-'+missionary._id)
            updateButton.innerText = 'Updated!'
            updateButton.classList.add('btn-success')
            updateButton.classList.remove('btn-primary')
            internal_missionaries.value = internal_missionaries.value.map((missionary) => {
                if (missionary._id === response.data._id) {
                    return response.data
                } else {
                    return missionary
                }
            })
            //after two seconds, change text back to "update" and class back to btn-primary
            setTimeout(() => {
                updateButton.innerText = 'Update'
                updateButton.classList.add('btn-primary')
                updateButton.classList.remove('btn-success')
                
            }, 2000)
        })
    }

    const updateExternalMissionary = async (missionary) => {
        let email = document.getElementById('email-'+missionary._id).value
        let name = document.getElementById('name-'+missionary._id).value
        let city = document.getElementById('city-'+missionary._id).value
        let state = document.getElementById('state-'+missionary._id).value
        let country = document.getElementById('country-'+missionary._id).value
        await axios.put(`https://weasel.okcsouthstake.org/api/missionaries/external/${missionary._id}`, {
            email: email,
            name: name,
            location: {
                city: city,
                state: state,
                country: country
            }
        }).then((response) => {
            //update text of button to say "updated" and class to be btn-success
            let updateButton = document.getElementById('update-'+missionary._id)
            updateButton.innerText = 'Updated!'
            updateButton.classList.add('btn-success')
            updateButton.classList.remove('btn-primary')
            external_missionaries.value = external_missionaries.value.map((missionary) => {
                if (missionary._id === response.data._id) {
                    return response.data
                } else {
                    return missionary
                }
            })
            //after two seconds, change text back to "update" and class back to btn-primary
            setTimeout(() => {
                updateButton.innerText = 'Update'
                updateButton.classList.add('btn-primary')
                updateButton.classList.remove('btn-success')
                
            }, 2000)
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
                    <input type = 'text' class = 'form-control' placeholder = 'Phone Number' :value="missionary.phone" :id="'phone-'+internal_missionaries[index]._id" />
                </div>
                <div class = 'col-12 col-sm-12 col-md-5'>
                    <label for = 'ward'>Ward</label>
                    <input type = 'text' class = 'form-control' placeholder = 'Ward' :value="missionary.ward" :id="'ward-'+internal_missionaries[index]._id"/>
                </div>
                <div class = 'col-6 col-sm-6 col-md-1'>
                    <a id = 'delete' @click="deleteInternalMissionary(internal_missionaries[index])" class = 'btn btn-primary btn-block mt-4'>Delete</a>
                </div>
                <div class = 'col-6 col-sm-6 col-md-1'>
                    <a :id="'update-'+internal_missionaries[index]._id" @click="updateInternalMissionary(internal_missionaries[index])" class = 'btn btn-primary btn-block mt-4'>Update</a>
                </div>
                <hr class = 'd-block d-sm-block d-md-none my-3'/>
            </div>
            
            <div class = "row">
                <div class = 'col-sm-auto'>
                    <a @click="createInternalMissionary" class = 'btn btn-secondary btn-block mt-4'>Add</a>
                </div>
            </div>
        </form>
        </div>
        <div class = 'card my-4 p-5'>
            <h1 class = 'text-center m-0'>External Missionaries</h1>
            <hr/>
            <form>
                <h2 class = 'text-center'>Edit Missionary Companionships</h2>
                <div v-for = '(missionary, index) in external_missionaries' :key = 'index' class = 'row'>
                    <div class = 'col-6 col-sm-6 col-md-2'>
                        <label for = 'email'>Email</label>
                        <input type = 'text' class = 'form-control' placeholder = 'Email' :value="missionary.email" :id="'email-'+external_missionaries[index]._id" />
                    </div>
                    <div class = 'col-6 col-sm-6 col-md-2'>
                        <label for = 'name'>Name</label>
                        <input type = 'text' class = 'form-control' placeholder = 'Name' :value="missionary.name" :id="'name-'+external_missionaries[index]._id"/>
                    </div>
                    <div class = 'col-4 col-sm-4 col-md-2'>
                        <label for = 'city'>City</label>
                        <input type = 'text' class = 'form-control' placeholder = 'City' :value="missionary.location.city" :id="'city-'+external_missionaries[index]._id"/>
                    </div>
                    <div class = 'col-4 col-sm-4 col-md-2'>
                        <label for = 'state'>State</label>
                        <input type = 'text' class = 'form-control' placeholder = 'State' :value="missionary.location.state" :id="'state-'+external_missionaries[index]._id"/>
                    </div>
                    <div class = 'col-4 col-sm-4 col-md-2'>
                        <label for = 'country'>Country</label>
                        <input type = 'text' class = 'form-control' placeholder = 'Country' :value="missionary.location.country" :id="'country-'+external_missionaries[index]._id"/>
                    </div>
                    <div class = 'col-6 col-sm-6 col-md-1'>
                        <a id = 'delete' @click="deleteExternalMissionary(external_missionaries[index])" class = 'btn btn-primary btn-block mt-4'>Delete</a>
                    </div>
                    <div class = 'col-6 col-sm-6 col-md-1'>
                        <a :id="'update-'+external_missionaries[index]._id" @click="updateExternalMissionary(external_missionaries[index])" class = 'btn btn-primary btn-block mt-4'>Update</a>
                    </div>
                    <hr class = 'd-block d-sm-block d-md-none my-3'/>
                </div>
                <div class = "row">
                    <div class = 'col-sm-auto'>
                        <a @click="createExternalMissionary" class = 'btn btn-secondary btn-block mt-4'>Add</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
</style>