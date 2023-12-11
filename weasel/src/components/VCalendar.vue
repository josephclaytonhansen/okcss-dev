<template>
    <div class = "calendar-wrapper">
        <Qalendar 
        :events="events"
        :config="config"
        />
    </div>
</template>

<script>
import { Qalendar } from "qalendar";

export default {
    name: 'VCalendar',
    components: {
        Qalendar
    },
    props: {
      events: Array,
    },

    data() { return {
        config: {
          defaultMode: 'week',
          isSilent: true,
          showCurrentTime: true,
          week: {
            startsOn: 'sunday',
            scrollToHour: 10
          },
          dayBoundaries: {
            start: 6,
            end: 23
          }
        }
    }
}}
</script>
  
  <style>
  @import '../../node_modules/qalendar/dist/style.css';
  
  .calendar-wrapper {
    width: 99%;
    height:80vh;
    --qalendar-theme-color: var(--active-color);
  }

.calendar-wrapper *{
    font-family: 'Mulish'
}

.calendar-month__event-title{
    max-width: 65%;
}

  .calendar-wrapper .is-today .week-timeline__date{
    background-color: var(--active-color)!important;
    color: var(--off-white);
  }

  .calendar-month__weekday.is-today .calendar-month__day-date{
    background-color: var(--active-color)!important;
  }
  </style>