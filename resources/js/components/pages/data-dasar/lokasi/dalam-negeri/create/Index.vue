<template>
    <div>
        <Toolbar judul="Create Data Dasar Lokasi Dalam Negeri" slot="title">
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

            <FormulirLegend slot="legend" title="Create Data Dasar Lokasi Dalam Negeri" />

            <FormulirInput
               v-if="create.induk"
                slot="input" 
                readonly="true"
                title="Lokasi Induk" 
                name="" 
                :value="create.nama" 
                placeholder="Lokasi Induk" />

            <FormulirInput 
                slot="input" 
                title="Nama Lokasi" 
                name="nama" 
                value="" 
                placeholder="Nama Lokasi" />

            <FormulirInput 
                slot="input" 
                title="Singkatan" 
                name="singkatan" 
                value="" 
                placeholder="Singkatan" />

            <FormulirDropdown 
                slot="input" 
                title="Jenis">
                <div slot="default" class="input-group">
                  <select class="form-control selectize" name="jenis" id="jenis">
                    <option value="">- Pilih Jenis -</option>
                    <option v-for="(item, index) in get_listJenis" 
                      v-if="get_listJenis.length > 0"
                      :key="index" 
                      :value="item">
                      {{ item }}
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
            'get_listJenis': 'getters/data-dasar/lokasi/dalam-negeri/listJenis',            
        }),
    },  
    methods: {
        ...mapActions({
            'set_listJenis': 'setters/api/data-dasar/lokasi/dalam-negeri/listJenis',  
            'set_create': 'setters/non-api/data-dasar/lokasi/dalam-negeri/create',  
        }),   
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const induk = this.create.induk

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('data-dasar/lokasi/'+induk+'/edit').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                      
                  resolve(this.set_listJenis(response.data.data.listJenis))
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

          const induk = this.create.induk
          const nama = document.getElementById('nama').value
          const singkatan = document.getElementById('singkatan').value
          const jenis = document.getElementById('jenis').value

          const payload = { induk, nama, singkatan, jenis }

          const request = new Promise((resolve, reject) => {
              axios.post('data-dasar/lokasi', payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })            
      }
    },
    mounted(){
      console.log(this.create)
      this.set_create({ induk: null, nama: null })

      // CORE: untuk mengambil data init pada page ini
      this.onInitData()

    },       
    data() {
      return {
        create: {
          induk: this.$store.state.data_dasar_lokasi_dalam_negeri.create.induk,
          nama: this.$store.state.data_dasar_lokasi_dalam_negeri.create.nama,
        }
      };
    }
  };

</script>




