<script setup>
import Image from './Image.vue'
import {Mail, Phone} from 'lucide-vue-next'
    const props = defineProps({
        name: String,
        image: {
            src: String,
            alt: String,
            width: String,
            class: String
        },
        position: String,
        email: String,
        phone: String,
        classes: String,
    })
</script>

<template>
    <div :class = "classes">
        <div class = "col-4" style='background-color: var(--lighter-gray);'>
            <Image :src="image.src" :alt="image.alt" :width="image.width" :class="image.class"/>
        </div>
        <div class = "col-8">
            <div class = "person-details">
                <p class = "person-position">{{position}}</p>
                <h2 class = "person-name">{{name}}</h2>
                <div class = "row wrap flex-between">
                    <div class = "col-6 ">
                        <div class = "row">
                            <div class = "col-2">
                                <Mail
                                class="icon-color lucide-icon"
                                />
                            </div>
                            <div class = "col-10">
                                <p class = "person-email">{{email}}</p>
                            </div>
                        </div>
                    </div>
                    <div class = "col-6">
                        <div class = "row">
                            <div class = "col-2">
                                <Phone
                                class="icon-color lucide-icon"
                                />
                            </div>
                            <div class = "col-10">
                                <p class = "person-phone">{{phone}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
body.dark .icon-color{
    stroke: var(--off-white);
}
body.light .icon-color{
    stroke: var(--gray);
}
body.dark .person{
    background-color: var(--gray);
}
.person{
    border-radius:4px;
}
body.light .person{
    background-color: var(--lightest-gray);
}
.right{
    border-bottom: solid 10px var(--color1);
}
.person-position{
    margin-bottom:0px;
    text-transform: uppercase;
    font-size:80%;
}
.person-name{
    margin-top:.25rem;
    border-bottom: solid 2px var(--light-gray);
    width:fit-content;
    padding-right:2rem;
}

.person-email, .person-phone{
    min-width:120px;
}

@media screen and (max-width: 1200px) {
    .person-details{
        font-size:75%;
    }
}
</style>