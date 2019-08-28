<template>
    <div>
        <Toolbar judul="Create Tambah Uang Persediaan" slot="title">
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

            <FormulirLegend slot="legend" title="Create Tambah Uang Persediaan" />

            <FormulirPicker 
                @onPicker="onPicker({ key: 'tanggal', value: $event })"
                slot="input" 
                type="date"
                title="Tanggal Pengajuan" 
                name="tanggal" 
                value="" 
                placeholder="Tanggal Pengajuan" />  

            <FormulirTextarea 
                slot="input" 
                title="Uraian" 
                name="uraian" 
                value=""
                placeholder="Uraian" />

            <FormulirInput 
                slot="input" 
                type="number"
                title="Nominal (Sebelum)" 
                name="nominal_sebelum" 
                value="" 
                placeholder="Rp. 0" />

            <FormulirInput 
                slot="input" 
                type="number"
                title="Nominal (Pemakaian)" 
                name="nominal_pemakaian" 
                value="" 
                placeholder="Rp. 0" />

            <FormulirInput 
                slot="input" 
                type="number"
                title="Nominal (Persediaan)" 
                name="nominal_persediaan" 
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
          
          const tanggal = this.tanggal
          const uraian = document.getElementById('uraian').value
          const nominal_sebelum = document.getElementById('nominal_sebelum').value

          const nominal_pemakaian = document.getElementById('nominal_pemakaian').value
          const nominal_persediaan = document.getElementById('nominal_persediaan').value

          const payload = { 
            tanggal,
            uraian,
            nominal_sebelum,
            nominal_pemakaian,
            nominal_persediaan,
          }

          const request = new Promise((resolve, reject) => {
              axios.post('permohonan/uang-persediaan/create', payload).then((response) => {
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
    data() {
      return {
        tanggal: null,
      }
    }      
};
</script>