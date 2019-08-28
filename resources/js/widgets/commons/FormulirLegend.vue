<template>
    <div slot="legend" class="card-header">
        <h3 class="card-title">
            {{ title }}
        </h3>
    </div>    
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
            default: 'No Legend',
        }
    }
}
</script>

