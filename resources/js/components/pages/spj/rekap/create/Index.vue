<template>
    <div>
        <Toolbar judul="Tambah Rincian Rekap Pengeluaran SPJ" slot="title">
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

        <div slot="pre-information">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table table-hover table-sm table-outline table-vcenter text-nowrap card-table">
                                <tr>
                                    <th width="200">Tanggal</th>
                                    <td width="10">:</td>
                                    <td>{{ get_form.tanggal ? get_form.tanggal : '[Belum diajukan]' }}</td>
                                </tr>
                                <tr>
                                    <th>Nomor Permohonan</th>
                                    <td>:</td>
                                    <td>{{ get_form.permohonan.nomor_permohonan }}</td>
                                </tr>
                                <tr>
                                    <th>Kegiatan</th>
                                    <td>:</td>
                                    <td>[{{ get_form.kode_dpa }}] {{ get_form.kegiatan }}</td>
                                </tr>
                                <tr>
                                    <th>Diajukan</th>
                                    <td>:</td>
                                    <td>{{ get_form.nominal_diajukan | rupiah2 }}</td>
                                </tr>
                                <tr>
                                    <th>Disetujui</th>
                                    <td>:</td>
                                    <td>{{ get_form.nominal_disetujui | rupiah2 }}</td>
                                </tr>
                                <tr>
                                    <th>Nominal SPJ</th>
                                    <td>:</td>
                                    <td>{{ get_form.nominal_spj | rupiah2 }}</td>
                                </tr>
                                <tr>
                                    <th>Sisa SPJ</th>
                                    <td>:</td>
                                    <td>{{ get_form.nominal_sisa | rupiah2 }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
        <Formulir column_content="col-12">

            <FormulirLegend slot="legend" title="Edit Berkas" />

            <FormulirPicker 
                @onPicker="onPicker"
                slot="input" 
                type="date"
                title="Tanggal" 
                name="bukti_tanggal" 
                value="" 
                placeholder="Tanggal" />                

               <Autocomplete 
                    v-if="pageReady" 
                    @onSelectedItem="onSelectedItemRekening" 
                    slot="input" 
                    :selected="selected_rekening" 
                    :items="items_rekening" 
                    title="Kode Rincian (Rekening)" >

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
                name="penerima" 
                value=""
                placeholder="Penerima" 
                title="Penerima" />

            <FormulirInput readonly="true" 
                slot="input" 
                type="text" 
                name="" 
                :value="0 | rupiah2" 
                placeholder="Nominal Disetujui (Rp)" 
                title="Nominal Disetujui (Rp)" />

            <FormulirInput readonly="true" 
                slot="input" 
                type="text" 
                name="" 
                :value="0 | rupiah2" 
                placeholder="Nominal Rincian Sebelumnya (Rp)" 
                title="Nominal Rincian Sebelumnya (Rp)" />

            <FormulirInput readonly="true" 
                slot="input" 
                type="text" 
                name="" 
                :value="0 | rupiah2" 
                placeholder="Nominal Sisa (Rp)" 
                title="Nominal Sisa (Rp)" />

            <FormulirInput 
                slot="input" 
                type="number" 
                name="nominal" 
                value="0" 
                placeholder="Nominal (Rp)" 
                title="Nominal (Rp)" />

            <div slot="input" class="form-group">
                <div class="form-label">Pajak</div>
                <div class="custom-controls-stacked">

                    <label class="custom-control custom-checkbox custom-control-inline">
                    <input 
                        type="checkbox" 
                        class="custom-control-input" 
                        name="ppn"
                        id="ppn"
                        :value="valued('ppn')">
                    <span class="custom-control-label">PPN</span>
                    </label>

                    <label class="custom-control custom-checkbox custom-control-inline">
                    <input 
                        type="checkbox" 
                        class="custom-control-input" 
                        name="pph21" 
                        id="pph21" 
                        :value="valued('pph21')">
                    <span class="custom-control-label">PPh21</span>
                    </label>

                    <label class="custom-control custom-checkbox custom-control-inline">
                    <input 
                        type="checkbox" 
                        class="custom-control-input" 
                        name="pph22" 
                        id="pph22" 
                        :value="valued('pph22')">
                    <span class="custom-control-label">PPh22</span>
                    </label>

                    <label class="custom-control custom-checkbox custom-control-inline">
                    <input 
                        type="checkbox" 
                        class="custom-control-input" 
                        name="pph23" 
                        id="pph23" 
                        :value="valued('pph23')">
                    <span class="custom-control-label">PPh23</span>
                    </label>

                </div>
            </div>

            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_listKodeRekening': 'getters/spj/rekap/listKodeRekening', 
            'get_pajak': 'getters/spj/rekap/pajak', 
            'get_form': 'getters/spj/form',
        }),
        valued () {
            return (args) => {
                const index = this.get_form.tahun+'.pajak.'+args 

                return this.get_pajak[index];
            }            
        }        
    },
    methods: {
        ...mapActions({
            'set_edit': 'setters/api/spj/rekap/edit',
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
              axios.get('spj/'+id+'/rekap/create').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                      
                    this.AutocompleteRekening(response.data.data.listKodeRekening)

                  resolve(this.set_edit(response.data.data))
              }).catch((error) => {
                  reject(error);
              })
          })
          return request
        },  
        // CORE: untuk refresh data init pada page ini
        onRefresh(){
            // Rekening
            this.items_rekening = []
            this.selected_rekening = null
            this.kode_rekening = ""       
                        
          // CORE: untuk mengambil data init pada page ini
          this.onInitData()
        },      
        onSubmit(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            const id = this.get_form.id

            const tanggal = this.bukti_tanggal
            const penerima = document.getElementById('penerima').value
            const nominal = document.getElementById('nominal').value

            const ppnDOM = document.getElementById('ppn')
            const pph21DOM = document.getElementById('pph21')
            const pph22DOM = document.getElementById('pph22')
            const pph23DOM = document.getElementById('pph23')

            let ppn = 0
            let pph21 = 0
            let pph22 = 0
            let pph23 = 0

            if(ppnDOM.checked) {
                ppn = ppnDOM.value
            }
            if(pph21DOM.checked) {
                pph21 = pph21DOM.value
            }
            if(pph22DOM.checked) {
                pph22 = pph22DOM.value
            }
            if(pph23DOM.checked) {
                pph23 = pph23DOM.value
            }

            const kode_rekening = this.kode_rekening 
            const kode_dpa = this.get_form.kode_dpa
            const permohonan_id = this.get_form.permohonan_id
            const permohonan_detail_id = this.get_form.permohonan_id
            const uraian = this.uraian

            const payload = { 
                id, 
                tanggal, 
                permohonan_id,
                permohonan_detail_id, 
                penerima, 
                nominal, 
                kode_dpa,
                kode_rekening, 
                uraian,
                ppn, 
                pph21, 
                pph22, 
                pph23, 
            }

            const request = new Promise((resolve, reject) => {
                axios.post('spj/'+id+'/rekap', payload).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })                     
        },       
        onPicker(value){
            this.bukti_tanggal = value
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
        onSelectedItemRekening(args){
            this.kode_rekening = args.kode_rekening
            this.uraian = args.nama
        }                            
    },  
    mounted() {
        // CORE: untuk mengambil data init pada page ini
        this.onInitData()

        this.year = this.get_form.tahun         

        this.bukti_tanggal = this.year+'-'+this.month+'-'+this.day
    },
    data() {
        let month = new Date().getMonth().toString()
        if(month.length <= 1) {
            month = '0'+month
        }

        let day = new Date().getDay().toString()
        if(day.length <= 1) {
            day = '0'+day
        }

        return {
            pageReady: false,

            // Rekening
            items_rekening: [],
            selected_rekening: null,
            kode_rekening: "",

            uraian: "",

            year: new Date().getFullYear(),
            month,
            day,
            bukti_tanggal: null, 
        }
    }
}

</script>
