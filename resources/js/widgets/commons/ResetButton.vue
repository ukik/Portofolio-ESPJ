<template>
    <div class="col">
        <div class="form-group text-right">
            <a href="#" onclick="return false;" @click="onBubble()" class="btn btn-danger"><i class="fe fe-x"></i> 
                <slot>Reset Pencarian</slot>
            </a>
        </div>
    </div>
</template>


<script>
export default {
    methods: {
        onBubble(){
            this.$emit('onReset')
        }
    },
}
</script>
