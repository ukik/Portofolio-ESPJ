<template>
    <div :class="column">
        <div class="form-group">
            <!-- Default slot -->
            <label class="form-label">{{ title }}</label>
            <slot name="default">
                <div class="input-group">
                    <datetime 
                        v-readonly="readonly"
                        :id="name"
                        input-class="form-control"
                        :placeholder="placeholder"
                        :name="name" 
                        :type="type"
                        format="yyyy-MM-dd" 
                        value-zone="Asia/Makassar"
                        zone="Asia/Makassar"                        
                        v-model="valued">
                    </datetime>
                    <slot name="append" />
                </div>
                <slot name="hint" />
            </slot>
        </div>    
    </div>    
</template>

<script>
export default {
    watch: {
        'valued': function(val){
            // console.log(val)
            this.$emit('onPicker', val.split('T')[0])
        }
    },
    data(){
        return {
            valued: this.value,
        }
    },
    mounted(){
        const m = document.getElementById(this.name).getElementsByTagName(this.name)
        m.className = "vdatetime-input form-control"
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
            default: 'date',
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
