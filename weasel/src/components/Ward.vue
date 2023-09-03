<script setup>
    import {ref,watch} from 'vue'
    import PersonCard from './PersonCard.vue'
    import Location from './Location.vue'
    import Tools from './Tools.vue'
    import {Contact2, Calendar, HeartHandshake, ListTodo} from 'lucide-vue-next'
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
        vtpc: String
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

watch(currentTab, tabChanged)

</script>

<template>
<!------------------------------ Tab container ----------------------------- -->
<section class = "tabs" :class="ward">
    <div class = "tab-content">
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
        <p id = "submit-correction">Contact<a href = "mailto:josephclaytonhansen@gmail.com">Joseph Hansen</a>to request edit access.<br/><span id = 'disclaimer'>OKCSouthStake.org is not affiliated with, edited, reviewed, or maintained by The Church of Jesus Christ of Latter Day Saints.</span></p>
    </div>
</section>

</template>

<style>

#submit-correction{
    align-self:start;
    text-align: right;
}

#disclaimer{
    font-size:50%;

}

.Choctaw{
    --active-color: var(--color1);
}

.Midwest-City{
    --active-color: var(--color2);
}

.Okc-2nd{
    --active-color: var(--color3);
}

.Moore{
    --active-color: var(--color4);
}

.Okc-6th-Branch{
    --active-color: var(--color5);
}

.Mustang-2nd{
    --active-color: var(--color6);
}

.Mustang-1st{
    --active-color: var(--color7);
}
</style>