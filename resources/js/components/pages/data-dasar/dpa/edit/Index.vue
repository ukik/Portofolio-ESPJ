<template>
    <div>
        <Toolbar judul="Edit Data Dasar DPA" slot="title">
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
        
        <Formulir>

            <FormulirLegend slot="legend" title="Edit Data Dasar Bidang" />

            <FormulirInput 
                slot="input" 
                type="text"
                readonly="true"
                title="Kode DPA" 
                name="kode_dpa" 
                v-model="get_form.kode_dpa" 
                placeholder="Kode DPA" />

            <FormulirTextarea 
                rows="2"
                readonly="true"      
                slot="input" 
                title="Nama Kegiatan" 
                name="nama" 
                v-model="get_form.nama"
                placeholder="Nama Kegiatan" />

            <FormulirInput 
                slot="input" 
                type="text"
                readonly="true"                
                title="Pagu" 
                name="pagu" 
                v-model="get_form.pagu"
                placeholder="Pagu" />

            <FormulirInput 
                slot="input" 
                type="text"
                readonly="true"                
                title="Kode Surat" 
                name="kode_surat" 
                v-model="get_form.kode_surat"
                placeholder="Kode Surat" />

            <Autocomplete 
                v-if="pageReady" 
                @onSelectedItem="onSelectedItemKPA" 
                slot="input" 
                :selected="selected_kpa" 
                :items="items_kpa" 
                title="KPA" >

                <template slot="item" slot-scope="props">
                    {{ props.result.singkatan }}  ({{ props.result.nama }})
                </template>

                <template slot="selection" slot-scope="props">
                    {{ props.result.singkatan }}  ({{ props.result.nama }})
                </template>

            </Autocomplete>            

            <Autocomplete 
                v-if="pageReady" 
                @onSelectedItem="onSelectedItemPPTK" 
                slot="input" 
                :selected="selected_pptk" 
                :items="items_pptk" 
                title="PPTK" >

                <template slot="item" slot-scope="props">
                    {{ props.result.singkatan }}  ({{ props.result.nama }})
                </template>

                <template slot="selection" slot-scope="props">
                    {{ props.result.singkatan }}  ({{ props.result.nama }})
                </template>

            </Autocomplete>                 
            
            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_form': 'getters/data-dasar/dpa/form',
            'get_list': 'getters/data-dasar/dpa/list',
        }),
        undefined_pegawai() {
            return function(args) {
                if(args == null || args == undefined) {
                    return ''
                } else {
                    return args.nama
                }
            }
        },        
    },
    methods: {
        ...mapActions({
            'set_list': 'setters/api/data-dasar/dpa/list',
        }),    
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const id = this.get_form.id

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('data-dasar/dpa/'+id+'/edit').then((response) => {
                if(response == undefined) {
                    return resolve()
                }

                this.AutocompleteKPA(response.data.data.listKpa)
                this.AutocompletePPTK(response.data.data.listPptk)

                  resolve(this.set_list({ listKpa: response.data.data.listKpa, listPptk: response.data.data.listPptk }))
              }).catch((error) => {
                  reject(error);
              })
          })
          return request
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

          const id = this.get_form.id

          const kode_dpa = document.getElementById('kode_dpa').value
          const nama = document.getElementById('nama').value
          const pagu = document.getElementById('pagu').value
          const kode_surat = document.getElementById('kode_surat').value
          const kpa_id = this.kpa_id 
          const pptk_id = this.pptk_id 

          const payload = { id, kode_dpa, nama, pagu, kode_surat, kpa_id, pptk_id }

          const request = new Promise((resolve, reject) => {
              axios.put('data-dasar/dpa/'+id, payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        },

        AutocompleteKPA(args){
            this.items_kpa = []
            this.selected_kpa = null
            this.kpa_id = "" 
                        
            new Promise((resolve) => {
                args.forEach(element => {
                    var data = element
                    data["search"] = element.singkatan +" "+ element.nama

                    this.items_kpa.push(data);

                    if(element.id == this.get_form.kpa_id) {
                        this.selected_kpa = element.singkatan +" "+ element.nama
                    }
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
                this.kpa_id = this.get_form.kpa_id
            })
            
        },     
        onSelectedItemKPA(args){
            this.kpa_id = args.id
        },  

        AutocompletePPTK(args){
            this.items_pptk = []
            this.selected_pptk = null
            this.pptk_id = "" 
                        
            new Promise((resolve) => {
                args.forEach(element => {
                    var data = element
                    data["search"] = element.singkatan +" "+ element.nama

                    this.items_pptk.push(data);

                    if(element.id == this.get_form.pptk_id) {
                        this.selected_pptk = element.singkatan +" "+ element.nama
                    }
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
                this.pptk_id = this.get_form.pptk_id
            })
            
        },     
        onSelectedItemPPTK(args){
            this.pptk_id = args.id
        },           
    },  
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()

    },
    data(){
        return {

            pageReady: false,

            // PPTK
            items_pptk: [],
            selected_pptk: null,
            pptk_id: "",            

            // KPA
            items_kpa: [],
            selected_kpa: null,
            kpa_id: "",            

        }
    }
};

</script>
