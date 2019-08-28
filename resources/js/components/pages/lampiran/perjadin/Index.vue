<template>
<div>
    <Toolbar :judul="judul" slot="toolbar">
        <RefreshButton @onRefresh="onRefresh()" />          
        <AddButton route="lampiran-perjadin-perubahan-create" name="SPT" class="mr-2" />
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

    <TableView :items="get_perjadin.data" :theads="theads">
        <template slot-scope="scope">
            <tr>
                <td class="text-center">{{ scope.index + 1 }}</td>
                <td class="text-center">{{ scope.item.nomor_spt }}</td>
                <td>{{ scope.item.tempat_tujuan }}</td>
                <td class="text-center">{{ scope.item.tanggal_berangkat }}</td>
                <td class="text-center">{{ scope.item.tanggal_kembali }}</td>
                <td class="text-center">{{ scope.item.lama_perjalanan }} hari </td>
                <td v-status-info="scope.item.status" class="align-middle text-center" />

                <td class="text-center">
                    <a v-if="scope.item.status == 0 && user != 'Supervisor'" @click="onAjukan({ id: scope.item.id, status: 1 })" class="icon"><i class="fe fe-send text-primary"></i></a>

                    <a v-if="scope.item.status != 2 && user != 'Supervisor'" @click="onCancel({ id: scope.item.id })" class="icon"><i class="fe fe-x text-danger"></i></a>

                    <a v-if="scope.item.status == 2" @click="onOpenDocument({
                        url: `lampiran/perjadin/${scope.item.id}/print?from=perubahan`
                    })" class="icon"><i class="fe fe-printer text-warning"></i></a>

                    <a @click="set_form({ id: scope.item.id }); jump({ name:'lampiran-perjadin-perubahan-detail' })" class="icon"><i class="fe fe-menu text-success"></i></a>

                    <a v-if="scope.item.status != 1 && user != 'Supervisor'" @click="set_form({ id: scope.item.id }); jump({ name:'lampiran-perjadin-perubahan-edit' })" class="icon"><i class="fe fe-edit text-secondary"></i></a>

                    <a v-if="scope.item.status != 1 && user != 'Supervisor'" @click="onDelete({ id: scope.item.id })" class="icon"><i class="fe fe-trash-2 text-danger"></i></a>
                </td>
            </tr>
        </template>

        <Paginator 
            slot="paginate" 
            :totalPage="total_paginate(get_perjadin.last_page)" 
            @btnClick="onPaginator"></Paginator>  

    </TableView>
</div>
</template>

<script>
import {  mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            'get_perjadin': 'getters/lampiran/perjadin',
        }),
    },
    methods: {
        ...mapActions({
            'set_perjadin': 'setters/api/lampiran/perjadin',
            'set_form': 'setters/non-api/lampiran/perjadin/form',  
            'set_replace': 'setters/non-api/lampiran/perjadin/replace',
        }),
        // CORE: untuk mengambil data init pada page ini
        onInitData(){
            // error handler reset
            this.$root.error.status = false
            this.$root.error.message = ""
            this.$root.request = true // membuka spinner ui
                        
            // sesuaikan dengan kebutuhan bisnis page ini
            const request = new Promise((resolve, reject) => {
                axios.get('lampiran/perjadin/perubahan'+this.suffix).then((response) => {
                    if(response == undefined) {
                        return resolve()
                    }

                    resolve(this.set_perjadin(response.data.data.perjadin))
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
                url: 'lampiran/perjadin/'+args.id+'/batal?from=perubahan',
                id: args.id,
                bundle: args
            })                       
        },
        onDelete(args){
            this.onDeleteConfirmation({
                url: 'lampiran/perjadin/'+args.id,
                id: args.id,
                bundle: args
            })       
        },
        onAjukan(args){
            this.onAjukanConfirmation({
                url: 'lampiran/perjadin/'+args.id+'/ajukan?from=perubahan',
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

            judul: 'Lampiran Perjadin',
            user: this.$root.level, // 'Super Admin',
            theads: [{
                    title: 'No',
                    width: '30',
                },
                {
                    title: 'Nomor',
                    width: '',
                },
                {
                    title: 'Tujuan',
                    width: '',
                },
                {
                    title: 'Tanggal Perjalanan',
                    width: '',
                },
                {
                    title: 'Tanggal Kembali',
                    width: '',
                },
                {
                    title: 'Lama Perjalanan',
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
