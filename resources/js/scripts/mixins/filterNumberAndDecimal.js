module.exports = {
    methods: {
        onFilterNumberAndDecimal(args){
            const value = args.event.target.value
            const item = args.item
            if(value <= 0 ){
                return 0
                // this.get_detail[args.index][item] = 0
            }  
            value.replace(/^\d+(\.\d{0,2})?$/, "");  // decimal support
        }
    }
}