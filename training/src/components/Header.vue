<script setup>
    import {Home} from 'lucide-vue-next';
</script>

<template>

    <header class = "row text-bg-primary" id = "header">
        <div class = "text-center col-3">
            <a href = "https://okcsouthstake.org" id = "back" class = "row"><div class = "col-auto"><Home/></div> <div class = "col-auto" id = "back-text"><p style = "margin-top:1rem;margin-left:-1rem;"> OKC South Stake</p></div></a>

        </div>
        <div class = "text-center col-6" id = "header-text">
            <p class = "fs-5"  style = "margin:0;padding:0;"><strong>Training - learn to use the site</strong></p>
        </div>
    </header>

</template>

<style scoped>
    
        #header{
            padding-left: 1rem;
            height:6vh;
            margin: auto;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            z-index: 1;

            align-items: center;
        }
        #back{
            align-items: center;
            color:white;
        }

        @media (max-width: 768px) {
            #back-text{
                display:none;
            }
            #header-text{
                font-size:100%!important;
                width:100vw;
                position:fixed;
                left:0;
                pointer-events:none;
            }
            header{
                height: 5vh;
                width: 100vw;
                top: 0;
                margin: 0;
                left: 0;
                position: absolute;
            }
        }
</style>