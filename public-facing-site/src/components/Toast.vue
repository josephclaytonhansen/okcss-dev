<script setup>

    const props = defineProps({
        toast: {
            duration: 2000,
            class: "text-bg-info",
            message: "Hello World!",
        },
    })

</script>

<template>
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div class="toast align-items-center border-0" :class="toast.class" role="alert" aria-live="assertive" aria-atomic="true" :data-bs-delay="toast.duration">
            <div class="d-flex">
                <div class="toast-body">
                    {{ toast.message }}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
</template>
