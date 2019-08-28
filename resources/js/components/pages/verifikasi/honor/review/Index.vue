<template>
<div>
    <Toolbar :judul="judul" slot="toolbar">
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

    <TableView :items="get_honor_detail" :theads="theads">

        <div slot="pre-information">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table table-hover table-sm table-outline table-vcenter text-nowrap card-table">
                                <tr>
                                    <td width="150"><strong>Daftar</strong></td>
                                    <td width="1">:</td>
                                    <td>{{ get_form.uraian }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Kegiatan</strong></td>
                                    <td width="1">:</td>
                                    <td>{{ get_form.kegiatan }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Bulan</strong></td>
                                    <td width="1">:</td>
                                    <td>{{ get_form.tanggal }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table table-hover table-sm table-outline table-vcenter text-nowrap card-table">
                                <tr>
                                    <td width="150"><strong>Kode Rekening</strong></td>
                                    <td width="1">:</td>
                                    <td>{{ get_form.kode_rekening }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Uraian</strong></td>
                                    <td width="1">:</td>
                                    <td>{{ get_form.rincian }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tanggal</strong></td>
                                    <td width="1">:</td>
                                    <td>{{ get_form.tanggal }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <template slot-scope="scope">
            <tr>
                <td class="align-middle text-center">{{ scope.index+1 }}</td>
                <td class="align-middle">{{ scope.item.pegawai_nama }}</td>
                <td class="align-middle text-center">{{ scope.item.jabatan_struktural }}</td>
                <td class="align-middle text-right">{{ scope.item.jumlah }} {{ scope.item.satuan }} x {{ scope.item.volume | rupiah2 }} = {{ scope.item.subtotal | rupiah2 }}</td>
                <td class="align-middle text-right">{{ scope.item.pph_21_nilai | rupiah2 }}</td>
                <td class="align-middle text-right">{{ scope.item.pph_22_nilai | rupiah2 }}</td>
                <td class="align-middle text-right">{{ scope.item.pph_23_nilai | rupiah2 }}</td>
                <td class="align-middle text-right">{{ scope.item.total | rupiah2 }}</td>
            </tr>
        </template>

        <template slot="tfoot" >
            <tr class="bg-gray">
                <th colspan="3" class="text-right text-white">Jumlah</th>
                <th class="text-right text-white">{{ get_form.subtotal | rupiah2 }}</th>
                <th class="text-right text-white">{{ get_form.pph_21 | rupiah2 }}</th>
                <th class="text-right text-white">{{ get_form.pph_22 | rupiah2 }}</th>
                <th class="text-right text-white">{{ get_form.pph_23 | rupiah2 }}</th>
                <th class="text-right text-white">{{ get_form.total | rupiah2 }}</th>
            </tr>    
        </template>

    </TableView>
        <div class="row">
            <div class="col">
                <div class="card">
                    <table class="text-center w-100 my-2">
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="text-center"><em>Mengetahui/Menyetujui</em></td>
                        </tr>
                        <tr>
                            <td class="text-center" style="padding-bottom: 100px;"><em>Kuasa Pengguna Anggaran</em></td>
                        </tr>
                        <tr>
                            <td class="text-center"><em>{{ get_form.kpa_nama }}</em></td>
                        </tr>
                        <tr>
                            <td class="text-center"><em>Nip.{{ get_form.kpa_nip }}</em></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>

                    </table>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <table class="text-center w-100 my-2">
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="text-center">
                                <em>Samarinda, {{ get_form.tanggal }}</em>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center" style="padding-bottom: 100px;"><em>Bendahara Pengeluaran</em></td>
                        </tr>
                        <tr>
                            <td class="text-center"><em>{{ get_form.bendahara_nama }}</em></td>
                        </tr>
                        <tr>
                            <td class="text-center"><em>Nip.{{ get_form.bendahara_nip }}</em></td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>

                    </table>
                </div>
            </div>
        </div>

</div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_honor_detail': 'getters/verifikasi/honor/honor_detail',
            'get_form': 'getters/verifikasi/honor/form',
        }),
    },
    methods: {
        ...mapActions({
            'set_honor_detail': 'setters/api/verifikasi/honor/honor_detail',            
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
              axios.get('verifikasi/honor/'+id+'/review').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                      
                  resolve(this.set_honor_detail(response.data.data.honor_detail))
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
                axios.post('verifikasi/honor/'+id+'/reject').then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error);
                })
            })               
        },
        onConfirm(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui

            const id = this.get_form.id
            
            const request = new Promise((resolve, reject) => {
                axios.post('verifikasi/honor/'+id+'/approve').then((response) => {
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
            judul: 'Data Detail Honor',
            user: this.$root.level, // 'Super Admin',

            theads: [{
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Nama',
                    width: '',
                },
                {
                    title: 'Jabatan',
                    width: '',
                },
                {
                    title: 'Jumlah Honor',
                    width: '',
                },
                {
                    title: 'PPh 21',
                    width: '',
                },
                {
                    title: 'PPh 22',
                    width: '',
                },
                {
                    title: 'PPh 23',
                    width: '',
                },
                {
                    title: 'Honor Diterima',
                    width: '',
                },
            ]
        }
    }
}


</script>
