<template>
    <div>
        <Toolbar judul="Create Standar Perjadin Transportasi" slot="title">
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

            <FormulirLegend slot="legend" title="Create Standar Perjadin Transportasi" />

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

                <Autocomplete 
                    v-if="pageReady" 
                    @onSelectedItem="onSelectedItemBerangkat" 
                    slot="input" 
                    :selected="selected_berangkat" 
                    :items="items_berangkat" 
                    title="Lokasi Berangkat" >

                    <template slot="item" slot-scope="props">
                        <b>{{ props.result.parent_nama }}: </b> {{ props.result.jenis }} - {{ props.result.nama }}
                    </template>

                    <template slot="selection" slot-scope="props">
                        <b>{{ props.result.parent_nama }}: </b> {{ props.result.jenis }} - {{ props.result.nama }}
                    </template>

                </Autocomplete>

                <Autocomplete 
                    v-if="pageReady" 
                    @onSelectedItem="onSelectedItemTujuan" 
                    slot="input" 
                    :selected="selected_tujuan" 
                    :items="items_tujuan" 
                    title="Lokasi Tujuan" >

                    <template slot="item" slot-scope="props">
                        <b>{{ props.result.parent_nama }}: </b> {{ props.result.jenis }} - {{ props.result.nama }}
                    </template>

                    <template slot="selection" slot-scope="props">
                        <b>{{ props.result.parent_nama }}: </b> {{ props.result.jenis }} - {{ props.result.nama }}
                    </template>

                </Autocomplete>            

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
    computed: {
        ...mapGetters({
            'get_listLokasi': 'getters/standar/perjadin/transportasi/listLokasi',
            'get_form': 'getters/standar/perjadin/transportasi/form',
        }),
    },
    methods: {   
        ...mapActions({
            'set_listLokasi': 'setters/api/standar/perjadin/transportasi/listLokasi',
        }),    
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const id = this.get_form.id

          // sesuaikan dengan kebutuhan bisnis page ini
          const request = new Promise((resolve, reject) => {
              axios.get('standar/perjadin/transportasi/create').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }                  

                    this.AutocompleteBerangkat(response.data.data.listLokasi)
                    this.AutocompleteTujuan(response.data.data.listLokasi)

                    resolve(this.set_listLokasi(response.data.data.listLokasi))
              }).catch((error) => {
                  reject(error);
              })
          })
          return request
        },  
        // CORE: untuk refresh data init pada page ini
        onRefresh(){
            // berangkat
            this.items_berangkat = []
            this.selected_berangkat = null
            this.lokasi_berangkat_id = ""

            // tujuan
            this.items_tujuan = []
            this.selected_tujuan = null
            this.lokasi_tujuan_id = ""
                        
          // CORE: untuk mengambil data init pada page ini
          this.onInitData()
        },            
        onSubmit(){
          // error handler reset
          this.$root.error.status = false
          this.$root.error.message = ""
          this.$root.request = true // membuka spinner ui

          const golongan = document.getElementById('golongan').value
          const lokasi_berangkat_id = this.lokasi_berangkat_id 
          const lokasi_tujuan_id = this.lokasi_tujuan_id 
          const nominal = document.getElementById('nominal').value

          const payload = { golongan, lokasi_berangkat_id, lokasi_tujuan_id, nominal }

          const request = new Promise((resolve, reject) => {
              axios.post('standar/perjadin/transportasi', payload).then((response) => {
                  resolve(response)
              }).catch((error) => {
                  reject(error);
              })
          })                     
        },

        AutocompleteBerangkat(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    element.sub.forEach(element2 => {
                        var data = element2
                        data["parent_nama"] = element.nama
                        data["search"] = element.jenis +" "+ element.nama +" "+ element2.jenis +" "+ element2.nama

                        this.items_berangkat.push(data);

                    });
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
            })
            
        },
        onSelectedItemBerangkat(args){
            this.lokasi_berangkat_id = args.id
        },                

        AutocompleteTujuan(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    element.sub.forEach(element2 => {
                        var data = element2
                        data["parent_nama"] = element.nama
                        data["search"] = element.jenis +" "+ element.nama +" "+ element2.jenis +" "+ element2.nama

                        this.items_tujuan.push(data);

                    });
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
            })
            
        },
        onSelectedItemTujuan(args){
            this.lokasi_tujuan_id = args.id
        },                  
    },  
    mounted() {
        // CORE: untuk mengambil data init pada page ini
        this.onInitData()

    },    
    data() {
      return {
            pageReady: false,

            // berangkat
            items_berangkat: [],
            selected_berangkat: null,
            lokasi_berangkat_id: "",

            // tujuan
            items_tujuan: [],
            selected_tujuan: null,
            lokasi_tujuan_id: "",


          // items: data.listLokasi,
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
