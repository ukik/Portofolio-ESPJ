<template>
    <div>
        <Toolbar judul="Pengaturan Pajak" slot="title">
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

        <Formulir column="row">

            <FormulirLegend slot="legend" title="PPh21 Berdasarkan Golongan" />

            <FormulirInputPajak v-for="(item, index) in subtitle" 
                :key="index" 
                slot="input" 
                :name="index"
                column="col-6"
                :value="valued('.pajak.pph21.'+index)"
                placeholder="0"
                :title="'PPh 21 '+index.toUpperCase()+' '+item" />

        </Formulir>
        <Formulir column="row">

            <FormulirLegend slot="legend" title="Pajak Lainnya" />

            <FormulirInputPajak v-for="(item, index) in subtitle1" 
                :key="index"
                slot="input" 
                :name="index"
                column="col-6"
                :value="valued('.pajak.'+index)"
                placeholder="0"
                :title="' '+item.toUpperCase()" />

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
                
                for (const key in this.pajak) {
                    if (this.pajak.hasOwnProperty(key)) {
                        if(key.split('/').join('') == index.split('/').join('')) {
                            return this.pajak[key.split('/').join('')]
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
                orientation.push(this.$root.year+'.pajak.pph21.'+(key.split('/').join('')).toLowerCase())
            }
            for (const key in this.subtitle1) {
                orientation.push(this.$root.year+'.pajak.'+(key.split('/').join('')).toLowerCase())
            }

            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('pengaturan/pajak?orientation='+ orientation.join(',')).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    this.pajak = response.data.data.pajak;
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
            for (const key in this.subtitle) {
                var index = (this.$root.year+'.pajak.pph21.'+key.split('/').join('')).split('.').join('_').toLowerCase()
                payload[index] = document.getElementById(key).value
            }
            for (const key in this.subtitle1) {
                var index = (this.$root.year+'.pajak.'+key.split('/').join('')).split('.').join('_').toLowerCase()
                payload[index] = document.getElementById(key).value
            }

            const request = new Promise((resolve, reject) => {
                axios.post('pengaturan/pajak', payload).then((response) => {
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
            subtitle: this.$store.state.pengaturan_pajak.subtitle,
            subtitle1: this.$store.state.pengaturan_pajak.subtitle1,
            pajak: {}
        }
    }    
};

</script>
