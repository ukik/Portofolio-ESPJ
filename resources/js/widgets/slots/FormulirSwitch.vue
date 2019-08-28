<template>
    <div :class="column">
        <div class="form-group">
            <label class="form-label">{{ title }}</label>
            <div>
                <label class="custom-switch">
                    <input 
                        class="custom-switch-input"
                        v-readonly="readonly"
                        :id="name"
                        :type="type" 
                        :name="name"
                        v-checked="checked"/>
                    <span class="custom-switch-indicator"></span>
                </label>
            </div>
            <slot name="hint" />
        </div>

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
        type: {
            type: String,
            // required: true,
            default: 'text',
        },        
        checked: {
            // type: String,
            // required: true,
            default: "true",
        },        
        name: {
            type: String,
            // required: true,
            default: '',
        },
        readonly: {
            type: String,
            // required: true,
            default: 'false',
        },           
        column: {
            type: String,
            default: '', // 'col-6'            
        }
    }
}
</script>
