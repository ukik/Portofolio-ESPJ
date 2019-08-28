<template>
    <div :class="column">
        <div class="form-group">
            <label class="form-label">{{ title }}</label>
            <slot name="default">
                <div class="input-group">
                    <select 
                        class="form-control selectize" 
                        :id="name"
                        :name="name">
                        <option value="">{{ init }}</option>
                        <option v-for="(item, index) in options" 
                            :key="index"
                            :selected="selected(item)"
                            :value="valued(item)">
                            {{ labeled(item) }}
                        </option>
                    </select>
                    <slot name="append" />
                </div>
                <slot name="hint" />
            </slot>
        </div>    
    </div>    
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: "",
        },           
        init: {
            type: String,
            default: "",
        },       
        value: {
            type: String,
            default: "",
        },        
        label: {
            type: String,
            default: "",
        },        
        options: {
            // type: Array,
            default: () => {
                return []
            },
            // required: true,
        },     
        title: { // tentative
            type: String,
            default: "No Title",
        },         
        param: {  // tentative
            type: String,
            default: "",
        },
        column: { // tentative
            type: String,
            default: '', // 'col-6'            
        }
    },
    computed: {
        selected() {
            return function(args) {
                return this.value == "" ? '' : args[this.value] 
                const value = this.value == "" ? args : args[this.value] 
                const param = this.$route.query[this.param]
                return value == param
            }
        },            
        valued() {
            return function(args) {
                return this.value == null || this.value == "" ? args : args[this.value]
            }
        },            
        labeled() {
            return function(args) {
                return this.label == null || this.label == "" ? args : args[this.label]
            }
        },            
    },
}
</script>
