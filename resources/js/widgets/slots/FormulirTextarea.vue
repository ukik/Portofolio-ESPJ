<template>
    <div :class="column">
        <div class="form-group">
            <label class="form-label">{{ title }}</label>
            <textarea 
                rows="4" 
                class="form-control"       
                v-readonly="readonly"     
                :name="name" 
                :id="name"
                :placeholder="placeholder"
                :value="value"></textarea>
            <slot name="append" />
        </div>
        <slot name="hint" />
    </div>    
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            // required: true,
            default: 'No Title',
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
