<template>
    <div>
        <Toolbar judul="Edit SPK" slot="title">
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

            <FormulirLegend slot="legend" title="Edit SPK" />

              <div slot="input" class="form-group">
                <div class="row">
                  <div class="col">

                    
                    <FormulirInput 
                        slot="input"
                        readonly="true"
                        type="text"
                        title="Nomor" 
                        name="nomor_spk" 
                        v-model="get_listSpk" 
                        placeholder="Nomor" />
                  </div>

                  <div class="col">


                  <FormulirPicker 
                        @onPicker="onPicker({ key: 'tanggal', value: $event })"
                        slot="input" 
                        type="date"
                        title="Tanggal" 
                        name="tanggal" 
                        :value="get_form.tanggal" 
                        placeholder="Tanggal" />                      
                  </div>

                  <div class="col">
                      <FormulirDropdown 
                          slot="input" 
                          title="Jenis">
                            <div slot="default" class="input-group">
                              <select v-model="get_form.jenis" name="jenis" id="jenis" class="form-control selectize submit-on-change">
                                <option value="">- Pilih Jenis -</option>
                                <option v-for="(item, index) in get_listJenis" 
                                :key="index" 
                                :value="index">
                                SPK {{ item }} </option>
                              </select>
                            </div>
                      </FormulirDropdown>
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

              <FormulirInput 
                  slot="input"
                  type="text"
                  title="Nama Pekerjaan" 
                  name="nama_pekerjaan" 
                  v-model="get_form.nama_pekerjaan"  
                  placeholder="Nama Pekerjaan" />

              <FormulirTextarea 
                  slot="input" 
                  title="Uraian" 
                  name="uraian" 
                  :value="get_form.uraian" 
                  placeholder="Uraian" />

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

              <FormulirDropdown 
                  slot="input" 
                  title="Rekanan">
                  <div slot="default" class="input-group">
                    <select v-model="get_form.rekanan_id" class="form-control selectize" name="rekanan_id" id="rekanan_id">
                      <option value="">- Pilih Rekanan -</option>
                      <option v-for="(item, index) in get_listRekanan" 
                        :key="index" 
                        :value="item.id">
                        {{ item.nama_pimpinan }} ({{ item.nama_perusahaan }})
                      </option>
                    </select>
                  </div>
              </FormulirDropdown>

              <FormulirInput 
                  slot="input"
                  type="text"
                  title="Jabatan Rekanan" 
                  name="rekanan_jabatan" 
                  v-model="get_form.rekanan_jabatan" 
                  placeholder="Jabatan Rekanan" />

              <div slot="input" class="form-group">   
                <div class="row">
                  <div class="col">
                    <FormulirInput 
                        slot="input"
                        type="number"
                        title="Pelaksanaan" 
                        name="pelaksanaan_jumlah" 
                        v-model="get_form.pelaksanaan_jumlah"  
                        placeholder="Pelaksanaan" />                
                  </div>
                  <div class="col">
                    <FormulirDropdown 
                        slot="input" 
                        title="Pelaksanaan">
                        <div slot="default" class="input-group">
                          <select v-model="get_form.pelaksanaan_satuan" class="form-control selectize" name="pelaksanaan_satuan" id="pelaksanaan_satuan">
                            <option value="">- Pilih Pelaksanaan -</option>
                            <option v-for="(item, index) in get_listPelaksanaanSatuan" 
                              :key="index" 
                              :value="item">
                              {{ item }}
                            </option>
                          </select>
                        </div>
                    </FormulirDropdown>
                  </div>
                </div>
              </div>

                <Autocomplete 
                    v-if="pageReady" 
                    @onSelectedItem="onSelectedItemLokasi" 
                    slot="input" 
                    :selected="selected_lokasi" 
                    :items="items_lokasi" 
                    title="Lokasi Terbit" >

                    <template slot="item" slot-scope="props">
                        <b>{{ props.result.parent_nama }}: </b> {{ props.result.jenis }} - {{ props.result.nama }}
                    </template>

                    <template slot="selection" slot-scope="props">
                        <b>{{ props.result.parent_nama }}: </b> {{ props.result.jenis }} - {{ props.result.nama }}
                    </template>

                </Autocomplete>

              <FormulirPicker 
                    @onPicker="onPicker({ key: 'terbit_tanggal', value: $event })"
                    slot="input" 
                    type="date"
                    title="Tanggal Terbit" 
                    name="terbit_tanggal" 
                    :value="get_form.tanggal" 
                    placeholder="Tanggal Terbit" />

            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>



<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_dpa':'getters/lampiran/spk/dpa',
            'get_bendahara':'getters/lampiran/spk/bendahara',
            'get_pimpinan':'getters/lampiran/spk/pimpinan',
            'get_listProgramKegiatan':'getters/lampiran/spk/listProgramKegiatan',
            'get_listKodeRekening':'getters/lampiran/spk/listKodeRekening',
            'get_listJenis':'getters/lampiran/spk/listJenis',
            'get_listRekanan':'getters/lampiran/spk/listRekanan',
            'get_listPelaksanaanSatuan':'getters/lampiran/spk/listPelaksanaanSatuan',
            'get_listSpk': 'getters/lampiran/spk/listSpk',
            'get_listLokasi': 'getters/lampiran/spk/listLokasi',

            'get_form':'getters/lampiran/spk/form'
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
            'set_edit': 'setters/api/lampiran/spk/edit',            
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
              axios.get('lampiran/spk/'+id+'/edit?kode_dpa='+this.get_form.kode_dpa).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    this.AutocompleteBendahara(response.data.data.bendahara)                
                    this.AutocompletePimpinan(response.data.data.pimpinan)                         
                    
                    this.AutocompleteKegiatan(response.data.data.listProgramKegiatan)
                    this.AutocompleteRekening(response.data.data.listKodeRekening)
                    this.AutocompleteLokasi(response.data.data.listLokasi)   

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

            // Lokasi
            this.items_lokasi = []
            this.selected_lokasi = null
            this.terbit_lokasi = ""  
            
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

          const id = this.get_form.id
          
          const nomor_spk = document.getElementById('nomor_spk').value
          const tanggal = this.tanggal; 
          const jenis = document.getElementById('jenis').value
          const kode_dpa = this.kode_dpa; 
          const kode_rekening = this.kode_rekening; 
          const nama_pekerjaan = document.getElementById('nama_pekerjaan').value
          const uraian = document.getElementById('uraian').value

          const rekanan_id = document.getElementById('rekanan_id').value
          const rekanan_jabatan = document.getElementById('rekanan_jabatan').value
          const pelaksanaan_jumlah = document.getElementById('pelaksanaan_jumlah').value
          const pelaksanaan_satuan = document.getElementById('pelaksanaan_satuan').value
          const terbit_lokasi = this.terbit_lokasi 
          const terbit_tanggal = this.terbit_tanggal; 

          const bendahara_id = this.bendahara_id
          const pimpinan_id = this.pimpinan_id

          const kpa_id = this.kpa_id
          const pptk_id = this.pptk_id 

          const payload = { 
                id, 
                nomor_spk,
                tanggal,
                jenis,
                kode_dpa,
                kode_rekening,
                nama_pekerjaan,
                uraian,
                rekanan_id,
                rekanan_jabatan,
                pelaksanaan_jumlah,
                pelaksanaan_satuan,
                terbit_lokasi,
                terbit_tanggal,

                bendahara_id,
                pimpinan_id,                  
              
              kpa_id,
              pptk_id,
            }

          const request = new Promise((resolve, reject) => {
              axios.put('lampiran/spk/'+id+'/edit', payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
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
        
        AutocompleteLokasi(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    element.sub.forEach(element2 => {
                        var data = element2
                        data["parent_nama"] = element.nama
                        data["search"] = element.jenis +" "+ element.nama +" "+ element2.jenis +" "+ element2.nama

                        this.items_lokasi.push(data);

                        if(element2.nama == this.get_form.terbit_lokasi) {
                            this.selected_lokasi = element.jenis +" "+ element.nama +" "+ element2.jenis +" "+ element2.nama
                        }

                    });
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
                this.terbit_lokasi = this.get_form.terbit_lokasi
            })
            
        },
        onSelectedItemLokasi(args){
            this.terbit_lokasi = args.nama
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
            terbit_tanggal: null,

            pageReady: false,

            // Kegiatan
            items_kegiatan: [],
            selected_kegiatan: null,
            kode_dpa: "",

            // Rekening
            items_rekening: [],
            selected_rekening: null,
            kode_rekening: "",

            // Lokasi
            items_lokasi: [],
            selected_lokasi: null,
            terbit_lokasi: "",    

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
