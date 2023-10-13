<script setup>
    import 'balloon-css'
    import {ref, onMounted, onBeforeMount, reactive, computed, watch} from 'vue'
    import Image from '../components/Image.vue'
    import { Trash2 } from 'lucide-vue-next'
    import { useToast } from "vue-toastification"
    const toast = useToast()

    import axios from 'axios'

    const current_tab = ref("events")
    const weasel_img = ref(
        "data:image/png;base64,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"
    )

    watch(current_tab, (newValue, oldValue) => {
        localStorage.setItem("current_tab", newValue)
    })

const ward = ref("")
const organization = ref("")

const worship = reactive({
    id: '',
    ward: '',
    location: {
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
    },
    time: '',
    googleMapsLink: '',
    image: {
      src: '',
      alt: '',
      width: '',
      class: ''
    }
})

const tools = reactive({
    stri: '',
    sbu: '',
    sbmr: '',
    vtpc: '',
    sutftm: '',
})

const tool_id = ref('')

const tool_labels = reactive({
    stri: 'Schedule temple recommend interview',
    sbu: 'Schedule building use',
    sbmr: 'Submit building maintenance request',
    vtpc: 'View temple preparation classes',
    sutftm: 'Sign up to feed the missionaries'
})

const events = reactive([])

const events_time_splits = reactive({})

const persons = reactive([])

const organizations=['Bishopric', 'Elder\'s Quorum', 'Relief Society', 'Primary', 'Young Women\'s', 'Young Men\'s']

const organizationsFilter = (organizations) => {
    return organizations.filter((organization) => {
        return organization !== "Bishopric"
    })
}

const addEvent = async() => {
    await axios.post(`https://weasel.okcsouthstake.org/api/events`, {
        ward: ward.value,
        category: organization.value,
        title: "New Event",
        description: "Event description",
        time: {
            start: "2024-01-01 12:05",
            end: "2024-01-01 14:05"
        },
    })
    .then((response) => {
        axios.get(`https://weasel.okcsouthstake.org/api/events/ward/${ward.value}/organization/${organization.value}`).then((response) => {
            let response_object = response.data
            toast.info("Event added")
            localStorage.setItem("events", JSON.stringify(response_object))
            let temp = JSON.parse(localStorage.getItem("events"))
            events.push(...temp)
            events.forEach(event => {
            events_time_splits[event._id] = {
                date: event.time.start.split(" ")[0],
                time: event.time.start.split(" ")[1],
                e_date: event.time.end.split(" ")[0],
                e_time: event.time.end.split(" ")[1]
            }
        })
        })
            window.location.reload()
    })
}

  onBeforeMount( async() => {
    let user = localStorage.getItem("user")
    user = JSON.parse(user)
    ward.value = user.user.ward
    organization.value = user.user.organization

    if (localStorage.getItem("current_tab") === null) {localStorage.setItem("current_tab", "events")} else {
    current_tab.value = localStorage.getItem("current_tab") }

    await axios.get(`https://weasel.okcsouthstake.org/api/worships/ward/${ward.value}`)
    .then((response) => {
      let response_object = response.data
    localStorage.setItem("worship", JSON.stringify(response_object))
    let temp = JSON.parse(localStorage.getItem("worship"))[0]
    worship.id = temp._id
    worship.ward = temp.ward
    worship.location = temp.location
    worship.time = temp.time
    worship.googleMapsLink = temp.googleMapsLink
    worship.image = temp.image
    })

    await axios.get(`https://weasel.okcsouthstake.org/api/tools/ward/${ward.value}`)
    .then((response) => {
        let response_object = response.data
        localStorage.setItem("tools", JSON.stringify(response_object))
        let temp = JSON.parse(localStorage.getItem("tools"))[0]
        tools.stri = temp.stri
        tools.sbu = temp.sbu
        tools.sbmr = temp.sbmr
        tools.vtpc = temp.vtpc
        tools.sutftm = temp.sutftm
        tool_id.value = temp._id
    })

    await axios.get(`https://weasel.okcsouthstake.org/api/persons/ward/${ward.value}`).then((response)=>{
        let response_object = response.data
        localStorage.setItem("persons", JSON.stringify(response_object))
        let temp = JSON.parse(localStorage.getItem("persons"))
        persons.push(...temp)
    })

    await axios.get(`https://weasel.okcsouthstake.org/api/events/ward/${ward.value}/organization/${organization.value}`).then((response) => {
        let response_object = response.data
        localStorage.setItem("events", JSON.stringify(response_object))
        let temp = JSON.parse(localStorage.getItem("events"))
        events.push(...temp)
        events.forEach(event => {
            events_time_splits[event._id] = {
                date: event.time.start.split(" ")[0],
                time: event.time.start.split(" ")[1],
                e_date: event.time.end.split(" ")[0],
                e_time: event.time.end.split(" ")[1]
            }
        })
        console.log(events_time_splits)
    })
})

const updateWorship = async() => {
    await axios.put(`https://weasel.okcsouthstake.org/api/worships/${worship.id}`, worship)
    .then((response) => {
        toast.success("Details updated")
    })
}

const updateEvents = async() => {
    events.forEach(event => {
        event.time.start = `${events_time_splits[event._id].date} ${events_time_splits[event._id].time}`
        event.time.end = `${events_time_splits[event._id].e_date} ${events_time_splits[event._id].e_time}`
        event.title = document.getElementById(`${event._id}-title`).value
        event.description = document.getElementById(`${event._id}-description`).value
        event.organization = document.getElementById(`${event._id}-organization`).value

        axios.put(`https://weasel.okcsouthstake.org/api/events/${event._id}`, event)
        .then((response) => {
            toast.success("Event details updated")
        })
    })
}

const deleteEvent = async(id) => {
    await axios.delete(`https://weasel.okcsouthstake.org/api/events/${id}`)
    .then((response) => {
        toast.warning("Event deleted")
    })
    setTimeout(() => {
        window.location.reload()
    }, 2000)
}

const updateTools = async() => {
    await axios.put(`https://weasel.okcsouthstake.org/api/tools/${tool_id.value}`, tools)
    .then((response) => {
        toast.success("Tools updated")
    })
}

const peoplesLength = computed(() => {
    try {
        return persons.length
    } catch (error) {
        return 0
    }
    
})

</script>

<template>
    <div class="row flex-center" :class="ward">
        <div class="col-10 fwc">
            <div class="row flex-center">
                <div class="col-8 col-grow">
                    <h1 class="">Oklahoma City South Stake - Weasel<span aria-label="Ward Events and Services Electronic List" data-balloon-pos="up">*</span></h1>
                    <h2 class="small">Editing {{//uppercase first letters in ward
                        ward.split(" ").map((word) => {
                            return word.charAt(0).toUpperCase() + word.slice(1)
                        }).join(" ")
                    }} at the {{organization}} level</h2>
                </div>
                <div class="col-1" aria-label = "Icon from flaticon.com" data-balloon-pos="up"><img :src="weasel_img"  class="img" alt="Weasel"></div>
            </div>
            <hr />

            <section id = "weasel-body" class="row column">
                <section class = "tabs" :class="ward" id="weasel-tabs">
                    <div class="tab-row row flex-between">
                        <div class="tab-row-tabs row tab-row-tabs-calendar wrap">
                            <div class="tab-row-tab tab calendar-tab" v-if="organization === 'ward'" :class="{'activeTab': current_tab == 'worship'}" @click="current_tab = 'worship'">
                                <div class="tab-overlay calendar-tab-overlay" :class="{active: current_tab === 'worship'}"/>
                                <h3>Worship</h3>
                            </div>
                            <div class="tab-row-tab tab calendar-tab" :class="{'activeTab': current_tab == 'contacts'}" @click="current_tab = 'contacts'">
                                <div class="tab-overlay calendar-tab-overlay" :class="{active: current_tab === 'contacts'}"/>
                                <h3>Contacts</h3>
                            </div>
                            <div class="tab-row-tab tab calendar-tab" :class="{'activeTab': current_tab == 'events'}" @click="current_tab = 'events'">
                                <div class="tab-overlay calendar-tab-overlay" :class="{active: current_tab === 'events'}"/>
                                <h3>Events</h3>
                            </div>
                            <div class="tab-row-tab tab calendar-tab" v-if="organization === 'ward'" :class="{'activeTab': current_tab == 'tools'}" @click="current_tab = 'tools'">
                                <div class="tab-overlay calendar-tab-overlay" :class="{active: current_tab === 'tools'}"/>
                                <h3>Tools</h3>
                            </div>
                        </div>
                    </div>
                </section>

                <section id = "weasel-worship-content" class="row flex-center col-10 fwc" v-if="current_tab == 'worship'">
                    <section class = "form-container">
                        <h2>Worship details form</h2>
                        <form class = "form">
                            <div class = "row flex flex-between wrap rf">
                                <div class = "col-6 col-grow fwc">
                                    <div class = "form-group">
                                        <label for = "address">Address</label>
                                        <input type = "text" id = "address" v-model = "worship.location.address">
                                    </div>
                                </div>
                                <div class = "col-6 col-grow fwc">
                                    <div class = "form-group">
                                        <label for = "city">City</label>
                                        <input type = "text" id = "city" v-model = "worship.location.city">
                                    </div>
                                </div>
                                <div class = "col-6 col-grow fwc">
                                    <div class = "form-group">
                                        <label for = "state">State</label>
                                        <input type = "text" id = "state" v-model = "worship.location.state">
                                    </div>
                                </div>
                                <div class = "col-6 col-grow fwc">
                                    <div class = "form-group">
                                        <label for = "zip">Zip</label>
                                        <input type = "text" id = "zip" v-model = "worship.location.zip">
                                    </div>
                                </div>
                            </div>
                            <div class = "row flex-between wrap">
                                <div class = "col-6 col-grow fwc">
                                    <div class = "form-group">
                                        <label for = "phone">Phone</label>
                                        <input type = "text" id = "phone" v-model = "worship.location.phone">
                                    </div>
                                </div>
                                <div class = "col-6 col-grow fwc">
                                    <div class = "form-group">
                                        <label for = "googleMapsLink">Google Maps Link</label>
                                        <input type = "text" id = "googleMapsLink" v-model = "worship.googleMapsLink">
                                    </div>
                                </div>
                            </div>
                            <div class = "form-group">
                                <label for = "time">Time</label>
                                <input type = "text" id = "time" v-model = "worship.time">
                            </div>
                            <hr>
                            <h3>Meetinghouse Image</h3>
                            <p class = "small">This should be an outside photo, showing what the building looks like from the street</p>
                            <div style = 'min-height:10rem'>
                                <Image :src="worship.image.src" :class="worship.image.class" />
                            </div>
                            <div class = "row flex-between wrap">
                                <div class = "col-12 fwc">
                                    <div class = "form-group">
                                        <label for = "imageSrc">Image Source</label>
                                        <input type = "text" id = "imageSrc" v-model = "worship.image.src">
                                    </div>
                                </div>
                            </div>
                            <button 
                                @click = "updateWorship"
                            >Submit</button>
                        </form>
                    </section>
                </section>

                <section id = "weasel-tools-content" class="row flex-center col-10 fwc" v-if="current_tab == 'tools'">
                    <div class = "col-12" id = 'itc' style = "text-align: left;">
                        <h2>Tools</h2>

                        <div v-for="(value, key) in tools" class = "form-group row flex-between col-12 wrap">
                            
                            <textarea type = "text" :id = "key" v-model = "tools[key]"></textarea>
                        </div>

                        <button @click = "updateTools">Submit</button>
                    </div>
                </section>

                <section id = "weasel-events-content" class = "col-12" v-if="current_tab==='events'">

                    <div class="col-12 flex-between row">
                        <div class = "col-6">
                            <h2 v-if="events.length <= 0">No events</h2>
                            <h2 v-else>Events</h2>
                        </div>
                        <div class = "row flex-between col-6 wrap">
                            <button class = "col-4 col-grow fwc" @click = "addEvent">+ Add event</button>
                            <button class = "col-8 col-grow fwc" @click = "updateEvents">Save changes</button>
                        </div>
                    </div>
                    
                    <div class = "events">
                        <div class = "row flex-between col-12 nm">
                            <div class = "col-2 event-title col-shrink"><h3>Title</h3></div>
                            <div class = "col-3 event-description col-grow"><h3>Description</h3></div>
                            <div class = "col-2 event-organization col-shrink"><h3>Organization</h3></div>
                            <div class = "col-2 event-time-start"><h3>Start</h3></div>
                            <div class = "col-2 event-time-end"><h3>End</h3></div>
                            <div class = "col-1 event-delete col-shrink"></div>

                        </div>
                        <hr>
                        <div v-for="(event, index) in events" class = "row flex-between col-12 event wrap-t">
                            <div class = "col-2 event-title col-shrink fwc"><p><input class = "ei" v-model="event.title" :id = "event._id + '-title'"></p></div>
                            <div class = "col-3 event-description col-grow fwc"><p><textarea class = "ei" v-model="event.description" :id = "event._id + '-description'"></textarea></p></div>
                            <div class = "col-2 event-organization col-shrink fwc"><p><select v-model="event.organization" :id = "event._id + '-organization'">
                                <option :selected="event.organization === organization" v-for="organization in organizationsFilter(organizations)">{{organization}}</option><option>Ward</option><option>Stake</option>
                            </select></p></div>
                            <div class = "col-2 event-time-start fwc">
                                <input type = "time" v-model="events_time_splits[event._id]['time']" list = "event-start">
                                <datalist id = "event-start">
                                    <option label = "Youth activity">19:00</option>
                                    <option label = "Morning">10:00</option>
                                </datalist>
                                <input type = "date" v-model="events_time_splits[event._id]['date']">
                            </div>
                            <div class = "col-2 event-time-end fwc">
                                <input type = "time" v-model="events_time_splits[event._id]['e_time']">
                                <input type = "date" v-model="events_time_splits[event._id]['e_date']">
                            </div>
                            <div class = "col-1 event-delete col-shrink fwc" @click="deleteEvent(event._id)"><Trash2/></div>
                        </div>
                    </div>

                </section>

                <section id = "weasel-contacts-content" class = "col-12" v-if="current_tab==='contacts'">
                    
                    <div class="col-12 flex-between row">
                        <div class = "col-6">
                            <h2>Contacts</h2>
                        </div>
                        <div class = "row flex-between col-6 wrap">
                            <button class = "col-4 col-grow fwc" @click = "addContact">+ Add contact</button>
                            <button class = "col-8 col-grow fwc" @click = "updateContacts">Save changes</button>
                        </div>
                    </div>

                    <div class = "events">
                        <div class = "row flex-between col-12 nm">
                            <div class = "col-1"><h3>Name</h3></div>
                            <div class = "col-1"><h3>Position</h3></div>
                            <div class = "col-1"><h3>Org.</h3></div>
                            <div class = "col-1"><h3>Phone</h3></div>
                            <div class = "col-1 col-grow"><h3>Email</h3></div>
                            <div class = "col-4 col-grow"><h3>Bio</h3></div>
                            <div class = "col-1 col-grow"><h3>Image</h3></div>
                            <div class = ""><h3>Size</h3></div>
                            <div class = "event-delete col-shrink"></div>

                        </div>
                        <hr>
                        <div v-for="(person, index) in persons" class = "row flex-between col-12 event wrap-t">
                            <div class = "col-1 fwc"><p><input class = "ei" v-model="person.name"></p></div>
                            <div class = "col-1 fwc"><p><input class = "ei" v-model="person.position"></p></div>
                            <div class = "col-1 fwc"><p><input class = "ei" v-model="person.organization"></p></div>
                            <div class = "col-1 fwc"><p><input class = "ei" v-model="person.phone"></p></div>
                            <div class = "col-1 fwc col-grow"><p><input class = "ei" type="email" v-model="person.email"></p></div>
                            <div class = "col-4 fwc col-grow"><p><input class = "ei" v-model="person.bio"></p></div>
                            <div class = "col-1 fwc col-grow"><p><input class = "ei" v-model="person.image.src"></p></div>
                            <div class = "fwc"><p><select v-model="person.size"><option>full</option><option>small</option></select></p></div>
                            <div class = "event-delete col-shrink" @click="deleteContact(person._id)"><Trash2/></div>
                        </div>
                    </div>

                </section>

            </section>

            <hr>
            <div class = "row flex-between">
                <p class = "small">If your permissions need updated, contact<a href = "mailto:josephclaytonhansen@gmail.com">Joseph Hansen</a> </p>
                <p class = "small">OKCSouthStake.org is not edited, reviewed, or maintained by The Church of Jesus Christ of Latter Day Saints.</p>
            </div>
            
        </div>
    </div>
</template>

<style>


h2.small{
    font-size: 120%;
    margin-bottom: 0;
}

p.small{
    font-size:70%;
    margin-top:-1.2rem;
    text-align: left;
}

#weasel-tabs{
    margin-top:0;
}

#weasel-worship-content{
    border-top: solid 2px var(--active-color);
    height:100%;
    padding:2rem;
}


#weasel-contacts-content, #weasel-worship-content, #weasel-tools-content, #weasel-events-content{
    max-height:80vh;
    overflow-y:auto;
    overflow-x:hidden;
    border-top: solid 2px var(--active-color);
    margin-top:-1rem;
}

#weasel-body{
    height:70vh;
    align-items:start;
}

.form-container{
    margin-top:12rem;
}

.form{
    width:100%
}

#rb .row{
    gap: .25rem;
}

.event{
    padding-top:0rem;
    padding-bottom:.0rem;
    transition: all .2s;
}

.ei{
    font-family: 'PT Sans', sans-serif;
    width: 100%;
    padding-top:.5rem;
    padding-bottom:.5rem;
}

body.dark .event{
    border-bottom: solid 1px var(--gray);
}

body.dark .event:hover{
    background-color:var(--gray);
}

body.light .event{
    border-bottom: solid 1px var(--lightest-gray);
}

body.light .event:hover{
    background-color:var(--lightest-gray);
}

.events{
    max-height:50vh;
    overflow-y:auto;
    margin-top:2rem;
}

.events h3, .events h2{
    padding:0rem;
    margin:0;
}

.events hr{
    margin:0;
}

.event-delete{
    cursor: pointer;
    transition: 0.2s all;
}

.event-delete:hover{
    color:var(--active-color);
}

@media screen and (max-width: 1000px) {
    .form-group{
        flex-wrap:wrap;
        flex-direction: column;
        width:100%!important;

    }
    .form-group input:not([type='radio']){
        width:80%!important;
    }
    .rf{
        flex-direction: column;
        width:100%;
        margin-top:25rem;
    }
    #itc{
        margin-top:13rem;
    }
    #rb .row{
        width:100%;
    }
    #rb .row input[type='radio']{
        max-width:1rem;
        padding:0!important;
    }
    .nm{
        display:none;
    }
}
.img-container .church-img{
    width:100%!important;
}

</style>