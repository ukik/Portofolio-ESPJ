<template>
    <div>
        <Toolbar judul="Edit Tambah Uang Persediaan" slot="title">
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

            <FormulirLegend slot="legend" title="Edit Tambah Uang Persediaan" />

            <FormulirPicker 
                @onPicker="onPicker({ key: 'tanggal', value: $event })"
                slot="input" 
                type="date"
                title="Tanggal Pengajuan" 
                name="tanggal" 
                v-model="get_form.tanggal" 
                placeholder="Tanggal Pengajuan" />  

            <FormulirTextarea 
                slot="input" 
                title="Uraian" 
                name="uraian" 
                :value="get_form.uraian" 
                placeholder="Uraian" />

            <FormulirInput 
                slot="input" 
                type="number"
                title="Nominal (Sebelum)" 
                name="nominal_sebelum" 
                :value="get_form.nominal_sebelum" 
                :placeholder="get_form.nominal_sebelum | rupiah2" />

            <FormulirInput 
                slot="input" 
                type="number"
                title="Nominal (Pemakaian)" 
                name="nominal_pemakaian" 
                :value="get_form.nominal_pemakaian" 
                :placeholder="get_form.nominal_pemakaian | rupiah2" />

            <FormulirInput 
                slot="input" 
                type="number"
                title="Nominal (Persediaan)" 
                name="nominal_persediaan" 
                :value="get_form.nominal_persediaan"  
                :placeholder="get_form.nominal_persediaan  | rupiah2" />

            <FormulirInput 
                slot="input" 
                readonly="true"
                type="number"
                title="Nominal (Saldo)" 
                name="nominal_saldo" 
                :value="get_form.nominal_saldo | rupiah2" 
                :placeholder="get_form.nominal_saldo | rupiah2" />
                
            <FormulirButton @onSubmit="onSubmit()" slot="button" />
        </Formulir>
    </div>
</template>


<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        'get_form': 'getters/permohonan/uang-persediaan/form',
      }),
    },
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

          const id = this.get_form.id

          const payload = { 
            id,
            tanggal,
            uraian,
            nominal_sebelum,
            nominal_pemakaian,
            nominal_persediaan,
          }

          const request = new Promise((resolve, reject) => {
              axios.put('permohonan/uang-persediaan/'+id, payload).then((response) => {
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