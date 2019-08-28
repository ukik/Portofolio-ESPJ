<template>
    <a href="#" onclick="return false;" class='btn btn-sm btn-outline-success' @click="set_callback_reset(); jump({ name: route }); onBubble()">
        <i class="fe fe-check-circle"></i> 
        <slot>
            Setujui {{ name }}
        </slot>            
    </a>
</template>

<script>
export default {
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
    },
    methods: {
        onBubble() {
            this.$emit('onConfirm')
        }
    }
}
</script>
