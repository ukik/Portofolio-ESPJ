<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
            <RefreshButton @onRefresh="onRefresh()" />
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

        <TableView :items="get_spj.data" :theads="theads">
            <template slot-scope="scope">
                <tr>
                    <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                    <td class="align-middle text-center">{{ scope.item.tanggal }}</td>
                    <td class="align-middle text-center">{{ undefined_checker(scope.item.permohonan) }}</td>
                    <td class="align-middle text-center">{{ scope.item.kode_dpa }}</td>
                    <td class="align-middle">{{ scope.item.kegiatan }}</td>
                    <td class="align-middle text-right">{{ scope.item.nominal_diajukan | rupiah2 }}</td>
                    <td class="align-middle text-right">{{ scope.item.nominal_disetujui | rupiah2 }}</td>
                    <td class="align-middle text-right">{{ scope.item.nominal_spj | rupiah2 }}</td>
                    <td class="align-middle text-right">{{ scope.item.nominal_sisa | rupiah2 }}</td>
                    
                    <td v-tag-info="scope.item.status" class="align-middle text-center"></td>

                    <td class="text-center">
                            <a v-if="scope.item.status < 0" @click="onAjukan({ id: scope.item.id, status: 0 })" data-method="PUT" data-action="ajukan" class="icon mr-1"><i class="fe fe-send"></i></a>
                            <a @click="set_form({ id: scope.item.id }); jump({ name:'spj-rekap' })" class="icon"><i class="fe fe-list"></i></a>
                            <a @click="set_form({ id: scope.item.id }); jump({ name:'spj-berkas' })" class="icon"><i class="fe fe-file-text"></i></a>
                    </td>
                </tr>
            </template>

        <Paginator 
            slot="paginate" 
            :totalPage="total_paginate(get_spj.last_page)" 
            @btnClick="onPaginator"></Paginator> 

        </TableView>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_spj': 'getters/spj',
        }),
        undefined_checker(){
            return function(args) {
                if(args == undefined) {
                    return ""
                } else {
                    return args.nomor_permohonan
                }
            }
        }
    },
    methods: {
        ...mapActions({
            'set_spj': 'setters/api/spj',
            'set_form': 'setters/non-api/spj/form',  
            'set_splice': 'setters/non-api/spj/splice',
            'set_replace': 'setters/non-api/spj/replace',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('spj'+this.suffix).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }
                                        
                    resolve(this.set_spj(response.data.data.spj))
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
        onAjukan(args){
            this.onAjukanConfirmation({
                url: 'spj/'+args.id+'/submit',
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

            judul: 'Daftar SPJ',

            theads: [{
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Tanggal',
                    width: '0',
                },
                {
                    title: 'Nomor Permohonan',
                    width: '0',
                },
                {
                    title: 'Kode',
                    width: '0',
                },
                {
                    title: 'Kegiatan',
                    width: '0',
                },
                {
                    title: 'Diajukan',
                    width: '0',
                },
                {
                    title: 'Disetujui',
                    width: '0',
                },
                {
                    title: 'Nominal',
                    width: '0',
                },
                {
                    title: 'Sisa SPJ',
                    width: '0',
                },
                {
                    title: 'Status',
                    width: '0',
                },   
                {
                    title: 'Aksi',
                    width: '100',
                },                                 
            ]               
        }
    }
}

</script>
