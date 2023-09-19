<script setup>
import Ward from '../components/Ward.vue'
import axios from 'axios'
import { onBeforeMount, onMounted, onRenderTriggered, reactive } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
//create a tools object, which will be passed to the Ward component, and get the data from the API using onMounted
const tools = reactive({
    data: null,
})
const events = reactive({
    data: null,
})

const events_by_category = reactive({
    data: null,
})

const contacts = reactive({
    data: null,
})

const worship = reactive({
    data: null,
})

function splitEventsByCategory(events) {
  let primary = []
  let ward = []
  let relief_society = []
  let ywmym = []
  let elders_quorum = []
  let cat_match = {
    'primary': primary,
    'ward': ward,
    'relief society': relief_society,
    'ywym': ywmym,
    'elder\'s quorum': elders_quorum
  }
  events.forEach((event) => {
    cat_match[event.category].push(event)
  })
  return cat_match
}


onBeforeMount(async () => {

        const ward = route.params.ward
        const tools_response = await axios.get('https://weasel.okcsouthstake.org//api/tools/ward/' + ward)
        tools.data = tools_response.data[0]
        const events_response = await axios.get('https://weasel.okcsouthstake.org//api/events/ward/' + ward).then((response) => {
          events.data = response.data
          events.data = splitEventsByCategory(response.data)
        })

        const contacts_response = await axios.get('https://weasel.okcsouthstake.org//api/persons/ward/' + ward)
        console.log(contacts_response.data)
        contacts.data = contacts_response.data
        const worship_response = await axios.get('https://weasel.okcsouthstake.org//api/worships/ward/' + ward).then((response) => {
            worship.data = response.data[0]
        })
})

</script>

<template>
    <Ward
          :ward="$props.ward"
          :tools="tools.data"
          :events="events.data"
          :worship="worship.data"
          :organizations="['Bishopric', 'Elder\'s Quorum', 'Relief Society', 'Primary', 'Young Women\'s', 'Young Men\'s']"
          :contacts="contacts.data"
            />
</template>