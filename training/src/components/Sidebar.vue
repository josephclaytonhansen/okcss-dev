<script setup>
    import { ref, computed } from 'vue'
    import {ChevronLeft, ChevronRight} from 'lucide-vue-next'
    const props = defineProps(['articles', 'currentArticle'])
    const collapse = ref(false)

    const toggleCollapse = () => {
        collapse.value = !collapse.value
    }
    
    const toggleCollapseClass = computed(() => {
        return collapse.value ? 'collapses' : ''
    })

    const emit = defineEmits(['index'])

    const onChange = (index) => {
        console.log(index, props.currentArticle)
        emit('index', index)
    }


</script>

<template>

<button class = "btn btn-primary" @click = "toggleCollapse" id = "collapseButton" :class="toggleCollapseClass">
                    <template v-if = "collapse">
                        <ChevronRight/>
                    </template>
                    <template v-else>
                        <ChevronLeft/>
                    </template>
                </button>

    <div id = "sidebar" :class="toggleCollapseClass">


                

        
        <div class = "list-group">
            <a v-for = "(article, index) in articles" :key = "index" class = "list-group-item list-group-item-action" :class = "{active: index === props.currentArticle}" @click = "onChange(index)">
                {{article.title}}
            </a>
        </div>
    </div>
</template>

<style scoped>

    #sidebar{
        height: 89vh;
        overflow-y: auto;
        overflow-x: ellipsis;
        position: fixed;
        top:6vh;
        left: 0;
        background-color: #f8f9fa;
        width: max(15vw, 150px);
        padding: 1rem;
        margin: 0;
        transition: all 0.75s;
    }

    div.collapses{
        transform: translateX(calc(-100% + 1rem));
    }

    button.collapses{
        left: 1.75rem!important;
    }

    #collapseButton{
        position: fixed;
        top: calc(6vh + 1.25rem);
        left: calc(max(15vw, 150px) + .75rem);
        z-index: 1;
        width:2rem;
        margin:0;
        padding:0;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        transition: all 0.5s;
    }

    @media screen and (max-width: 768px){
        #collapseButton{
            display: none;
        }
        #sidebar{
            width:100vw;
            height:40vh;
            top:60vh;
            overflow-y: auto;
        }
    }

</style>
