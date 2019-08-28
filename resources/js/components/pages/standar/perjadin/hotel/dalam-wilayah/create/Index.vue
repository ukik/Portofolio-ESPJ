<template>
    <div>
        <Toolbar judul="Create Standar Perjadin Hotel" slot="title">
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

            <FormulirLegend slot="legend" title="Create Standar Perjadin Hotel" />

            <FormulirTextarea 
                slot="input" 
                title="Jabatan" 
                name="jabatan" 
                placeholder="Jabatan" />

            <FormulirInput 
                slot="input" 
                title="Nominal Dalam Wilayah (Rp)" 
                name="nominal" 
                value="" 
                placeholder="Rp. 0" />
                
            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    methods: {    
        onSubmit(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui
          
          const jabatan = document.getElementById('jabatan').value
          const nominal = document.getElementById('nominal').value

          const payload = { jabatan, nominal }

          const request = new Promise((resolve, reject) => {
              axios.post('standar/hotel/dalam', payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        }
    },  
};


</script>
