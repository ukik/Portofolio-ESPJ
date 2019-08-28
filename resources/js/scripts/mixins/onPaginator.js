module.exports = {
    data() {
        return {
            suffix: '',
        }
    },
    computed: {
        total_paginate(){
            return function(args) {
                if(args == undefined) {
                    return 0
                } else {
                    return args
                }
            }
        }
    },
    methods: {
        onPaginator (page) {   
            this.suffix = "?page="+page

            this.$nextTick(() => {
                this.onInitData()
            })
        },    
    }
}