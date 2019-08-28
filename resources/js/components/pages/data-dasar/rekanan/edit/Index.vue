<template>
    <div>
        <Toolbar judul="Edit Data Dasar Rekanan" slot="title">
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

            <FormulirLegend slot="legend" title="Edit Data Dasar Rekanan" />

            <FormulirInput 
                slot="input" 
                title="Nama" 
                name="nama_perusahaan" 
                v-model="get_form.nama_perusahaan" 
                placeholder="Nama" />

            <FormulirInput 
                slot="input" 
                title="Pimpinan" 
                name="nama_pimpinan" 
                v-model="get_form.nama_pimpinan" 
                placeholder="Pimpinan" />

            <FormulirInput 
                slot="input" 
                title="NPWP" 
                name="npwp" 
                v-model="get_form.npwp" 
                placeholder="NPWP" />

            <FormulirInput 
                slot="input" 
                title="Telpon" 
                name="telp" 
                v-model="get_form.telp" 
                placeholder="Telpon" />

            <FormulirInput 
                slot="input" 
                title="Fax" 
                name="fax" 
                v-model="get_form.fax" 
                placeholder="Fax" />

            <FormulirInput 
                slot="input" 
                title="Email" 
                name="email" 
                v-model="get_form.email" 
                placeholder="Email" />

            <FormulirInput 
                slot="input" 
                title="Website" 
                name="website" 
                v-model="get_form.website" 
                placeholder="Website" />

            <FormulirTextarea 
                slot="input" 
                title="Alamat" 
                name="alamat" 
                v-model="get_form.alamat" 
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

          const id = this.get_form.id
          
          const nama_perusahaan = document.getElementById('nama_perusahaan').value
          const nama_pimpinan = document.getElementById('nama_pimpinan').value
          const npwp = document.getElementById('npwp').value
          const telp = document.getElementById('telp').value
          const fax = document.getElementById('fax').value
          const email = document.getElementById('email').value
          const website = document.getElementById('website').value
          const alamat = document.getElementById('alamat').value

          const payload = { id, nama_perusahaan, nama_pimpinan, npwp, telp, fax, email, website, alamat }

          const request = new Promise((resolve, reject) => {
              axios.put('data-dasar/rekanan/'+id, payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        },
    },  
};

</script>