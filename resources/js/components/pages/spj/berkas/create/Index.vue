<template>
    <div>
        <Toolbar judul="Upload Berkas SPJ" slot="title">
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

            <FormulirLegend slot="legend" title="Upload Berkas" />

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

            <FormulirDropdown slot="input" title="Jenis Berkas">
                <div slot="default" class="input-group">
                    <select class="form-control custom-select submit-on-change" name="jenis" id="jenis">
                        <option value="">- Pilih Jenis Berkas -</option>
                        <option v-for="(item, index) in get_listJenis" 
                            v-if="get_listJenis.length > 0" 
                            :key="index" 
                            :value="item">
                            {{ item }}</option>
                    </select>
                </div>
            </FormulirDropdown>       

            <FormulirFile 
                @onChange="$refs.file_label.innerText = $event"
                slot="input" 
                title="File" 
                name="file" 
                type="file">
                <label slot="append" ref="file_label" class="custom-file-label">Pilih berkas</label>
            </FormulirFile>            

            <FormulirTextarea 
                slot="input" 
                title="Deskripsi" 
                name="deskripsi" 
                value=""
                placeholder="Deskripsi" />
                

            <FormulirButton @onSubmit="onSubmit()" slot="button" />

        </Formulir>

    </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_listKodeRekening': 'getters/spj/berkas/listKodeRekening',
            'get_listJenis': 'getters/spj/berkas/listJenis',
            'get_form': 'getters/spj/form',
        }),
    },
    methods: {
        ...mapActions({
            'set_create': 'setters/api/spj/berkas/create',
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
              axios.get('spj/'+id+'/berkas/create').then((response) => {
                if(response == undefined) {
                    return resolve()
                }
                
                this.AutocompleteRekening(response.data.data.listKodeRekening)

                  resolve(this.set_create(response.data.data))
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

            // const permohonan_detail_id = document.getElementById('permohonan_detail_id').value
            const deskripsi = document.getElementById('deskripsi').value
            const jenis = document.getElementById('jenis').value
            const file = document.getElementById('file').files[0]

            const kode_rekening = this.kode_rekening 
            const permohonan_id = this.get_form.permohonan_id
            const permohonan_detail_id = this.get_form.permohonan_id            

            let payload = new FormData()
            payload.append('id', id)
            payload.append('permohonan_detail_id', permohonan_detail_id)
            payload.append('deskripsi', deskripsi)
            payload.append('jenis', jenis)
            payload.append('file', file)

            payload.append('kode_rekening', kode_rekening)
            payload.append('permohonan_id', permohonan_id)
            payload.append('permohonan_detail_id', permohonan_detail_id)

            const request = new Promise((resolve, reject) => {
                axios.post('spj/'+id+'/berkas/upload', payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })                     
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
        }          
    },  
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()

    },
    data(){
        return {
            pageReady: false,

            // Rekening
            items_rekening: [],
            selected_rekening: null,
            kode_rekening: "",            
        }
    }
}

</script>
