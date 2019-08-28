<template>
    <div>
        <Toolbar judul="Pengaturan SPPD" slot="title">
            <RefreshButton @onRefresh="onRefresh()" />  
            <BackButton />
        </Toolbar>    

        <!-- dipanggil jike error -->
        <div v-if="$root.error.status" class="alert alert-icon alert-danger" role="alert">
          <i class="fe fe-info mr-2" aria-hidden="true"></i> {{ $root.error.message }}
        </div>

        <!-- dipanggil saat terjadi request di component ini  -->
        <div v-if="$root.request" class="alert bg-primary alert-success text-center" role="alert">
          <components is="loader-spinner" style="zoom: 0.75;" />
        </div>

        <!-- dipanggil dari callback creat/edit/delete -->
        <div v-if="callback_status" class="alert alert-icon alert-info" role="alert">
            <i class="fe fe-info mr-2" aria-hidden="true"></i> {{ get_callback_message }}
        </div>
        
        <Formulir>

            <FormulirLegend slot="legend" title="Limit" />

            <FormulirInput 
                slot="input" 
                name="limit"
                :value="valued('.sppd.limit')" 
                placeholder="0"
                title="Limit Melakukan Perjalanan Dinas Tiap Bulannya" />
            
            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        valued () {
            return (args) => {
                const index = this.$root.year+args
                
                for (const key in this.sppd) {
                    if (this.sppd.hasOwnProperty(key)) {
                        if(key == index) {
                            return this.sppd[key]
                        }    
                    }
                }
            }            
        }
    },    
    methods: {
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
            this.callback_status = false
                        
            let orientation = [ this.$root.year+'.sppd.limit' ]

            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('pengaturan/sppd?orientation='+ orientation.join(',')).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    this.sppd = response.data.data.sppd;
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })
            return request;
        },
        // CORE: untuk refresh data init pada page ini
        onRefresh(){
          // CORE: untuk mengambil data init pada page ini
          this.onInitData()
        },             
        onSubmit(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
            this.callback_status = false

            let payload = {}
            var index = (this.$root.year+'.sppd.limit').split('.').join('_').toLowerCase()
            payload[index] = document.getElementById('limit').value

            const request = new Promise((resolve, reject) => {
                axios.post('pengaturan/sppd', payload).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })
            
            request.then(result => {
                this.callback_status = this.$store.state.callback.callback_status
            })
        },
    },  
    mounted(){
        if(this.get_callback_status){
            this.set_callback_reset()
        }

        // CORE: untuk mengambil data init pada page ini
        this.onInitData()

        this.$memory.set('last_route', this.$route.name)

    },    
    data(){
        const year = new Date().getFullYear()
        return {
            // CORE
            callback_status: this.$store.state.callback.callback_status,

            year,
            sppd: {}
        }
    }    
};

</script>
