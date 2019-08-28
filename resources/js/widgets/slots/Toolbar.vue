<template>
    <div class="page-header d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <h1 class="page-title">{{ judul }}</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        judul: {
            type: String,
            default: 'No Judul',
            required: true,
        }
    }
}
</script>
