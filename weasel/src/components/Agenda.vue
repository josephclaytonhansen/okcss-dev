<script setup>

import {reactive, ref, onMounted} from 'vue'
import 'add-to-calendar-button'

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
const today_events = ref(null)

onMounted(() => {
    getToday()
    let month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    month_name.value.textContent = month_names[today.month-1]
    day.value.textContent = " - " + today.day + " - "
    

})

const eventsWithinAWeek = (events) => {
    let today = new Date()
    let weekFromToday = new Date(today.getTime() + 2592000000)
    let eventsWithinAWeek = []
    if (events === null) {
        return []
    } else if (events.length === 0) {
        return []
    } else {
    for (let i = 0; i < events.length; i++) {
        let eventDate = new Date(events[i].time.start)
        if (eventDate <= weekFromToday) {
            eventsWithinAWeek.push(events[i])
        }
    }
    return eventsWithinAWeek
}
    
}



const prettifyDate = (date) => {
    //convert 2023-09-29 10:00 to Sep. 29, 10:00 AM
    let dates = [date.start, date.end]
    let prettyDates = []
    dates.forEach(date => {
        let d = new Date(date)
        let month = d.getMonth()
        let month_short_names = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
        month = month_short_names[month]
        let day = d.getDate()
        let hour = d.getHours()
        let minute = d.getMinutes()
        let ampm = 'AM'
        if (hour > 12) {
            hour = hour - 12
            ampm = 'PM'
        }
        if (minute < 10) {
            minute = '0' + minute
        }
        let prettyDate = month + " " + day + ', ' + hour + ':' + minute + ' ' + ampm
        prettyDates.push(prettyDate)
    })

    return prettyDates[0] + ' - ' +prettyDates[1]
}

</script>

<template>
    <div class="agenda column flex-evenly">
        <div class = "today col-shrink">
            <h2 ref = "day"></h2>
            <h3 ref = "month_name"></h3>
        </div>
        <div class = "events col-grow">
                <div class = "event" v-for = "event in eventsWithinAWeek(props.events)">
                    <div class = "row" id = "title-and-add">
                        <div class = "no-margin"><b><h3 class="event-title">{{event.title}}</h3></b><h4>{{ prettifyDate(event.time) }}</h4></div>
                        <add-to-calendar-button
                        :name="event.title"
                        label="Add to my calendar"
                        :description="event.description"
                        :startDate="event.time.start.split(' ')[0]"
                        :startTime="event.time.start.split(' ')[1]"
                        :endDate="event.time.end.split(' ')[0]"
                        :endTime="event.time.end.split(' ')[1]"
                        timeZone="America/Chicago"
                        options="'Apple','Google','iCal','Outlook.com','Yahoo','Microsoft365','MicrosoftTeams'"
                        buttonStyle="flat"
                        trigger="click"
                        size="1"
                        pastDateHandling="hide"
                        hideBackground
                        ></add-to-calendar-button>
                    </div>
                    <p class = "event-description">{{ event.description }}</p>
                    <hr class = "m-n"/>
                </div>
                
    </div>
    </div>
</template>

<style scoped>
hr{
    margin-top:2rem;
    margin-bottom:2rem;
}

hr.m-n{
    margin-top:.25rem;
    margin-bottom:.5rem;
}

.agenda {
    height: 95%;
    width: calc(100% - 4rem);
    margin-left:2rem;
    background-color: var(--active-color);
    border-radius: 5px;
    padding: 1rem;
}
@media screen and (max-width: 1700px) {
    #title-and-add{
        flex-direction:column;
    }
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
    overflow-y:auto;
    overflow-x:hidden;
}

.event{
    list-style: none;
    padding-inline-start: 0;
}

.today{
    text-align: center;
    margin-bottom: 2rem;
}

.today h2 {
    font-size: 400%;
    font-weight: 500;
    margin-bottom:0;
    margin-top:0;
}

.today h3 {
    margin-bottom:-1rem;
    margin-top:-1rem;
    font-size: 200%;
    font-weight: 500;
}

.atcb-button{
    background-color: var(--active-color)!important;
    margin-bottom:8px;
    box-shadow:none;
    outline:none;
    border:none;
    color: var(--off-white)!important;
    border-radius: 5px;
}

.no-margin h3, .no-margin h4{
    margin-bottom:0;
    margin-top:0;
}

.no-margin{
    min-width:fit-content;
}
</style>