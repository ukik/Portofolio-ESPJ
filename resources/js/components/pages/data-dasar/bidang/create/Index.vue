<template>
    <div>
        <Toolbar judul="Create Data Dasar Bidang" slot="title">
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

            <FormulirLegend slot="legend" title="Create Data Dasar Bidang" />

            <FormulirInput 
                v-if="create.induk"
                readonly=true
                slot="input" 
                type="text"
                title="Nama Bidang" 
                :value="create.nama" 
                placeholder="Nama Bidang" />

            <FormulirInput 
                slot="input" 
                type="text"
                title="Nama Bidang" 
                name="nama" 
                value="" 
                placeholder="Nama Bidang" />

            <FormulirInput 
                slot="input" 
                type="text"
                title="Singkatan" 
                name="singkatan" 
                value="" 
                placeholder="Singkatan" />            

            <FormulirInput 
                slot="input" 
                type="text"
                title="Kode Surat" 
                name="kode_surat" 
                value="" 
                placeholder="Kode Surat" />        

             <FormulirButton @onSubmit="onSubmit()" slot="button" />

        </Formulir>
    </div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions({
            'set_create': 'setters/non-api/data-dasar/bidang/create',  
        }),      
      onSubmit() {
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const induk = this.create.induk
          const nama = document.getElementById('nama').value
          const singkatan = document.getElementById('singkatan').value
          const kode_surat = document.getElementById('kode_surat').value

          const payload = { induk, nama, singkatan, kode_surat }

          const request = new Promise((resolve, reject) => {
              axios.post('data-dasar/bidang', payload).then((response) => {
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

    },
    data() {
      return {
        create: {
          induk: this.$store.state.data_dasar_bidang.create.induk,
          nama: this.$store.state.data_dasar_bidang.create.nama,
        }
      };
    }
  };


</script>
