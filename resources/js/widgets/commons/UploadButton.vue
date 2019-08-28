<template>
    <a v-if="$root.level != 'Supervisor'" href="#" onclick="return false;" class='btn btn-sm btn-outline-primary' @click="onBubble">
        <i class="fe fe-upload"></i>
        <slot>
            Upload {{ name }}
        </slot>           
    </a>
</template>

<script>
export default {
    methods: {
        onBubble(){
            this.$emit('onUpload')
            if(this.route)
                this.jump({ name: this.route })
        }
    },
    props: {
        route: {
            type: String,
            required: true,
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
