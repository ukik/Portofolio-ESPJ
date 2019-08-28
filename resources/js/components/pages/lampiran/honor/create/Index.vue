<template>
    <div>
        <Toolbar judul="Create Honor" slot="title">
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

            <FormulirLegend slot="legend" title="Create Honor" />

            <FormulirInput 
                slot="input" 
                type="text"
                title="Uraian" 
                name="uraian" 
                value="" 
                placeholder="Uraian" />

            <div slot="input" class="form-group">
              <div class="row">
                <div class="col">

                  <FormulirDropdown 
                      slot="input" 
                      title="Jenis">
                      <div slot="default" class="input-group">
                        <select class="form-control selectize" name="jenis" id="jenis">
                          <option value="">- Pilih Jenis -</option>
                          <option v-for="(item, index) in get_listJenis" 
                            :key="index" 
                            :value="item">
                            {{ item }}
                          </option>
                        </select>
                      </div>
                  </FormulirDropdown>  

                </div>
                <div class="col">
                    <FormulirPicker 
                        @onPicker="onPicker"
                        slot="input" 
                        type="date"
                        title="Tanggal Pengajuan" 
                        name="tanggal" 
                        value="" 
                        placeholder="Tanggal Pengajuan" />

                </div>
              </div>
            </div>
                <Autocomplete 
                    v-if="pageReady" 
                    @onSelectedItem="onSelectedItemKegiatan" 
                    slot="input" 
                    :selected="selected_kegiatan" 
                    :items="items_kegiatan" 
                    title="Kegiatan / Belanja" >

                    <template slot="item" slot-scope="props">
                        <b>{{ props.result.parent_nama }}: </b>
                        <br>
                        &nbsp; &nbsp; &nbsp; &nbsp; [ {{ props.result.kode_dpa }} ]: {{ props.result.nama }}
                    </template>

                    <template slot="selection" slot-scope="props">
                        [ {{ props.result.kode_dpa }} ]: {{ props.result.nama }}
                    </template>

                </Autocomplete>

                <Autocomplete 
                    v-if="pageReady" 
                    @onSelectedItem="onSelectedItemRekening" 
                    slot="input" 
                    :selected="selected_rekening" 
                    :items="items_rekening" 
                    title="Kode Rekening" >

                    <template slot="item" slot-scope="props">
                        [ {{ props.result.kode_rekening }} ]: {{ props.result.nama }}
                    </template>

                    <template slot="selection" slot-scope="props">
                        [ {{ props.result.kode_rekening }} ]: {{ props.result.nama }}
                    </template>

                </Autocomplete>    

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

                <Autocomplete 
                    v-if="pageReady" 
                    @onSelectedItem="onSelectedItemPimpinan" 
                    slot="input" 
                    :selected="selected_pimpinan" 
                    :items="items_pimpinan" 
                    title="Pimpinan" >

                    <template slot="item" slot-scope="props">
                        {{ props.result.nip }} - {{ props.result.nama }}
                    </template>

                    <template slot="selection" slot-scope="props">
                        {{ props.result.nip }} - {{ props.result.nama }}
                    </template>

                </Autocomplete>

                <Autocomplete 
                    v-if="pageReady" 
                    @onSelectedItem="onSelectedItemBendahara" 
                    slot="input" 
                    :selected="selected_bendahara" 
                    :items="items_bendahara" 
                    title="Bendahara" >

                    <template slot="item" slot-scope="props">
                        {{ props.result.nip }} - {{ props.result.nama }}
                    </template>

                    <template slot="selection" slot-scope="props">
                        {{ props.result.nip }} - {{ props.result.nama }}
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
            'get_bendahara':'getters/lampiran/honor/bendahara',
            'get_pimpinan':'getters/lampiran/honor/pimpinan',
            'get_listProgramKegiatan':'getters/lampiran/honor/listProgramKegiatan', 
            'get_listKodeRekening':'getters/lampiran/honor/listKodeRekening', 
            'get_listJenis':'getters/lampiran/honor/listJenis', 

            'get_form': 'getters/lampiran/honor/form',
        }),
        undefined_bendahara() {
            return function(args) {
                if(args == null || args == undefined) {
                    return ''
                } else {
                    return args.nama
                }
            }
        },
        undefined_pimpinan() {
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
            'set_edit': 'setters/api/lampiran/honor/edit',            
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
              axios.get('lampiran/honor/create').then((response) => {
                if(response == undefined) {
                    return resolve()
                }

                this.AutocompleteBendahara(response.data.data.bendahara)                
                this.AutocompletePimpinan(response.data.data.pimpinan)         

                this.AutocompleteKegiatan(response.data.data.listProgramKegiatan)
                this.AutocompleteRekening(response.data.data.listKodeRekening)

                this.AutocompleteKPA(response.data.data.listKpa)
                this.AutocompletePPTK(response.data.data.listPptk)

                resolve(this.set_edit(response.data.data))
              }).catch((error) => {
                  reject(error);
              })
          })
          return request
        },  
        // CORE: untuk refresh data init pada page ini
        onRefresh(){
            // Kegiatan
            this.items_kegiatan = []
            this.selected_kegiatan = null
            this.kode_dpa = ""

            // Rekening
            this.items_rekening = []
            this.selected_rekening = null
            this.kode_rekening = ""     
            
            // Bendahara
            this.items_bendahara = []
            this.selected_bendahara = null
            this.bendahara_id = ""  
            
            // pimpinan
            this.items_pimpinan = []
            this.selected_pimpinan = null
            this.pimpinan_id = ""   

          // CORE: untuk mengambil data init pada page ini
          this.onInitData()
        },      
        onSubmit(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui
          
          const uraian = document.getElementById('uraian').value
          const jenis = document.getElementById('jenis').value
          const tanggal = this.tanggal 
          const kode_dpa = this.kode_dpa; 
          const kode_rekening = this.kode_rekening; 

          const kpa_id = this.kpa_id 
          const pptk_id = this.pptk_id

          const bendahara_id = this.bendahara_id
          const pimpinan_id = this.pimpinan_id

          const payload = { 
              uraian, 
              jenis, 
              tanggal, 
              kode_dpa, 
              kode_rekening, 
              
              bendahara_id,
              pimpinan_id,   
              
              kpa_id,
              pptk_id,
              
            }

          const request = new Promise((resolve, reject) => {
              axios.post('lampiran/honor/create', payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        },
        onPicker(value){
            this.tanggal = value
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
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
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
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
            })
            
        },     
        onSelectedItemPPTK(args){
            this.pptk_id = args.id
        },           


        AutocompleteRekening(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    var data = element
                    data["search"] = element.kode_rekening +" "+ element.nama

                    this.items_rekening.push(data);
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
            })
            
        },
        AutocompleteKegiatan(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    element.kegiatan.forEach(element2 => {
                        var data = element2
                        data["parent_kode_dpa"] = element.kode_dpa
                        data["parent_nama"] = element.nama
                        data["search"] = element.kode_dpa +" "+ element2.kode_dpa +" "+ element.nama +" "+element2.nama

                        this.items_kegiatan.push(data);
                    });
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
            })
            
        },
        onSelectedItemKegiatan(args){
            this.kode_dpa = args.kode_dpa
        },
        onSelectedItemRekening(args){
            this.kode_rekening = args.kode_rekening
        },
        
        AutocompleteBendahara(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    var data = element
                    data["search"] = element.nip +" "+ element.nama

                    this.items_bendahara.push(data);
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
            })
            
        },        
        onSelectedItemBendahara(args){
            this.bendahara_id = args.id
        },
        
        AutocompletePimpinan(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    var data = element
                    data["search"] = element.nip +" "+ element.nama

                    this.items_pimpinan.push(data);
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
            })
            
        },        
        onSelectedItemPimpinan(args){
            this.pimpinan_id = args.id
        },            
    },  
    mounted() {
        // CORE: untuk mengambil data init pada page ini
        this.onInitData()

        console.log(this.get_form)
    },
    data(){
        return {
            tanggal: null,

            pageReady: false,

            // Kegiatan
            items_kegiatan: [],
            selected_kegiatan: null,
            kode_dpa: "",

            // Rekening
            items_rekening: [],
            selected_rekening: null,
            kode_rekening: "",     
            
            // Bendahara
            items_bendahara: [],
            selected_bendahara: null,
            bendahara_id: "",  
            
            // pimpinan
            items_pimpinan: [],
            selected_pimpinan: null,
            pimpinan_id: "",         
            
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
}


</script>
