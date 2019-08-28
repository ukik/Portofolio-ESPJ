<template>
    <div class="col col-md-3">
        <div class="form-group">
            <div class="input-group">
                <input type="text" class="form-control" 
                name="keyword" 
                id="keyword"
                value="" 
                @keyup.enter="onBubble()"
                placeholder="Pencarian">
                <span class="input-group-append">
                        <button class="input-group-text" @click="onBubble()" type="submit">
                            <i class="fe fe-search submit-on-change"></i>
                        </button>
                    </span>
            </div>
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
    },
    computed: {          
        value() {
            return this.$route.query[this.param]
        },                       
    },
    methods: {
        onBubble() {
            this.$emit('onSearch')
        }
    }
}
</script>