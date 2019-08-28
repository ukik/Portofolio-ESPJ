<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
           <RefreshButton @onRefresh="onRefresh()" />              
            <DropdownButton 
                v-if="user != 'Supervisor'"
                class="mr-2" 
                classname="primary" 
                name="Tambah SPK">

                <a v-pointer class="dropdown-item" 
                @click="jump({ name:'lampiran-spk-create', query:{ jenis:'besar' } })">Besar</a>
                <a v-pointer class="dropdown-item" 
                @click="jump({ name:'lampiran-spk-create', query:{ jenis:'kecil' } })">Kecil</a>
            </DropdownButton>                   
        </Toolbar>

        <TableView :items="get_spk.data" :theads="theads">
            <template slot-scope="scope">
                <tr>
                    <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                    <td v-jenis-spk="scope.item.jenis" class="align-middle text-center"/>
                    <td class="align-middle">{{ scope.item.nomor_spk }}</td>
                    <td class="align-middle">{{ scope.item.tanggal }}</td>
                    <td class="align-middle">{{ scope.item.nama_pekerjaan }}</td>
                    <td class="align-middle">{{ scope.item.uraian }}</td>
                    <td v-status-info="scope.item.status" class="align-middle text-center" />
                    <td class="text-center">

                        <!-- menurut logika kalau sudah disetujui tidak bisa ajukan lagi -->
                        <a v-if="scope.item.status <= 0 && user != 'Supervisor'" @click="onAjukan({ id: scope.item.id, status: 1 })" target="_blank" class="icon"><i class="fe fe-send text-primary"></i></a>

                        <!-- menurut logika kalau pembatalan hanya yang sedang diajukan -->  
                        <a v-if="scope.item.status == 1 && user != 'Supervisor'" @click="onCancel({ id: scope.item.id, index: scope.index })" target="_blank" class="icon"><i class="fe fe-x text-danger"></i></a>

                        <a v-if="scope.item.status == 2" @click="onOpenDocument({
                                url: `lampiran/spk/${scope.item.id}/print`
                            })"  class="icon"><i class="fe fe-printer text-success"></i></a>

                        <a v-if="scope.item.status == 2 && user != 'Supervisor'" @click="set_form({ id: scope.item.id }); jump({ name:'lampiran-spk-rab', query: { tanggal: true } })" class="icon"><i class="fe fe-file text-warning"></i></a>
                        
                        <!-- menurut logika kalau sedang di ajukan atau di setujui tidak bisa diedit -->
                        <a v-if="scope.item.status <= 0 && user != 'Supervisor'" @click="set_form({ id: scope.item.id }); jump({ name:'lampiran-spk-edit' })" class="icon"><i class="fe fe-edit"></i></a>

                        <!-- menurut logika kalau sudah disetujui tidak bisa dihapus -->
                        <a v-if="scope.item.status != 2 && user != 'Supervisor'" @click="onDelete({ id: scope.item.id })" class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
                    </td>
                </tr>
            </template>

        <Paginator 
            slot="paginate" 
            :totalPage="total_paginate(get_spk.last_page)" 
            @btnClick="onPaginator"></Paginator>  

        </TableView>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_spk': 'getters/lampiran/spk/spk',
        }),
    },
    methods: {
        ...mapActions({
            'set_spk': 'setters/api/lampiran/spk/spk',
            'set_form': 'setters/non-api/lampiran/spk/form',  
            'set_splice': 'setters/non-api/lampiran/spk/splice',
            'set_replace': 'setters/non-api/lampiran/spk/replace',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('lampiran/spk'+this.suffix).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    resolve(this.set_spk(response.data.data.spk))
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
        onCancel(args){
            this.onCancelConfirmation({
                url: 'lampiran/spk/'+args.id+'/batal',
                id: args.id,
                bundle: args
            })                        
        },
        onDelete(args){
            this.onDeleteConfirmation({
                url: 'lampiran/spk/'+args.id,
                id: args.id,
                bundle: args
            })      
        },
        onAjukan(args){
            this.onAjukanConfirmation({
                url: 'lampiran/spk/'+args.id+'/ajukan',
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

            judul: 'Lampiran SPK',
            user: this.$root.level, // 'Super Admin',
            theads: [
                {
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Jenis',
                    width: '',
                },
                {
                    title: 'Nomor',
                    width: '',
                },
                {
                    title: 'Tanggal',
                    width: '',
                },
                {
                    title: 'Nama Pekerjaan',
                    width: '',
                },
                {
                    title: 'Uraian',
                    width: '',
                },
                {
                    title: 'Status',
                    width: '',
                },
                {
                    title: 'Aksi',
                    width: '150',
                },
            ]            
        }
    }
}

</script>