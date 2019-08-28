<template>
    <div>
        <Toolbar :judul="'Verifikasi Permohonan '+get_form.nomor_permohonan" slot="title">
            <RefreshButton @onRefresh="onRefresh()" />   
            <ConfirmButton @onConfirm="onConfirm()" class="mr-2" />
            <CancelButton @onCancel="onCancel()" class="mr-2" />              
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

        <Formulir v-if="pageReady" column_content="col-12">
            <FormulirInput 
                readonly="true"
                slot="input" 
                title="Kegiatan" 
                name="kegiatan" 
                :value="'['+ get_kegiatan.kode_dpa +'] '+ get_kegiatan.nama" 
                placeholder="Kegiatan" />

            <div slot="input" class="form-group">
              <div class="row">
                <div class="col">

                <FormulirInput 
                    readonly="true"
                    slot="input" 
                    title="Nomor Permohonan" 
                    name="nomor_spp" 
                    :value="get_form.nomor_permohonan" 
                    placeholder="Nomor Permohonan" />

                </div>
                <div class="col">
                  
                    <FormulirInput 
                        readonly="true"
                        slot="input" 
                        title="PAGU" 
                        name="nomor_spp" 
                        :value="get_kegiatan.pagu  | rupiah2" 
                        placeholder="PAGU" />

                </div>
                <div class="col">
                  
                     <FormulirPicker 
                        @onPicker="onPicker({ key: 'verified_at', value: $event })"
                        slot="input" 
                        type="date"
                        title="Tanggal" 
                        name="verified_at" 
                        v-model="get_form.tanggal" 
                        placeholder="Tanggal" />   

                </div>                
              </div>
            </div>

        </Formulir>

        <TableView v-if="pageReady && !pageUpdate" :items="permohonan" :theads="theads">
            <template slot-scope="scope">
                <tr>
                  <td class="text-center">{{ scope.index+1 }}</td>
                  <td>{{ scope.item.kegiatan }}</td>
                  <td class="text-right">{{ scope.item.nominal_diajukan }}</td>
                  <td class="text-center has-input">

                    <input 
                        type="text" 
                        class="form-control form-control-sm text-right numeric" 
                        :data-max="scope.item.nominal_diajukan" 
                        name="nominal_disetujui" 
                        id="nominal_disetujui"
                        :value="scope.item.nominal_disetujui">
                  </td>
                </tr>
            </template>
        </TableView>
        
        <FormulirButton @onSubmit="onUpdate()">
            <a slot="back" />
            <a slot="cancel" @click="onCancel()" href="#" onclick="return false;" class="btn btn-danger">
                <i class="fe fe-x"></i> Tolak Permohonan
            </a>
        </FormulirButton>

    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_kegiatan': 'getters/verifikasi/ganti-uang/kegiatan',
            'get_form': 'getters/verifikasi/ganti-uang/form',
            'get_permohonan': 'getters/verifikasi/ganti-uang/permohonan',
        }),
    },
    methods: {
        ...mapActions({
            'set_kegiatan': 'setters/api/verifikasi/ganti-uang/kegiatan',            
            'set_form': 'setters/non-api/verifikasi/ganti-uang/form',              
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
              axios.get('verifikasi/gu/'+id+'/review').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    this.pageReady = true
                                      
                  resolve(this.set_kegiatan(response.data.data.kegiatan))
              }).catch((error) => {
                  reject(error);
              })
          })
          return request
        },  
        // CORE: untuk refresh data init pada page ini
        onRefresh(){
          // CORE: untuk mengambil data init pada page ini
          this.onInitData()
        },      
         onCancel(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            const id = this.get_form.id

            const request = new Promise((resolve, reject) => {
                axios.post('verifikasi/gu/'+id+'/reject').then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })               
        },

        onUpdate(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            const id = this.get_form.id
            const verified_at = this.verified_at

            this.pageUpdate = true

            const nominal_disetujui = document.getElementById('nominal_disetujui').value

            const payload = { id, nominal_disetujui, verified_at }

            const request = new Promise((resolve, reject) => {
                axios.post('verifikasi/gu/'+id+'/update', payload).then((response) => {

                    this.permohonan = [ response.data.data.permohonan ]
                    this.pageUpdate = false

                    resolve(response)
                }).catch((error) => {
                    reject(error);

                    this.pageUpdate = false
                })
            })               
        },       

        onConfirm(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            const id = this.get_form.id
            const verified_at = this.verified_at

            // solusi desain permohonan_gu_detail yang gak ada
            const nominal_disetujui = document.getElementById('nominal_disetujui').value

            const payload = { id, verified_at, nominal_disetujui }

            const request = new Promise((resolve, reject) => {
                axios.post('verifikasi/gu/'+id+'/approve', payload).then((response) => {
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
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()
    },

    data(){
        return {
            verified_at: null,

            pageReady: false,
            pageUpdate: false,

            permohonan: [ this.$store.state.verifikasi_ganti_uang.form ],

            judul: 'Daftar Permohonan',
            user: this.$root.level, // 'Super Admin',
            theads: [
                {
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Uraian',
                    width: '',
                },
                {
                    title: 'Diajukan(Rp)',
                    width: '150',
                },
                {
                    title: 'Disetujui (Rp)',
                    width: '150',
                },
            ]            
        }
    }
}

</script>
