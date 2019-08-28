<template>
    <div>
        <Toolbar judul="Edit Data Dasar Bidang" slot="title">
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

            <FormulirLegend slot="legend" title="Edit Data Dasar Bidang" />

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
                v-model="get_form.nama" 
                placeholder="Nama Bidang" />

            <FormulirInput 
                slot="input" 
                type="text"
                title="Singkatan" 
                name="singkatan" 
                v-model="get_form.singkatan" 
                placeholder="Singkatan" />            

            <FormulirInput 
                slot="input" 
                type="text"
                title="Kode Surat" 
                name="kode_surat" 
                v-model="get_form.kode_surat" 
                placeholder="Kode Surat" />        

            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>

<script>

import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_form': 'getters/data-dasar/bidang/form',
        }),
    },
    methods: {
        onSubmit(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const id = this.get_form.id

          const induk = this.create.induk

          const nama = document.getElementById('nama').value
          const singkatan = document.getElementById('singkatan').value
          const kode_surat = document.getElementById('kode_surat').value

          const payload = { id, induk, nama, singkatan, kode_surat }

          const request = new Promise((resolve, reject) => {
              axios.put('data-dasar/bidang/'+id, payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })            
        }
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
