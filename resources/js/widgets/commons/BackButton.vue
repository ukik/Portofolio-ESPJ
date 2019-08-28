<template>
    <a class="btn btn-sm btn-outline-secondary" @click="set_callback_reset(); $router.back(); onBubble(); ">
        <i class="fe fe-corner-up-left"></i> 
        <slot>
            Kembali {{ name }}
        </slot>
    </a>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            // required: true,
            default: ''
        }        
    },
    methods: {
        onBubble(){
            this.$emit('onBack')
        }
    }
}
</script>