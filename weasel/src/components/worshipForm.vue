<script setup>
import { ref, reactive, watch, inject } from 'vue'
import axios from 'axios'

const form = ref(reactive({
  ward: '',
  location: {
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  },
  time: '',
  googleMapsLink: '',
  image: {
    src: '',
    alt: '',
    width: '',
    class: ''
  }
}))

const toast = inject('toast')

const submitForm = () => {
  axios.post('http://localhost:5220/api/worships', form.value)
  .then((response) => {
    console.log(response)
    toast.success('Worship details saved successfully')

  })
  .catch((error) => {
    console.log(error)
    toast.error(error.message || error.error || 'Error saving worship details')

  })
}

</script>

<template>
    <section class = "form-container">
        <h2>Worship details form</h2>
        <form class = "form" method="post"
        :action = "() => submitForm()"
        >
            <div class = "form-group">
                <label for = "ward">Ward</label>
                <select id = "ward" v-model = "form.location.ward">
                    <option value = "Choctaw">Choctaw</option>
                    <option value = "Midwest City">Midwest City</option>
                    <option value = "Oklahoma City 2nd">Oklahoma City 2nd</option>
                    <option value = "Moore">Moore</option>
                    <option value = "Oklahoma City 6th Branch">Oklahoma City 6th Branch</option>
                    <option value = "Mustang 2nd">Mustang 2nd</option>
                    <option value = "Mustang 1st">Mustang 1st</option>
                </select>
            </div>
            <div class = "row flex flex-between wrap">
                <div class = "col-3 col-grow fwc">
                    <div class = "form-group">
                        <label for = "address">Address</label>
                        <input type = "text" id = "address" v-model = "form.location.address">
                    </div>
                </div>
                <div class = "col-3 col-grow fwc">
                    <div class = "form-group">
                        <label for = "city">City</label>
                        <input type = "text" id = "city" v-model = "form.location.city">
                    </div>
                </div>
                <div class = "col-3 col-grow fwc">
                    <div class = "form-group">
                        <label for = "state">State</label>
                        <input type = "text" id = "state" v-model = "form.location.state">
                    </div>
                </div>
                <div class = "col-3 col-grow fwc">
                    <div class = "form-group">
                        <label for = "zip">Zip</label>
                        <input type = "text" id = "zip" v-model = "form.location.zip">
                    </div>
                </div>
            </div>
            <div class = "row flex-between wrap">
                <div class = "col-6 col-grow fwc">
                    <div class = "form-group">
                        <label for = "phone">Phone</label>
                        <input type = "text" id = "phone" v-model = "form.location.phone">
                    </div>
                </div>
                <div class = "col-6 col-grow fwc">
                    <div class = "form-group">
                        <label for = "googleMapsLink">Google Maps Link</label>
                        <input type = "text" id = "googleMapsLink" v-model = "form.googleMapsLink">
                    </div>
                </div>
            </div>
            <div class = "form-group">
                <label for = "time">Time</label>
                <input type = "text" id = "time" v-model = "form.time">
            </div>
        </form>
    </section>
</template>

<style>
    .form-group{
        width: 100%;
        margin-bottom: 1rem;
        display: flex;
        gap: 1rem;
    }
    .form-group input{
        flex-grow: 1;
    }
</style>