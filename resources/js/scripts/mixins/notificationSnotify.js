module.exports = {
    methods: {        
        onInfoSnotify(args){
            this.$snotify.info(args.message, args.title, {
                timeout: 1000,
                titleMaxLength: 30,
                bodyMaxLength: 250,
                backdrop: -1,
                maxOnScreen: 1,
                maxAtPosition: 1,
                showProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                newOnTop: false,
                oneAtTime: false,
                preventDuplicates: false,
                position: 'rightBottom'
            });
        },        
        onSuccessSnotify(args){
            this.$snotify.success(args.message, args.title, {
                timeout: 1000,
                titleMaxLength: 30,
                bodyMaxLength: 250,
                backdrop: -1,
                maxOnScreen: 1,
                maxAtPosition: 1,
                showProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                newOnTop: false,
                oneAtTime: false,
                preventDuplicates: false,
                position: 'rightBottom'
            });
        },
        onWarningSnotify(args){
            this.$snotify.warning(args.message, args.title, {
                timeout: 1000,
                titleMaxLength: 30,
                bodyMaxLength: 250,
                backdrop: -1,
                maxOnScreen: 1,
                maxAtPosition: 1,
                showProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                newOnTop: false,
                oneAtTime: false,
                preventDuplicates: false,
                position: 'rightBottom'
            });
        },
        onErrorSnotify(args){
            this.$snotify.error(args.message, args.title, {
                timeout: 1000,
                titleMaxLength: 30,
                bodyMaxLength: 250,
                backdrop: -1,
                maxOnScreen: 1,
                maxAtPosition: 1,
                showProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                newOnTop: false,
                oneAtTime: false,
                preventDuplicates: false,
                position: 'rightBottom'
            });
        }                   
    }
}
        


