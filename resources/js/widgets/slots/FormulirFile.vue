<template>
    <div :class="column">   
        <div class="form-group">
            <label class="form-label">{{ title }}</label>
            <div class="custom-file">
                <input 
                    @change="onBubble()"
                    class="custom-file-input" 
                    :type="type" 
                    :id="name"
                    :name="name">
                    
                <slot name="append" />
            </div>
            <slot name="hint" />
        </div>
    </div>    
</template>


<script>
export default {
    methods: {
        onBubble(){
            this.$emit('onChange', document.getElementById(this.name).files[0].name)
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
        name: {
            type: String,
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
