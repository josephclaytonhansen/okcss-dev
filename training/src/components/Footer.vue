<script setup>

const currentYear = new Date().getFullYear()

</script>

<template>
    <footer class = "footer">
        <div class = "container">
            <span class = "text-muted">© {{currentYear}} Oklahoma City South Stake of the Church of Jesus Christ of Latter Day Saints</span>
        </div>
    </footer>
</template>

<style scoped>

    .footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 5vh;
        padding-top: 1vh;
        background-color: #f5f5f5;
        text-align:center;
    }

    @media (max-width: 768px){
        .footer{
            display: none;
        }
    }

</style>