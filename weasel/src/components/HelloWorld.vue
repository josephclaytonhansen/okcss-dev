<script setup>
import { reactive, ref, watch } from 'vue'

import List from './List.vue'
import WardCard from './WardCard.vue'

import Ward from './Ward.vue'

const awesome = ref(true)
const msg = ref('Hello World!')
const css_class = ref('')
const childMsg = ref('')

const wards = reactive([
  "Choctaw",
  "Midwest City",
  "Oklahoma City 2nd",
  "Moore",
  "Oklahoma City 6th Branch",
  "Mustang 2nd",
  "Mustang 1st"
])

const color_classes = reactive([
  "c1 card_base",
  "c2 card_base",
  "c3 card_base",
  "c4 card_base",
  "c5 card_base",
  "c6 card_base",
  "c7 card_base"
])

function toggle() {
  awesome.value = !awesome.value
}

function logAwesome() {
  console.log(awesome.value)
  msg.value = 'Button has been clicked'
}

watch(awesome, logAwesome)
</script>

<template>

  
  <Ward
  :ward="'Choctaw'"
  :organizations="['Bishopric', 'Elder\'s Quorum', 'Relief Society', 'Primary', 'Young Women\'s', 'Young Men\'s','Ward Missionaries']"
  :contacts="[
    {id: 1, name: 'John R. Doe', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '100%', class: 'person-img square'}, position: 'Bishop', email: 'email@email.com', phone: '555-205-4222', size:'full', organization: 'Bishopric'},
    {id: 2, name: 'John Bing', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '100%', class: 'person-img square'}, position: 'First Counselor', email: 'email2@email.com', phone: '205-555-5020', size:'full', organization: 'Bishopric'},
    {id: 3, name: 'John Smith', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '100%', class: 'person-img square'}, position: 'Second Counselor', email: 'email3@email.com', phone: '555-205-5442', size:'small', organization: 'Elder\'s Quorum'},
    {id: 3, name: 'John Smith', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '100%', class: 'person-img square'}, position: 'Second Counselor', email: 'email3@email.com', phone: '555-205-5442', size:'small', organization: 'Relief Society'},
    {id: 3, name: 'John Smith', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '100%', class: 'person-img square'}, position: 'Second Counselor', email: 'email3@email.com', phone: '555-205-5442', size:'small', organization: 'Elder\'s Quorum'},
    {id: 3, name: 'John Smith', image: {src: 'https://picsum.photos/200/300', alt: 'random image', width: '100%', class: 'person-img square'}, position: 'Second Counselor', email: 'email3@email.com', phone: '555-205-5442', size:'small', organization: 'Relief Society'}
    ]"/>



<details>
    <h1>{{ msg }}</h1>
  <h2>{{ childMsg }}</h2>
  <button @click="toggle">toggle</button>
  <h3 v-if="awesome">Vue is awesome!</h3>
  <h3 v-else>Oh no 😢</h3>
  <List :class="css_class" @update_class="(data) => childMsg = data">
    <template #content>
      <p>{{ msg }}</p>
    </template>
    <template #content2>
      <p>From parent to child</p>
    </template>
  </List>
  <div class = "container">
    <div class = "row flex-between">
      <div class = "col-grow">
  <div class="row wrap flex-between stretch">
    <WardCard v-for="(ward, index) in wards" :key="index" :name="ward" :color_class="color_classes[index]"></WardCard>
  </div>
</div>
</div>
</div>
  </details>
</template>
