<script setup>

import {reactive, ref, onMounted} from 'vue'

const props = defineProps({
    events: Array,
    ward: String,
})

const today = reactive({
    day: '',
    month: '',
    year: '',
    string: ''
})

const getToday = () => {
    let d = new Date()
    today.day = d.getDate()
    today.month = d.getMonth() + 1
    today.year = d.getFullYear()
}

const day = ref(null)
const month_name = ref(null)

onMounted(() => {
    getToday()
    let month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    month_name.value.textContent = month_names[today.month-1]
    day.value.textContent = " - " + today.day + " - "
})

const getTodaysEvents = () => {
    let events = props.events
    let todaysEvents = []
    if (events){
        //sort events by time.start
        events.sort((a,b) => {
            let aTime = new Date(a.time.start)
            let bTime = new Date(b.time.start)
            return aTime - bTime
        })
        //push the first three events during or after today to nextThreeEvents
        for (let i = 0; i < events.length; i++){
            let event = events[i]
            let eventDate = new Date(event.time.start)
            eventDate.setDate(eventDate.getDate() - 1)
            if (eventDate >= new Date(today.year, today.month-1, today.day)){
                todaysEvents.push(event)
            }
            if (todaysEvents.length === 3){
                break
            }
        }


    }
    return todaysEvents
}

</script>

<template>
    <div class="agenda column flex-evenly">
        <div class = "today col-shrink">
            <h2 ref = "day"></h2>
            <h3 ref = "month_name"></h3>
        </div>
        <hr style = "width:90%; margin-top:2rem;margin-bottom:2rem;"/>
        <div class = "events col-grow">
            <ul>
                <li class = "event" v-for = "event in getTodaysEvents()">
                    <h3 class="event-title">{{event.title}}</h3>
                    <p class = "event-description">{{ event.description }}</p>
                </li>
            </ul>
    </div>
    </div>
</template>

<style>
.agenda {
    height: 95%;
    width: calc(100% - 4rem);
    margin-left:2rem;
    background-color: var(--active-color);
    border-radius: 5px;
    padding: 1rem;
}

@media screen and (max-width: 1000px) {
    .agenda {
        min-height:500px;

    }
}

.today * {
    color: var(--off-white)!important;
}

.events{
    background-color: var(--off-white);
    border-radius:5px;
    padding:1rem;
    width: 90%;
}

.today{
    text-align: center;
}

.today h2 {
    font-size: 500%;
    font-weight: 500;
    margin-bottom:0;
    margin-top:0;
}

.today h3 {
    margin-bottom:0;
    margin-top:-1rem;
    font-size: 200%;
    font-weight: 500;
}
</style>