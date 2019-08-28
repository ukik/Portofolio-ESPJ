<template>
    <a href="#" onclick="return false;" @click="onBubble()" class="btn btn-sm btn-outline-warning mr-2" >
        <i class="fe fe-refresh-cw"></i> Segarkan
    </a> 
</template>

<script>
export default {
    methods: {
        onBubble(){
            this.$emit('onRefresh')
        }
    },
    props: {
        route: {
            type: String,
            // required: true,
            default: '',
        },
        name: {
            type: String,
            // required: true,
            default: ''
        }        
    }
}
</script>
