<template>
<div>
    <Toolbar :judul="judul" slot="toolbar">
        <RefreshButton @onRefresh="onRefresh()" />   
        <ConfirmButton @onConfirm="onConfirm()" class="mr-2" />
        <CancelButton @onCancel="onCancel()" class="mr-2" />              
        <BackButton />
    </Toolbar>

    <div v-if="$root.error.status" class="alert alert-icon alert-danger" role="alert">
      <i class="fe fe-info mr-2" aria-hidden="true"></i> {{ $root.error.message }}
    </div>

    <div v-if="$root.request" class="alert bg-primary alert-success text-center" role="alert">
      <components is="loader-spinner" style="zoom: 0.75;" />
    </div>

    <div slot="pre-information">
        <div class="row">
            <div class="col">
                <div class="card">
                    <div class="table-responsive">                            
                        <table class="table table-hover table-sm table-outline table-vcenter text-nowrap card-table">
                            <tr>
                                <th width="200">Tanggal</th>
                                <td width="10">:</td>
                                <td>{{ get_form.tanggal ? get_form.tanggal : '[Belum diajukan]' }}</td>
                            </tr>
                            <tr>
                                <th>Nomor Permohonan</th>
                                <td>:</td>
                                <td>{{ undefined_permohonan(get_form.permohonan) }}</td>
                            </tr>
                            <tr>
                                <th>Kegiatan</th>
                                <td>:</td>
                                <td>[{{ get_form.kode_dpa }}] {{ get_form.kegiatan }}</td>
                            </tr>
                            <tr>
                                <th>Diajukan</th>
                                <td>:</td>
                                <td>{{ get_form.nominal_diajukan | rupiah2 }}</td>
                            </tr>
                            <tr>
                                <th>Disetujui</th>
                                <td>:</td>
                                <td>{{ get_form.nominal_disetujui | rupiah2 }}</td>
                            </tr>
                            <tr>
                                <th>Nominal SPJ</th>
                                <td>:</td>
                                <td>{{ get_form.nominal_spj | rupiah2 }}</td>
                            </tr>
                            <tr>
                                <th>Sisa SPJ</th>
                                <td>:</td>
                                <td>{{ get_form.nominal_sisa | rupiah2 }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="page-header d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <h1 class="page-title">Daftar Pengeluaran</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
            <slot />
        </div>
    </div>

    <ReviewRekap ref="rekap" :id="get_form.id" />

    <div class="page-header d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
        <h1 class="page-title">Daftar Berkas dan Lampiran</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
            <slot />
        </div>
    </div>

    <ReviewBerkas ref="berkas" :id="get_form.id" />

    <p />

</div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

import ReviewBerkas from './berkas/index'
import ReviewRekap from './rekap/index'

export default {
    components: {
        ReviewBerkas,
        ReviewRekap,
    },
    computed: {
        ...mapGetters({
          'get_rekap': 'getters/spj/rekap',
          'get_form': 'getters/verifikasi/spj/form', 
        }),
        items_length() {
            return this.get_rekap == undefined ? 0 : this.get_rekap.length
        },
        total_nominal(){
            var total = 0
            this.get_rekap.forEach(element => {
                total += element.nominal
            }); 
            return total
        },
        undefined_permohonan(){
            return (args) => {
                if(args == undefined) {
                    return "-"
                } else {
                    return args.nomor_permohonan
                }
            }
        }        
    },
    methods: {
        ...mapActions({
            'set_rekap': 'setters/api/spj/rekap',
            'set_form': 'setters/non-api/spj/rekap/form',
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
              axios.get('spj/'+id+'/rekap').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                      
                  resolve(this.set_rekap(response.data.data.spj.rekap))
              }).catch((error) => {
                  reject(error);
              })
          })
          return request
        },  
        // CORE: untuk refresh data init pada page ini
        onRefresh(){
            this.$refs.rekap.onRefresh()
            this.$refs.berkas.onRefresh()

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
                axios.post('verifikasi/spj/'+id+'/reject').then((response) => {
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
                axios.post('verifikasi/spj/'+id+'/approve').then((response) => {
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
            judul: 'Rincian Aliran Kas',
            user: this.$root.level, // 'Super Admin',

            theads: [
                {
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Kode Rincian',
                    width: '',
                },
                {
                    title: 'Penerima',
                    width: '',
                },
                {
                    title: 'Uraian',
                    width: '',
                },
                {
                    title: 'Tanggal',
                    width: '',
                },
                {
                    title: 'Jumlah',
                    width: '',
                },
                {
                    title: 'Aksi',
                    width: '100',
                },
            ]   
                        
        }
    },

}

</script>
