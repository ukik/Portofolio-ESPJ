<template>
    <div>
        <Toolbar judul="Create Standar Perjadin Harian" slot="title">
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

            <FormulirLegend slot="legend" title="Create Standar Perjadin Harian" />

            <FormulirDropdown slot="input" title="Golongan/Eselon">
                <div slot="default" class="input-group">
                    <select class="form-control custom-select submit-on-change" name="golongan" id="golongan">
                        <option value="">- Pilih Golongan/Eselon -</option>
                        <option v-for="(item, index) in golongan" 
                            :key="index" 
                            :value="item.label">
                            {{ item.label }} - {{ item.keterangan }}  </option>
                    </select>
                </div>
            </FormulirDropdown>   

            <FormulirInput 
                slot="input" 
                title="Nominal (Rp)" 
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
          
          const golongan = document.getElementById('golongan').value
          const nominal = document.getElementById('nominal').value

          const payload = { golongan, nominal }

          const request = new Promise((resolve, reject) => {
              axios.post('standar/honor', payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        }
    },  
  data() {
    return {
        golongan: [
            {
              label: 'I/a',
              keterangan: "Juru Muda",
            },
            {
              label: 'I/b',
              keterangan: "Juru Muda Tingkat I",
            },
            {
              label: 'I/c',
              keterangan: "Juru",
            },
            {
              label: 'I/d',
              keterangan: "Juru Tingkat I",
            },
            {
              label: 'II/a',
              keterangan: "Pengatur Muda",
            },
            {
              label: 'II/b',
              keterangan: "Pengatur Muda Tingkat I",
            },
            {
              label: 'II/c',
              keterangan: "Pengatur",
            },
            {
              label: 'II/d',
              keterangan: "Pengatur Tingkat I",
            },
            {
              label: 'III/a',
              keterangan: "Penata Muda",
            },
            {
              label: 'III/b',
              keterangan: "Penata Muda Tingkat I",
            },
            {
              label: 'III/c',
              keterangan: "Penata",
            },
            {
              label: 'III/d',
              keterangan: "Penata Tingkat I",
            },
            {
              label: 'IV/a',
              keterangan: "Pembina",
            },
            {
              label: 'IV/b',
              keterangan: "Pembina Tingkat I",
            },
            {
              label: 'IV/c',
              keterangan: "Pembina Utama Muda",
            },
            {
              label: 'IV/d',
              keterangan: "Pembina Utama Madya",
            },
            {
              label: 'IV/e',
              keterangan: "Pembina Utama",
            },
            {
              label: 'Non PNS',
              keterangan: "Honorer/Kontrak",
            },
          ],
    };
  }
};
</script>
