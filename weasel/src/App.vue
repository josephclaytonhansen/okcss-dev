<script setup>
import DarkModeToggle from './components/DarkModeToggle.vue'
import { reactive, ref, watch } from 'vue'

const darklight = ref(
  localStorage.getItem('darklight') || 'light'
)


import Ward from './components/Ward.vue'

const color_classes = reactive([
  "c1 card_base",
  "c2 card_base",
  "c3 card_base",
  "c4 card_base",
  "c5 card_base",
  "c6 card_base",
  "c7 card_base"
])

</script>

<template>
    <body :class = 'darklight'>
      <div class = "container page">
      <DarkModeToggle :darklight = 'darklight' @update = '(data) => darklight = data'/>
        <Ward
          :ward="'Choctaw'"
          :worship="{location: {address: '1234 Main St.', city: 'Moore', state: 'OK', zip: '73160', phone:'206-532-3424'}, time: '9:00 AM', googleMapsLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3249.59814103584!2d-97.24671699999999!3d35.464742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b23093a17bdc31%3A0x543828f5293ab9be!2sThe%20Church%20of%20Jesus%20Christ%20of%20Latter-day%20Saints!5e0!3m2!1sen!2sus!4v1693599274869!5m2!1sen!2sus', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '', class: 'church-img'}}"
          :organizations="['Bishopric', 'Elder\'s Quorum', 'Relief Society', 'Primary', 'Young Women\'s', 'Young Men\'s','Ward Missionaries']"
          :contacts="[
            {id: 1, name: 'John R. Doe', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '100%', class: 'person-img square'}, position: 'Bishop', email: 'email@email.com', phone: '555-205-4222', size:'full', organization: 'Bishopric'},
            {id: 2, name: 'John Bing', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '100%', class: 'person-img square'}, position: 'First Counselor', email: 'email2@email.com', phone: '205-555-5020', size:'full', organization: 'Bishopric'},
            {id: 3, name: 'John Smith', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '100%', class: 'person-img square'}, position: 'Second Counselor', email: 'email3@email.com', phone: '555-205-5442', size:'small', organization: 'Elder\'s Quorum'},
            {id: 3, name: 'John Smith', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '100%', class: 'person-img square'}, position: 'Second Counselor', email: 'email3@email.com', phone: '555-205-5442', size:'small', organization: 'Relief Society'},
            {id: 3, name: 'John Smith', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '100%', class: 'person-img square'}, position: 'Second Counselor', email: 'email3@email.com', phone: '555-205-5442', size:'small', organization: 'Elder\'s Quorum'},
            {id: 3, name: 'John Smith', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '100%', class: 'person-img square'}, position: 'Second Counselor', email: 'email3@email.com', phone: '555-205-5442', size:'small', organization: 'Relief Society'}
            ]"
            />
    </div>
  </body>
</template>

