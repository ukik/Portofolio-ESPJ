<template>
    <div>
        <Toolbar :judul="judul" slot="toolbar">
            <RefreshButton @onRefresh="onRefresh()" />            
            <AddButton route="lampiran-honor-create" name="Honor" class="mr-2" />
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

        <TableView :items="get_honor.data" :theads="theads">
            <template slot-scope="scope">
              <tr>
                <td class="align-middle text-center">{{ scope.index + 1 }}</td>
                <td class="align-middle">{{ scope.item.uraian }}</td>
                <td class="align-middle text-center">{{ scope.item.bulan }}</td>
                <td class="align-middle">
                    {{ scope.item.kegiatan }}
                </td>
                <td class="align-middle text-right">{{ scope.item.subtotal | rupiah2 }}</td>
                <td class="align-middle text-right">{{ scope.item.pph_21 | rupiah2 }}</td>
                <td class="align-middle text-right">{{ scope.item.pph_22 | rupiah2 }}</td>
                <td class="align-middle text-right">{{ scope.item.pph_23 | rupiah2 }}</td>
                <td class="align-middle text-right">{{ scope.item.total | rupiah2 }}</td>

                <td v-status-info="scope.item.status" class="align-middle text-center" />

                <td class="text-center">
                  
                  <!-- menurut logika kalau sudah disetujui tidak bisa ajukan lagi -->                  
                  <a v-if="scope.item.status <= 0 && user != 'Supervisor'" @click="onAjukan({ id: scope.item.id, status: 1 })" class="icon"><i class="fe fe-send text-primary"></i></a>
                  
                    <!-- menurut logika kalau pembatalan hanya yang sedang diajukan -->                  
                  <a v-if="scope.item.status == 1 && user != 'Supervisor'" @click="onCancel({ id: scope.item.id, index: scope.index })" target="_blank" class="icon"><i class="fe fe-x text-danger"></i></a>

                  <a v-if="scope.item.status == 2" @click="onOpenDocument({
                        url: `lampiran/honor/${scope.item.id}/print`
                    })" target="_blank" class="icon"><i class="fe fe-printer text-success"></i></a>

                  <a @click="set_form({ id: scope.item.id }); jump({ name:'lampiran-honor-detail' })" class="icon"><i class="fe fe-users text-warning"></i></a>

                <!-- menurut logika kalau sedang di ajukan atau di setujui tidak bisa diedit -->
                  <a v-if="scope.item.status <= 0 && user != 'Supervisor'" @click="set_form({ id: scope.item.id }); jump({ name:'lampiran-honor-edit' })" class="icon"><i class="fe fe-edit"></i></a>
                  
                  <!-- menurut logika kalau sudah disetujui tidak bisa dihapus -->
                  <a v-if="scope.item.status != 2 && user != 'Supervisor'" @click="onDelete({ id: scope.item.id })" class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
                </td>
              </tr>
            </template>

            <Paginator 
                slot="paginate" 
                :totalPage="total_paginate(get_honor.last_page)" 
                @btnClick="onPaginator"></Paginator>  

        </TableView>
    </div>
</template>


<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_honor': 'getters/lampiran/honor',
        }),
    },
    methods: {
        ...mapActions({
            'set_honor': 'setters/api/lampiran/honor',
            'set_form': 'setters/non-api/lampiran/honor/form',  
            'set_splice': 'setters/non-api/lampiran/honor/splice',   
            'set_replace': 'setters/non-api/lampiran/honor/replace',         
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('lampiran/honor'+this.suffix).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    resolve(this.set_honor(response.data.data.honor))
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
                url: 'lampiran/honor/'+args.id+'/batal',
                id: args.id,
                bundle: args
            })                          
        },
        onDelete(args){
            this.onDeleteConfirmation({
                url: 'lampiran/honor/'+args.id,
                id: args.id,
                bundle: args
            })      
        },         
        onAjukan(args){
            this.onAjukanConfirmation({
                url: 'lampiran/honor/'+args.id+'/ajukan',
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

            judul: 'Lampiran Honor',
            user: this.$root.level, // 'Super Admin',  
            theads: [
                {
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Daftar',
                    width: '',
                },
                {
                    title: 'Bulan',
                    width: '',
                },
                {
                    title: 'Kegiatan',
                    width: '',
                },
                {
                    title: 'Subtotal',
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
                    title: 'Total',
                    width: '',
                },
                {
                    title: 'Status',
                    width: '',
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