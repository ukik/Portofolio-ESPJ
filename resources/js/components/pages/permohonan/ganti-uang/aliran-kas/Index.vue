<template>
<div>
    <Toolbar :judul="judul" slot="toolbar">
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

    <Formulir v-if="pageReady" slot="pre-information" column_content="col-12">

        <FormulirInput 
            readonly="true"
            slot="input" 
            title="Kegiatan" 
            name="kegiatan" 
            :value="get_form.kegiatan" 
            placeholder="Kegiatan" />

            <div slot="input"  class="form-group">
                <div class="row">

                    <div class="col">
                        <FormulirInput 
                            readonly="true"
                            title="Jenis SPP" 
                            name="" 
                            value="Ganti Uang (GU)" 
                            placeholder="Jenis SPP" />
                    </div>

                    <div class="col">
                        <FormulirInput 
                            readonly="true"
                            title="Nomor" 
                            name="" 
                            :value="get_form.nomor_permohonan" 
                            placeholder="Nomor" />
                    </div>

                </div>
            </div>

            <div slot="input" class="form-group">
                <div class="row">
                    <div class="col">
                        <FormulirInput 
                            readonly="true"
                            title="KPA" 
                            name="" 
                            :value="undefined_checker(get_kegiatan.kpa1)" 
                            placeholder="KPA" />
                    </div>
                    <div class="col">
                        <FormulirInput 
                            readonly="true"
                            title="Tanggal Pengajuan" 
                            name="" 
                            :value="get_form.tanggal" 
                            placeholder="Tanggal Pengajuan" />
                    </div>
                </div>                    
            </div>
            <div slot="input" class="form-group">
                <div class="row">

                    <div class="col">
                        <FormulirInput 
                            readonly="true"
                            title="PPTK" 
                            name="" 
                            :value="undefined_checker(get_kegiatan.pptk1)"  
                            placeholder="PPTK" />
                    </div>

                    <div class="col">
                        <FormulirInput 
                            readonly="true"
                            title="Total Permohonan (Rp)" 
                            name="" 
                            :value="get_form.nominal_diajukan | rupiah2" 
                            placeholder="Total Permohonan (Rp)" />
                    </div>
                </div>
            </div>

    </Formulir>

    <div class="alert alert-icon alert-primary" role="alert">
        <i class="fe fe-info mr-2" aria-hidden="true"></i> 
        Silahkan isi pada nama rekening belanja permohonan.
    </div>

    <TableView :items="get_dpa">

        <tr slot="thead" class="bg-primary text-light">
            <th rowspan="2" class="align-middle text-light">Kode Rekening</th>
            <th rowspan="2" class="align-middle text-light">Uraian</th>
            <th rowspan="2" class="align-middle text-light">Aliran Kasa s/d September</th>
            <th colspan="3" class="align-middle text-light">Total Permohonan Sebelumnya</th>
            <th colspan="2" class="align-middle text-light">Berkas SPJ</th>
            <th rowspan="2" class="align-middle text-light">Permohonan Sekarang</th>
        </tr>
        <tr slot="thead" class="bg-primary text-light">
            <th class="text-center text-light">Di Ajukan</th>
            <th class="text-center text-light">Di Setujui</th>
            <th class="text-center text-light">Sisa Aliran Kas</th>
            <th class="text-center text-light">Penyerahan</th>
            <th class="text-center text-light">Verifikasi</th>
        </tr>
        <tr slot="thead" class="bg-blue-dark column-number">
            <th class="text-center text-light">1</th>
            <th class="text-center text-light">2</th>
            <th class="text-center text-light">3</th>
            <th class="text-center text-light">4</th>
            <th class="text-center text-light">5</th>
            <th class="text-center text-light">6</th>
            <th class="text-center text-light">7</th>
            <th class="text-center text-light">8</th>
            <th class="text-center text-light">9</th>
        </tr>

        <template v-if="get_dpa.length > 0" slot-scope="scope">

            <tr v-belanja="scope.item.jenis">
                <td class="align-middle" :inner-text.prop="scope.item.jenis == 'kegiatan' ? '5.2' : scope.item.kode_rekening" nowrap>
                </td>

                <td class="align-middle" :inner-html.prop="scope.item.jenis == 'kegiatan' ? 'BELANJA LANGSUNG' : scope.item.nama" nowrap>
                </td>

                <td class="text-right">{{ 0 | rupiah2 }}</td>
                <td class="text-right">{{ 0 | rupiah2 }}</td>
                <td class="text-right">{{ 0 | rupiah2 }}</td>
                <td class="text-right">{{ 0 | rupiah2 }}</td>
                <td class="text-right">{{ 0 | rupiah2 }}</td>
                <td class="text-right">{{ 0 | rupiah2 }}</td>

                <td class="align-middle text-right">{{ scope.item.pagu | rupiah2 }}</td>
            </tr>

        </template>

    </TableView>
    <p />

    <FormulirButton @onSubmit="onSubmit()" slot="input"  />

</div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_permohonan': 'getters/permohonan/ganti-uang/aliran-kas/permohonan',
            'get_kegiatan': 'getters/permohonan/ganti-uang/aliran-kas/kegiatan',
            'get_bendahara': 'getters/permohonan/ganti-uang/aliran-kas/bendahara',
            'get_bulan': 'getters/permohonan/ganti-uang/aliran-kas/bulan',
            'get_dpa': 'getters/permohonan/ganti-uang/aliran-kas/dpa',        
            'get_jenis': 'getters/permohonan/ganti-uang/aliran-kas/jenis',        

            'get_form': 'getters/permohonan/ganti-uang/form',        

        }),
        undefined_checker(){
            return function(args){
                console.log(args)
                if(args == undefined) {
                    return ""
                } else {
                    return args.nama 
                }
            }
        }
    },
    methods: {
        ...mapActions({
            'set_aliran_kas': 'setters/api/permohonan/ganti-uang/aliran-kas',
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
              axios.get('permohonan/ganti-uang/'+id+'/aliran-kas').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                 
                    this.pageReady = true

                    resolve(this.set_aliran_kas(response.data.data))
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
        onSubmit() {
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            const id = this.get_form.id

            const form = this.get_form

            const payload = { id, form }

            const request = new Promise((resolve, reject) => {
            axios.post('permohonan/ganti-uang/'+id+'/aliran-kas', payload).then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })
      },            
    },  
    mounted() {
      // CORE: untuk mengambil data init pada page ini
      this.onInitData()
      

    },
    data() {
        return {
            judul: 'Aliran Kas',
            user: this.$root.level, // 'Super Admin',

            pageReady: false,
        }
    },
}


</script>