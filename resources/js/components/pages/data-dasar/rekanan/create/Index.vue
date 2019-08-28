<template>
    <div>
        <Toolbar judul="Creat Data Dasar Rekanan" slot="title">
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

            <FormulirLegend slot="legend" title="Creat Data Dasar Rekanan" />

            <FormulirInput 
                slot="input" 
                title="Nama" 
                name="nama_perusahaan" 
                value="" 
                placeholder="Nama" />

            <FormulirInput 
                slot="input" 
                title="Pimpinan" 
                name="nama_pimpinan" 
                value="" 
                placeholder="Pimpinan" />

            <FormulirInput 
                slot="input" 
                title="NPWP" 
                name="npwp" 
                value="" 
                placeholder="NPWP" />

            <FormulirInput 
                slot="input" 
                title="Telpon" 
                name="telp" 
                value="" 
                placeholder="Telpon" />

            <FormulirInput 
                slot="input" 
                title="Fax" 
                name="fax" 
                value="" 
                placeholder="Fax" />

            <FormulirInput 
                slot="input" 
                title="Email" 
                name="email" 
                value="" 
                placeholder="Email" />

            <FormulirInput 
                slot="input" 
                title="Website" 
                name="website" 
                value="" 
                placeholder="Website" />

            <FormulirTextarea 
                slot="input" 
                title="Alamat" 
                name="alamat" 
                placeholder="Alamat" />

            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_form': 'getters/data-dasar/rekanan/form',
        }),
    },
    methods: {
        onSubmit(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui
          
          const nama_perusahaan = document.getElementById('nama_perusahaan').value
          const nama_pimpinan = document.getElementById('nama_pimpinan').value
          const npwp = document.getElementById('npwp').value
          const telp = document.getElementById('telp').value
          const fax = document.getElementById('fax').value
          const email = document.getElementById('email').value
          const website = document.getElementById('website').value
          const alamat = document.getElementById('alamat').value

          const payload = { nama_perusahaan, nama_pimpinan, npwp, telp, fax, email, website, alamat }

          const request = new Promise((resolve, reject) => {
              axios.post('data-dasar/rekanan', payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        },
    },  
};

</script>