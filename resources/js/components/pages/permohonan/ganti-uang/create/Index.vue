<template>
  <div>
    <Toolbar judul="Create Pengajuan Ganti Uang" slot="title">
      <RefreshButton @onRefresh="onRefresh()" />
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

      <FormulirLegend slot="legend" title="Create Pengajuan Ganti Uang" />

      <FormulirPicker 
          @onPicker="onPicker({ key: 'tanggal', value: $event })"
          slot="input" 
          type="date"
          title="Tanggal Pengajuan" 
          name="tanggal" 
          value="" 
          placeholder="Tanggal Pengajuan" />        

                <Autocomplete 
                    v-if="pageReady" 
                    @onSelectedItem="onSelectedItemKegiatan" 
                    slot="input" 
                    :selected="selected_kegiatan" 
                    :items="items_kegiatan" 
                    title="Kegiatan / Belanja" >

                    <template slot="item" slot-scope="props">
                        <b>{{ props.result.parent_nama }}: </b>
                        <br>
                        &nbsp; &nbsp; &nbsp; &nbsp; [ {{ props.result.kode_dpa }} ]: {{ props.result.nama }}
                    </template>

                    <template slot="selection" slot-scope="props">
                        [ {{ props.result.kode_dpa }} ]: {{ props.result.nama }}
                    </template>

                </Autocomplete>

            <div slot="input" class="form-group">
              <div class="row">
                <div class="col">

                  <FormulirInput 
                      slot="input"
                      type="number"
                      title="Nominal Diajukan" 
                      name="nominal_diajukan" 
                      placeholder="Rp. 0.00,-" />

                </div>
                <div class="col">
                  
                  <FormulirInput 
                      readonly="true"
                      slot="input"
                      type="number"
                      title="Nominal Disetujui" 
                      name="" 
                      placeholder="Rp. 0,00" />

                </div>
              </div>
            </div>

      <FormulirInput 
        slot="input" 
        readonly="true"
        title="Nomor Permohonan" 
        name="nomor_permohonan" 
        :value="nomor_permohonan" 
        placeholder="Nomor Permohonan" />

      <FormulirButton @onSubmit="onSubmit()" slot="button" />

    </Formulir>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        'get_listProgramKegiatan': 'getters/permohonan/ganti-uang/create/listProgramKegiatan',
        'get_listBendahara': 'getters/permohonan/ganti-uang/create/listBendahara',
        'get_listPimpinan': 'getters/permohonan/ganti-uang/create/listPimpinan',
        'get_jenis': 'getters/permohonan/ganti-uang/create/jenis',
      }),
    },
    methods: {
      ...mapActions({
          'set_create': 'setters/api/permohonan/ganti-uang/create',            
      }),      
      // CORE: untuk mengambil data init pada page ini
      onInitData(){
        // error handler reset
        this.$root.error.status = false
        this.$root.error.message = ""
        this.$root.request = true // membuka spinner ui

        // sesuaikan dengan kebutuhan bisnis page ini
        const request = new Promise((resolve, reject) => {
            axios.get('permohonan/ganti-uang/create').then((response) => {
                if(response == undefined) {
                    return resolve()
                }

                this.AutocompleteKegiatan(response.data.data.listProgramKegiatan)
                this.AutocompleteSPJ(response.data.data.listSpj)

                this.nomor_permohonan = response.data.data.nomor_permohonan

                resolve(this.set_create(response.data.data))
            }).catch((error) => {
                reject(error);
            })
        })
        return request
      },  
      // CORE: untuk refresh data init pada page ini
      onRefresh(){
        // Kegiatan
        this.items_kegiatan = []
        this.selected_kegiatan = null
        this.kode_dpa = ""     
        
        // SPJ
        this.items_spj = []
        this.selected_spj = null
        this.spj_id = ""  
                  
          // CORE: untuk mengambil data init pada page ini
          this.onInitData()
      },           
      onSubmit() {
        // error handler reset
        this.$root.error.status = false
        this.$root.error.message = ""
        this.$root.request = true // membuka spinner ui

        const tanggal = this.tanggal
        const kode_dpa = this.kode_dpa; 
        const nomor_permohonan = document.getElementById('nomor_permohonan').value

        const spj_id = this.spj_id
        const nominal_diajukan = document.getElementById('nominal_diajukan').value

        const payload = { tanggal, kode_dpa, nomor_permohonan, spj_id, nominal_diajukan }

        const request = new Promise((resolve, reject) => {
          axios.post('permohonan/ganti-uang', payload).then((response) => {
              resolve(response)
          }).catch((error) => {
              reject(error);
          })
        })
      },
      onPicker(args){
          this[args.key] = args.value
      },


        AutocompleteKegiatan(args){
            new Promise((resolve) => {
                args.forEach(element => {
                    element.kegiatan.forEach(element2 => {
                        var data = element2
                        data["parent_kode_dpa"] = element.kode_dpa
                        data["parent_nama"] = element.nama
                        data["search"] = element.kode_dpa +" "+ element2.kode_dpa +" "+ element.nama +" "+element2.nama

                        this.items_kegiatan.push(data);

                    });
                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
            })
            
        },
        onSelectedItemKegiatan(args){
            this.kode_dpa = args.kode_dpa
        },           
        
        AutocompleteSPJ(args){
          this.items_spj = []
          this.selected_spj = null
          this.spj_id = null  

            new Promise((resolve) => {
                args.forEach(element => {
                    var data = element
                    data["search"] = element.id +" "+ element.kode_dpa +" "+ element.tanggal +" "+element.nama

                    this.items_spj.push(data);

                });   
                resolve()
            }).then(result => { 
                this.pageReady = true
            })
            
        },
        onSelectedItemSPJ(args){
            this.spj_id = args.id
        },            

    },
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()
    },
    data() {
      return {
        tanggal: null,

        nomor_permohonan: null,

        pageReady: false,

        // Kegiatan
        items_kegiatan: [],
        selected_kegiatan: null,
        kode_dpa: "",     
        
        // SPJ
        items_spj: [],
        selected_spj: null,
        spj_id: "",          
      }
    }
  };
</script>
