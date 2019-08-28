<template>
    <div v-if="$root.level != 'Supervisor'" class="form-group text-right mb-5">
        <slot name="save">
            <button @click="onBubbleSubmit()" class="btn btn-primary"><i class="fe fe-save"></i> Simpan</button>
        </slot>
        <!-- Pre-Defined -->
        <slot name="back"> 
            <a @click="$router.back(); onBubbleBack()" href="#" class="btn btn-cyan">
                <i class="fe fe-corner-up-left"></i> Kembali
            </a>
        </slot>
        <!-- Optional -->
        <slot name="cancel" />
    </div>    
</template>

<script>
export default {
    methods: {
        onBubbleSubmit(){
            this.$emit('onSubmit')
        },
        onBubbleBack(){
            this.$emit('onBack')
        }
    }
}
</script>
