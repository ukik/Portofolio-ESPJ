<template>
    <a v-if="$root.level != 'Supervisor'" href="#" onclick="return false;" class='btn btn-sm btn-outline-primary' @click=" set_callback_reset(); jump({ name: route }); onBubble();">
        <i class="fe fe-plus"></i> 
        <slot>
            Tambah {{ name }}
        </slot>
    </a>
</template>

<script>
export default {
    methods: {
        onBubble() {
            this.$emit('onAdd')
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
