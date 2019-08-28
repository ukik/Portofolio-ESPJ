<template>
    <div class="col col-md-3">
        <div class="form-group">
            <select @change="onBubble($event)" class="custom-select submit-on-change" 
                :name="name" 
                :id="name">
                <option value="">{{ init }}</option>
                <option v-for="(item, index) in options" 
                    :key="index" 
                    :selected="selected(item)"
                    :value="valued(item)">
                    {{ labeled(item) }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        param: {  
            type: String,
            default: "",
        },
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
        label: {
            type: String,
            default: "",
        }, 
        options: {
            type: Array,
            default: [],
            required: true,
        },
    },
    computed: {
        selected() {
            return function(args) {
                return 
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
    methods: {
        onBubble(event){
            // console.log(event.target.value)
        }
    }
}
</script>
