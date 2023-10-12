<script setup>

import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
const props = defineProps(['reports'])
const weeks = ref([])
const weeksPartOne = ref([])
const weeksPartTwo = ref([])
const weeksPartThree = ref([]) 

const currentWeek = ref('')
const currentCounselor = ref('')
const enteredCounselor = ref('')

const isCurrentWeek = (week) => {
    return week === currentWeek.value
}

const isWeekWithReports = (week) => {
    return weeksWithReports.value.includes(week)
}

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
    try{
    weeksPartOne.value = weeks.value.slice(0, Math.ceil(weeks.value.length / 3))
    } catch {
        weeksPartOne.value = weeks.value
    }
    try{
    weeksPartTwo.value = weeks.value.slice(Math.ceil(weeks.value.length / 3), Math.ceil(weeks.value.length / 3) * 2)
    } catch {
        weeksPartTwo.value = []
    }
    try{
    weeksPartThree.value = weeks.value.slice(Math.ceil(weeks.value.length / 3) * 2, weeks.value.length)
    } catch {
        weeksPartThree.value = []
    }
}

onMounted(() => {
    setUpWeeks()
    //set currentWeek to the most recent week
    currentWeek.value = weeks.value[0]
    currentCounselor.value = 'All'
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

const setCurrentWeekFromDropdown = (week) => {
    currentWeek.value = week
}

const filteredReports = computed(() => {
    //this should have two filters; current week and counselor
    let currentWeekFilter = props.reports.filter(report => {
        return report.week === currentWeek.value
    })
    let currentCounselorFilter = currentWeekFilter.filter(report => {
        return report.counselor === currentCounselor.value
    })
    // perform an AND operation on the two filters
    let combinedFilter = currentWeekFilter.filter(report => {
        return currentCounselorFilter.includes(report)
    })
    if (currentCounselor.value === 'All') {
        combinedFilter = currentWeekFilter
    }
    return combinedFilter

})

const allCounselors = computed(() => {
    let counselors = []
    props.reports.forEach(report => {
        if (!counselors.includes(report.counselor)) {
            counselors.push(report.counselor)
        }
    })
    return counselors
})

const weeksWithReports = computed(() => {
    let weeksWithReports = []
    props.reports.forEach(report => {
        if (!weeksWithReports.includes(report.week)) {
            weeksWithReports.push(report.week)
        }
    })
    return weeksWithReports
})

const createReport = () => {
    let newReport = {
        week: currentWeek.value,
        counselor: enteredCounselor.value,
        content_text: document.querySelector('#reportContent').value
    }
    let response = axios.post('https://weasel.okcsouthstake.org/api/hc-reports/create/new', newReport).then(response => {
        if (response.status === 200) {
        //if the report was created successfully, add it to the reports array
        props.reports.push(newReport)
        //change Save button text to Saved! and class to btn-success
        document.querySelector('#create-new-report').innerHTML = 'Saved!'
        document.querySelector('#create-new-report').classList.remove('btn-primary')
        document.querySelector('#create-new-report').classList.add('btn-success')
        //wait 2 seconds, then close the modal
        setTimeout(() => {
            document.querySelector('#close-modal').click()
        }, 1900)
    }
    })
}

const deleteReport = (id) => {
    let response = axios.delete(`https://weasel.okcsouthstake.org/api/hc-reports/${id}`).then(response => {
        if (response.status === 200) {
            //if the report was deleted successfully, remove it from the reports array
            props.reports = props.reports.filter(report => {
                return report.id !== id
            })
        }
    })
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
                    <div class = "col-2">
                        <button class = "btn btn-info"  data-bs-toggle="modal" data-bs-target="#exampleModal">New</button>
                    </div>
                    <div class = "col-4 px-4">
                        <div class="dropdown-counselor">
                            <button class="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{currentCounselor}}
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" @click = "currentCounselor = 'All'">All</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li v-for = "counselor in allCounselors" :key = "counselor"><a class="dropdown-item" @click = "currentCounselor = counselor">{{counselor}}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class = "col-6">
                        <div class = "row align-items-center" style = "flex-wrap:nowrap" id = "week-buttons">
                            <div class = "col px-0 week-button">
                                <a class = "btn btn-info" @click = "decrementCurrentWeek">&#9664;</a>
                            </div>
                            <div class ="dropdown-weeks col px-1 week-button">
                            <button class="btn btn-info dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {{currentWeek}}
                            </button>
                            <ul class="dropdown-menu" id = "weeks-items">
                                <div class = "row">
                                    <div class = "col-12 col-sm-12 col-md-4">
                                        <li v-for = "week in weeksPartOne" :key = "week"><a class="dropdown-item" @click = "setCurrentWeekFromDropdown(week)">
                                        <div v-if = "isCurrentWeek(week)" class = "current-week-indicator"></div>
                                        <div v-if = "isWeekWithReports(week)" class = "week-with-reports-indicator"></div>
                                        {{week}}
                                        </a></li>
                                    </div>
                                    <div class = "col-12 col-sm-12 col-md-4">
                                        <li v-for = "week in weeksPartTwo" :key = "week"><a class="dropdown-item" @click = "setCurrentWeekFromDropdown(week)">
                                        <div v-if = "isCurrentWeek(week)" class = "current-week-indicator"></div>
                                        <div v-if = "isWeekWithReports(week)" class = "week-with-reports-indicator"></div>
                                        {{week}}
                                        </a></li>
                                    </div>
                                    <div class = "col-12 col-sm-12 col-md-4">
                                        <li v-for = "week in weeksPartThree" :key = "week"><a class="dropdown-item" @click = "setCurrentWeekFromDropdown(week)">
                                        <div v-if = "isCurrentWeek(week)" class = "current-week-indicator"></div>
                                        <div v-if = "isWeekWithReports(week)" class = "week-with-reports-indicator"></div>
                                        {{week}}
                                        </a></li>
                                    </div>
                                </div>
                            </ul>
                        </div>
                            <div class = "col px-0 week-button">
                                <a class = "btn btn-info" @click = "incrementCurrentWeek">&#9654;</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr style = "width:103.5%"/>

        <div class = "reports-container">
            <table class = "table table-striped table-sm">
                <colgroup>
                        <col style = "width:10%"/>
                        <col style = "width:10%"/>
                        <col style = "width:80%"/>
                    </colgroup>
                <thead>
                    <tr>
                        <th scope = "col">Week</th>
                        <th scope = "col">Counselor</th>
                        <th scope = "col">Content</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for = "report in filteredReports" :key = "report.id">
                        <td>{{report.week}}</td>
                        <td>{{report.counselor}}</td>
                        <td>
                            <details>
                                <summary>View</summary>
                                <div v-html = "report.content_text" :id="report.id" class = "report-content"/>
                                <hr/>
                                <button class = "btn btn-danger small" @click = "deleteReport(report.id)">Delete</button>
                            </details>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>        

    </div>
    <div class="modal" id = "exampleModal" tabindex="-1">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-3">Create new report</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="input-group mb-3">
                        <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                        <ul class="dropdown-menu">
                            <li v-for = "counselor in allCounselors" :key = "counselor"><a class="dropdown-item" @click = "enteredCounselor = counselor">{{counselor}}</a></li>
                        </ul>
                        <label class="input-group-text" for="inputGroupSelect01">Counselor</label>
                        <input type="text" class="form-control" aria-label="Counselor entry with dropdown" v-model="enteredCounselor">
                    </div>
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupSelect01">Week</label>
                        <select class="form-select" id="inputGroupSelect01">
                            <option v-for = "week in weeks" :key = "week" :selected = "week == weeks[0]">{{week}}</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <span class="input-group-text align-items-start">Content</span>
                        <textarea class="form-control" aria-label="With textarea" aria-describedby="contentHelp" id ="reportContent"></textarea>
                        
                    </div>
                    <div id="contentHelp" class="form-text">
                            <p>Enter the content of the report here. This is a plain text editor- however, you can use HTML formatting to format the text. The simplest option is to paste your report in from your normal text editor (i.e. Microsoft Word, Google Docs, etc).</p>
                            <details>
                                <summary>Click here to see simple HTML formatting</summary>
                                <p>Use <code>&lt;b&gt;bold text&lt;/b&gt;</code> for bold text, <code>&lt;i&gt;italicized text&lt;/i&gt;</code> for italicized text, and <code>&lt;u&gt;underlined text&lt;/u&gt;</code> for underlined text.
                            For line breaks, use <code>&lt;br&gt;</code>.</p>
                            <p>For headings, use <code>&lt;h1&gt;heading&lt;/h1&gt;</code>, <code>&lt;h2&gt;heading&lt;/h2&gt;</code>, etc,  through <code>&lt;h6&gt;heading&lt;/h6&gt;</code>.</p>

                            <p>For lists, use <code>&lt;ul&gt;&lt;li&gt;list item 1&lt;/li&gt;&lt;li&gt;list item 2&lt;/li&gt;&lt;/ul&gt;</code>.</p>
                            <p>If you prefer, you can use a site such as this: <a target="_blank" href = "https://onlinehtmleditor.dev/">https://onlinehtmleditor.dev/</a> to write rich text, then copy the HTML output (click 'edit HTML source code') over to here, or you can convert Word documents to HTML tags here: <a target = "_blank" href = "https://convertio.co/docx-html/">https://convertio.co/docx-html/</a></p>
                            <p>If you use Google Docs, you can export your file as HTML, and copy that over to here.</p>
                            </details>
                            <br/>

                        </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id = "close-modal">Close</button>
                <button type="button" class="btn btn-primary" id = "create-new-report" @click="createReport">Save changes</button>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
pre, code{
    display:inline;
    
}

.current-week-indicator{
    display:inline-block;
    width:.5rem;
    height:.5rem;
    position:absolute;
    margin-left: -.8rem;
    border:solid 2px var(--bs-info);
    border-radius:50%;
    margin-top: .55rem;
    float:left;
}
.week-with-reports-indicator{
    display:inline-block;
    position:absolute;
    width:.5rem;
    margin-left: -.8rem;
    height:.5rem;
    background-color:var(--bs-success);
    border-radius:50%;
    margin-top: .55rem;
    float:left;
}

@media screen and (max-width: 1000px) {
    #week-buttons {
        margin-left:-4rem;
    }
    .report-content{
        width:120%;
        margin-left: -30%;
        margin-top: 10%;
    }
}
</style>