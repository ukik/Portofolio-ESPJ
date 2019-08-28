<template>
    <div>
        <Toolbar judul="Edit Standar Perjadin Harian" slot="title">
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

            <FormulirLegend slot="legend" title="Edit Standar Perjadin Harian" />

            <FormulirTextarea 
                slot="input" 
                title="Jabatan" 
                name="jabatan" 
                v-model="get_form.jabatan"
                placeholder="Jabatan" />

            <FormulirInput 
                slot="input" 
                title="Nominal Di Luar Wilayah (Rp)" 
                name="nominal_luar_wilayah" 
                v-model="get_form.nominal_luar_wilayah"
                placeholder="Rp. 0" />

            <FormulirInput 
                slot="input" 
                title="Nominal Dalam Wilayah (Rp)" 
                name="nominal_dalam_wilayah" 
                v-model="get_form.nominal_dalam_wilayah"
                placeholder="Rp. 0" />

            <FormulirInput 
                slot="input" 
                title="Nominal Dalam Kota (Rp)" 
                name="nominal_dalam_kota" 
                v-model="get_form.nominal_dalam_kota"
                placeholder="Rp. 0" />
                
            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_form': 'getters/standar/harian/dalam/form',
        }),
    },
    methods: {    
        onSubmit(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const id = this.get_form.id
          
          const jabatan = document.getElementById('jabatan').value
          const nominal_dalam_wilayah = document.getElementById('nominal_dalam_wilayah').value
          const nominal_luar_wilayah = document.getElementById('nominal_luar_wilayah').value
          const nominal_dalam_kota = document.getElementById('nominal_dalam_kota').value

          const payload = { id, jabatan, nominal_dalam_wilayah, nominal_luar_wilayah, nominal_dalam_kota }

          const request = new Promise((resolve, reject) => {
              axios.put('standar/harian/dalam/'+id, payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        }
    },  
};


</script>