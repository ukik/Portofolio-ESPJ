<template>
    <div>
        <Toolbar judul="Creat Data Dasar PPTK" slot="title">
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

            <FormulirLegend slot="legend" title="Creat Data Dasar PPTK" />

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

            <FormulirInput 
                slot="input" 
                title="Nomor SK" 
                name="nomor_sk" 
                value="" 
                placeholder="Nomor SK" />

            <FormulirPicker 
                @onPicker="onPicker"
                slot="input" 
                type="date"
                title="Tanggal SK" 
                name="tanggal_sk" 
                value="" 
                placeholder="Tanggal SK" />

            <FormulirSwitch 
                slot="input"
                title="Aktif"
                type="checkbox" 
                name="aktif" 
                checked="true" />

            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        'get_listPegawai': 'getters/data-dasar/pptk/listPegawai',
      }),
    },
    methods: {
      ...mapActions({
          'set_listPegawai': 'setters/api/data-dasar/pptk/listPegawai',            
      }),      
      // CORE: untuk mengambil data init pada page ini
      onInitData(){
        // error handler reset
        this.$root.error.status = false
        this.$root.error.message = ""
        this.$root.request = true // membuka spinner ui

        // sesuaikan dengan kebutuhan bisnis page ini
        const request = new Promise((resolve, reject) => {
            axios.get('data-dasar/pptk/create').then((response) => {
                if(response == undefined) {
                    return resolve()
                }

                this.AutocompletePegawai(response.data.data.listPegawai)                

                resolve(this.set_listPegawai(response.data.data.listPegawai))
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
      onSubmit() {
        // error handler reset
        this.$root.error.status = false
        this.$root.error.message = ""
        this.$root.request = true // membuka spinner ui

        const pegawai_id = this.pegawai_id 
        const nomor_sk = document.getElementById('nomor_sk').value
        const tanggal_sk = this.tanggal_sk
        const aktif = document.getElementById('aktif').checked      

        const payload = { pegawai_id, nomor_sk, tanggal_sk, aktif }

        const request = new Promise((resolve, reject) => {
            axios.post('data-dasar/pptk', payload).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error);
            })
        })    
      },
      onPicker(value){
        this.tanggal_sk = value
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
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
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
            tanggal_sk: null, // untuk store vue-datetime

            pageReady: false,
            // pegawai
            items_pegawai: [],
            selected_pegawai: null,
            pegawai_id: "",                    
        }
    }    
  };
</script>
