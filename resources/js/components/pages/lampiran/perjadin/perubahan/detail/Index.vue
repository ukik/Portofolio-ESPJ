<template>
<div>
    <Toolbar :judul="judul" slot="toolbar">
        <RefreshButton @onRefresh="onRefresh()" />        
        <AddButton v-if="get_form.status <= 0" route="lampiran-perjadin-perubahan-detail-create" name="Pegawai" class="mr-2" />        
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

        <!-- dipanggil dari callback creat/edit/delete -->
        <div v-if="callback_status" class="alert alert-icon alert-info" role="alert">
            <i class="fe fe-info mr-2" aria-hidden="true"></i> {{ get_callback_message }}
        </div>    

    <TableView :items="get_perjadin_detail" :theads="theads">

        <div slot="pre-information">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <div class="table-responsive">

                            <table class="table table-hover table-sm table-outline table-vcenter text-nowrap card-table">
                                <tr>
                                    <td width="150"><strong>Nomor SPT</strong></td>
                                    <td width="1">:</td>
                                    <td>{{ get_form.nomor_spt }}</td>
                                    </tr>
                                <tr>
                                    <td><strong>Uraian</strong></td>
                                    <td>:</td>
                                    <td>{{ get_form.uraian }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tanggal</strong></td>
                                    <td>:</td>
                                    <td>{{ get_form.tanggal_berangkat }} s/d {{ get_form.tanggal_kembali }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Lokasi Tujuan</strong></td>
                                    <td>:</td>
                                    <td>{{ get_form.lokasi_nama }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tempat Tujuan</strong></td>
                                    <td>:</td>
                                    <td>{{ get_form.tempat_tujuan }}</td>
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
                                    <td width="150"><strong>KPA</strong></td>
                                    <td width="1">:</td>
                                    <td>{{ get_form.kpa.nama }}</td>
                                </tr>
                                <tr>
                                    <td><strong>PPTK</strong></td>
                                    <td>:</td>
                                    <td>{{ get_form.pptk.nama }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Bendahara</strong></td>
                                    <td>:</td>
                                    <td>{{ undefined_bendahara(get_form.bendahara) }}</td>
                                </tr>
                                <tr>
                                    <td><strong>Pimpinan</strong></td>
                                    <td>:</td>
                                    <td>{{ undefined_pimpinan(get_form.pimpinan) }}</td>
                                </tr>
                                <tr>
                                    <td colspan="3">&nbsp;</td>
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
                <td class="align-middle">{{ scope.item.pegawai_nip }}</td>
                <td class="align-middle">{{ scope.item.pegawai_nama }}</td>
                <td class="align-middle text-right">{{ scope.item.nominal | rupiah2 }}</td>
                <td class="text-center">

                    <a @click="onOpenDocument({
                        url: `lampiran/perjadin/${get_form.id}/detail/${scope.item.id}/print?jenis=kuitansi`
                    })" data-toggle="tooltip" title="Cetak Kuitansi" target="_blank" class="icon mr-2"><i class="fe fe-printer text-success"></i></a>

                    <a @click="onOpenDocument({
                        url: `lampiran/perjadin/${get_form.id}/detail/${scope.item.id}/print?jenis=rincian`
                    })" data-toggle="tooltip" title="Cetak Rincian Biaya" target="_blank" class="icon mr-2"><i class="fe fe-printer text-purple"></i></a>

                    <a @click="set_form_detail({ id: scope.item.id }); jump({ name:'lampiran-perjadin-perubahan-detail-biaya' })" class="icon mr-2"><i class="fe fe-dollar-sign text-purple"></i></a>

                    <a v-if="scope.item.status == 0" @click="set_form_detail({ id: scope.item.id }); jump({ name:'lampiran-perjadin-perubahan-detail-edit' })" class="icon mr-2"><i class="fe fe-edit text-warning"></i></a>
                    
                    <a v-if="scope.item.status == 0" @click="onDelete({ id: scope.item.id })" class="icon mr-2"><i class="fe fe-trash-2 text-danger"></i></a>
                </td>
            </tr>
        </template>

        <template slot-scope="scope" slot="tfoot" >
            <tr v-if="scope.length > 0" class="bg-secondary">
                <td colspan="3" class="text-center"><em></em></td>
                <td class="text-right text-white"><em><strong>{{ get_form.nominal | rupiah2 }}</strong></em></td>
                <td><em></em></td>
            </tr>
            <tr>
              <td :colspan="theads.length" class="text-center">
                <em>
                  {{ total_nominal | rupiah2 }}
                </em>
              </td>
            </tr>            
        </template>

    </TableView>


</div>
</template>

    
<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_perjadin_detail': 'getters/lampiran/perjadin/detail',
            'get_form': 'getters/lampiran/perjadin/form',
        }),
        total_nominal(){
            var total = 0
            this.get_perjadin_detail.forEach(element => {
                total += element.nominal
            }); 
            return total
        },
        undefined_bendahara(){
            return function(args) {
                if(args == undefined) {
                    return ""
                } else {
                    return args.nama
                }
            }
        },        
        undefined_pimpinan(){
            return function(args) {
                if(args == undefined) {
                    return ""
                } else {
                    return args.nama
                }
            }
        },     
       
    },
    methods: {
        ...mapActions({
            'set_perjadin_detail': 'setters/api/lampiran/perjadin/detail',
            'set_form_detail': 'setters/non-api/lampiran/perjadin/detail/form',  
            'set_splice': 'setters/non-api/lampiran/perjadin/detail/splice',
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
                axios.get('lampiran/perjadin/'+id+'/detail').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    this.pageReady = true

                    resolve(this.set_perjadin_detail(response.data.data.perjadin_detail))
                }).catch((error) => {
                    reject(error);
                })
            })
            return request;
        },
        // CORE: untuk refresh data init pada page ini
        onRefresh(){
            this.callback_status = false

            // CORE: untuk mengambil data init pada page ini
            this.onInitData()
        },        
        onDelete(args){
            this.onDeleteConfirmation({
                url: 'lampiran/perjadin/'+this.get_form.id+'/detail/'+args.id,
                id: args.id,
                bundle: args
            })      
        }            
    },
    mounted(){
        if(this.get_callback_status){
            this.set_callback_reset()
        }

        // CORE: untuk mengambil data init pada page ini
        this.onInitData()

        this.$memory.set('last_route', this.$route.name)

    },
    data() {
        return {
            // CORE
            callback_status: this.$store.state.callback.callback_status,

            judul: 'Data Detail Perjalanan Dinas',
            user: this.$root.level, // 'Super Admin',
            pageReady: false,

            theads: [{
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'NIP',
                    width: '',
                },
                {
                    title: 'Nama Pegawai',
                    width: '',
                },
                {
                    title: 'Nominal',
                    width: '',
                },
                {
                    title: 'Aksi',
                    width: '150',
                },
            ]
        }
    },
}

</script>
