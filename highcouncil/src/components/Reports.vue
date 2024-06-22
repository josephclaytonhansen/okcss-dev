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

const UnitAttended = ref('')
const ReleasesIssued = ref('')
const CallingsExtended = ref('')
const PulpitBusinessReleases = ref('')
const PulpitBusinessSustainings = ref('')
const OrdainingsAndSettingsApart = ref('')
const MeetingInformation = ref('')

const emails = ref([])


const updateEmails = async () => {
    let response = axios.post('https://weasel.okcsouthstake.org/api/hc-reports/emails', emails.value).then(response => {
    })
}

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

onMounted(async () => {
    setUpWeeks()
    //set currentWeek to the most recent week
    currentWeek.value = weeks.value[0]
    currentCounselor.value = 'All'
    try {
        emails.value = await axios.get('https://weasel.okcsouthstake.org/api/hc-reports/emails').then(response => {
            return response.data
        })
    } catch {
        emails.value = []
    }
})

const addEmail = () => {
    emails.value.push(newEmail.value)
    newEmail.value = ''
    updateEmails()
}

const deleteEmail = (index) => {
    emails.value.splice(index, 1)
    updateEmails()
}

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
        unit_attended: UnitAttended.value,
        releases_issued: ReleasesIssued.value,
        callings_extended: CallingsExtended.value,
        pulpit_business_releases: PulpitBusinessReleases.value,
        pulpit_business_sustainings: PulpitBusinessSustainings.value,
        ordainings_and_settings_apart: OrdainingsAndSettingsApart.value,
        meeting_information: MeetingInformation.value
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
    } else {
        document.querySelector('#create-new-report').innerHTML = 'Failed!'
        document.querySelector('#create-new-report').classList.remove('btn-primary')
        document.querySelector('#create-new-report').classList.add('btn-danger')
        console.log(response)
        setTimeout(() => {
            document.querySelector('#create-new-report').innerHTML = 'Save changes'
            document.querySelector('#create-new-report').classList.remove('btn-danger')
            document.querySelector('#create-new-report').classList.add('btn-primary')
        }, 1900)
    }
    })
}

const deleteReport = (id) => {
    document.querySelector(`#report-${id}`).style.display = 'none'
    let response = axios.delete(`https://weasel.okcsouthstake.org/api/hc-reports/${id}`).then(response => {
    })
}

const updateReport = () => {
    let id = document.querySelector('#report-id').value
    let updatedReport = {
        id: id,
        week: currentWeek.value,
        counselor: enteredCounselor.value,
        unit_attended: UnitAttended.value,
        releases_issued: ReleasesIssued.value,
        callings_extended: CallingsExtended.value,
        pulpit_business_releases: PulpitBusinessReleases.value,
        pulpit_business_sustainings: PulpitBusinessSustainings.value,
        ordainings_and_settings_apart: OrdainingsAndSettingsApart.value,
        meeting_information: MeetingInformation.value
    }
    let existing = axios.get(`https://weasel.okcsouthstake.org/api/hc-reports/${id}`).then(response => {
        console.log(response)
    })
    let response = axios.put(`https://weasel.okcsouthstake.org/api/hc-reports/${id}`, updatedReport).then(response => {
        if (response.status === 200) {
            document.querySelector('#edit-report').innerHTML = 'Saved!'
            document.querySelector('#edit-report').classList.remove('btn-primary')
            document.querySelector('#edit-report').classList.add('btn-success')
    }}).catch(error => {
        document.querySelector('#edit-report').innerHTML = 'Failed!'
        document.querySelector('#edit-report').classList.remove('btn-primary')
        document.querySelector('#edit-report').classList.add('btn-danger')
        console.log(error)
        setTimeout(() => {
            document.querySelector('#edit-report').innerHTML = 'Save changes'
            document.querySelector('#edit-report').classList.remove('btn-danger')
            document.querySelector('#edit-report').classList.add('btn-primary')
        }, 1900)
    })
}



const populateEditModal = (id) => {
    let report = props.reports.find(report => report._id === id)
    enteredCounselor.value = report.counselor
    document.querySelector('#unit-attended').value = report.unit_attended
    document.querySelector('#releases-issued').value = report.releases_issued
    document.querySelector('#callings-extended').value = report.callings_extended
    document.querySelector('#pulpit-business-releases').value = report.pulpit_business_releases
    document.querySelector('#pulpit-business-sustainings').value = report.pulpit_business_sustainings
    document.querySelector('#ordainings-and-settings-apart').value = report.ordainings_and_settings_apart
    document.querySelector('#meeting-information').value = report.meeting_information
    document.querySelector('#report-id').value = id
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
                    <div class = "col-12 col-sm-12 col-md-2">
                        <button class = "btn btn-info"  data-bs-toggle="modal" data-bs-target="#exampleModal">New</button>
                    </div>
                    <div class = "col-12 col-sm-12 col-md-4 px-4">
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
                    <div class = "col-12 col-sm-12 col-md-6">
                        <div class = "row align-items-center" style = "flex-wrap:nowrap" id = "week-buttons">
                            <div class = "col-3 col-sm-3 col-md-1 px-0 week-button">
                                <a class = "btn btn-info" @click = "decrementCurrentWeek">&#9664;</a>
                            </div>
                            <div class ="dropdown-weeks col-6 col-sm-6 col-md-10 px-1 week-button">
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
                            <div class = "col-3 col-sm-3 col-md-1 px-0 week-button">
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
                    <tr v-for = "report in filteredReports" :key = "report._id" :id="'report-' + report._id">
                        <td>{{report.week}}</td>
                        <td>{{report.counselor}}</td>
                        <td>
                            <details>
                                <summary>View</summary>
                                
                                    <p><strong>Unit Attended: </strong><span v-text = "report.unit_attended"></span></p>
                                    <p><strong>Releases Issued: </strong><span v-text = "report.releases_issued"></span></p>
                                    <p><strong>Callings Extended: </strong><span v-text = "report.callings_extended"></span></p>
                                    <p><strong>Pulpit Business (Releases): </strong><span v-text = "report.pulpit_business_releases"></span></p>
                                    <p><strong>Pulpit Business (Sustainings): </strong><span v-text = "report.pulpit_business_sustainings"></span></p>
                                    <p><strong>Ordainings and Settings Apart: </strong><span v-text = "report.ordainings_and_settings_apart"></span></p>
                                    <p><strong>Meeting Information: </strong><span v-text = "report.meeting_information"></span></p>
                                    

                                <hr/>
                                <button class = "btn btn-danger small" @click = "deleteReport(report._id)">Delete</button>
                                <button class = "btn btn-primary small ml-3" data-bs-toggle="modal" data-bs-target="#editModal" @click="populateEditModal(report._id)">Edit</button>
                            </details>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>
  <div class="emails">
    <div v-for="(email, index) in emails" :key="index">
      <input v-model="emails[index]" @input="updateEmails" />
      <button @click="deleteEmail(index)">Delete</button>
    </div>
    <div>
      <input v-model="newEmail" placeholder="Add new email" />
      <button @click="addEmail">Add</button>
    </div>
  </div>


    </div>

    <div class="modal" id = "editModal" tabindex="-1">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-3">Edit report</h1>
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
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="unit-attended">Unit Attended</label>
                        <input type="text" class="form-control" id="unit-attended" v-model="UnitAttended">
                    </div>
                    <div class="input-group">
                        <label class="input-group-text" for="releases-issued">Releases Issued</label>
                        <input type="text" class="form-control" id="releases-issued" v-model="ReleasesIssued">
                    </div>
                    <div class="input-group">
                        <label class="input-group-text" for="callings-extended">Callings Extended</label>
                        <input type="text" class="form-control" id="callings-extended" v-model="CallingsExtended">
                    </div>
                    <div class="input-group">
                        <label class="input-group-text" for="pulpit-business-releases">Pulpit Business (Releases)</label>
                        <input type="text" class="form-control" id="pulpit-business-releases" v-model = "PulpitBusinessReleases">
                    </div>
                    <div class="input-group">
                        <label class="input-group-text" for="pulpit-business-sustainings">Pulpit Business (Sustainings)</label>
                        <input type="text" class="form-control" id="pulpit-business-sustainings" v-model="PulpitBusinessSustainings">
                    </div>
                    <div class="input-group">
                        <label class="input-group-text" for="ordainings-and-settings-apart">Ordainings and Settings Apart</label>
                        <input type="text" class="form-control" id="ordainings-and-settings-apart" v-model="OrdainingsAndSettingsApart">
                    </div>
                    <div class="input-group">
                        <label class="input-group-text" for="meeting-information">Meeting Information</label>
                        <textarea class="form-control" id="meeting-information" rows="3" v-model="MeetingInformation"></textarea>
                    </div>
                    <input type="hidden" id = "report-id">
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id = "close-modal">Close</button>
                <button type="button" class="btn btn-primary" id = "edit-report" @click="updateReport">Save changes</button>
            </div>
            </div>
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
                    <div class="input-group mb-3">
                        <label class="input-group-text" for="unit-attended">Unit Attended</label>
                        <input type="text" class="form-control" id="unit-attended">
                    </div>
                    <div class="input-group">
                        <label class="input-group-text" for="releases-issued">Releases Issued</label>
                        <input type="text" class="form-control" id="releases-issued">
                    </div>
                    <div class="input-group">
                        <label class="input-group-text" for="callings-extended">Callings Extended</label>
                        <input type="text" class="form-control" id="callings-extended">
                    </div>
                    <div class="input-group">
                        <label class="input-group-text" for="pulpit-business-releases">Pulpit Business (Releases)</label>
                        <input type="text" class="form-control" id="pulpit-business-releases">
                    </div>
                    <div class="input-group">
                        <label class="input-group-text" for="pulpit-business-sustainings">Pulpit Business (Sustainings)</label>
                        <input type="text" class="form-control" id="pulpit-business-sustainings">
                    </div>
                    <div class="input-group">
                        <label class="input-group-text" for="ordainings-and-settings-apart">Ordainings and Settings Apart</label>
                        <input type="text" class="form-control" id="ordainings-and-settings-apart">
                    </div>
                    <div class="input-group">
                        <label class="input-group-text" for="meeting-information">Meeting Information</label>
                        <textarea class="form-control" id="meeting-information" rows="3"></textarea>
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
    .report-content{
        width:120%;
        margin-left: -30%;
        margin-top: 10%;
    }
    .btn, button{
        width:100%;
        margin-bottom:.25rem;
    }
}
</style>