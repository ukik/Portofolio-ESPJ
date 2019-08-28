<template>
    <a href="#" onclick="return false;" class='btn btn-sm btn-outline-danger' @click="set_callback_reset(); jump({ name: route }); onBubble()">
        <i class="fe fe-x"></i> 
        <slot>
            Tolak {{ name }}
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
            this.$emit('onCancel')
        }
    }
}
</script>
