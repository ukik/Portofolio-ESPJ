module.exports = {
    methods: {
        onLogout(){

            this.$root.auth = false
            this.$root.level = null
            this.$root.username = null

            this.$memory.remove('auth')         
            this.$memory.remove('level')
            this.$memory.remove('username')                 

            this.jump({ name: 'login' })

            axios.post('logout').then(response => {  
                
                this.$root.auth = false
                this.$root.level = null
                this.$root.username = null
                this.$root.token = null
                this.$root.signiture = null
                this.$root.year = null
                this.$root.jenis_anggaran = null
    
                this.$memory.remove('auth')
                this.$memory.remove('level')
                this.$memory.remove('token')
                this.$memory.remove('signiture')
                this.$memory.remove('year')
                this.$memory.remove('jenis_anggaran')
                this.$memory.remove('username')                 

            //    console.log(response)
            }, error => {
                // console.log(error)
            })
        }
    }    
}