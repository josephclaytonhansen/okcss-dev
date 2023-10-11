<script setup>

import { ref, onMounted } from 'vue'
const props = defineProps(['reports'])
const weeks = ref([])
const weeksPartOne = ref([])
const weeksPartTwo = ref([])
const weeksPartThree = ref([])

const currentWeek = ref('')

const setUpWeeks = () => {
    //Format is Jan 1 - Jan 7
    // get the current year
    const currentYear = new Date().getFullYear()
    // get the first day of the year
    const firstDayOfYear = new Date(currentYear, 0, 1)
    // get the last day of the year
    const lastDayOfYear = new Date(currentYear, 11, 31)

    //loop over the weeks
    for (let i = firstDayOfYear; i <= lastDayOfYear; i.setDate(i.getDate() + 7)) {
        let currentMonth = i.getMonth()
        //get the start date of the week
        const weekStartDate = new Date(i)
        //get the end date of the week
        const weekEndDate = new Date(i)
        weekEndDate.setDate(weekEndDate.getDate() + 6)
        //format the start date
        const formattedWeekStartDate = weekStartDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
        //format the end date
        const formattedWeekEndDate = weekEndDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})
        //add the week to the weeks array
        weeks.value.push(`${formattedWeekStartDate} - ${formattedWeekEndDate}`)

    }
    
    //remove weeks from weeks that haven't happened yet
    const today = new Date()
    weeks.value = weeks.value.filter(week => {
        //get the week's start date
        const weekStartDate = new Date(week.split(' - ')[0])
        //add current year 
        weekStartDate.setFullYear(currentYear)
        //return true if the week's start date is before today
        return weekStartDate < today
    })

    //reverse the weeks array so that the most recent week is first
    weeks.value = weeks.value.reverse()


    //divide weeks into three parts
    weeksPartOne.value = weeks.value.slice(0, Math.ceil(weeks.value.length / 3))
    weeksPartTwo.value = weeks.value.slice(Math.ceil(weeks.value.length / 3), Math.ceil(weeks.value.length / 3) * 2)
    weeksPartThree.value = weeks.value.slice(Math.ceil(weeks.value.length / 3) * 2, weeks.value.length)
}

onMounted(() => {
    setUpWeeks()
    //set currentWeek to the most recent week
    currentWeek.value = weeks.value[0]
})

const decrementCurrentWeek = () => {
    //get the index of the current week
    const currentWeekIndex = weeks.value.indexOf(currentWeek.value)
    //if the current week is not the last week
    if (currentWeekIndex !== weeks.value.length - 1) {
        //set current week to the next week
        currentWeek.value = weeks.value[currentWeekIndex + 1]
    }
}

const incrementCurrentWeek = () => {
    //get the index of the current week
    const currentWeekIndex = weeks.value.indexOf(currentWeek.value)
    //if the current week is not the first week
    if (currentWeekIndex !== 0) {
        //set current week to the previous week
        currentWeek.value = weeks.value[currentWeekIndex - 1]
    }
}

</script>

<template>
    <div class = "container py-5">
        <div class = "row justify-content-between align-items-center">
            <div class = "col-12 col-sm-12 col-md-4">
                <h1>High Council Reports</h1>
            </div>
            <div class = "col-12 col-sm-12 col-md-auto">
                <div class = "row align-items-center" style = "margin-top:-.6rem;">
                    <div class = "col-6 px-5">
                        <div class="dropdown-counselor">
                            <button class="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Counselor
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">All</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class = "col-6">
                        <div class = "row align-items-center" style = "flex-wrap:nowrap">
                            <div class = "col px-0">
                                <a class = "btn btn-info" @click = "decrementCurrentWeek">&#9664;</a>
                            </div>
                            <div class ="dropdown-weeks col px-1">
                            <button class="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{currentWeek}}
                            </button>
                            <ul class="dropdown-menu" id = "weeks-items">
                                <div class = "row">
                                    <div class = "col-4">
                                        <li v-for = "week in weeksPartOne" :key = "week"><a class="dropdown-item" href="#">{{week}}</a></li>
                                    </div>
                                    <div class = "col-4">
                                        <li v-for = "week in weeksPartTwo" :key = "week"><a class="dropdown-item" href="#">{{week}}</a></li>
                                    </div>
                                    <div class = "col-4">
                                        <li v-for = "week in weeksPartThree" :key = "week"><a class="dropdown-item" href="#">{{week}}</a></li>
                                    </div>
                                </div>
                            </ul>
                        </div>
                            <div class = "col px-0">
                                <a class = "btn btn-info" @click = "incrementCurrentWeek">&#9654;</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr style = "width:102%"/>
    </div>
</template>