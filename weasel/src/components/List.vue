<script setup>
import {reactive, ref} from 'vue'

const list = reactive(
    [
        {id: 1, name: 'Vue'},
        {id: 2, name: 'React'},
        {id: 3, name: 'Angular'},
        {id: 4, name: 'Svelte'},
    ]
)

const props = defineProps({
    class: String
})

const emit = defineEmits(['update_class'])

emit('update_class', 'from child to parent')

</script>

<template>
    <ul>
        <li v-for="item in list" :key="item.id" :class="class">
            <a>{{item.name}}</a>
        </li>
    </ul>
    <slot name = "content">
        <p>Default slot content</p>
    </slot>
    <slot name = "content2">
        <p>Default slot content2</p>
    </slot>
</template>

<style>
.red {
    color: red;
}
.blue {
    color: blue;
}
</style>