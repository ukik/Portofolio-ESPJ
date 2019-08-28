<template>
    <div>
        <Toolbar judul="Edit SPT" slot="title">
            <RefreshButton @onRefresh="onRefresh()" />          
            <BackButton @onBack="onBack()"/>
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

            <FormulirLegend slot="legend" title="Edit SPT" />

            <div slot="input" class="form-group">
              <div class="row">
                <div class="col">

                  <FormulirInput 
                      slot="input"
                      type="text"
                      title="Nomor Surat" 
                      name="nomor_spt" 
                      :value="get_listPerjadin" 
                      placeholder="Nomor Surat" />

                </div>
                <div class="col">

                    <FormulirPicker 
                        @onPicker="onPicker({ key: 'tanggal', value: $event })"
                        slot="input" 
                        type="date"
                        title="Tanggal Surat" 
                        name="tanggal" 
                        :value="get_form.tanggal" 
                        placeholder="Tanggal Surat" />

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


            <FormulirTextarea 
                slot="input" 
                title="Perihal/Maksud Perjalanan Dinas" 
                name="uraian" 
                :value="get_form.uraian"
                placeholder="Perihal/Maksud Perjalanan Dinas" />

            <FormulirTextarea 
                slot="input" 
                title="Keterangan" 
                name="keterangan" 
                :value="get_form.keterangan"
                placeholder="Keterangan" />


            <div slot="input" class="form-group">
              <div class="row">
                <div class="col">

                    <FormulirPicker 
                        @onPicker="onPicker({ key: 'tanggal_berangkat', value: $event })"
                        slot="input" 
                        type="date"
                        title="Tanggal Berangkat" 
                        name="tanggal_berangkat" 
                        :value="get_form.tanggal_berangkat" 
                        placeholder="Tanggal Berangkat" />

                </div>
                <div class="col">

                    <FormulirPicker 
                        @onPicker="onPicker({ key: 'tanggal_kembali', value: $event })"
                        slot="input" 
                        type="date"
                        title="Tanggal Kembali" 
                        name="tanggal_kembali" 
                        :value="get_form.tanggal_kembali" 
                        placeholder="Tanggal Kembali" />

                </div>
              </div>
            </div>

                <Autocomplete 
                    v-if="pageReady" 
                    @onSelectedItem="onSelectedItemBerangkat" 
                    slot="input" 
                    :selected="selected_berangkat" 
                    :items="items_berangkat" 
                    title="Lokasi Berangkat" >

                    <template slot="item" slot-scope="props">
                        <b>{{ props.result.parent_nama }}: </b> {{ props.result.jenis }} - {{ props.result.nama }}
                    </template>

                    <template slot="selection" slot-scope="props">
                        <b>{{ props.result.parent_nama }}: </b> {{ props.result.jenis }} - {{ props.result.nama }}
                    </template>

                </Autocomplete>


                <Autocomplete 
                    v-if="pageReady" 
                    @onSelectedItem="onSelectedItemTujuan" 
                    slot="input" 
                    :selected="selected_tujuan" 
                    :items="items_tujuan" 
                    title="Lokasi Tujuan" >

                    <template slot="item" slot-scope="props">
                        <b>{{ props.result.parent_nama }}: </b> {{ props.result.jenis }} - {{ props.result.nama }}
                    </template>

                    <template slot="selection" slot-scope="props">
                        <b>{{ props.result.parent_nama }}: </b> {{ props.result.jenis }} - {{ props.result.nama }}
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
            'get_dpa':'getters/lampiran/perjadin/dpa',
            'get_bendahara':'getters/lampiran/perjadin/bendahara',
            'get_pimpinan':'getters/lampiran/perjadin/pimpinan',
            'get_listProgramKegiatan':'getters/lampiran/perjadin/listProgramKegiatan',
            'get_listKodeRekening':'getters/lampiran/perjadin/listKodeRekening',
            'get_listPerjadin':'getters/lampiran/perjadin/listPerjadin',
            'get_listLokasi':'getters/lampiran/perjadin/listLokasi',

            'get_form': 'getters/lampiran/perjadin/form',
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
            'set_edit': 'setters/api/lampiran/perjadin/edit',            
        }),    
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          var id = this.$route.query.id == undefined ? this.get_form.id : this.$route.query.id

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('lampiran/perjadin/perubahan/'+id+'/edit?kode_dpa='+this.get_form.kode_dpa).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                    this.AutocompleteBendahara(response.data.data.bendahara)                
                    this.AutocompletePimpinan(response.data.data.pimpinan)                

                    this.AutocompleteKegiatan(response.data.data.listProgramKegiatan)
                    this.AutocompleteRekening(response.data.data.listKodeRekening)                

                    this.AutocompleteBerangkat(response.data.data.listLokasi)
                    this.AutocompleteTujuan(response.data.data.listLokasi)

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

            // berangkat
            this.items_berangkat = []
            this.selected_berangkat = null
            this.lokasi_id = ""
            this.lokasi_nama = ""

            // tujuan
            this.items_tujuan = []
            this.selected_tujuan = null
            this.tempat_tujuan = ""      

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
          
          var id = this.$route.query.id == undefined ? this.get_form.id : this.$route.query.id

          const nomor_spt = document.getElementById('nomor_spt').value

          const tanggal = this.tanggal 
          const kode_dpa = this.kode_dpa; 
          const kode_rekening = this.kode_rekening; 
          const uraian = document.getElementById('uraian').value
          const keterangan = document.getElementById('keterangan').value
          const tanggal_berangkat = this.tanggal_berangkat
          const tanggal_kembali = this.tanggal_kembali
          const lokasi_id = this.lokasi_id
          const lokasi_nama = this.lokasi_nama
          const tempat_tujuan = this.tempat_tujuan 

          const bendahara_id = this.bendahara_id
          const pimpinan_id = this.pimpinan_id

          const kpa_id = this.kpa_id 
          const pptk_id = this.pptk_id 

          const payload = { 
              nomor_spt, 
              tanggal, 
              kode_dpa, 
              kode_rekening, 
              uraian, 
              keterangan, 
              tanggal_berangkat, 
              tanggal_kembali, 
              lokasi_id, 
              lokasi_nama,
              tempat_tujuan,
              
              bendahara_id,
              pimpinan_id,
              
              kpa_id,
              pptk_id,
            }

          const request = new Promise((resolve, reject) => {
              axios.put('lampiran/perjadin/perubahan/'+id, payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })       
          
          request.then(result => {
              if(result.data.data.info == "complete") {
                  this.jump({ name: "lampiran-perjadin-perubahan" })
              }
          })
        },
        onBack(){
            this.jump({ name: "lampiran-perjadin-perubahan" })
        },
        onPicker(args){
            this[args.key] = args.value
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


        AutocompleteRekening(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    var data = element
                    data["search"] = element.kode_rekening +" "+ element.nama

                    this.items_rekening.push(data);

                    if(element.kode_rekening == this.get_form.kode_rekening) {
                        this.selected_rekening = element.kode_rekening +" "+ element.nama
                    }
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
                this.kode_rekening = this.get_form.kode_rekening
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

                        if(element2.kode_dpa == this.get_form.kode_dpa) {
                            this.selected_kegiatan = element.kode_dpa +" "+ element2.kode_dpa +" "+ element.nama +" "+element2.nama
                        }

                    });
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
                this.kode_dpa = this.get_form.kode_dpa
            })
            
        },
        onSelectedItemKegiatan(args){
            this.kode_dpa = args.kode_dpa
        },
        onSelectedItemRekening(args){
            this.kode_rekening = args.kode_rekening
        },         
        
        AutocompleteBerangkat(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    element.sub.forEach(element2 => {
                        var data = element2
                        data["parent_nama"] = element.nama
                        data["search"] = element.jenis +" "+ element.nama +" "+ element2.jenis +" "+ element2.nama

                        this.items_berangkat.push(data);

                        if(element2.nama == this.get_form.lokasi_nama) {
                            this.selected_berangkat = element.jenis +" "+ element.nama +" "+ element2.jenis +" "+ element2.nama
                        }
                    });
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
                this.lokasi_id = this.get_form.lokasi_id
                this.lokasi_nama = this.get_form.lokasi_nama
            })
            
        },
        onSelectedItemBerangkat(args){
            this.lokasi_id = args.id
            this.lokasi_nama = args.nama
        },                

        AutocompleteTujuan(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    element.sub.forEach(element2 => {
                        var data = element2
                        // data["parent_kode_dpa"] = element.kode_dpa
                        data["parent_nama"] = element.nama
                        data["search"] = element.jenis +" "+ element.nama +" "+ element2.jenis +" "+ element2.nama

                        this.items_tujuan.push(data);

                        if(element2.nama == this.get_form.tempat_tujuan) {
                            this.selected_tujuan = element.jenis +" "+ element.nama +" "+ element2.jenis +" "+ element2.nama
                        }                        

                    });
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
                this.tempat_tujuan = this.get_form.lokasi_id
            })
            
        },
        onSelectedItemTujuan(args){
            this.tempat_tujuan = args.nama
        },           

        AutocompleteBendahara(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    var data = element
                    data["search"] = element.nip +" "+ element.nama

                    this.items_bendahara.push(data);

                    if(element.id == this.get_form.bendahara_id) {
                        this.selected_bendahara = element.nip +" "+ element.nama
                    }
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
                this.bendahara_id = this.get_form.bendahara_id
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

                    if(element.id == this.get_form.pimpinan_id) {
                        this.selected_pimpinan = element.nip +" "+ element.nama
                    }
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
                this.pimpinan_id = this.get_form.pimpinan_id
            })
            
        },        
        onSelectedItemPimpinan(args){
            this.pimpinan_id = args.id
        },            

    },  
    mounted() {
        // CORE: untuk mengambil data init pada page ini
        this.onInitData()
    },
    data(){
        return {
            tanggal: null,
            tanggal_berangkat: null,
            tanggal_kembali: null,

            pageReady: false,

            // Kegiatan
            items_kegiatan: [],
            selected_kegiatan: null,
            kode_dpa: "",

            // Rekening
            items_rekening: [],
            selected_rekening: null,
            kode_rekening: "",            

            // berangkat
            items_berangkat: [],
            selected_berangkat: null,
            lokasi_id: "",
            lokasi_nama: "",

            // tujuan
            items_tujuan: [],
            selected_tujuan: null,
            tempat_tujuan: "",      
            
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
    },
}

</script>
