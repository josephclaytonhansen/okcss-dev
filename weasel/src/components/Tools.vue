<script setup>
import { ref } from 'vue'
const currentTool = ref('none')

function tabChanged(tab) {
    console.log(tab)
    currentTool.value = tab
}

</script>

<template>
    <div class = "row parent wrap-t">
        <div class = "column flex-evenly col-4 fwc tools">
            <button class = "tool" :class="currentTool === 'stri' ? 'active-tool' : ''" @click="tabChanged('stri')">Schedule temple recommend interview</button>
            <button class = "tool" :class="currentTool === 'sbu' ? 'active-tool' : ''" @click="tabChanged('sbu')">Schedule building use</button>
            <button class = "tool" :class="currentTool === 'sbmr' ? 'active-tool' : ''" @click="tabChanged('sbmr')">Submit building maintenance request</button>
            <button class = "tool" :class="currentTool === 'vsrc' ? 'active-tool' : ''" @click="tabChanged('vsrc')">View self reliance classes</button>
            <button class = "tool" :class="currentTool === 'vtpc' ? 'active-tool' : ''" @click="tabChanged('vtpc')">View temple/missionary preparation classes</button>
            <button class = "tool" :class="currentTool === 'sutftm' ? 'active-tool' : ''" @click="tabChanged('sutftm')">Sign up to feed the missionaries</button>
            <button class = "tool" :class="currentTool === 'vso' ? 'active-tool' : ''" @click="tabChanged('vso')">View service opportunities</button>
        </div>
        <div class = "column flex-between col-8 fwc tool-section"></div>
    </div>
</template>

<style>
.tool{
    font-size:125%;
    padding-top:1rem;
    padding-bottom:1rem;
}
.tools{
    align-items:flex-end!important;
}

@media screen and (max-width: 1200px) {
    .wrap-t{
        flex-direction: column!important;
        overflow-x:hidden;
    }

    .tools{
        align-items: stretch!important;
        max-width:90%;
        margin-left:5%;
        gap: .5rem;
    }

    .tool-section{
        border-top: solid 2px var(--active-color);
        overflow-x:hidden;
    }
}

.tool-section{
    border-left: solid 2px var(--active-color);
}

.active-tool{
    background-color: var(--active-color);
}
</style>