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
        config: {
          defaultMode: 'month'
        }
    }
}
</script>
  
  <style>
  @import '../../node_modules/qalendar/dist/style.css';
  
  .calendar-wrapper {
    width: 99%;
    height:70vh;
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