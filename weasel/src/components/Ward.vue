<script setup>
    import {ref,watch} from 'vue'
    import PersonCard from './PersonCard.vue'
    import Location from './Location.vue'
    import Tools from './Tools.vue'
    import {Contact2, Calendar, HeartHandshake, ListTodo, Home, Pencil, ChevronDown, ChevronUp} from 'lucide-vue-next'
    import CCalendar from './CCalendar.vue'

const props = defineProps({
    size: {String, default: 'full'},
    colorClass: String,
    contacts: Array,
    organizations: Array,
    ward: String,
    events: Array,
    tools: {
        sbmr: String,
        sbu: String,
        stri: String,
        sutftm: String,
        vso: String,
        vsrc: String,
        vtpc: String,
        ls: String
    },
    worship: {
        location: {
            address: String,
            city: String,
            state: String,
            zip: String
        },
        time: String,
        googleMapsLink: String,
        image: {
            src: String,
            alt: String,
            width: String,
            class: String
        }
    }
})

const currentTab = ref('worship')

function tabChanged(tab) {
    console.log(tab)
    currentTab.value = tab
}

function setPersonClasses(size, ward) {
    let s = 'row person fwc'
    if (size === 'full') {
        s = s + ' col-6' + ' ' + ward
    } else {
        s= s + ' col-3' + ' ' + ward
    }
    return s
}

function filterContactsByOrganization(organization) {
    return props.contacts.filter(contact => contact.organization === organization)
}

function goHome(){
    window.location.href = 'https://okcsouthstake.org'
}

function goWeasel(){
    window.location.href = 'https://wards.okcsouthstake.org/weasel'
}

function toggleDropdown(){
    if (document.getElementById('wards-dropdown').classList.contains('show')){
        document.getElementById('wards-dropdown').classList.remove('show')
        document.getElementById('dd-up').classList.remove('show')
        document.getElementById('dd-down').classList.add('show')
    } else {
        document.getElementById('wards-dropdown').classList.add('show')
        document.getElementById('dd-up').classList.add('show')
        document.getElementById('dd-down').classList.remove('show')
    }
}

function unslugifyWard(string) {
    return string.replace(/-/g, ' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

}

watch(currentTab, tabChanged)

</script>

<template>
    
<!------------------------------ Tab container ----------------------------- -->
<section class = "tabs" :class="ward">
    <div class = "">
        <button id = "goweasel" class = 'button' @click="goWeasel"><Pencil/></button>
        <div id = "ward-select"><p id = "ward-name">Current ward: {{unslugifyWard(ward)}}</p>
            <button class = "button" id = "dropdown" @click = "toggleDropdown"><ChevronDown id = "dd-down" class="show"/><ChevronUp id = "dd-up"/></button>
            <div id = "wards-dropdown">
                <a href = "https://wards.okcsouthstake.org/choctaw">Choctaw</a>
                <a href = "https://wards.okcsouthstake.org/midwest-city">Midwest City</a>
                <a href = "https://wards.okcsouthstake.org/moore">Moore</a>
                <a href = "https://wards.okcsouthstake.org/okc-2nd">OKC 2nd</a>
                <a href = "https://wards.okcsouthstake.org/mustang-2nd">Mustang 2nd</a>
                <a href = "https://wards.okcsouthstake.org/mustang-1st">Mustang 1st</a>
                <a href = "https://wards.okcsouthstake.org/okc-6th-branch">OKC 6th Branch</a>
            </div>
        </div>
        <button id = "home" class = 'button' @click="goHome"><Home/><span id = 'home-text'>OKC South Stake</span></button>
        <!------------------------------ Tab: Contacts ----------------------------- -->
        <div v-if="currentTab === 'contacts'">
            <div v-for = "organization in organizations">
                <details :open="organization==='Bishopric'">
                    <summary><h2>{{organization}}</h2></summary>
                    <div class = "row wrap stretch">
                        <PersonCard v-for="contact in filterContactsByOrganization(organization)" :key="contact.id" :name="contact.name" :image="contact.image" :position="contact.position" :email="contact.email" :phone="contact.phone" :classes="setPersonClasses(contact.size, ward)" :size="contact.size" :bio="contact.bio"/>
                    </div>
                </details>
            </div>
        </div>
            <!------------------------------ Tab: Events ----------------------------- -->
        <div v-else-if="currentTab === 'events'">
            <CCalendar :events="events"/>
        </div>

        <!------------------------------ Tab: Tools ----------------------------- -->
        <div v-else-if="currentTab === 'tools'">
            <Tools
            :sbmrHTML="tools.sbmr"
            :sbuHTML="tools.sbu"
            :striHTML="tools.stri"
            :sutftmHTML="tools.sutftm"
            :vtpcHTML="tools.vtpc"
            :lsHTML="tools.ls"
            />
        </div>

        <!------------------------------ Tab: Worship ----------------------------- -->
        <div v-else-if="currentTab === 'worship'">
            <Location :location="worship.location" :time="worship.time" :googleMapsLink="worship.googleMapsLink" :image="worship.image"/>
        </div>
    </div>
    <!------------------------------ Tab buttons ----------------------------- -->
    <div class = "tab-row row flex-between">
        <div class = "tab-row-tabs row wrap">
            <div class = "tab" :class = "{activeTab: currentTab === 'worship'}" @click = "currentTab = 'worship'">
                <div class="tab-overlay" :class="{active: currentTab === 'worship'}"/>
                <h3><HeartHandshake style = "margin-bottom:-.25rem;" class="ht"/> Worship</h3>
            </div>
            <div class = "tab" :class = "{activeTab: currentTab === 'contacts'}" @click = "currentTab = 'contacts'">
                <div class="tab-overlay" :class="{active: currentTab === 'contacts'}"/>
                <h3><Contact2 style = "margin-bottom:-.25rem;" class="ht"/> Contacts</h3></div>
            <div class = "tab" :class = "{activeTab: currentTab === 'events'}" @click = "currentTab = 'events'">
                <div class="tab-overlay" :class="{active: currentTab === 'events'}"/>
                <h3><Calendar style = "margin-bottom:-.25rem;" class="ht"/> Events</h3></div>
            <div class = "tab" :class = "{activeTab: currentTab === 'tools'}" @click = "currentTab = 'tools'">
                <div class="tab-overlay" :class="{active: currentTab === 'tools'}"/>
                <h3><ListTodo style = "margin-bottom:-.25rem;" class="ht"/> Tools</h3></div>
        </div>
        <p id = "submit-correction">Contact<a href = "mailto:josephclaytonhansen@gmail.com">Joseph Hansen</a>to request edit access.<br/><span id = 'disclaimer'><a href = "https://okcsouthstake.org">OKCSouthStake.org</a> is not edited, reviewed, or maintained by The Church of Jesus Christ of Latter Day Saints.</span></p>
    </div>
</section>

</template>

<style scoped>
#wards-dropdown{
    position: fixed;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    left:50vw;
    top: 3rem;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
    padding: .5rem;
    opacity:0;
    pointer-events: none;
}

#dd-up, #dd-down{
    opacity:0;
    position:absolute;
}

.show{
    opacity:1!important;
    pointer-events: all!important;
}

#submit-correction{
    align-self:start;
    text-align: right;
}

#disclaimer{
    font-size:50%;

}
#home{
    top: .25rem;
    left: 2.5rem;
}
#home, #goweasel, #ward-select, #dropdown{
    position: fixed;
    z-index: 100;
    background-color: transparent;
    color: #999;
    display:flex;
    align-items:center;
}

#dropdown{
    position: relative!important;
    padding-left:0;
}

#goweasel{
    top: .25rem;
    left: .25rem;
}
#ward-select{
    top: .25rem;
    left: 50vw;
}

#ward-select p{
    color: #999;
}

#home-text{
    padding-left:.3rem;
    margin-top:.1rem;
}

@media screen and (max-width: 1000px) {
    #home-text{
        display:none;
    }
    #ward-select{
        left: 22vw;
    }
}
</style>