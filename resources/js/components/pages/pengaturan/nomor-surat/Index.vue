<template>
    <div>
        <Toolbar judul="Pengaturan Surat" slot="title">
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
                title="Format Honor" 
                name="honor" 
                :value="valued('honor')" 
                placeholder="Format Honor" />

            <FormulirInput 
                slot="input" 
                title="Formal SPK" 
                name="spk" 
                :value="valued('spk')" 
                placeholder="Nomor SK" />

            <FormulirInput 
                slot="input" 
                title="Format SPT" 
                name="spt" 
                :value="valued('spt')" 
                placeholder="Format SPT" />

            <FormulirInput 
                slot="input" 
                title="Format SPPD" 
                name="sppd" 
                :value="valued('sppd')" 
                placeholder="Format SPPD" />

            <FormulirInput 
                slot="input" 
                title="Format Permohonan" 
                name="permohonan" 
                :value="valued('permohonan')" 
                placeholder="Format Permohonanx" />

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
                const index = this.$root.year+'.surat.'+args

                for (const key in this.nomor) {
                    if (this.nomor.hasOwnProperty(key)) {
                        if(key == index) {
                            return this.nomor[key]
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
                        
            let orientation = []
            for (const key in this.subtitle) {
                orientation.push(this.$root.year+'.surat.'+key.split(' ').join('.'))
            }   

            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('pengaturan/nomor-surat?orientation='+ orientation.join(',')).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    this.nomor = response.data.data.nomor;
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

            payload[(this.$root.year+'.surat.honor').split('.').join('_')] = document.getElementById('honor').value
            payload[(this.$root.year+'.surat.spk').split('.').join('_')] = document.getElementById('spk').value
            payload[(this.$root.year+'.surat.spt').split('.').join('_')] = document.getElementById('spt').value
            payload[(this.$root.year+'.surat.sppd').split('.').join('_')] = document.getElementById('sppd').value
            payload[(this.$root.year+'.surat.permohonan').split('.').join('_')] = document.getElementById('permohonan').value

            const request = new Promise((resolve, reject) => {
                axios.post('pengaturan/nomor-surat', payload).then((response) => {
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
            subtitle: this.$store.state.pengaturan_nomor_surat.subtitle,
            nomor: {}
        }
    }    
};

</script>
