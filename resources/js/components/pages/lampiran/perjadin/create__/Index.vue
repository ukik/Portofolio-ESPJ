<template>
    <div>
        <Toolbar judul="Create SPT" slot="title">
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

            <FormulirLegend slot="legend" title="Create SPT" />

            <FormulirDropdown 
                slot="input" 
                title="Nomor Surat">
                <div slot="default" class="input-group">
                  <select class="form-control selectize" name="nomor_spt" id="nomor_spt">
                    <option value="">- Pilih Nomor Surat -</option>
                    <option v-for="(item, index) in get_listPerjadin" :key="index" 
                      :value="item.id">
                      {{ item.nomor_spt }}
                    </option>
                  </select>
                </div>
            </FormulirDropdown>

            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_listPerjadin':'getters/lampiran/perjadin/listPerjadin',

            'get_form': 'getters/lampiran/perjadin/form',
        }),
    },
    methods: {
        ...mapActions({
            'set_create': 'setters/api/lampiran/perjadin/create',            
        }),    
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('lampiran/perjadin/perubahan/create').then((response) => {
                  resolve(this.set_create(response.data.data))
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
          
          const nomor = document.getElementById('nomor').value
          const nomor_spt = document.getElementById('nomor_spt').value
          const tanggal = this.tanggal 
          const kode_dpa = document.getElementById('kode_dpa').value
          const kode_rekening = document.getElementById('kode_rekening').value
          const uraian = document.getElementById('uraian').value
          const keterangan = document.getElementById('keterangan').value
          const tanggal_berangkat = this.tanggal_berangkat
          const tanggal_kembali = this.tanggal_kembali
          const lokasi_id = document.getElementById('lokasi_id').value
          const tempat_tujuan = document.getElementById('tempat_tujuan').value

          const payload = { nomor, nomor_spt, tanggal, kode_dpa, kode_rekening, uraian, keterangan, tanggal_berangkat, tanggal_kembali, lokasi_id, tempat_tujuan }

          const request = new Promise((resolve, reject) => {
              axios.post('lampiran/perjadin/perubahan/create', payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        },
        onPicker(args){
            this[args.key] = args.value
        }             
    },  
    mounted() {
        // CORE: untuk mengambil data init pada page ini
        this.onInitData()

        console.log(this.get_form)
    },
    data(){
        return {
            tanggal: null,
            tanggal_berangkat: null,
            tanggal_kembali: null,
        }
    },
}

</script>
