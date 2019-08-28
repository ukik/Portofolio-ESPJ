<template>
    <div>
        <Toolbar judul="Edit Pegawai Perjadin" slot="title">
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

        <Formulir column_content="col-12">

            <FormulirLegend slot="legend" title="Edit Pegawai Perjadin" />

            <Autocomplete 
                v-if="pageReady" 
                @onSelectedItem="onSelectedItemPegawai" 
                slot="input" 
                :selected="selected_pegawai" 
                :items="items_pegawai" 
                title="Pegawai" >

                <template slot="item" slot-scope="props">
                    {{ props.result.nama }} - {{ props.result.nip }}
                </template>

                <template slot="selection" slot-scope="props">
                    {{ props.result.nama }} - {{ props.result.nip }}
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
            'get_listPegawai':'getters/lampiran/perjadin/detail/listPegawai',
            'get_form': 'getters/lampiran/perjadin/form',
            'get_form_detail': 'getters/lampiran/perjadin/detail/form',
        }),
    },
    methods: {
        ...mapActions({
            'set_edit': 'setters/api/lampiran/perjadin/detail/edit',   
        }),    
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

            const id = this.get_form.id
            const id_detail = this.get_form_detail.id

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('lampiran/perjadin/'+id+'/detail/'+id_detail+'/edit').then((response) => {
                if(response == undefined) {
                    return resolve()
                }

                this.AutocompletePegawai(response.data.data.listPegawai)

                  resolve(this.set_edit(response.data.data))
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
            const id_detail = this.get_form_detail.id

          const pegawai_id = this.pegawai_id 

          const payload = { id, id_detail, pegawai_id }

          const request = new Promise((resolve, reject) => {
              axios.put('lampiran/perjadin/'+id+'/detail/'+id_detail+'/edit', payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     

        },    
        AutocompletePegawai(args){
            this.items_pegawai = []
            this.selected_pegawai = null
            this.pegawai_id = ""   
                        
            new Promise((resolve) => {
                args.forEach(element => {
                    var data = element
                    data["search"] = element.nama +" "+ element.nip

                    this.items_pegawai.push(data);

                    if(element.id == this.get_form.pegawai_id) {
                        this.selected_pegawai = element.nama +" "+ element.nip
                    }
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
                this.pegawai_id = this.get_form.pegawai_id
            })
            
        },     
        onSelectedItemPegawai(args){
            this.pegawai_id = args.id
        },              
    },  
    mounted() {
        // CORE: untuk mengambil data init pada page ini
        this.onInitData()
    },
    data() {
        return {

            pageReady: false,
            // pegawai
            items_pegawai: [],
            selected_pegawai: null,
            pegawai_id: "",               
        }
    }   
}

</script>
