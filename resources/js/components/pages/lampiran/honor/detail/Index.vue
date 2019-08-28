<template>
<div>
    <Toolbar :judul="judul" slot="toolbar">
        <RefreshButton @onRefresh="onRefresh()" />         
        <AddButton v-if="get_form.status <= 0" route="lampiran-honor-detail-create" name="Pegawai" class="mr-2" />
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
                                <td>{{ get_form.bulan | bulan('convert') }}  {{ get_form.tahun }}</td>
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

                <td class="text-center">
                    <a @click="onOpenDocument({
                        url: `lampiran/honor/${get_form.id}/detail/${scope.item.id}/print?from=perubahan`
                    })" target="_blank" class="icon"><i class="fe fe-printer text-success"></i></a>

                    <a v-if="user != 'Supervisor' && get_form.status == 0" @click="set_form_detail({ id: scope.item.id }); jump({ name:'lampiran-honor-detail-edit' })" class="icon"><i class="fe fe-edit text-warning"></i></a>
                    
                    <a v-if="user != 'Supervisor' && get_form.status == 0" @click="onDelete({ id: scope.item.id })" class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
                </td>
            </tr>
        </template>

        <template slot-scope="scope" slot="tfoot" >
            <tr class="bg-secondary">
              <td colspan="3" class="text-center"><em></em></td>
              <td class="text-right text-white"><em><strong>{{ get_form.subtotal | rupiah2 }}</strong></em></td>
              <td class="text-right text-white"><em><strong>{{ get_form.pph_21 | rupiah2 }}</strong></em></td>
              <td class="text-right text-white"><em><strong>{{ get_form.pph_22 | rupiah2 }}</strong></em></td>
              <td class="text-right text-white"><em><strong>{{ get_form.pph_23 | rupiah2 }}</strong></em></td>
              <td class="text-right text-white"><em><strong>{{ get_form.total | rupiah2 }}</strong></em></td>
              <td><em></em></td>
            </tr>
            <tr>
              <td :colspan="theads.length" class="text-center">
                <em>
                  {{ total_nominal | rupiah2 }}
                </em></td>
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
            'get_honor_detail': 'getters/lampiran/honor/detail',
            'get_form': 'getters/lampiran/honor/form',
        }),
        total_nominal(){
            var total = 0
            this.get_honor_detail.forEach(element => {
                console.log('element', element.subtotal)
                total += Number(element.subtotal)
            }); 
            return total
        }
    },
    methods: {
        ...mapActions({
            'set_form_detail': 'setters/non-api/lampiran/honor/form_detail',
            'set_detail': 'setters/api/lampiran/honor/detail',
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
                axios.get('lampiran/honor/'+id+'/detail').then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    resolve(this.set_detail(response.data.data))
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
                url: 'lampiran/honor/'+this.get_form.id+'/detail/'+args.id,
                id: args.id,
                bundle: args
            })      
        },  
    },
    mounted(){
        if(this.get_callback_status){
            this.set_callback_reset()
        }

        console.log(this.get_honor_detail)

        // CORE: untuk mengambil data init pada page ini
        this.onInitData()

        this.$memory.set('last_route', this.$route.name)

    },
    data() {
        return {
            // CORE
            callback_status: this.$store.state.callback.callback_status,

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
                {
                    title: 'Aksi',
                    width: '150',
                },
            ]
        }
    },

}


</script>
