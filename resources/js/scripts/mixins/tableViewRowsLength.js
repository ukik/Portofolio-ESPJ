module.exports = {
    computed: {
        rows_length() {
            const vm = this
            return function(args){
                return vm[args.item] != undefined && vm[args.item].length > 0 ? true : false
            }
        },
    },
}