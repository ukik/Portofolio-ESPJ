<template>
    <div :class="column">
        <div class="form-group">
            <!-- Default slot -->
            <label class="form-label">{{ title }}</label>
            <slot name="default">
                <div class="input-group">
                    <input
                        @keyup="onKeyUp()"
                        class="form-control" 
                        v-readonly="readonly"
                        :type="type" 
                        :id="name"
                        :placeholder="placeholder" 
                        :name="name" 
                        :value="value">
                        <span class="input-group-append">
                        <span class="input-group-text">kali/perbulan</span></span>
                </div>
                <small class="help-block text-orange">
                    Maksimal Jumlah Penerimaan Honor tiap bulannya, 
                    <strong class="text-dark">0</strong> 
                    Untuk tidak menggunakan limit
                </small>                        
            </slot>
        </div>    
    </div>    
</template>

<script>
export default {
    methods: {
        onKeyUp(){
            this.$emit('onKeyUp', document.getElementById(this.name).value)
        }
    },
    props: {
        title: {
            type: String,
            // required: true,
            default: 'No Title',
        },
        type: {
            type: String,
            // required: true,
            default: 'text',
        },      
        readonly: {
            type: String,
            // required: true,
            default: 'false',
        },      
        placeholder: {
            type: String,
            // required: true,
            default: '',
        },        
        name: {
            type: String,
            // required: true,
            default: '',
        },
        value: {
            // type: String,
            // required: true,
            default: '',
        },        
        column: {
            type: String,
            default: '', // 'col-6'            
        }
    }
}
</script>
